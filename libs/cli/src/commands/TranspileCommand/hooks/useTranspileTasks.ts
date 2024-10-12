import { useMemo } from 'react';
import { transpile } from '@/cli/commands/TranspileCommand/fn/transpile.js';
import { CheckListItem } from '@/cli/types.js';

export const useTranspileTasks = (path: string) => {
    return useMemo(
        () => [
            {
                waitingDescription: 'Waiting to transpile code...',
                errorDescription: 'Could not transpile code',
                runningDescription: 'Transpiling code...',
                finishedDescription: () => 'Code transpiled',
                runner: async () => {
                    transpile(path);
                },
                ready: true,
            },
        ],
        []
    ) as CheckListItem<unknown>[];
};
