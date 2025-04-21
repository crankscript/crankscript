import { existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';

export const validateExitPoint = (input: {
    projectPath: string;
    exitFile: string;
}): ValidatedExitPoint => {
    const resolvedPath = resolve(input.projectPath);
    const resolvedExit = resolve(input.exitFile);
    const exitDir = dirname(resolvedExit);

    if (!existsSync(resolvedPath) || !statSync(resolvedPath).isDirectory()) {
        throw new Error(`"${resolvedPath}" is not a valid project path`);
    }

    if (!existsSync(exitDir)) {
        // Will be created
    } else if (!statSync(exitDir).isDirectory()) {
        throw new Error(`"${exitDir}" exists but is not a directory`);
    }

    // Check if the parent directory is inside the project path
    if (!exitDir.startsWith(resolvedPath)) {
        throw new Error(`Exit path must be inside project path`);
    }

    return {
        __validated: true,
        projectPath: resolvedPath,
        exitPath: resolvedExit,
    } satisfies ValidatedExitPoint;
};
