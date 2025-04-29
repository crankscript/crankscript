import { join } from 'path';
import { StatusMessage } from '@inkjs/ui';
import React from 'react';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { createTemporaryFolderPathFromEntryFile } from '../fn/createTemporaryFolderPathFromEntryFile.js';
import { useSimulatorTasks } from '../hooks/useSimulatorTasks.js';

interface Props {
    environment: Environment;
    path: string;
    watch?: boolean;
    recompileOnly?: boolean;
    background?: boolean;
    entryFile?: string;
    additionalGlobs?: string[];
}

export const Simulator = ({
    environment,
    path,
    watch = false,
    recompileOnly = false,
    background = false,
    entryFile,
    additionalGlobs = [],
}: Props) => {
    const temporaryFolder = entryFile
        ? createTemporaryFolderPathFromEntryFile(entryFile)
        : undefined;
    const gameOutputPath = entryFile ? temporaryFolder : undefined;
    const luaOutputPath = entryFile
        ? temporaryFolder
            ? join(temporaryFolder, 'Source')
            : undefined
        : undefined;
    const projectPath = entryFile && temporaryFolder ? temporaryFolder : path;

    const {
        tasks,
        handleFinish,
        isWatching,
        hasChangedMessage,
        hasFailure,
        hasChanged,
    } = useSimulatorTasks({
        environment,
        path: projectPath,
        watchForChanges: watch,
        recompileOnly,
        background,
        entryFile,
        gameOutputPath,
        luaOutputPath,
        requireWithinProjectPath: !entryFile,
        additionalGlobs,
    });

    return (
        <>
            {!hasChanged && <CheckList items={tasks} onFinish={handleFinish} />}
            {isWatching && !hasChangedMessage && (
                <>
                    {hasFailure && (
                        <StatusMessage variant="warning">
                            Some steps failed.
                        </StatusMessage>
                    )}
                    <StatusMessage variant="info">
                        Watching for changes...
                    </StatusMessage>
                </>
            )}
            {hasChangedMessage && (
                <StatusMessage variant="info">Change detected</StatusMessage>
            )}
        </>
    );
};
