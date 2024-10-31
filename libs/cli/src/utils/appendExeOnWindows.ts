import { isWindows } from '@/cli/utils/platform.js';

export const appendExeOnWindows = (binary: string) => {
    return isWindows ? `${binary}.exe` : binary;
};
