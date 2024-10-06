import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import React, { useMemo } from 'react';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { useQuitOnCtrlC } from '@/cli/hooks/useQuitOnCtrlC.js';
import { CheckListItem } from '@/cli/types.js';

interface Props {
    environment: Environment;
    watch?: boolean;
}

export const Compile = ({ environment, watch = false }: Props) => {
    useQuitOnCtrlC();

    const path = join(environment.sdkPath.path, 'bin', 'pdc');
    const items = useMemo(
        () => [
            {
                waitingDescription: 'Waiting to check for pdc binary...',
                errorDescription: 'Could not find pdc binary',
                runningDescription: 'Checking for pdc binary...',
                finishedDescription: (result) =>
                    `Found pdc binary at "${result}"`,
                runner: async () => {
                    if (!existsSync(path)) {
                        throw new Error('Could not find pdc binary');
                    }

                    return path;
                },
                ready: true,
            } satisfies CheckListItem<string>,
            {
                waitingDescription: 'Waiting for pdc binary path...',
                errorDescription: 'Could not compile lua code',
                runningDescription: 'Compiling lua code...',
                finishedDescription: () => 'Lua code compiled',
                runner: async () => {
                    exec(`${path} Source`);
                },
                ready: true,
            },
        ],
        []
    ) as CheckListItem<unknown>[];

    return <CheckList items={items} onFinish={process.exit} />;
};
