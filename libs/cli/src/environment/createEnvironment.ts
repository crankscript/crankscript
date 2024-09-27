import { EnvironmentHealthResult, HealthCheckStatusType } from '../types.js';
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
    let sdkPath: PlaydateSdkPath;

    try {
        sdkPath = getPlaydateSdkPath({ environment });
    } catch (error) {
        return {
            isHealthy: false,
            health: {
                sdkPathKnown: { healthStatus: HealthCheckStatusType.Unhealthy },
            },
        };
    }

    return {
        isHealthy: true,
        environment: new Environment({
            sdkPath,
        }),
        health: {
            sdkPathKnown: {
                healthStatus: HealthCheckStatusType.Healthy,
                argument: sdkPath,
            },
        },
    };
};
