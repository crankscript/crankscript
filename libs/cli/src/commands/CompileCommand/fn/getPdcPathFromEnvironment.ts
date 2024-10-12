import { join } from 'node:path';
import { Environment } from '@/cli/environment/dto/Environment.js';

export const getPdcPathFromEnvironment = (environment: Environment) => {
    return join(environment.sdkPath.path, 'bin', 'pdc');
};
