import { Box, Text } from 'ink';
import React from 'react';
import type {
    TestResult as TestResultType,
    TestSuite as TestSuiteType,
} from '../server/TestServer.js';
import { TestResult } from './TestResult.js';

interface TestSuiteProps {
    suite: TestSuiteType;
    depth?: number;
}

export const TestSuite: React.FC<TestSuiteProps> = ({ suite, depth }) => {
    const actualDepth = depth !== undefined ? depth : suite.depth || 0;

    const indentation = '    '.repeat(actualDepth);

    const getAllTestsFromSuite = (suite: TestSuiteType): TestResultType[] => {
        const allTests = [...suite.tests];
        suite.children.forEach((child) => {
            allTests.push(...getAllTestsFromSuite(child));
        });
        return allTests;
    };

    const isAnyChildRunning = (suite: TestSuiteType): boolean => {
        if (suite.status === 'running') return true;
        return suite.children.some((child) => isAnyChildRunning(child));
    };

    const getSuiteStatus = () => {
        if (isAnyChildRunning(suite)) {
            return 'RUN';
        }

        const allTests = getAllTestsFromSuite(suite);
        if (allTests.length === 0) {
            return 'PASS';
        }

        return allTests.every((test) => test.result === 'passed')
            ? 'PASS'
            : 'FAIL';
    };

    const getStatusColor = () => {
        if (isAnyChildRunning(suite)) {
            return 'yellow';
        }

        const allTests = getAllTestsFromSuite(suite);
        if (allTests.length === 0) {
            return 'green';
        }

        return allTests.every((test) => test.result === 'passed')
            ? 'green'
            : 'red';
    };

    return (
        <Box key={suite.name} flexDirection="column">
            <Box>
                <Text>
                    {indentation}
                    <Text backgroundColor={getStatusColor()} bold color="white">
                        {' '}
                        {getSuiteStatus()}{' '}
                    </Text>{' '}
                    {suite.name}
                </Text>
            </Box>

            {suite.tests.map((test) => (
                <Box key={`${suite.name}-${test.test}`}>
                    <Text>{indentation} </Text>
                    <TestResult test={test} suiteName={suite.name} />
                </Box>
            ))}

            {suite.children.map((childSuite) => (
                <TestSuite
                    key={childSuite.name}
                    suite={childSuite}
                    depth={actualDepth + 1}
                />
            ))}
        </Box>
    );
};
