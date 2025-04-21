import React from 'react';
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import { ValidatedEntryPoint } from '@/cli/commands/TranspileCommand/model/ValidatedEntryPoint.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';

interface Props {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
    toybox?: string;
}

export const Transpile = ({ entryPoint, exitPoint, toybox }: Props) => {
    const items = useTranspileTasks({
        entryPoint,
        exitPoint,
        toybox,
    });

    return <CheckList items={items} onFinish={() => process.exit} />;
};
