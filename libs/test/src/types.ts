export interface Test {
    name: string;
    fn: () => void;
}

export interface TestSuite {
    name: string;
    tests: Test[];
    parent?: TestSuite;
    children: TestSuite[];
    depth: number;
}

export interface TestOptions {}

export type PredictFunction<F extends (...args: any[]) => void> = F & {
    __predictFunction: true;
};

export type ExtensionMethods = Record<string, (...args: any[]) => void>;

export type PredictObject<T extends ExtensionMethods = {}> = {
    [K in keyof T]: PredictFunction<T[K]>;
};

export interface SuiteFunction<T extends ExtensionMethods = {}> {
    spec: (name: string, fn: (predict: PredictObject<T>) => void) => void;
}

export interface CrankTestFunction<T extends ExtensionMethods = {}> {
    (suiteName: string, fn: (suite: SuiteFunction<T>) => void): void;
    extend<U extends ExtensionMethods>(extensions: U): CrankTestFunction<T & U>;
}
