import { execSync } from 'node:child_process';
import { useMemo } from 'react';
import type { CheckListItem } from '@/cli/types.js';

export const useFormatTypeFile = (path: string) => {
    const formatTypeFile = useMemo(() => {
        // Check if biome is available
        const checkBiomeAvailability = () => {
            try {
                execSync('pnpm exec biome --version', { stdio: 'ignore' });
                return true;
            } catch (_error) {
                return false;
            }
        };

        const hasBiome = checkBiomeAvailability();

        return {
            waitingDescription: 'Waiting to format the type file...',
            errorDescription: 'Failed to format the type file',
            finishedDescription: () => 'Type file formatted',
            runningDescription: 'Formatting the type file...',
            runner: async () => {
                try {
                    if (hasBiome) {
                        // Format and lint the file using Biome
                        execSync(`pnpm exec biome format --write "${path}"`, {
                            stdio: 'ignore',
                        });

                        // Apply safe fixes using Biome linter
                        execSync(`pnpm exec biome lint --write "${path}"`, {
                            stdio: 'ignore',
                        });
                    }

                    return true;
                } catch (error) {
                    console.error('Error formatting file:', error);
                    return false;
                }
            },
            ready: true,
            skip: !hasBiome,
        } satisfies CheckListItem<boolean>;
    }, [path]);

    return {
        formatTypeFile,
    };
};
