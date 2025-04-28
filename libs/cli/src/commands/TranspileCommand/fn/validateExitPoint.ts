import { existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';

export const validateExitPoint = ({
    projectPath,
    exitFile,
    requireWithinProjectPath = true,
}: {
    projectPath: string;
    exitFile: string;
    requireWithinProjectPath?: boolean;
}): ValidatedExitPoint => {
    const resolvedPath = resolve(projectPath);
    const resolvedExit = resolve(exitFile);
    const exitDir = dirname(resolvedExit);
    const projectPathExists = existsSync(resolvedPath);
    const projectPathIsDirectory =
        projectPathExists && statSync(resolvedPath).isDirectory();
    const exitDirExists = existsSync(exitDir);
    const exitDirIsDirectory = exitDirExists && statSync(exitDir).isDirectory();

    if (!projectPathExists) {
        throw new Error(`Path "${resolvedPath}" does not exist`);
    }

    if (!projectPathIsDirectory) {
        throw new Error(`Path "${resolvedPath}" is not a directory`);
    }

    if (!exitDirExists) {
        // Will be created
    } else if (!exitDirIsDirectory) {
        throw new Error(`Path "${exitDir}" exists but is not a directory`);
    }

    if (requireWithinProjectPath && !exitDir.startsWith(resolvedPath)) {
        throw new Error(`Exit path must be inside project path`);
    }

    return {
        __validated: true,
        projectPath: resolvedPath,
        exitPath: resolvedExit,
    } satisfies ValidatedExitPoint;
};
