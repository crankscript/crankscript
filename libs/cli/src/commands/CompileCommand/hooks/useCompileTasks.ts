import { existsSync } from 'node:fs';
import { join } from 'node:path';
import open from 'open';
import { useMemo } from 'react';
import { CheckListItem } from '@/cli/types.js';
import { isWindows } from '@/cli/utils/platform.js';

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
                    const currentDirectory = process.cwd();

                    await open('', {
                        app: {
                            name: pdcPath,
                            arguments: [
                                join(currentDirectory, 'Source'),
                                join(currentDirectory, 'Game.pdx'),
                            ],
                        },
                    });

                    if (isWindows) {
                        // Wait for pdc.exe to compile
                        // See https://github.com/sindresorhus/open/issues/298
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        );
                    }
                },
                ready: true,
            },
        ],
        []
    ) as CheckListItem<unknown>[];
};
