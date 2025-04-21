import { FunctionDescription } from '@/cli/types.js';

export const parseFunctionSignature = (signature: string) => {
    const normalizedSignature = signature.includes('(')
        ? signature
        : signature + '()';

    const [fullyQualifiedName, paramString] = normalizedSignature.split('(');
    const hasSelf = fullyQualifiedName.includes(':');
    const normalizedFullyQualifiedName = fullyQualifiedName.replace(':', '.');
    const segments = normalizedFullyQualifiedName.split('.');
    const functionName = segments[segments.length - 1];
    const namespaces = segments.slice(0, -1);
    const params = paramString.split(')')[0].split(',').filter(Boolean);

    // Find if there's any optional parameter
    const firstOptionalIndex = params.findIndex(
        param => param.includes('[') || param.includes(']'),
    );

    return {
        signature,
        name: functionName,
        namespaces,
        parameters: params.map((eachParam, index) => ({
            name: eachParam.replace(/\[/g, '').replace(/]/g, '').trim(),
            // Parameter is not required if it has brackets or comes after an optional parameter
            required:
                firstOptionalIndex === -1
                    ? !eachParam.includes('[') && !eachParam.includes(']')
                    : index < firstOptionalIndex,
        })),
        hasSelf,
    } satisfies Omit<FunctionDescription, 'docs'>;
};
