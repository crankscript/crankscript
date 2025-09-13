import { Command, Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import type { Environment } from '@/cli/environment/dto/Environment.js';
import { EnvironmentAwareCommand } from '../EnvironmentAwareCommand/index.js';
import { Test } from './components/Test.js';
import { OutputFormat } from './types.js';

export class TestCommand extends EnvironmentAwareCommand {
    static override paths = [['test']];

    static override usage = Command.Usage({
        description: 'Transpile TypeScript files to Lua',
    });

    projectPath = Option.String('-p,--path', process.cwd(), {
        description: 'The path to the project',
    });

    watch = Option.Boolean('-w,--watch', false, {
        description: 'Watch for changes and rerun tests',
    });

    format = Option.String('--format', OutputFormat.Pretty, {
        description: 'Output format for test results',
        validator: t.isEnum(OutputFormat),
    });

    override renderWithEnvironment(environment: Environment) {
        if (this.format === OutputFormat.Json && this.watch) {
            throw new Error('JSON format is not supported in watch mode');
        }

        return (
            <Test
                environment={environment}
                path={this.projectPath}
                watch={this.watch}
                format={this.format}
            />
        );
    }
}
