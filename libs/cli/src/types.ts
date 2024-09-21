import { Environment } from '@/cli/environment/dto/Environment.js';

export enum PlaydateSdkVersionIdentifier {
    FromConfig = 'FromConfig',
}

export type EnvironmentHealthResult =
    | {
          isHealthy: true;
          environment: Environment;
          health: EnvironmentHealth;
      }
    | {
          isHealthy: false;
          health: EnvironmentHealth;
      };

export enum HealthCheckStatus {
    Healthy = 'Healthy',
    Unhealthy = 'Unhealthy',
    Unknown = 'Unknown',
}

export interface EnvironmentHealth {
    configurationFilePresent: HealthCheckStatus;
    configurationFileValid: HealthCheckStatus;
    sdkPathKnown: HealthCheckStatus;
}

export enum ConfigurationFileValidationErrorType {
    InvalidJson = 'InvalidJson',
    InvalidSchema = 'InvalidSchema',
}
