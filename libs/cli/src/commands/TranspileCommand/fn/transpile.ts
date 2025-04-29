import { existsSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { RootFolder } from '@/cli/constants.js';
import { ValidatedEntryPoint } from '../model/ValidatedEntryPoint.js';
import { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';
import { TranspileMode } from '../types.js';

export const transpile = ({
    entryPoint,
    exitPoint,
    transpileMode = TranspileMode.Project,
}: {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
    transpileMode?: TranspileMode;
}) => {
    const exitDir = dirname(exitPoint.exitPath);

    if (!existsSync(exitDir)) {
        mkdirSync(exitDir, { recursive: true });
    }

    if (transpileMode === TranspileMode.File) {
        return tstl.transpileFiles([entryPoint.entryFile], {
            luaTarget: LuaTarget.Lua54,
            outDir: dirname(exitPoint.exitPath),
            luaBundle: basename(exitPoint.exitPath),
            luaBundleEntry: join(entryPoint.entryFile),
            skipLibCheck: true,
            luaPlugins: [
                {
                    name: join(RootFolder, 'assets', 'index.js'),
                },
            ],
        });
    }

    return tstl.transpileProject(
        join(entryPoint.projectPath, 'tsconfig.json'),
        {
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
