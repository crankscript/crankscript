import { Command } from 'clipanion';
import React from 'react';
import { Compile } from '@/cli/commands/CompileCommand/components/Compile.js';
import { EnvironmentAwareCommand } from '@/cli/commands/EnvironmentAwareCommand/index.js';
import type { Environment } from '@/cli/environment/dto/Environment.js';

export class CompileCommand extends EnvironmentAwareCommand {
    static override paths = [['compile']];

    static override usage = Command.Usage({
        description: 'Compiles the code and runs the simulator',
    });

    override renderWithEnvironment(environment: Environment) {
        return <Compile environment={environment} />;
    }
}
