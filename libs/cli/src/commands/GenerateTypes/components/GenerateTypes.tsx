import React from 'react';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { ConfigurationType } from '@/cli/environment/configuration/ConfigurationSchema.js';
import { useQuitOnCtrlC } from '@/cli/hooks/useQuitOnCtrlC.js';

interface Props {
    version: ConfigurationType['version'];
}

export const GenerateTypes = ({ version }: Props) => {
    useQuitOnCtrlC();

    return (
        <CheckList
            items={[
                {
                    // Example
                    waitingDescription: () =>
                        `Generating types for version ${version}`,
                    runningDescription: () => 'Generating types...',
                    errorDescription: () => 'Failed to generate types',
                    finishedDescription: () => 'Types generated',
                    runner: async () => {
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        );
                    },
                    onFinish: () => {},
                },
            ]}
        />
    );
};
