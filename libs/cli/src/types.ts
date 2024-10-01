import {
    FunctionDeclarationStructure,
    MethodSignatureStructure,
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
    onFinish?: (result: TResult) => void;
    ready?: boolean;
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

export interface ConstantDescription {
    name: string;
    docs: string;
    values: {
        name: string;
        value: number;
        docs: string;
    }[];
}

export interface PlaydateNamespace {
    functions: FunctionDescription[];
    methods: FunctionDescription[];
    properties: PropertyDescription[];
}

export interface PlaydateType {
    methods: FunctionDescription[];
}

export interface ApiDefinitions {
    namespaces: Record<string, PlaydateNamespace>;
    types: Record<string, PlaydateType>;
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
        FunctionDeclarationStructure | MethodSignatureStructure
    >;
}

export type TypeProviderData = {
    globalStatements: string[];
    statements: string[];
    properties: Record<string, PropertyDetails>;
    functions: Record<string, FunctionDetails>;
};
