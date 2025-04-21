import React from 'react';
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import { ValidatedEntryPoint } from '@/cli/commands/TranspileCommand/model/ValidatedEntryPoint.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
interface Props {
    entryPoint: ValidatedEntryPoint;
}

export const Transpile = ({ entryPoint }: Props) => {
    const items = useTranspileTasks({
        entryPoint,
    });

    return <CheckList items={items} onFinish={() => process.exit} />;
};
