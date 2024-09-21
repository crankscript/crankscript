import { Text } from 'ink';
import React from 'react';

interface Props {
    version: string;
}

export const GenerateTypes = ({ version }: Props) => {
    return <Text>{version}</Text>;
};
