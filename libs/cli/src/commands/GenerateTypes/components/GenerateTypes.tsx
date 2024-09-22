import React, { useMemo } from 'react';
import { useFetchHtml } from '@/cli/commands/GenerateTypes/hooks/useFetchHtml.js';
import { useGenerateTypeFile } from '@/cli/commands/GenerateTypes/hooks/useGenerateTypeFile.js';
import { useGetVersion } from '@/cli/commands/GenerateTypes/hooks/useGetVersion.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { ConfigurationType } from '@/cli/environment/configuration/ConfigurationSchema.js';
import { useQuitOnCtrlC } from '@/cli/hooks/useQuitOnCtrlC.js';
import { CheckListItem } from '@/cli/types.js';

interface Props {
    version: ConfigurationType['version'];
}

export const GenerateTypes = ({ version }: Props) => {
    useQuitOnCtrlC();

    const { fetchedVersion, getVersion } = useGetVersion(version);
    const { html, fetchHtml } = useFetchHtml(fetchedVersion);
    const { generateTypeFile } = useGenerateTypeFile(process.cwd(), html);

    const items = useMemo(() => {
        return [
            getVersion,
            fetchHtml,
            generateTypeFile,
        ] as CheckListItem<unknown>[];
    }, [fetchedVersion, html]);

    return <CheckList items={items} onFinish={process.exit} />;
};
