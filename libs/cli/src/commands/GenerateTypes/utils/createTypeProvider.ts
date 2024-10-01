import { readFileSync } from 'fs';
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
    FunctionDeclarationStructure,
    ParameterDeclarationStructure,
    StructureKind,
} from 'ts-morph';
import { DataFolder } from '@/cli/constants.js';
import {
    FunctionDescription,
    FunctionDetails,
    ParameterDetails,
    PropertyDescription,
    PropertyDetails,
    TypeProviderData,
} from '@/cli/types.js';

function kebabToCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export const createTypeProvider = (version: string) => {
    const path = join(DataFolder, `${version}.json`);
    const fallbackProvider = existsSync(path)
        ? (JSON.parse(readFileSync(path, 'utf-8')) as TypeProviderData)
        : ({
              globalStatements: [],
              statements: [],
              properties: {},
              functions: {},
          } satisfies TypeProviderData);
    const provider = {
        globalStatements: fallbackProvider.globalStatements,
        statements: fallbackProvider.statements,
        properties: {},
        functions: {},
    } as TypeProviderData;
    const visitedProperties = new Map<string, PropertyDetails>();
    const visitedFunctions = new Map<string, FunctionDetails>();

    const getPropertyDetails = (property: PropertyDescription) => {
        if (visitedProperties.has(property.signature)) {
            return visitedProperties.get(property.signature) as PropertyDetails;
        }

        let result: PropertyDetails;
        let prop = provider.properties[property.signature];

        if (!prop) {
            prop = fallbackProvider.properties[property.signature];
        }

        if (!prop) {
            const details = {
                signature: property.signature,
                type: 'any',
            } satisfies PropertyDetails;

            provider.properties[property.signature] = details;

            result = details;
        } else {
            provider.properties[property.signature] = prop;

            result = prop;
        }

        visitedProperties.set(property.signature, result);

        return result;
    };

    const getFunctionDetails = (func: FunctionDescription): FunctionDetails => {
        if (visitedFunctions.has(func.signature)) {
            return visitedFunctions.get(func.signature) as FunctionDetails;
        }

        let result: FunctionDetails;
        let fn = provider.functions[func.signature];

        if (!fn) {
            fn = fallbackProvider.functions[func.signature];
        }

        if (!fn) {
            const details = {
                signature: func.signature,
                parameters: func.parameters.map((p) => ({
                    name: p.name,
                    type: 'any',
                })),
                returnType: 'any',
            } satisfies FunctionDetails;

            provider.functions[func.signature] = details;

            result = details;
        } else {
            provider.functions[func.signature] = fn;

            result = fn;
        }

        visitedFunctions.set(func.signature, result);

        return result;
    };

    const getGlobalStatements = () => {
        return provider.globalStatements;
    };

    const getStatements = () => {
        return provider.statements;
    };

    const isPropertyStatic = (property: PropertyDescription) => {
        const { isStatic } = getPropertyDetails(property);

        return isStatic;
    };

    const getFunctionReturnType = (func: FunctionDescription) => {
        const { returnType } = getFunctionDetails(func);

        return returnType;
    };

    const getParameterDetails = (
        func: FunctionDescription,
        parameter: string
    ) => {
        const { parameters } = getFunctionDetails(func);
        const param = parameters.find((p) => p.name === parameter);

        if (!param) {
            return {
                name: parameter,
                type: 'any',
            } satisfies ParameterDetails;
        }

        return param;
    };

    const getParameters = (
        func: FunctionDescription
    ): FunctionDeclarationStructure['parameters'] => {
        const { overrideParameters = false, parameters } =
            getFunctionDetails(func);
        const getParameterFromDetails = (parameter: ParameterDetails) => {
            return {
                kind: StructureKind.Parameter,
                name: kebabToCamelCase(parameter.name),
                type: parameter.type,
                ...(parameter.overrideOptions ?? {}),
            } satisfies ParameterDeclarationStructure;
        };

        if (overrideParameters) {
            return parameters.map((details) => {
                return getParameterFromDetails(details);
            });
        }

        return func.parameters.map((parameter) => {
            const details = getParameterDetails(func, parameter.name);

            return getParameterFromDetails(details);
        });
    };

    const getFunctionOverrideOptions = (func: FunctionDescription) => {
        return getFunctionDetails(func).overrideOptions ?? {};
    };

    const save = () => {
        const contents = JSON.stringify(provider, null, 4);

        writeFileSync(path, contents, 'utf-8');
    };

    return {
        getGlobalStatements,
        getStatements,
        getPropertyDetails,
        getFunctionReturnType,
        getParameterDetails,
        getParameters,
        getFunctionOverrideOptions,
        save,
    };
};
