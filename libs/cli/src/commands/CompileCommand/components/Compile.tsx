import process from 'node:process';
import React from 'react';
import { getPdcPathFromEnvironment } from '@/cli/commands/CompileCommand/fn/getPdcPathFromEnvironment.js';
import { useCompileTasks } from '@/cli/commands/CompileCommand/hooks/useCompileTasks.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { Environment } from '@/cli/environment/dto/Environment.js';

interface Props {
    environment: Environment;
}

export const Compile = ({ environment }: Props) => {
    const items = useCompileTasks(getPdcPathFromEnvironment(environment));

    return <CheckList items={items} onFinish={process.exit} />;
};
