import {
    TestSuite,
    Test,
    CrankTestFunction,
    SuiteFunction,
    PredictObject,
    ExtensionMethods,
} from './types';
import {
    addTestSuite,
    setCurrentTestSuite,
    getCurrentTestSuite,
} from './state';

export function createCrankTest<T extends ExtensionMethods>(
    extensions: T = {} as T,
): CrankTestFunction<T> {
    const crankTestFn = (
        suiteName: string,
        fn: (suite: SuiteFunction<T>) => void,
    ) => {
        const previousSuite = getCurrentTestSuite();
        const depth = previousSuite ? previousSuite.depth + 1 : 0;

        const suite: TestSuite = {
            name: suiteName,
            tests: [],
            parent: previousSuite || undefined,
            children: [],
            depth,
        };

        if (previousSuite) {
            previousSuite.children.push(suite);
        } else {
            addTestSuite(suite);
        }

        setCurrentTestSuite(suite);

        const predictObject: PredictObject<T> = Object.keys(extensions).reduce(
            (acc, key) => {
                const wrappedFunction = (...args: any[]) => {
                    const [file, line] = [args[0], args[1]];
                    try {
                        return extensions[key](...args.slice(2));
                    } catch (error) {
                        throw `${error}\nat ${file}:${line}`;
                    }
                };

                return {
                    ...acc,
                    [key]: wrappedFunction,
                };
            },
            {} as PredictObject<T>,
        );

        const suiteFunction: SuiteFunction<T> = {
            spec: (
                testName: string,
                testFn: (predict: PredictObject<T>) => void,
            ) => {
                const test: Test = {
                    name: testName,
                    fn: () => {
                        testFn(predictObject);
                    },
                };

                suite.tests.push(test);
            },
        };

        fn(suiteFunction);

        setCurrentTestSuite(previousSuite);
    };

    crankTestFn.extend = <U extends ExtensionMethods>(
        newExtensions: U,
    ): CrankTestFunction<T & U> => {
        return createCrankTest({ ...extensions, ...newExtensions });
    };

    return crankTestFn;
}
