import { useMemo, useState } from 'react';
import { getHtmlForVersion } from '@/cli/commands/GenerateTypes/fn/getHtmlForVersion.js';
import { CheckListItem } from '@/cli/types.js';

export const useFetchHtml = (version: string | null) => {
    const [html, setHtml] = useState<string | null>(null);

    const fetchHtml = useMemo(() => {
        return {
            waitingDescription: 'Waiting to fetch HTML contents',
            errorDescription: 'Failed to fetch HTML contents',
            finishedDescription: () => 'HTML contents fetched',
            runningDescription: 'Fetching HTML contents...',
            runner: async () => {
                if (!version) {
                    throw new Error('Version is not set');
                }

                return getHtmlForVersion(version);
            },
            onFinish: result => {
                setHtml(result === false ? null : result);
            },
            ready: version !== null,
        } satisfies CheckListItem<string>;
    }, [version]);

    return {
        html,
        fetchHtml,
    };
};
