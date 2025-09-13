import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import type { ValidatedEntryPoint } from '../model/ValidatedEntryPoint.js';

export const validateEntryPoint = ({
    projectPath,
    entryFile,
    requireWithinProjectPath = true,
}: {
    projectPath: string;
    entryFile: string;
    requireWithinProjectPath?: boolean;
}): ValidatedEntryPoint => {
    const resolvedPath = resolve(projectPath);
    const resolvedEntry = resolve(entryFile);
    const projectPathExists = existsSync(resolvedPath);
    const projectPathIsDirectory =
        projectPathExists && statSync(resolvedPath).isDirectory();
    const entryFileExists = existsSync(resolvedEntry);
    const entryFileIsFile = entryFileExists && statSync(resolvedEntry).isFile();

    if (!projectPathExists) {
        throw new Error(`Path "${resolvedPath}" does not exist`);
    }

    if (!projectPathIsDirectory) {
        throw new Error(`Path "${resolvedPath}" is not a directory`);
    }

    if (!entryFileExists) {
        throw new Error(`Path "${resolvedEntry}" does not exist`);
    }

    if (!entryFileIsFile) {
        throw new Error(`Path "${resolvedEntry}" is not a file`);
    }

    if (requireWithinProjectPath && !resolvedEntry.startsWith(resolvedPath)) {
        throw new Error(
            `Entry "${resolvedEntry}" must be inside project path "${resolvedPath}"`,
        );
    }

    return {
        __validated: true,
        projectPath: resolvedPath,
        entryFile: resolvedEntry,
    } satisfies ValidatedEntryPoint;
};
