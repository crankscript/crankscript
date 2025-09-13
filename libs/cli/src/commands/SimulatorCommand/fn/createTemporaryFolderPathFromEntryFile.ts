import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const createTemporaryFolderPathFromEntryFile = (
    entryFilePath: string,
) => {
    const hash = createHash('sha256')
        .update(entryFilePath)
        .digest('hex')
        .slice(0, 8);

    return join(tmpdir(), 'crankscript', `run-${hash}`);
};
