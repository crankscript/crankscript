import { EnvironmentError } from '../../error/EnvironmentError.js';

export class ConfigurationFileNotFoundError extends EnvironmentError {
    public constructor() {
        super('Configuration file not found');
    }
}
