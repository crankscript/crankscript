import { exec } from 'node:child_process';
import { join } from 'node:path';
import { promisify } from 'node:util';
import React, { useMemo } from 'react';
import tiged from 'tiged';
import { CheckList } from '@/cli/components/CheckList/index.js';
import type { CheckListItem, TemplateName } from '@/cli/types.js';

const execPromise = promisify(exec);

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
            {
                ready: true,
                runner: async () => {
                    const projectPath = join(process.cwd(), name);

                    await execPromise(`npm install`, {
                        cwd: projectPath,
                    });

                    await execPromise(
                        `npm install --save-exact @crankscript/core@latest @crankscript/types@latest crankscript@latest`,
                        {
                            cwd: projectPath,
                        },
                    );
                },
                waitingDescription: `About to install dependencies for "${name}"`,
                runningDescription: `Installing dependencies for "${name}"`,
                finishedDescription: () =>
                    `Installed dependencies for "${name}"`,
                errorDescription: `Failed to install dependencies for "${name}"`,
            },
        ];
    }, [name, template]) satisfies CheckListItem<unknown>[];

    return <CheckList items={items} onFinish={() => process.exit()} />;
};
