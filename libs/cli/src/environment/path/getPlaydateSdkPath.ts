import * as process from 'node:process';
import { PlaydateSdkPath } from './dto/PlaydateSdkPath.js';
import { PlaydateSdkPathVariableNotSetError } from './error/PlaydateSdkPathVariableNotSetError.js';

/**
 * Get the path to the Playdate SDK from the environment.
 *
 * @throws {PlaydateSdkPathVariableNotSetError} Thrown if the PLAYDATE_SDK_PATH environment variable is not set.
 */
export const getPlaydateSdkPath = (input: {
    /**
     * The environment to get the Playdate SDK path from.
     *
     * Defaults to `process.env`.
     */
    environment: Record<string, unknown>;
}) => {
    const { environment = process.env } = input;

    if (!('PLAYDATE_SDK_PATH' in environment)) {
        throw new PlaydateSdkPathVariableNotSetError();
    }

    return PlaydateSdkPath.fromString(
        environment['PLAYDATE_SDK_PATH'] as string,
    );
};
