import React, { useMemo } from 'react';
import { useFetchHtml } from '@/cli/commands/GenerateTypes/hooks/useFetchHtml.js';
import { useFormatTypeFile } from '@/cli/commands/GenerateTypes/hooks/useFormatTypeFile.js';
import { useGenerateTypeFile } from '@/cli/commands/GenerateTypes/hooks/useGenerateTypeFile.js';
import { useGetVersion } from '@/cli/commands/GenerateTypes/hooks/useGetVersion.js';
import { useParseDocumentation } from '@/cli/commands/GenerateTypes/hooks/useParseDocumentation.js';
import { CheckList } from '@/cli/components/CheckList/index.js';
import { CheckListItem, PlaydateSdkVersion } from '@/cli/types.js';

interface Props {
    output: string;
    version: PlaydateSdkVersion;
    overwriteJson: boolean;
}

export const GenerateTypes = ({ output, version, overwriteJson }: Props) => {
    const { typeProvider, fetchedVersion, getVersion } = useGetVersion(version);
    const { html, fetchHtml } = useFetchHtml(fetchedVersion);
    const { definitions, parseDocumentation } = useParseDocumentation(
        html,
        version,
    );
    const { generateTypeFile } = useGenerateTypeFile(
        output,
        definitions,
        typeProvider,
    );
    const { formatTypeFile } = useFormatTypeFile(output);

    const items = useMemo(() => {
        return [
            getVersion,
            fetchHtml,
            parseDocumentation,
            generateTypeFile,
            formatTypeFile,
        ] as CheckListItem<unknown>[];
    }, [fetchedVersion, html, definitions, typeProvider, formatTypeFile]);

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
