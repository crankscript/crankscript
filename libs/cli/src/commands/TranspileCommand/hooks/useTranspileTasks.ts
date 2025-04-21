import { useMemo } from 'react';
import { getErrorMessage } from '@/cli/commands/TranspileCommand/fn/getErrorMessage.js';
import { transpile } from '@/cli/commands/TranspileCommand/fn/transpile.js';
import { ValidatedEntryPoint } from '@/cli/commands/TranspileCommand/model/ValidatedEntryPoint.js';
import { ValidatedExitPoint } from '@/cli/commands/TranspileCommand/model/ValidatedExitPoint.js';
import { CheckListItem } from '@/cli/types.js';

export const useTranspileTasks = ({
    entryPoint,
    exitPoint,
}: {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
}) => {
    return useMemo(
        () => [
            {
                waitingDescription: 'Waiting to transpile code...',
                errorDescription: 'Could not transpile code',
                runningDescription: 'Transpiling code...',
                finishedDescription: () => 'Code transpiled',
                runner: async () => {
                    const result = transpile({
                        entryPoint,
                        exitPoint,
                    });

                    if (result.diagnostics.length > 0) {
                        const errors = getErrorMessage(result.diagnostics);

                        throw new Error(
                            `${
                                result.diagnostics.length === 1
                                    ? 'An error'
                                    : 'Errors'
                            } occurred while transpiling the code:\n${errors}`,
                        );
                    }
                },
                ready: true,
                quitOnError: false,
            },
        ],
        [],
    ) as CheckListItem<unknown>[];
};
