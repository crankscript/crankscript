import { Box, Text } from 'ink';
import React from 'react';
import { TestLine } from './TestLine.js';
import { TestResult as TestResultType } from '../server/TestServer.js';
import { formatTestError } from '../utils/formatTestError.js';

interface TestResultProps {
    test: TestResultType;
    suiteName: string;
}

export const TestResult: React.FC<TestResultProps> = ({ test, suiteName }) => {
    const errorLine =
        test.result === 'failed'
            ? test.lines.find(line => line.type === 'error')
            : null;

    return (
        <Box key={`${suiteName}-${test.test}`} flexDirection="column">
            <Box gap={1} paddingLeft={2}>
                <Box gap={1}>
                    <Text
                        color={test.result === 'passed' ? 'green' : 'red'}
                        bold
                    >
                        {test.result === 'passed' ? '✓' : '✗'}
                    </Text>
                    <Text dimColor>{test.test}</Text>
                </Box>
            </Box>

            {test.result === 'failed' && errorLine && (
                <Box paddingLeft={4}>
                    <Text color="red">
                        {formatTestError(
                            errorLine.content,
                            errorLine.file,
                            errorLine.line,
                        )}
                    </Text>
                </Box>
            )}

            {test.lines.length > 0 && test.result === 'failed' && (
                <Box paddingLeft={4} paddingTop={1} paddingBottom={1}>
                    <Text color="white" dimColor>
                        Captured output
                    </Text>
                </Box>
            )}

            {test.lines.length > 0 && test.result === 'failed' && (
                <Box paddingBottom={1} flexDirection="column">
                    {test.lines.map((line, lineIndex) => (
                        <Box
                            key={`${suiteName}-${test.test}-line-${lineIndex}`}
                        >
                            <TestLine
                                line={line}
                                lineIndex={lineIndex}
                                testName={test.test}
                                suiteName={suiteName}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};
