import React, { JSX } from 'react';
import { RenderableCommand } from '../RenderableCommand.js';
import { Environment } from '../../environment/dto/Environment.js';
import { createEnvironment } from '../../environment/createEnvironment.js';
import { HealthReport } from './components/HealthReport.js';

export abstract class EnvironmentAwareCommand extends RenderableCommand {
    private environment: Environment | undefined;

    protected abstract renderWithEnvironment(
        environment: Environment
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
                <HealthReport health={environmentHealth.health} />
            );

            return;
        }

        this.environment = environmentHealth.environment;

        this.renderElement(this.render());
    }
}
