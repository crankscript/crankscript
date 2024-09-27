import { playdateConstants } from '@/cli/commands/GenerateTypes/utils/playdateConstants.js';
import {
    ApiDefinitions,
    FunctionDescription,
    PlaydateNamespace,
    PlaydateType,
} from '@/cli/types.js';

export const getApiDefinitions = (functions: FunctionDescription[]) => {
    const namespaces: Record<string, PlaydateNamespace> = {};
    const types: Record<string, PlaydateType> = {};
    const realNamespaces = new Set<string>();
    const potentialNamespaces: Set<string> = new Set();

    functions.forEach((func) => {
        if (!func.hasSelf) {
            let currentNamespace = '';
            func.namespaces.forEach((ns) => {
                currentNamespace = currentNamespace
                    ? `${currentNamespace}.${ns}`
                    : ns;

                // Add to realNamespaces because there's a non-method function here
                realNamespaces.add(currentNamespace);
            });
        }
    });

    functions.forEach((func) => {
        if (func.hasSelf) {
            let currentNamespace = '';
            func.namespaces.forEach((ns) => {
                currentNamespace = currentNamespace
                    ? `${currentNamespace}.${ns}`
                    : ns;

                if (!realNamespaces.has(currentNamespace)) {
                    potentialNamespaces.add(currentNamespace);
                }
            });
        }
    });

    realNamespaces.forEach((ns) => {
        namespaces[ns] = {
            functions: [],
            callbacks: [],
        };
    });

    functions.forEach((func) => {
        const fullNamespacePath = func.namespaces.join('.');

        if (realNamespaces.has(fullNamespacePath)) {
            if (func.hasSelf) {
                namespaces[fullNamespacePath].callbacks.push(func);
            } else {
                namespaces[fullNamespacePath].functions.push(func);
            }
        } else if (potentialNamespaces.has(fullNamespacePath)) {
            if (!types[fullNamespacePath]) {
                types[fullNamespacePath] = { methods: [] };
            }
            types[fullNamespacePath].methods.push(func);
        }
    });

    return {
        namespaces,
        types,
        constants: playdateConstants,
    } satisfies ApiDefinitions;
};
