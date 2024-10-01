import React, { useMemo } from 'react';
import { useFetchHtml } from '@/cli/commands/GenerateTypes/hooks/useFetchHtml.js';
import { useGenerateTypeFile } from '@/cli/commands/GenerateTypes/hooks/useGenerateTypeFile.js';
import { useGetVersion } from '@/cli/commands/GenerateTypes/hooks/useGetVersion.js';
import { useParseDocumentation } from '@/cli/commands/GenerateTypes/hooks/useParseDocumentation.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { useQuitOnCtrlC } from '@/cli/hooks/useQuitOnCtrlC.js';
import { CheckListItem, PlaydateSdkVersion } from '@/cli/types.js';

interface Props {
    output: string;
    version: PlaydateSdkVersion;
    overwriteJson: boolean;
}

export const GenerateTypes = ({ output, version, overwriteJson }: Props) => {
    useQuitOnCtrlC();

    const { typeProvider, fetchedVersion, getVersion } = useGetVersion(version);
    const { html, fetchHtml } = useFetchHtml(fetchedVersion);
    const { definitions, parseDocumentation } = useParseDocumentation(
        html,
        version
    );
    const { generateTypeFile } = useGenerateTypeFile(
        output,
        definitions,
        typeProvider
    );

    const items = useMemo(() => {
        return [
            getVersion,
            fetchHtml,
            parseDocumentation,
            generateTypeFile,
        ] as CheckListItem<unknown>[];
    }, [fetchedVersion, html, definitions, typeProvider]);

    return (
        <CheckList
            items={items}
            onFinish={() => {
                if (overwriteJson) {
                    typeProvider?.save();
                }

                process.exit();
            }}
        />
    );
};
