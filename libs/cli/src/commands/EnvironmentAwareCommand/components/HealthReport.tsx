import React from 'react';
import { Text, TextProps } from 'ink';
import { StatusMessage, StatusMessageProps } from '@inkjs/ui';
import { EnvironmentHealth, HealthCheckStatus } from '../../../types.js';

interface Props {
    health: EnvironmentHealth;
}

const SuccessMessages = {
    configurationFilePresent: {
        [HealthCheckStatus.Unknown]: 'Configuration file status unknown',
        [HealthCheckStatus.Healthy]: 'Configuration file found',
        [HealthCheckStatus.Unhealthy]: 'Configuration file not found',
    },
    configurationFileValid: {
        [HealthCheckStatus.Unknown]: 'Configuration file validity unknown',
        [HealthCheckStatus.Healthy]: 'Configuration file is valid',
        [HealthCheckStatus.Unhealthy]: 'Configuration file is invalid',
    },
    sdkPathKnown: {
        [HealthCheckStatus.Unknown]: 'SDK path status unknown',
        [HealthCheckStatus.Healthy]: 'SDK path found',
        [HealthCheckStatus.Unhealthy]: 'SDK path not found',
    },
} satisfies {
    [key in keyof EnvironmentHealth]: {
        [HealthCheckStatus.Unknown]: string;
        [HealthCheckStatus.Healthy]: string;
        [HealthCheckStatus.Unhealthy]: string;
    };
};

const ColorMap = {
    [HealthCheckStatus.Healthy]: 'green',
    [HealthCheckStatus.Unhealthy]: 'red',
    [HealthCheckStatus.Unknown]: 'gray',
} satisfies {
    [key in HealthCheckStatus]: TextProps['color'];
};

export const HealthReport = ({ health }: Props) => {
    return Object.keys(health).map((eachKey) => {
        const healthKey = eachKey as keyof EnvironmentHealth;
        const keyHealth = health[healthKey];
        let variant: StatusMessageProps['variant'] = 'info';

        if (health[healthKey] === HealthCheckStatus.Unhealthy) {
            variant = 'error';
        }

        if (health[healthKey] === HealthCheckStatus.Healthy) {
            variant = 'success';
        }

        return (
            <StatusMessage key={healthKey} variant={variant}>
                <Text color={ColorMap[keyHealth]}>
                    {keyHealth === HealthCheckStatus.Unhealthy && ' '}
                    {SuccessMessages[healthKey][keyHealth]}
                </Text>
            </StatusMessage>
        );
    });
};
