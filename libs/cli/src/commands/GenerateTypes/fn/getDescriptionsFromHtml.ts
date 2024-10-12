import { load } from 'cheerio';
import { PlaydateSdkUrl } from '@/cli/commands/GenerateTypes/constants.js';
import { parseFunctionSignature } from '@/cli/commands/GenerateTypes/fn/parseFunctionSignature.js';
import { FunctionDescription, PropertyDescription } from '@/cli/types.js';

const extractFunctionCalls = (input: string) => {
    const functionCallRegex =
        /([a-zA-Z_]\w*(\.[a-zA-Z_]\w*)*(?::[a-zA-Z_]\w*)?)\s*(\([^)]*\))?/g;
    const matches: string[] = [];
    let match;

    while ((match = functionCallRegex.exec(input)) !== null) {
        matches.push(match[0].trim());
    }

    return matches;
};

const normalizeSignature = (signature: string) => {
    const closingParenIndex = signature.indexOf(')');
    return closingParenIndex !== -1
        ? signature.slice(0, closingParenIndex + 1)
        : signature;
};

export const getDescriptionsFromHtml = (html: string, version: string) => {
    const $ = load(html);

    const functionSignatures = $(
        '[id^="m-"], [id^="f-"], [id^="c-"], [id^="v-"]'
    ).toArray();
    const functions: FunctionDescription[] = [];
    const properties: PropertyDescription[] = [];
    const visitedSignatures: string[] = [];

    for (const element of functionSignatures) {
        const id = $(element).attr('id') ?? '';
        const isProperty = id.startsWith('v-');
        const isCallback = id.startsWith('c-');
        const titleText = $(element).find('> .title').text();

        if (
            titleText.indexOf('#') !== -1 ||
            /[a-zA-Z]\[/.test(titleText) ||
            /^-[a-zA-Z]/.test(titleText) ||
            /[+*/]/.test(titleText) ||
            titleText.indexOf(' - ') !== -1 ||
            titleText.indexOf(' .. ') !== -1
        ) {
            continue;
        }

        const titles = isProperty
            ? titleText.split('  ')
            : extractFunctionCalls(titleText);

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

        const baseDocs = id
            ? `${docsString}\n[Read more](${PlaydateSdkUrl}${version}#${id})`
            : docsString;

        for (const title of titles) {
            const signature = normalizeSignature(title);

            if (visitedSignatures.includes(signature)) {
                continue;
            }

            visitedSignatures.push(signature);

            if (isProperty) {
                properties.push({
                    name: title.split('.').slice(-1)[0],
                    namespaces: signature.split('.').slice(0, -1),
                    signature,
                    docs: baseDocs,
                });
            } else {
                try {
                    const description = parseFunctionSignature(signature);

                    const docs = description.hasSelf
                        ? baseDocs
                        : `${baseDocs}\n\n@noSelf`;

                    functions.push({
                        ...description,
                        isCallback,
                        docs,
                    });
                } catch (e) {
                    // Ignore
                }
            }
        }
    }

    return { functions, properties };
};
