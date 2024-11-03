import { join } from 'node:path';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { RootFolder } from '@/cli/constants.js';

export const transpile = (path: string) => {
    return tstl.transpileProject(join(path, 'tsconfig.json'), {
        luaTarget: LuaTarget.Lua54,
        outDir: join(path, 'Source'),
        luaBundle: 'main.lua',
        luaBundleEntry: join(path, 'src', 'index.ts'),
        luaPlugins: [
            {
                name: join(RootFolder, 'assets', 'index.js'),
            },
        ],
    });
};
