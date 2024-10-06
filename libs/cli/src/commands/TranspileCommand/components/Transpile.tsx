import { join } from 'node:path';
import React from 'react';
import { useMemo } from 'react';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { RootFolder } from '@/cli/constants.js';
import { CheckListItem } from '@/cli/types.js';

const transpile = (path: string) => {
    tstl.transpileProject(join(path, 'tsconfig.json'), {
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

export const Transpile = ({ path }: { path: string }) => {
    const items = useMemo(
        () => [
            {
                waitingDescription: 'Waiting to transpile code...',
                errorDescription: 'Could not transpile code',
                runningDescription: 'Transpiling code...',
                finishedDescription: () => 'Code transpiled',
                runner: async () => {
                    transpile(path);
                },
                ready: true,
            },
        ],
        []
    ) as CheckListItem<unknown>[];

    return <CheckList items={items} onFinish={process.exit} />;
};
