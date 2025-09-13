import { Box, Text } from 'ink';
import React from 'react';
import type { TestLine as TestLineType } from '../server/TestServer.js';

interface TestLineProps {
    line: TestLineType;
    lineIndex: number;
    testName: string;
    suiteName: string;
}

export const TestLine: React.FC<TestLineProps> = ({
    line,
    lineIndex,
    testName,
    suiteName,
}) => (
    <Box key={`${suiteName}-${testName}-line-${lineIndex}`} paddingLeft={4}>
        <Text color={line.type === 'error' ? 'red' : 'white'} dimColor>
            [{line.timestamp}]
        </Text>
        <Text color={line.type === 'error' ? 'red' : 'white'} dimColor>
            {' '}
            {line.content}
        </Text>
    </Box>
);
