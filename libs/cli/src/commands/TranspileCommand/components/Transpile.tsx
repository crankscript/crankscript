import React from 'react';
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import type { ValidatedEntryPoint } from '@/cli/commands/TranspileCommand/model/ValidatedEntryPoint.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import type { ValidatedExitPoint } from '../model/ValidatedExitPoint.js';

interface Props {
    entryPoint: ValidatedEntryPoint;
    exitPoint: ValidatedExitPoint;
    toybox?: string;
    library?: boolean;
}

export const Transpile = ({
    entryPoint,
    exitPoint,
    toybox,
    library,
}: Props) => {
    const items = useTranspileTasks({
        entryPoint,
        exitPoint,
        toybox,
        library,
    });

    return <CheckList items={items} onFinish={() => process.exit(0)} />;
};
