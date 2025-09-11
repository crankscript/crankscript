import process from 'node:process';
import { Command, Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { Transpile } from '@/cli/commands/TranspileCommand/components/Transpile.js';
import { validateEntryPoint } from '@/cli/commands/TranspileCommand/fn/validateEntryPoint.js';
import { validateExitPoint } from './fn/validateExitPoint.js';

export const defaultProjectPath = process.cwd();
export const projectPathOption = Option.String(
    '-p,--path',
    defaultProjectPath,
    {
        description: `Where to find the project. Defaults to the current working directory ("${defaultProjectPath}")`,
        validator: t.isString(),
    },
);

export class TranspileCommand extends RenderableCommand {
    static override paths = [['transpile']];

    static override usage = Command.Usage({
        description: 'Transpile TypeScript files to Lua',
    });

    entryFile = Option.String('-i,--input', 'src/index.ts', {
        description: 'The entry point to transpile',
        validator: t.isString(),
    });

    exitFile = Option.String('-o,--output', 'Source/index.lua', {
        description: 'The output bundle',
        validator: t.isString(),
    });

    toybox = Option.String('--toybox', {
        description:
            'Output a toybox compatible bundle which exports to this namespace',
        validator: t.isString(),
    });

    projectPath = projectPathOption;

    override render() {
        const validatedEntryPoint = validateEntryPoint({
            projectPath: this.projectPath,
            entryFile: this.entryFile,
        });

        const validatedExitPoint = validateExitPoint({
            projectPath: this.projectPath,
            exitFile: this.exitFile,
            requireWithinProjectPath: false,
        });

        return (
            <Transpile
                entryPoint={validatedEntryPoint}
                exitPoint={validatedExitPoint}
                toybox={this.toybox}
            />
        );
    }
}
