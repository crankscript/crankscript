import { writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { useMemo } from 'react';
import { getErrorMessage } from '@/cli/commands/TranspileCommand/fn/getErrorMessage.js';
import { transpile } from '@/cli/commands/TranspileCommand/fn/transpile.js';
import type { ValidatedEntryPoint } from '@/cli/commands/TranspileCommand/model/ValidatedEntryPoint.js';
import type { ValidatedExitPoint } from '@/cli/commands/TranspileCommand/model/ValidatedExitPoint.js';
import type { CheckListItem } from '@/cli/types.js';
import type { TranspileMode } from '../types.js';

const getToyboxTemplate = (
    namespace: string,
    entryPoint: string,
) => `${namespace} = ${namespace} or {}
local ____exports = import("${entryPoint}")
for k, v in pairs(____exports) do
  ${namespace}[k] = v
end
`;

export const useTranspileTasks = ({
    entryPoint,
    exitPoint,
    toybox,
    transpileMode,
    library,
}: {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
    toybox?: string;
    transpileMode?: TranspileMode;
    library?: boolean;
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
                        transpileMode,
                        library,
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
            ...(toybox
                ? [
                      {
                          waitingDescription:
                              'Waiting to create toybox import file...',
                          errorDescription:
                              'Could not create toybox import file',
                          runningDescription: 'Creating toybox import file...',
                          finishedDescription: () =>
                              'Toybox import file created',
                          runner: async () => {
                              const template = getToyboxTemplate(
                                  toybox,
                                  basename(exitPoint.exitPath),
                              );

                              writeFileSync(
                                  join(
                                      dirname(exitPoint.exitPath),
                                      'import.lua',
                                  ),
                                  template,
                              );
                          },
                      },
                  ]
                : []),
        ],
        [entryPoint, exitPoint, toybox, transpileMode, library],
    ) as CheckListItem<unknown>[];
};
