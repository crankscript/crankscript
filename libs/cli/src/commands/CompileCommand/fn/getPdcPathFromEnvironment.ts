import { join } from 'node:path';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { appendExeOnWindows } from '@/cli/utils/appendExeOnWindows.js';

export const getPdcPathFromEnvironment = (environment: Environment) => {
    return join(environment.sdkPath.path, 'bin', appendExeOnWindows('pdc'));
};
