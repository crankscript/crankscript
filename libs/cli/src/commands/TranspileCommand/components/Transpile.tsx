import React from 'react';
import { useTranspileTasks } from '@/cli/commands/TranspileCommand/hooks/useTranspileTasks.js';
import { CheckList } from '@/cli/components/CheckList/index.js';

interface Props {
    path: string;
}

export const Transpile = ({ path }: Props) => {
    const items = useTranspileTasks(path);

    return <CheckList items={items} onFinish={process.exit} />;
};
