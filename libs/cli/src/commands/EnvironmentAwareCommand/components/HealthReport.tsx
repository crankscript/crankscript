import { StatusMessage, StatusMessageProps } from '@inkjs/ui';
import { Text, TextProps } from 'ink';
import React from 'react';
import { PlaydateSdkPath } from '@/cli/environment/path/dto/PlaydateSdkPath.js';
import {
    EnvironmentHealth,
    EnvironmentHealthResult,
    HealthCheckStatusType,
} from '@/cli/types.js';

interface Props {
    environment: EnvironmentHealthResult;
}

const SuccessMessages = {
    sdkPathKnown: {
        [HealthCheckStatusType.Unknown]: 'SDK path status unknown',
        [HealthCheckStatusType.Healthy]: (sdkPath: PlaydateSdkPath) =>
            `SDK path found ("${sdkPath.path}")`,
        [HealthCheckStatusType.Unhealthy]: 'SDK path not found',
    },
} as const;

const ColorMap = {
    [HealthCheckStatusType.Healthy]: 'green',
    [HealthCheckStatusType.Unhealthy]: 'red',
    [HealthCheckStatusType.Unknown]: 'gray',
} satisfies {
    [key in HealthCheckStatusType]: TextProps['color'];
};

export const HealthReport = ({ environment }: Props) => {
    const { health } = environment;
    return Object.keys(health).map((eachKey) => {
        const healthKey = eachKey as keyof EnvironmentHealth;
        const keyHealth = health[healthKey];

        let variant: StatusMessageProps['variant'] = 'info';
        let message: string =
            SuccessMessages[healthKey][HealthCheckStatusType.Unknown];

        if (
            health[healthKey].healthStatus === HealthCheckStatusType.Unhealthy
        ) {
            message =
                SuccessMessages[healthKey][HealthCheckStatusType.Unhealthy];
            variant = 'error';
        }

        if (health[healthKey].healthStatus === HealthCheckStatusType.Healthy) {
            message = SuccessMessages[healthKey][HealthCheckStatusType.Healthy](
                health[healthKey].argument
            );
            variant = 'success';
        }

        return (
            <StatusMessage key={healthKey} variant={variant}>
                <Text color={ColorMap[keyHealth.healthStatus]}>
                    {keyHealth.healthStatus ===
                        HealthCheckStatusType.Unhealthy && ' '}
                    {message}
                </Text>
            </StatusMessage>
        );
    });
};
