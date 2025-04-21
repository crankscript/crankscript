import { basename, dirname, join } from 'node:path';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { RootFolder } from '@/cli/constants.js';
import { ValidatedEntryPoint } from '../model/ValidatedEntryPoint.js';
import { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';

export const transpile = ({
    entryPoint,
    exitPoint,
    buildMode = tstl.BuildMode.Default,
}: {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
    buildMode?: tstl.BuildMode;
}) => {
    return tstl.transpileProject(
        join(entryPoint.projectPath, 'tsconfig.json'),
        {
            buildMode,
            luaTarget: LuaTarget.Lua54,
            outDir: dirname(exitPoint.exitPath),
            luaBundle: basename(exitPoint.exitPath),
            luaBundleEntry: join(entryPoint.entryFile),
            luaPlugins: [
                {
                    name: join(RootFolder, 'assets', 'index.js'),
                },
            ],
        },
    );
};
