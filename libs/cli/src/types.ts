import {
    ClassDeclarationStructure,
    FunctionDeclarationStructure,
    MethodDeclarationStructure,
    ParameterDeclarationStructure,
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
    finishedDescription: (result: TResult) => string;
    runner: () => Promise<TResult> | Promise<false>;
    onFinish?: (result: TResult | false) => void;
    ready?: boolean;
    quitOnError?: boolean;
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

export interface ParameterDetails {
    name: string;
    type: string;
    overrideOptions?: Partial<
        Omit<ParameterDeclarationStructure, 'kind' | 'name' | 'type'>
    >;
}

export interface PropertyDetails {
    signature: string;
    type: string;
    isStatic?: boolean;
    isReadOnly?: boolean;
}

export interface FunctionDetails {
    signature: string;
    parameters: ParameterDetails[];
    returnType: string;
    overrideParameters?: boolean;
    overrideOptions?: Partial<
        FunctionDeclarationStructure | MethodDeclarationStructure
    >;
}

export interface ConstantDefinition {
    name: string;
    type: string;
}

export type TypeProviderData = {
    globalStatements: string[];
    statements: string[];
    constants: Record<string, (ConstantDefinition | string)[]>;
    classes: Record<string, Partial<ClassDeclarationStructure>>;
    properties: Record<string, PropertyDetails>;
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
