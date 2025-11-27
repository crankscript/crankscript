import { join } from 'node:path';
import { StatusMessage } from '@inkjs/ui';
import React from 'react';
import { CheckList } from '@/cli/components/CheckList/index.js';
import type { Environment } from '@/cli/environment/dto/Environment.js';
import { createTemporaryFolderPathFromEntryFile } from '../fn/createTemporaryFolderPathFromEntryFile.js';
import { useSimulatorTasks } from '../hooks/useSimulatorTasks.js';

interface Props {
    environment: Environment;
    path: string;
    watch?: boolean;
    recompileOnly?: boolean;
    background?: boolean;
    isolatedFile?: string;
    additionalGlobs?: string[];
    watchEntryFileOnly?: boolean;
    entryPoint?: string;
    exitPointFilename?: string;
}

export const Simulator = ({
    environment,
    path,
    watch = false,
    recompileOnly = false,
    background = false,
    isolatedFile,
    additionalGlobs = [],
    watchEntryFileOnly = false,
    entryPoint,
    exitPointFilename,
}: Props) => {
    const temporaryFolder = isolatedFile
        ? createTemporaryFolderPathFromEntryFile(isolatedFile)
        : undefined;
    const gameOutputPath = isolatedFile ? '' : undefined;
    const luaOutputPath = isolatedFile
        ? temporaryFolder
            ? join(temporaryFolder)
            : undefined
        : undefined;
    const projectPath =
        isolatedFile && temporaryFolder ? temporaryFolder : path;

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
        entryFile: isolatedFile,
        gameOutputPath,
        luaOutputPath,
        requireWithinProjectPath: !isolatedFile,
        additionalGlobs,
        watchEntryFileOnly,
        entryPoint,
        exitPointFilename,
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
