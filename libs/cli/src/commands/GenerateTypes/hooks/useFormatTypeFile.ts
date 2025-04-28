import { execSync } from 'node:child_process';
import { useMemo } from 'react';
import { CheckListItem } from '@/cli/types.js';

export const useFormatTypeFile = (path: string) => {
    const formatTypeFile = useMemo(() => {
        // Check if prettier and eslint are available
        const checkToolsAvailability = () => {
            let hasPrettier = false;
            let hasEslint = false;

            try {
                // Check if prettier is available
                execSync('pnpm exec prettier --version', { stdio: 'ignore' });
                hasPrettier = true;
            } catch (error) {
                // Prettier not available
            }

            try {
                // Check if eslint is available
                execSync('pnpm exec eslint --version', { stdio: 'ignore' });
                hasEslint = true;
            } catch (error) {
                // ESLint not available
            }

            return { hasPrettier, hasEslint };
        };

        const { hasPrettier, hasEslint } = checkToolsAvailability();

        return {
            waitingDescription: 'Waiting to format the type file...',
            errorDescription: 'Failed to format the type file',
            finishedDescription: () => 'Type file formatted',
            runningDescription: 'Formatting the type file...',
            runner: async () => {
                try {
                    // Run prettier on the generated file if available
                    if (hasPrettier) {
                        execSync(`pnpm exec prettier --write "${path}"`, {
                            stdio: 'ignore',
                        });
                    }

                    // Run eslint if available
                    if (hasEslint) {
                        execSync(`pnpm exec eslint --fix "${path}"`, {
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
            // Skip only if both tools are unavailable
            skip: !hasPrettier && !hasEslint,
        } satisfies CheckListItem<boolean>;
    }, [path]);

    return {
        formatTypeFile,
    };
};
