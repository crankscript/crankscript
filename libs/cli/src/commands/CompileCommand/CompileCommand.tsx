import { Command, Option } from 'clipanion';
import React from 'react';
import { Compile } from '@/cli/commands/CompileCommand/components/Compile.js';
import { EnvironmentAwareCommand } from '@/cli/commands/EnvironmentAwareCommand/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';

export class CompileCommand extends EnvironmentAwareCommand {
    static override paths = [['compile']];

    static override usage = Command.Usage({
        description: 'Compiles the code and runs the simulator',
    });

    watch = Option.Boolean('-w,--watch', false, {
        description: 'Watch for changes',
    });

    override renderWithEnvironment(environment: Environment) {
        return <Compile environment={environment} watch={this.watch} />;
    }
}
