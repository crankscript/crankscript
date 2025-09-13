import type {
    ApiDefinitions,
    ApiObject,
    FunctionDescription,
    FunctionTypeOverrideMap,
    PropertyDescription,
} from '@/cli/types.js';

export const getApiDefinitions = (
    functions: FunctionDescription[],
    properties: PropertyDescription[],
    functionTypeOverride: FunctionTypeOverrideMap,
): ApiDefinitions => {
    const global: ApiObject = {
        functions: [],
        methods: [],
        properties: [],
        namespaces: {},
    };

    const getOrCreateNamespace = (
        path: string[],
        root: ApiObject,
    ): ApiObject => {
        return path.reduce((currentNamespace, ns) => {
            if (!currentNamespace.namespaces[ns]) {
                currentNamespace.namespaces[ns] = {
                    functions: [],
                    methods: [],
                    properties: [],
                    namespaces: {},
                };
            }
            return currentNamespace.namespaces[ns];
        }, root);
    };

    functions.forEach((func) => {
        const targetNamespace = getOrCreateNamespace(func.namespaces, global);
        if (func.hasSelf || functionTypeOverride[func.signature]?.isMethod) {
            targetNamespace.methods.push(func);
        } else {
            targetNamespace.functions.push(func);
        }
    });

    properties.forEach((prop) => {
        const targetNamespace = getOrCreateNamespace(prop.namespaces, global);
        targetNamespace.properties.push(prop);
    });

    return { global };
};
