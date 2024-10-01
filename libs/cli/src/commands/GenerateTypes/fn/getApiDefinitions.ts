import {
    ApiDefinitions,
    FunctionDescription,
    PlaydateNamespace,
    PlaydateType,
    PropertyDescription,
} from '@/cli/types.js';

export const getApiDefinitions = (
    functions: FunctionDescription[],
    properties: PropertyDescription[]
) => {
    const namespaces: Record<string, PlaydateNamespace> = {};
    const types: Record<string, PlaydateType> = {};
    const realNamespaces = new Set<string>();
    const potentialNamespaces = new Set<string>();

    functions.forEach((func) => {
        if (!func.hasSelf) {
            let currentNamespace = '';
            func.namespaces.forEach((ns) => {
                currentNamespace = currentNamespace
                    ? `${currentNamespace}.${ns}`
                    : ns;

                const realNamespaceName = currentNamespace.trim();

                if (!realNamespaces.has(realNamespaceName)) {
                    realNamespaces.add(realNamespaceName);
                }
            });
        }
    });

    properties.forEach((prop) => {
        let currentNamespace = '';
        prop.namespaces.forEach((ns) => {
            currentNamespace = currentNamespace
                ? `${currentNamespace}.${ns}`
                : ns;

            const realNamespaceName = currentNamespace.trim();

            if (!realNamespaces.has(realNamespaceName)) {
                realNamespaces.add(realNamespaceName);
            }
        });
    });

    functions.forEach((func) => {
        if (func.hasSelf) {
            let currentNamespace = '';
            func.namespaces.forEach((ns) => {
                currentNamespace = currentNamespace
                    ? `${currentNamespace}.${ns}`
                    : ns;

                if (!potentialNamespaces.has(currentNamespace)) {
                    potentialNamespaces.add(currentNamespace);
                }
            });
        }
    });

    realNamespaces.forEach((ns) => {
        namespaces[ns] = {
            functions: [],
            methods: [],
            properties: [],
        };
    });

    functions.forEach((func) => {
        const fullNamespacePath = func.namespaces.join('.');

        if (realNamespaces.has(fullNamespacePath)) {
            if (func.hasSelf) {
                namespaces[fullNamespacePath].methods.push(func);
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

    properties.forEach((prop) => {
        const fullNamespacePath = prop.namespaces.join('.');

        if (realNamespaces.has(fullNamespacePath)) {
            namespaces[fullNamespacePath].properties.push(prop);
        }
    });

    return {
        namespaces,
        types,
    } satisfies ApiDefinitions;
};
