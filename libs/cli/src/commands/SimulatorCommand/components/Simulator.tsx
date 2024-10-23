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
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';

interface Props {
    environment: Environment;
    path: string;
    watch?: boolean;
    background?: boolean;
}

export const Simulator = ({
    environment,
    path,
    watch = false,
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

    useEffect(() => {
        if (hasChanged) {
            setHasChanged(false);
        }
    }, [hasChanged, setHasChanged]);

    const handleFinish = useCallback(() => {
        open('Game.pdx', {
            background,
        }).then(() => {
            if (!watch) {
                process.exit();
            }

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
