import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { ValidatedEntryPoint } from '../model/ValidatedEntryPoint.js';

export const validateEntryPoint = (input: {
    projectPath: string;
    entryFile: string;
}): ValidatedEntryPoint => {
    const resolvedPath = resolve(input.projectPath);
    const resolvedEntry = resolve(input.entryFile);

    if (!existsSync(resolvedPath) || !statSync(resolvedPath).isDirectory()) {
        throw new Error(`"${resolvedPath}" is not a valid project path`);
    }

    if (!existsSync(resolvedEntry) || !statSync(resolvedEntry).isFile()) {
        throw new Error(`"${resolvedEntry}" is not a valid entry file`);
    }

    if (!resolvedEntry.startsWith(resolvedPath)) {
        throw new Error(`Entry must be inside project path`);
    }

    return {
        __validated: true,
        projectPath: resolvedPath,
        entryFile: resolvedEntry,
    } satisfies ValidatedEntryPoint;
};
