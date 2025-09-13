import type {
    ClassDeclarationStructure,
    PropertyDeclarationStructure,
} from 'ts-morph';

export type ClassDefinition = Partial<ClassDeclarationStructure>;

export type PropertyDefinition = {
    signature: string;
    definition: Partial<PropertyDeclarationStructure>;
};

export type VersionDefinition = {
    globalStatements: string[];
    constants: Record<string, string[]>;
    statements: string[];
    classes: Record<string, ClassDefinition>;
};
