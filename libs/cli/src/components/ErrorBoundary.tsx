import { StatusMessage } from '@inkjs/ui';
import { Text } from 'ink';
import React, { Component, ReactNode } from 'react';

interface State {
    error?: Error;
}

interface Props {
    verbose: boolean;
    children: ReactNode;
}

export class ErrorBoundary extends Component<Props, State> {
    override state = {} as State;

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { error };
    }

    override render() {
        const { verbose } = this.props;
        const { error } = this.state;

        if (!error) {
            return this.props.children;
        }

        return (
            <StatusMessage variant="error">
                <Text color="red">{verbose ? error.stack : error.message}</Text>
            </StatusMessage>
        );
    }
}
