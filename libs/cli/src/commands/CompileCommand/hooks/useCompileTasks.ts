import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { useMemo } from 'react';
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
                    return new Promise((resolve, reject) => {
                        const pdc = spawn(pdcPath, ['Source', 'Game.pdx']);

                        // Collect any standard output or errors
                        let stdout = '';
                        let stderr = '';

                        // Handle stdout (standard output)
                        pdc.stdout.on('data', (data) => {
                            stdout += data.toString();
                        });

                        // Handle stderr (standard error)
                        pdc.stderr.on('data', (data) => {
                            stderr += data.toString();
                        });

                        // Handle the process closing
                        pdc.on('close', (code) => {
                            if (code === 0) {
                                resolve(stdout); // Resolve the promise with the output
                            } else {
                                reject(
                                    new Error(
                                        `pdc exited with code ${code}: ${stderr}`
                                    )
                                );
                            }
                        });

                        // Handle any errors that occur while starting the process
                        pdc.on('error', (err) => {
                            reject(
                                new Error(
                                    `Failed to start pdc process: ${err.message}`
                                )
                            );
                        });
                    });
                },
                ready: true,
            },
        ],
        []
    ) as CheckListItem<unknown>[];
};
