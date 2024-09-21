import React from 'react';
import { Text } from 'ink';

interface Props {
    version: string;
}

export const GenerateTypes = ({ version }: Props) => {
    return <Text>{version}</Text>;
};
