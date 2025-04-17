import React, { JSX } from 'react';
import { HealthReport } from '@/cli/commands/EnvironmentAwareCommand/components/HealthReport.js';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { createEnvironment } from '@/cli/environment/createEnvironment.js';
import { Environment } from '@/cli/environment/dto/Environment.js';

export abstract class EnvironmentAwareCommand extends RenderableCommand {
    private environment: Environment | undefined;

    protected abstract renderWithEnvironment(
        environment: Environment,
    ): JSX.Element;

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

        this.renderElement(this.render());
    }
}
