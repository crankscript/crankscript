import { useCallback, useMemo, useState } from 'react';
import { PlaydateSdkUrl } from '@/cli/commands/GenerateTypes/constants.js';
import { createTypeProvider } from '@/cli/commands/GenerateTypes/utils/createTypeProvider.js';
import {
    CheckListItem,
    PlaydateSdkVersion,
    PlaydateSdkVersionIdentifier,
} from '@/cli/types.js';

export const useGetVersion = (version: PlaydateSdkVersion) => {
    const [typeProvider, setTypeProvider] = useState<ReturnType<
        typeof createTypeProvider
    > | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const fetchLastVersion = useCallback(async () => {
        const response = await fetch(PlaydateSdkUrl);
        const url = response.url;

        const regex = /https:\/\/sdk.play.date\/([0-9]+\.[0-9]+\.[0-9]+)\//;
        const match = url.match(regex);

        if (!match || match.length < 2) {
            throw new Error('Could not find version in URL');
        }

        return match[1];
    }, []);
    const validateVersion = useCallback(async (version: string) => {
        const response = await fetch(`https://sdk.play.date/${version}/`);

        if (!response.ok) {
            throw new Error(`Failed to fetch version ${version}`);
        }

        return true;
    }, []);

    const getVersion = useMemo(() => {
        return {
            waitingDescription: `Waiting to fetch version`,
            runningDescription: 'Fetching version...',
            errorDescription: 'Failed to fetch version',
            finishedDescription: result => `Fetched version ${result}`,
            runner: async () => {
                let versionLiteral = version;

                if (version === PlaydateSdkVersionIdentifier.Latest) {
                    versionLiteral = await fetchLastVersion();
                }

                await validateVersion(versionLiteral);

                setTypeProvider(createTypeProvider(versionLiteral));

                return versionLiteral;
            },
            onFinish: result => {
                setResult(result);
            },
        } satisfies CheckListItem<string>;
    }, []);

    return {
        fetchedVersion: result,
        getVersion,
        typeProvider,
    };
};
