import { mkdirSync } from 'node:fs';
import React, { type ReactNode, useMemo, useState } from 'react';
import { CheckList } from '@/cli/components/CheckList/index.js';
import type { CheckListItem } from '@/cli/types.js';
import { useCrankScriptContext } from '../../EnvironmentAwareCommand/contexts/CrankScriptContext.js';
import { createTemporaryFolderPathFromEntryFile } from '../fn/createTemporaryFolderPathFromEntryFile.js';

interface Props {
    entryFile: string;
    children: ReactNode;
}

export const TemporaryFolderCreator = ({ entryFile, children }: Props) => {
    const [created, setCreated] = useState(false);
    const { verbose } = useCrankScriptContext();
    const temporaryFolder = useMemo(() => {
        return createTemporaryFolderPathFromEntryFile(entryFile);
    }, [entryFile]);

    const items = useMemo(() => {
        return [
            {
                waitingDescription: 'Waiting to create temporary directory...',
                runningDescription: 'Creating temporary directory...',
                errorDescription: 'Failed to create temporary directory',
                runner: async () => {
                    if (!temporaryFolder) {
                        return false;
                    }

                    mkdirSync(temporaryFolder, { recursive: true });

                    return true;
                },
                finishedDescription: () => {
                    return `Temporary directory ${
                        verbose ? `"${temporaryFolder}" ` : ''
                    }created`;
                },
            },
        ] satisfies CheckListItem<unknown>[];
    }, [temporaryFolder, verbose]);

    return (
        <>
            <CheckList items={items} onFinish={() => setCreated(true)} />
            {created && children}
        </>
    );
};
