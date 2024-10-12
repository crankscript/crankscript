import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import { useMemo } from 'react';
import { CheckListItem } from '@/cli/types.js';

const promisifiedExec = promisify(exec);

export const useCompileTasks = (sdkPath: string) => {
    return useMemo(
        () => [
            {
                waitingDescription: 'Waiting to check for pdc binary...',
                errorDescription: 'Could not find pdc binary',
                runningDescription: 'Checking for pdc binary...',
                finishedDescription: (result) =>
                    `Found pdc binary at "${result}"`,
                runner: async () => {
                    if (!existsSync(sdkPath)) {
                        throw new Error('Could not find pdc binary');
                    }

                    return sdkPath;
                },
                ready: true,
            } satisfies CheckListItem<string>,
            {
                waitingDescription: 'Waiting for pdc binary path...',
                errorDescription: 'Could not compile lua code',
                runningDescription: 'Compiling lua code...',
                finishedDescription: () => 'Lua code compiled',
                runner: async () => {
                    return promisifiedExec(`${sdkPath} Source`);
                },
                ready: true,
            },
        ],
        []
    ) as CheckListItem<unknown>[];
};
