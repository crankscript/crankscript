import { StatusMessage } from '@inkjs/ui';
import { Option } from 'clipanion';
import { Text } from 'ink';
import React, { JSX } from 'react';
import { HealthReport } from '@/cli/commands/EnvironmentAwareCommand/components/HealthReport.js';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { createEnvironment } from '@/cli/environment/createEnvironment.js';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { CrankScriptProvider } from './contexts/CrankScriptContext.js';

export abstract class EnvironmentAwareCommand extends RenderableCommand {
    private environment: Environment | undefined;

    protected abstract renderWithEnvironment(
        environment: Environment,
    ): JSX.Element;

    verbose = Option.Boolean('-vvv,--verbose', false, {
        description: 'Enable verbose logging',
    });

    override render() {
        if (!this.environment) {
            throw new Error('Environment is not set');
        }

        return this.renderWithEnvironment(this.environment);
    }

    override async execute() {
        const environmentHealth = createEnvironment();

        if (!environmentHealth.isHealthy) {
            this.renderElement(
                <HealthReport environment={environmentHealth} />,
            );

            return;
        }

        this.environment = environmentHealth.environment;

        try {
            const toRender = this.render();
            this.renderElement(
                <CrankScriptProvider verbose={this.verbose}>
                    {toRender}
                </CrankScriptProvider>,
            );
        } catch (error) {
            this.renderElement(
                <StatusMessage variant="error">
                    <Text color="red">
                        {error instanceof Error
                            ? error.message
                            : 'An unknown error occurred'}
                        {this.verbose &&
                            error instanceof Error &&
                            error.stack && (
                                <Text color="red">{error.stack}</Text>
                            )}
                    </Text>
                </StatusMessage>,
            );

            process.exit(1);
        }
    }
}
