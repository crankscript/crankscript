import { Command, Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import { EnvironmentAwareCommand } from '@/cli/commands/EnvironmentAwareCommand/index.js';
import { Simulator } from '@/cli/commands/SimulatorCommand/components/Simulator.js';
import { TemporaryFolderCreator } from '@/cli/commands/SimulatorCommand/components/TemporaryFolderCreator.js';
import {
    defaultProjectPath,
    projectPathOption,
} from '@/cli/commands/TranspileCommand/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';

export class SimulatorCommand extends EnvironmentAwareCommand {
    static override paths = [['simulator']];

    static override usage = Command.Usage({
        description: 'Transpile, compile, and run the simulator',
    });

    file = Option.String({
        name: 'file',
        required: false,
    });

    watch = Option.Boolean('-w,--watch', false, {
        description: 'Watch for changes',
    });

    recompileOnly = Option.Boolean('-r,--recompile-only', false, {
        description:
            'Use with --watch to only recompile without launching the simulator when files change',
    });

    background = Option.Boolean('-b,--background', false, {
        description: 'Do not bring simulator to foreground',
    });

    additionalGlobs = Option.Array('-g,--additional-globs', [], {
        description: 'Additional globs to watch for changes',
        validator: t.isArray(t.isString()),
    });

    projectPath = projectPathOption;

    override renderWithEnvironment(environment: Environment) {
        if (this.file && this.projectPath !== defaultProjectPath) {
            throw new Error(
                'Cannot provide a --path when running a single file',
            );
        }

        if (this.additionalGlobs.length > 0 && !this.watch) {
            throw new Error(
                'Can only provide --additional-globs when watching for changes',
            );
        }

        const content = (
            <Simulator
                environment={environment}
                path={this.projectPath}
                watch={this.watch}
                recompileOnly={this.recompileOnly}
                background={this.background}
                entryFile={this.file}
                additionalGlobs={this.additionalGlobs}
                watchEntryFileOnly={!!this.file}
            />
        );

        if (!this.file) {
            return content;
        }

        return (
            <>
                <TemporaryFolderCreator entryFile={this.file}>
                    {content}
                </TemporaryFolderCreator>
            </>
        );
    }
}
