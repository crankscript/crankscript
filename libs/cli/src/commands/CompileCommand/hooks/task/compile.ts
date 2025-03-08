import { exec } from 'child_process';
import { join } from 'node:path';
import { promisify } from 'util';

const execPromise = promisify(exec);

const hasStderr = (e: unknown): e is { stderr: string } => {
    return e !== null && typeof e === 'object' && 'stderr' in e;
};

export const compile = async ({
    pdcPath,
    target,
}: {
    pdcPath: string;
    target: string;
}) => {
    const args = [join(target, 'Source'), join(target, 'Game.pdx')];

    try {
        return execPromise(`${pdcPath} ${args.join(' ')}`);
    } catch (error) {
        if (hasStderr(error)) {
            throw new Error(`Lua compilation failed: ${error.stderr}`);
        }

        throw error;
    }
};
