import { join } from 'node:path';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { RootFolder } from '@/cli/constants.js';
import { ValidatedEntryPoint } from '../model/ValidatedEntryPoint.js';

export const transpile = ({
    entryPoint,
    buildMode = tstl.BuildMode.Default,
}: {
    entryPoint: ValidatedEntryPoint;
    buildMode?: tstl.BuildMode;
}) => {
    return tstl.transpileProject(
        join(entryPoint.projectPath, 'tsconfig.json'),
        {
            buildMode,
            luaTarget: LuaTarget.Lua54,
            outDir: join(entryPoint.projectPath, 'Source'),
            luaBundle: 'main.lua',
            luaBundleEntry: join(entryPoint.entryFile),
            luaPlugins: [
                {
                    name: join(RootFolder, 'assets', 'index.js'),
                },
            ],
        },
    );
};
