import { existsSync, mkdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import * as tstl from 'typescript-to-lua';
import { LuaTarget } from 'typescript-to-lua';
import { RootFolder } from '@/cli/constants.js';
import type { ValidatedEntryPoint } from '../model/ValidatedEntryPoint.js';
import type { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';
import { TranspileMode } from '../types.js';

export const transpile = ({
    entryPoint,
    exitPoint,
    transpileMode,
    library,
}: {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
    transpileMode?: TranspileMode;
    library?: boolean;
}) => {
    const exitDir = dirname(exitPoint.exitPath);

    if (!existsSync(exitDir)) {
        mkdirSync(exitDir, { recursive: true });
    }

    const actualTranspileMode =
        transpileMode ||
        (existsSync(join(entryPoint.projectPath, 'tsconfig.json'))
            ? TranspileMode.Project
            : TranspileMode.File);

    if (actualTranspileMode === TranspileMode.File) {
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
            luaPlugins: [
                {
                    name: join(RootFolder, 'assets', 'index.js'),
                },
            ],
            ...(library
                ? {}
                : {
                      luaBundle: basename(exitPoint.exitPath),
                      luaBundleEntry: join(entryPoint.entryFile),
                  }),
        },
    );
};
