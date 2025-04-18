import React, { useMemo } from 'react';
import tiged from 'tiged';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { CheckListItem, TemplateName } from '@/cli/types.js';

interface Props {
    name: string;
    template: TemplateName;
}

export const New = ({ name, template }: Props) => {
    const items = useMemo(() => {
        return [
            {
                ready: true,
                runner: async () => {
                    const task = tiged(`crankscript/template-${template}`);

                    await task.clone(name);
                },
                waitingDescription: `About to create a new project named "${name}" using the "${template}" template`,
                runningDescription: `Creating a new project named "${name}" using the "${template}" template`,
                finishedDescription: () =>
                    `Created a new project named "${name}" using the "${template}" template`,
                errorDescription: `Failed to create project named "${name}" using the "${template}" template`,
            },
        ];
    }, []) satisfies CheckListItem<unknown>[];

    return <CheckList items={items} onFinish={() => process.exit} />;
};
