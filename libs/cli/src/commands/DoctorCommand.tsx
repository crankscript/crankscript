import React from 'react';
import { Text } from 'ink';
import { RenderableCommand } from './RenderableCommand.js';
import { createEnvironment } from '../environment/createEnvironment.js';
import { HealthReport } from './EnvironmentAwareCommand/components/HealthReport.js';
import { Command } from 'clipanion';

export class DoctorCommand extends RenderableCommand {
    static override paths = [['doctor']];

    static override usage = Command.Usage({
        description: 'Check the health of the environment',
    });

    override render() {
        const environment = createEnvironment();

        return (
            <>
                <Text color="gray">Checking the environment...</Text>
                <HealthReport health={environment.health} />
            </>
        );
    }
}
