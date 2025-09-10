import { Box, Text } from 'ink';
import React from 'react';
import { TestState } from '../server/TestServer.js';

interface TestSummaryProps {
    testState: TestState;
}

export const TestSummary: React.FC<TestSummaryProps> = ({ testState }) => (
    <Box gap={1} paddingBottom={1}>
        <Text dimColor color="blue">
            {testState.passedTests}/{testState.totalTests} passed tests
        </Text>
    </Box>
);
