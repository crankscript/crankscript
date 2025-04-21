import { FSWatcher, watch as watchDir } from 'node:fs';
import { join } from 'node:path';
import { StatusMessage } from '@inkjs/ui';
import open from 'open';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { getPdcPathFromEnvironment } from '@/cli/commands/CompileCommand/fn/getPdcPathFromEnvironment.js';
import { useCompileTasks } from '@/cli/commands/CompileCommand/hooks/useCompileTasks.js';
import { getSimulatorPathFromEnvironment } from '@/cli/commands/SimulatorCommand/fn/getSimulatorPathFromEnvironment.js';
import { validateEntryPoint } from '@/cli/commands/TranspileCommand/fn/validateEntryPoint.js';
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import { CheckList, CheckListProps } from '@/cli/components/CheckList/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { isMac, isWindows } from '@/cli/utils/platform.js';
import { validateExitPoint } from '../../TranspileCommand/fn/validateExitPoint.js';

interface Props {
    environment: Environment;
    path: string;
    watch?: boolean;
    recompileOnly?: boolean;
    background?: boolean;
}

export const Simulator = ({
    environment,
    path,
    watch = false,
    recompileOnly = false,
    background = false,
}: Props) => {
    const watcher = useRef<FSWatcher | null>(null);
    const [isWatching, setIsWatching] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [hasChangedMessage, setHasChangedMessage] = useState(false);
    const transpileTasks = useTranspileTasks({
        entryPoint: validateEntryPoint({
            projectPath: path,
            entryFile: join(path, 'src', 'index.ts'),
        }),
        exitPoint: validateExitPoint({
            projectPath: path,
            exitFile: join(path, 'Source', 'main.lua'),
        }),
    });
    const compileTasks = useCompileTasks(
        getPdcPathFromEnvironment(environment),
    );
    const didRun = useRef(false);
    const [hasFailure, setHasFailure] = useState(false);

    useEffect(() => {
        if (hasChanged) {
            setHasChanged(false);
        }
    }, [hasChanged, setHasChanged]);

    const handleFinish = useCallback(
        (hasFailure => {
            setHasFailure(hasFailure);
            if (didRun.current && recompileOnly) {
                return;
            }

            didRun.current = true;

            open('Game.pdx', {
                background,
                app: isMac
                    ? undefined
                    : {
                          name: getSimulatorPathFromEnvironment(environment),
                      },
            }).then(() => {
                if (!watch) {
                    if (!isWindows) {
                        process.exit();
                    }

                    // Wait for the simulator to start
                    // See https://github.com/sindresorhus/open/issues/298
                    setTimeout(process.exit, 1000);
                } else {
                    setHasChangedMessage(false);

                    if (watcher.current) {
                        watcher.current.close();
                    }

                    setIsWatching(true);

                    watcher.current = watchDir(
                        join(path, 'src'),
                        { recursive: true },
                        () => {
                            setHasChanged(true);
                            setHasChangedMessage(true);
                            setIsWatching(false);
                        },
                    );
                }
            });
        }) satisfies CheckListProps['onFinish'],
        [watch, setHasChanged, setIsWatching],
    );

    const tasks = useMemo(() => {
        return [...transpileTasks, ...compileTasks];
    }, [transpileTasks, compileTasks]);

    return (
        <>
            {!hasChanged && <CheckList items={tasks} onFinish={handleFinish} />}
            {isWatching && !hasChangedMessage && (
                <>
                    {hasFailure && (
                        <StatusMessage variant="warning">
                            Some steps failed.
                        </StatusMessage>
                    )}
                    <StatusMessage variant="info">
                        Watching for changes...
                    </StatusMessage>
                </>
            )}
            {hasChangedMessage && (
                <StatusMessage variant="info">Change detected</StatusMessage>
            )}
        </>
    );
};
