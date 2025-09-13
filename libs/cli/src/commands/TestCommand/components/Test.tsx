import { resolve } from 'node:path';
import { StatusMessage } from '@inkjs/ui';
import { Box } from 'ink';
import React, { useEffect, useRef } from 'react';
import { CheckList } from '@/cli/components/CheckList/index.js';
import type { Environment } from '@/cli/environment/dto/Environment.js';
import { useTestServer } from '../hooks/useTestServer.js';
import { useTestTasks } from '../hooks/useTestTasks.js';
import type {
    TestResult,
    TestSuite as TestSuiteType,
} from '../server/TestServer.js';
import { OutputFormat } from '../types.js';
import { TestSuite } from './TestSuite.js';
import { TestSummary } from './TestSummary.js';

interface JsonSafeTestSuite {
    name: string;
    testCount: number;
    status: 'pending' | 'running' | 'completed';
    tests: TestResult[];
    children: JsonSafeTestSuite[];
    depth: number;
    startTime?: string;
    endTime?: string;
    // Note: Intentionally omitting 'parent' to break circular reference
}

const removeCircularReferences = (suite: TestSuiteType): JsonSafeTestSuite => {
    return {
        name: suite.name,
        testCount: suite.testCount,
        status: suite.status,
        tests: suite.tests,
        children: suite.children.map((child) =>
            removeCircularReferences(child),
        ),
        depth: suite.depth,
        startTime: suite.startTime,
        endTime: suite.endTime,
    };
};

export const Test = ({
    environment,
    path,
    watch,
    format = OutputFormat.Pretty,
}: {
    environment: Environment;
    path: string;
    watch: boolean;
    format?: OutputFormat;
}) => {
    const { testState, resetTestState } = useTestServer();
    const {
        tasks,
        handleFinish,
        isWatching,
        hasChangedMessage,
        hasFailure,
        hasChanged,
    } = useTestTasks({
        environment,
        path: resolve(process.cwd(), path),
        watch,
    });
    const compilationFinishedRef = useRef(false);

    useEffect(() => {
        if (format === OutputFormat.Pretty) {
            process.stdout.write('\x1Bc');
        }
    }, [format]);

    useEffect(() => {
        if (hasChanged) {
            if (format === OutputFormat.Pretty) {
                process.stdout.write('\x1Bc');
            }

            resetTestState();
        }
    }, [hasChanged, format, resetTestState]);

    useEffect(() => {
        if (!watch && compilationFinishedRef.current && testState) {
            const isTestingComplete =
                testState.status === 'completed' ||
                testState.status === 'failed';

            if (isTestingComplete) {
                if (format === OutputFormat.Json) {
                    const jsonSafeTestState = {
                        ...testState,
                        suites: testState.suites.map((suite) =>
                            removeCircularReferences(suite),
                        ),
                    };
                    console.log(JSON.stringify(jsonSafeTestState, null, 2));
                }

                process.exit(
                    testState.status === 'failed' || testState.failedTests > 0
                        ? 1
                        : 0,
                );
            }
        }
    }, [watch, testState, format]);

    const handleFinishWithTracking = (hasFailure: boolean) => {
        compilationFinishedRef.current = true;
        return handleFinish(hasFailure);
    };

    return (
        <>
            {!hasChanged && (
                <CheckList
                    items={tasks}
                    onFinish={handleFinishWithTracking}
                    display="silent"
                />
            )}

            {format === OutputFormat.Pretty && (
                <>
                    {isWatching && !hasChangedMessage && (
                        <>
                            {hasFailure && (
                                <StatusMessage variant="warning">
                                    Some steps failed:
                                </StatusMessage>
                            )}
                            <StatusMessage variant="info">
                                Watching for changes...
                            </StatusMessage>
                        </>
                    )}

                    {testState && (
                        <Box flexDirection="column">
                            <TestSummary testState={testState} />
                            {testState.suites.map((suite) => (
                                <TestSuite key={suite.name} suite={suite} />
                            ))}
                        </Box>
                    )}
                </>
            )}
        </>
    );
};
