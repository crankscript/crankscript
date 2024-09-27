import { load } from 'cheerio';
import { PlaydateSdkUrl } from '@/cli/commands/GenerateTypes/constants.js';
import { parseFunctionSignature } from '@/cli/commands/GenerateTypes/fn/parseFunctionSignature.js';
import { FunctionDescription } from '@/cli/types.js';

export const getFunctionDescriptionsFromHtml = (
    html: string,
    version: string
) => {
    const $ = load(html);

    const allSignatures = $('[id^="m-"], [id^="f-"], [id^="c-"]').toArray();
    const result: FunctionDescription[] = [];

    for (const element of allSignatures) {
        const id = $(element).attr('id') ?? '';
        const titles = ($(element).find('.title').text() ?? '').split('  ');
        let docsString = ($(element).find('.content').html() ?? '').trim();

        if (docsString.startsWith('<div class="paragraph">')) {
            docsString = docsString.slice('<div class="paragraph">'.length);
        }

        if (docsString.endsWith('</div>')) {
            docsString = docsString.slice(
                0,
                docsString.length - '</div>'.length
            );
        }

        docsString = docsString.replace(
            /<a href="#/g,
            '<a href="' + PlaydateSdkUrl + version + '#'
        );

        const docs = id
            ? `${docsString}\n[Read more](${PlaydateSdkUrl}${version}#${id})`
            : docsString;

        for (const title of titles) {
            try {
                result.push({ ...parseFunctionSignature(title), docs });
            } catch (e) {
                // skip
            }
        }
    }

    return result;
};
