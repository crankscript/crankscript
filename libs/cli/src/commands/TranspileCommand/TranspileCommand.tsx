import process from 'node:process';
import { Option } from 'clipanion';
import React from 'react';
import * as t from 'typanion';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { Transpile } from '@/cli/commands/TranspileCommand/components/Transpile.js';

export const projectPathOption = Option.String('-p,--path', process.cwd(), {
    description: `Where to find the project. Defaults to the current working directory ("${process.cwd()}")`,
    validator: t.isString(),
});

export class TranspileCommand extends RenderableCommand {
    static override paths = [['transpile']];

    projectPath = projectPathOption;

    override render() {
        return <Transpile path={this.projectPath} />;
    }
}
