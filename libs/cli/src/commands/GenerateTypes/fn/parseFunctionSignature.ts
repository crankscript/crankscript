import { FunctionDescription } from '@/cli/types.js';

export const parseFunctionSignature = (signature: string) => {
    if (!signature.includes('(')) {
        throw new Error('Invalid signature');
    }

    const [fullyQualifiedName, paramString] = signature.split('(');
    const hasSelf = fullyQualifiedName.includes(':');
    const normalizedFullyQualifiedName = fullyQualifiedName.replace(':', '.');
    const segments = normalizedFullyQualifiedName.split('.');
    const functionName = segments[segments.length - 1];
    const namespaces = segments.slice(0, -1);
    const params = paramString.split(')')[0].split(',').filter(Boolean);

    return {
        name: functionName,
        namespaces,
        parameters: params.map((eachParam) => ({
            name: eachParam.replace(/\[/g, '').replace(/\]/g, '').trim(),
            type: 'unknown',
            required: !eachParam.includes('['),
        })),
        hasSelf,
    } satisfies Omit<FunctionDescription, 'docs'>;
};
