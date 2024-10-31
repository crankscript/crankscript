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
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { isMac, isWindows } from '@/cli/utils/platform.js';

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
    const transpileTasks = useTranspileTasks(path);
    const compileTasks = useCompileTasks(
        getPdcPathFromEnvironment(environment)
    );
    const didRun = useRef(false);

    useEffect(() => {
        if (hasChanged) {
            setHasChanged(false);
        }
    }, [hasChanged, setHasChanged]);

    const handleFinish = useCallback(() => {
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
                    }
                );
            }
        });
    }, [watch, setHasChanged, setIsWatching]);

    const tasks = useMemo(() => {
        return [...transpileTasks, ...compileTasks];
    }, [transpileTasks, compileTasks]);

    return (
        <>
            {!hasChanged && <CheckList items={tasks} onFinish={handleFinish} />}
            {isWatching && !hasChangedMessage && (
                <StatusMessage variant="info">
                    Watching for changes...
                </StatusMessage>
            )}
            {hasChangedMessage && (
                <StatusMessage variant="info">Change detected</StatusMessage>
            )}
        </>
    );
};
