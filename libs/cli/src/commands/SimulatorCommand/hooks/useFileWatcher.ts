import { FSWatcher, watch } from 'chokidar';
import { useEffect, useRef } from 'react';

export const useFileWatcher = (options: {
    watchPath: string;
    additionalGlobs?: string[];
    onChange: () => void;
    enabled: boolean;
}) => {
    const watcher = useRef<FSWatcher | null>(null);
    const started = useRef(false);

    useEffect(() => {
        if (!options.enabled || started.current) {
            return;
        }

        watcher.current = watch(options.watchPath, {
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 200,
                pollInterval: 100,
            },
        });

        if (options.additionalGlobs) {
            watcher.current.add(options.additionalGlobs);
        }

        watcher.current.on('change', () => {
            options.onChange();
        });

        started.current = true;

        return () => {
            watcher.current?.close();
            watcher.current = null;
            started.current = false;
        };
    }, [options.enabled, options.watchPath, options.onChange]);
};
