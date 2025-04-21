import {
    ClassDeclarationStructure,
    FunctionDeclarationStructure,
    MethodDeclarationStructure,
    ParameterDeclarationStructure,
    PropertyDeclarationStructure,
    VariableDeclarationStructure,
} from 'ts-morph';
import { Environment } from '@/cli/environment/dto/Environment.js';
import { PlaydateSdkPath } from '@/cli/environment/path/dto/PlaydateSdkPath.js';

export enum PlaydateSdkVersionIdentifier {
    Latest = 'latest',
}

export type PlaydateSdkVersion = PlaydateSdkVersionIdentifier.Latest | string;

export type EnvironmentHealthResult =
    | {
          isHealthy: true;
          environment: Environment;
          health: EnvironmentHealth;
      }
    | {
          isHealthy: false;
          health: EnvironmentHealth;
      };

export enum HealthCheckStatusType {
    Healthy = 'Healthy',
    Unhealthy = 'Unhealthy',
    Unknown = 'Unknown',
}

export type HealthCheckStatus<TArgument> =
    | {
          healthStatus:
              | HealthCheckStatusType.Unknown
              | HealthCheckStatusType.Unhealthy;
      }
    | {
          healthStatus: HealthCheckStatusType.Healthy;
          argument: TArgument;
      };

export interface EnvironmentHealth {
    sdkPathKnown: HealthCheckStatus<PlaydateSdkPath>;
}

export type CheckListItem<TResult> = {
    runningDescription: string;
    waitingDescription: string;
    errorDescription: string;
    finishedDescription: (result: TResult | false) => string;
    skipDescription?: string;
    runner: () => Promise<TResult> | Promise<false>;
    onFinish?: (result: TResult | false) => void;
    ready?: boolean;
    quitOnError?: boolean;
    skip?: boolean | (() => boolean);
};

export interface ParameterDescription {
    name: string;
    required: boolean;
}

export interface PropertyDescription {
    signature: string;
    name: string;
    namespaces: string[];
    docs: string;
}

export interface FunctionDescription {
    signature: string;
    name: string;
    namespaces: string[];
    parameters: ParameterDescription[];
    hasSelf: boolean;
    docs: string;
}

export interface ApiObject {
    functions: FunctionDescription[];
    methods: FunctionDescription[];
    properties: PropertyDescription[];
    namespaces: Record<string, ApiObject>;
}

export interface ApiDefinitions {
    global: ApiObject;
}

export interface PropertyDetails extends Partial<PropertyDeclarationStructure> {
    signature: string;
}

export type FunctionDetails = {
    signature: string;
    parameters: ParameterDetails[];
    overrideParameters?: boolean;
} & (
    | Partial<FunctionDeclarationStructure>
    | Partial<MethodDeclarationStructure>
);

export type ParameterDetails = ParameterDeclarationStructure;

export interface ConstantDefinition
    extends Partial<VariableDeclarationStructure> {
    name: string;
}

export type TypeProviderData = {
    globalStatements: string[];
    statements: string[];
    constants: Record<string, (ConstantDefinition | string)[]>;
    classes: Record<string, Partial<ClassDeclarationStructure>>;
    properties: Record<string, PropertyDetails>;
    /**
     * Properties that are described in prose rather than in formal API documentation.
     * While 'properties' contains actual property definitions with their full path as the key,
     * 'dynamicProperties' contains additional properties that belong to a parent namespace.
     *
     * For example, if the docs mention "You can access rect.x, rect.y" in prose,
     * the key would be "playdate.geometry.rect" and the value would be the properties
     * that should be added to that namespace.
     */
    dynamicProperties: Record<
        string,
        Pick<PropertyDescription, 'name' | 'docs'>[]
    >;
    functions: Record<string, FunctionDetails>;
};

export type FunctionTypeOverrideMap = Record<string, { isMethod: boolean }>;

export enum TemplateName {
    Blank = 'blank',
}

export enum LibraryTemplateName {
    Blank = 'blank',
}
