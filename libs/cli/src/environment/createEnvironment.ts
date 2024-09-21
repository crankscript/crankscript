import { EnvironmentHealthResult, HealthCheckStatus } from '../types.js';
import { Configuration } from './configuration/dto/Configuration.js';
import { ConfigurationFileNotFoundError } from './configuration/error/ConfigurationFileNotFoundError.js';
import { ConfigurationFileValidationError } from './configuration/error/ConfigurationFileValidationError.js';
import { getConfiguration } from './configuration/getConfiguration.js';
import { Environment } from './dto/Environment.js';
import { PlaydateSdkPath } from './path/dto/PlaydateSdkPath.js';
import { getPlaydateSdkPath } from './path/getPlaydateSdkPath.js';

/**
 * Will create a configuration object from the environment.
 */
export const createEnvironment = (input?: {
    /**
     * The environment to create the configuration from.
     *
     * Defaults to `process.env`.
     */
    environment: Record<string, unknown>;
}): EnvironmentHealthResult => {
    const { environment = process.env } = input ?? {};
    let configuration: Configuration;
    let sdkPath: PlaydateSdkPath;

    try {
        configuration = getConfiguration();
    } catch (error) {
        return {
            isHealthy: false,
            health: {
                configurationFilePresent:
                    error instanceof ConfigurationFileNotFoundError
                        ? HealthCheckStatus.Unhealthy
                        : HealthCheckStatus.Healthy,
                configurationFileValid:
                    error instanceof ConfigurationFileValidationError
                        ? HealthCheckStatus.Unhealthy
                        : HealthCheckStatus.Healthy,
                sdkPathKnown: HealthCheckStatus.Unknown,
            },
        };
    }

    try {
        sdkPath = getPlaydateSdkPath({ environment });
    } catch (error) {
        return {
            isHealthy: false,
            health: {
                configurationFilePresent: HealthCheckStatus.Healthy,
                configurationFileValid: HealthCheckStatus.Healthy,
                sdkPathKnown: HealthCheckStatus.Unhealthy,
            },
        };
    }

    return {
        isHealthy: true,
        environment: new Environment({
            configuration,
            sdkPath,
        }),
        health: {
            configurationFilePresent: HealthCheckStatus.Healthy,
            configurationFileValid: HealthCheckStatus.Healthy,
            sdkPathKnown: HealthCheckStatus.Healthy,
        },
    };
};
