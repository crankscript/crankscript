import { createHash } from 'crypto';
import { tmpdir } from 'os';
import { join } from 'path';

export const createTemporaryFolderPathFromEntryFile = (
    entryFilePath: string,
) => {
    const hash = createHash('sha256')
        .update(entryFilePath)
        .digest('hex')
        .slice(0, 8);

    return join(tmpdir(), 'crankscript', `run-${hash}`);
};
