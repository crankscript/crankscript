import React, { useEffect, useState } from 'react';
import { Text, useInput } from 'ink';

interface Props {
    version: string;
}

export const GenerateTypes = ({ version }: Props) => {
    return <Text>{version}</Text>;
};
