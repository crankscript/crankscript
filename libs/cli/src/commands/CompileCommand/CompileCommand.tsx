import { join } from 'node:path';
import process from 'node:process';
import { Option } from 'clipanion';
import React, { useEffect } from 'react';
import * as t from 'typanion';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { RenderableCommand } from '@/cli/commands/RenderableCommand.js';
import { RootFolder } from '@/cli/constants.js';

const compile = (path: string) => {
    const result = tstl.transpileProject(join(path, 'tsconfig.json'), {
        luaTarget: LuaTarget.Lua54,
        outDir: join(path, 'Source'),
        luaBundle: 'game.lua',
        luaBundleEntry: join(path, 'src', 'index.ts'),
        luaPlugins: [
            {
                name: join(
                    RootFolder,
                    'src',
                    'commands',
                    'CompileCommand',
                    'plugin.cts'
                ),
            },
        ],
    });
};

const Compile = ({ path }: { path: string }) => {
    useEffect(() => {
        compile(path);
    }, []);

    return null;
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
