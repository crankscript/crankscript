import { join } from 'node:path';
import { CrankscriptConfigurationFileName } from '../../constants.js';
import * as process from 'node:process';
import { ConfigurationFileNotFoundError } from './error/ConfigurationFileNotFoundError.js';
import { readFileSync } from 'fs';
import { ConfigurationSchema } from './ConfigurationSchema.js';
import { ConfigurationFileValidationError } from './error/ConfigurationFileValidationError.js';
import { ConfigurationFileValidationErrorType } from '../../types.js';
import { Configuration } from './dto/Configuration.js';

export const getConfiguration = (input?: {
    workingDirectory: string;
}): Configuration => {
    const { workingDirectory = process.cwd() } = input ?? {};
    const configurationFilePath = join(
        workingDirectory,
        CrankscriptConfigurationFileName
    );
    let contents = '';
    let parsedObject: object;

    try {
        contents = readFileSync(configurationFilePath, 'utf8');
    } catch (error) {
        throw new ConfigurationFileNotFoundError();
    }

    try {
        parsedObject = JSON.parse(contents);
    } catch (error) {
        const errorIsObject = !!error && typeof error === 'object';

        throw new ConfigurationFileValidationError(
            ConfigurationFileValidationErrorType.InvalidJson,
            !!error &&
            typeof error === 'object' &&
            'message' in error &&
            typeof error.message === 'string'
                ? error.message
                : 'Error parsing JSON'
        );
    }

    const validation = ConfigurationSchema.safeParse(parsedObject);

    if (!validation.success) {
        throw new ConfigurationFileValidationError(
            ConfigurationFileValidationErrorType.InvalidSchema,
            validation.error.errors.join(', ')
        );
    }

    return validation.data;
};
