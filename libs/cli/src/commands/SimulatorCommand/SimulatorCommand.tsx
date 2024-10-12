import { Command, Option } from 'clipanion';
import React from 'react';
import { EnvironmentAwareCommand } from '@/cli/commands/EnvironmentAwareCommand/index.js';
import { Simulator } from '@/cli/commands/SimulatorCommand/components/Simulator.js';
import { projectPathOption } from '@/cli/commands/TranspileCommand/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';

export class SimulatorCommand extends EnvironmentAwareCommand {
    static override paths = [['simulator']];

    static override usage = Command.Usage({
        description: 'Transpile, compile, and run the simulator',
    });

    watch = Option.Boolean('-w,--watch', false, {
        description: 'Watch for changes',
    });

    background = Option.Boolean('-b,--background', false, {
        description: 'Do not bring simulator to foreground',
    });

    projectPath = projectPathOption;

    override renderWithEnvironment(environment: Environment) {
        return (
            <Simulator
                environment={environment}
                path={this.projectPath}
                watch={this.watch}
                background={this.background}
            />
        );
    }
}
