import { TestSuite } from './types';

let currentTestSuite: TestSuite | null = null;
let allTestSuites: TestSuite[] = [];
let currentTestName: string = 'unknown';
let currentSuiteName: string = 'unknown';

export const getCurrentTestSuite = () => currentTestSuite;
export const getAllTestSuites = () => allTestSuites;

export const setCurrentTestSuite = (suite: TestSuite | null) => {
    currentTestSuite = suite;
    if (suite) {
        currentSuiteName = suite.name;
    }
};

export const addTestSuite = (suite: TestSuite) => {
    allTestSuites.push(suite);
};

export const clearTestSuites = () => {
    allTestSuites = [];
    currentTestSuite = null;
    currentTestName = 'unknown';
    currentSuiteName = 'unknown';
};

export const setCurrentTestName = (name: string) => {
    currentTestName = name;
};

export const getCurrentTestName = () => currentTestName;
export const getCurrentSuiteName = () => currentSuiteName;

export const isNestedSuite = (suite: TestSuite): boolean => {
    return suite.parent !== undefined;
};

export const getSuiteFullPath = (suite: TestSuite): string => {
    if (!suite.parent) {
        return suite.name;
    }
    return `${getSuiteFullPath(suite.parent)} > ${suite.name}`;
};

export const getRootSuites = (): TestSuite[] => {
    return allTestSuites.filter(suite => !suite.parent);
};

export const getAllNestedSuites = (): TestSuite[] => {
    const collectAllSuites = (suite: TestSuite): TestSuite[] => {
        return [
            suite,
            ...suite.children.flatMap(child => collectAllSuites(child)),
        ];
    };

    return allTestSuites.flatMap(rootSuite => collectAllSuites(rootSuite));
};
