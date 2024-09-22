import { Environment } from '@/cli/environment/dto/Environment.js';

export enum PlaydateSdkVersionIdentifier {
    FromConfig = 'FromConfig',
    Latest = 'latest',
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

export type CheckListItem<TResult> = {
    runningDescription: string;
    waitingDescription: string;
    errorDescription: string;
    finishedDescription: (result: TResult) => string;
    runner: () => Promise<TResult> | Promise<false>;
    onFinish?: (result: TResult) => void;
    ready?: boolean;
};
