import { join } from 'node:path';
import open from 'open';
import { useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { CheckListProps } from '@/cli/components/CheckList/CheckList.js';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { isWindows } from '@/cli/utils/platform.js';
import { isMac } from '@/cli/utils/platform.js';
import { useFileWatcher } from './useFileWatcher.js';
import { getPdcPathFromEnvironment } from '../../CompileCommand/fn/getPdcPathFromEnvironment.js';
import { useCompileTasks } from '../../CompileCommand/hooks/useCompileTasks.js';
import { validateEntryPoint } from '../../TranspileCommand/fn/validateEntryPoint.js';
import { validateExitPoint } from '../../TranspileCommand/fn/validateExitPoint.js';
import { useTranspileTasks } from '../../TranspileCommand/hooks/useTranspileTasks.js';
import { TranspileMode } from '../../TranspileCommand/types.js';
import { getSimulatorPathFromEnvironment } from '../fn/getSimulatorPathFromEnvironment.js';

interface Props {
    path: string;
    environment: Environment;
    watchForChanges: boolean;
    recompileOnly: boolean;
    background: boolean;
    entryFile?: string;
    luaOutputPath?: string;
    gameOutputPath?: string;
    requireWithinProjectPath?: boolean;
    additionalGlobs?: string[];
}

export const useSimulatorTasks = ({
    path,
    environment,
    watchForChanges,
    recompileOnly,
    background,
    entryFile,
    luaOutputPath,
    gameOutputPath,
    requireWithinProjectPath = true,
    additionalGlobs = [],
}: Props) => {
    const [isWatching, setIsWatching] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [hasChangedMessage, setHasChangedMessage] = useState(false);
    const [hasFailure, setHasFailure] = useState(false);
    const didRun = useRef(false);

    useEffect(() => {
        if (hasChanged) {
            setHasChanged(false);
        }
    }, [hasChanged, setHasChanged]);

    const transpileTasks = useTranspileTasks({
        entryPoint: validateEntryPoint({
            projectPath: path,
            entryFile: entryFile ?? join(path, 'src', 'index.ts'),
            requireWithinProjectPath,
        }),
        exitPoint: validateExitPoint({
            projectPath: path,
            exitFile: join(
                ...(luaOutputPath ? [luaOutputPath] : [path, 'Source']),
                'main.lua',
            ),
            requireWithinProjectPath,
        }),
        transpileMode: entryFile ? TranspileMode.File : TranspileMode.Project,
    });

    const compileTasks = useCompileTasks({
        pdcPath: getPdcPathFromEnvironment(environment),
        outputPath: gameOutputPath,
    });

    const handleFinish = useCallback(
        (hasFailure => {
            setHasFailure(hasFailure);

            if (didRun.current && recompileOnly) {
                return;
            }

            didRun.current = true;

            open(join(gameOutputPath ?? process.cwd(), 'Game.pdx'), {
                background,
                app: isMac
                    ? undefined
                    : {
                          name: getSimulatorPathFromEnvironment(environment),
                      },
            }).then(() => {
                if (!watchForChanges) {
                    if (!isWindows) {
                        process.exit();
                    }
                    setTimeout(process.exit, 1000);
                } else {
                    setHasChangedMessage(false);
                    setIsWatching(true);
                }
            });
        }) satisfies CheckListProps['onFinish'],
        [
            watchForChanges,
            recompileOnly,
            gameOutputPath,
            environment,
            background,
        ],
    );

    useFileWatcher({
        watchPath: entryFile ? entryFile : join(path, 'src'),
        enabled: isWatching,
        onChange: () => {
            setHasChanged(true);
            setHasChangedMessage(true);
        },
        additionalGlobs,
    });

    const tasks = useMemo(() => {
        return [...transpileTasks, ...compileTasks];
    }, [transpileTasks, compileTasks]);

    return {
        tasks,
        handleFinish,
        hasChanged,
        isWatching,
        hasChangedMessage,
        hasFailure,
    };
};
