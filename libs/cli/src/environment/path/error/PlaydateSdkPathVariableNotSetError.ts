import { EnvironmentError } from '../../error/EnvironmentError.js';

export class PlaydateSdkPathVariableNotSetError extends EnvironmentError {
    constructor() {
        super('Playdate SDK path variable not set.');
    }
}
