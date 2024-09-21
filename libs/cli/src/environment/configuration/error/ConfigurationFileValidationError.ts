import { ConfigurationFileValidationErrorType } from '../../../types.js';
import { EnvironmentError } from '../../error/EnvironmentError.js';

export class ConfigurationFileValidationError extends EnvironmentError {
    public constructor(
        errorType: ConfigurationFileValidationErrorType,
        reason = 'Unknown reason'
    ) {
        super(`Configuration file is invalid (${errorType}): ${reason}`);
    }
}
