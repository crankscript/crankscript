import { useMemo, useState } from 'react';
import { getApiDefinitions } from '@/cli/commands/GenerateTypes/fn/getApiDefinitions.js';
import { getFunctionDescriptionsFromHtml } from '@/cli/commands/GenerateTypes/fn/getFunctionDescriptionsFromHtml.js';
import { CheckListItem, ApiDefinitions } from '@/cli/types.js';

export const useParseDocumentation = (html: string | null, version: string) => {
    const [result, setResult] = useState<ApiDefinitions | null>(null);

    const parseDocumentation = useMemo(() => {
        return {
            waitingDescription: 'Waiting to parse the documentation...',
            errorDescription: 'Failed to parse the documentation',
            finishedDescription: () => 'Documentation parsed',
            runningDescription: 'Parsing the documentation...',
            runner: async () => {
                if (!html) {
                    throw new Error('HTML is not set');
                }

                const functions = getFunctionDescriptionsFromHtml(
                    html,
                    version
                );

                return getApiDefinitions(functions);
            },
            onFinish: (result) => {
                setResult(result);
            },
            ready: html !== null,
        } satisfies CheckListItem<ApiDefinitions>;
    }, [html]);

    return {
        definitions: result,
        parseDocumentation,
    };
};
