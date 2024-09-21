import { Command } from 'clipanion';
import { Text } from 'ink';
import React from 'react';
import { createEnvironment } from '@/cli/environment/createEnvironment.js';
import { HealthReport } from './EnvironmentAwareCommand/components/HealthReport.js';
import { RenderableCommand } from './RenderableCommand.js';

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
