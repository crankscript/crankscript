import { join } from 'node:path';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { plugin } from './plugin';

export const compile = (path: string) => {
    return tstl.transpileProject(join(path, 'tsconfig.json'), {
        luaTarget: LuaTarget.Lua54,
        luaPlugins: [plugin as unknown as tstl.LuaPluginImport],
        luaBundle: 'main.lua',
        luaBundleEntry: join(path, 'src/index.ts'),
    });
};
