import { exec } from 'node:child_process';
import { join } from 'node:path';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

const hasStderr = (e: unknown): e is { stderr: string } => {
    return e !== null && typeof e === 'object' && 'stderr' in e;
};

export const compile = async ({
    pdcPath,
    target = '',
    sourceName,
    targetName,
    path = process.cwd(),
}: {
    pdcPath: string;
    target?: string;
    sourceName?: string;
    targetName?: string;
    path?: string;
}) => {
    const args = [
        join(path, target, sourceName ?? 'Source'),
        join(path, target, targetName ?? 'Game.pdx'),
    ];

    try {
        return execPromise(`${pdcPath} ${args.join(' ')}`);
    } catch (error) {
        if (hasStderr(error)) {
            throw new Error(`Lua compilation failed: ${error.stderr}`);
        }

        throw error;
    }
};
