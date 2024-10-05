import process from 'node:process';
import { compile } from '@crankscript/compiler';
import { Option } from 'clipanion';
import { Text } from 'ink';
import React, { useEffect } from 'react';
import * as t from 'typanion';
import { RenderableCommand } from './RenderableCommand.js';

const Compile = ({ path }: { path: string }) => {
    useEffect(() => {
        compile(path);
    }, []);

    return <Text color="gray">Checking the environment...</Text>;
};

export class CompileCommand extends RenderableCommand {
    static override paths = [['compile']];

    projectPath = Option.String('-p,--path', process.cwd(), {
        description: `Where to find the project. Defaults to the current working directory ("${process.cwd()}")`,
        validator: t.isString(),
    });

    override render() {
        return <Compile path={this.projectPath} />;
    }
}
