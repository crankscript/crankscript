import React from 'react';
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import { ValidatedEntryPoint } from '@/cli/commands/TranspileCommand/model/ValidatedEntryPoint.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';

interface Props {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
}

export const Transpile = ({ entryPoint, exitPoint }: Props) => {
    const items = useTranspileTasks({
        entryPoint,
        exitPoint,
    });

    return <CheckList items={items} onFinish={() => process.exit} />;
};
