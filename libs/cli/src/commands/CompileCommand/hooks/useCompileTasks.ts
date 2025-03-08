import { existsSync } from 'node:fs';
import { useMemo } from 'react';
import { compile } from '@/cli/commands/CompileCommand/hooks/task/compile.js';
import { CheckListItem } from '@/cli/types.js';

export const useCompileTasks = (pdcPath: string) => {
    return useMemo(
        () => [
            {
                waitingDescription: 'Waiting to check for pdc binary...',
                errorDescription: 'Could not find pdc binary',
                runningDescription: 'Checking for pdc binary...',
                finishedDescription: (result) =>
                    `Found pdc binary at "${result}"`,
                runner: async () => {
                    if (!existsSync(pdcPath)) {
                        throw new Error('Could not find pdc binary');
                    }

                    return pdcPath;
                },
                ready: true,
            } satisfies CheckListItem<string>,
            {
                waitingDescription: 'Waiting for pdc binary path...',
                errorDescription: 'Could not compile lua code',
                runningDescription: 'Compiling lua code...',
                finishedDescription: () => 'Lua code compiled',
                runner: async () => {
                    await compile({ pdcPath, target: process.cwd() });
                },
                ready: true,
            },
        ],
        []
    ) as CheckListItem<unknown>[];
};
