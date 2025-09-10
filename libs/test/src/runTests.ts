import { TestOptions, TestSuite } from './types';
import { getAllTestSuites, clearTestSuites, setCurrentTestName } from './state';
import {
    setupPrintOverride,
    sendSuiteStart,
    sendSuiteEnd,
    sendTestStart,
    sendTestResult,
    sendTestEnd,
} from './print';
import { withReload } from '@crankscript/core';

interface TestRuntimeOptions {
    watch: boolean;
    shouldCloseOnComplete: boolean;
}

const readTestOptions = (): TestRuntimeOptions => {
    try {
        const optionsFile = playdate.file.open(
            'test-options.json',
            playdate.file.kFileRead,
        );
        const [content] = optionsFile.read(1024);
        optionsFile.close();
        if (content) {
            return json.decode(content) as TestRuntimeOptions;
        }
    } catch (error) {}

    return { watch: true, shouldCloseOnComplete: false };
};

const runSuite = (suite: TestSuite) => {
    sendSuiteStart(suite.name);

    suite.tests.forEach(test => {
        sendTestStart(test.name);

        setCurrentTestName(test.name);

        try {
            test.fn();
            sendTestResult(test.name, 'passed');
        } catch (error: any) {
            const file = error?.file;
            const line = error?.line;
            sendTestResult(test.name, 'failed', String(error), file, line);
        }
    });

    suite.children.forEach(childSuite => {
        runSuite(childSuite);
    });

    sendSuiteEnd(suite.name);
};

export const runTests = (options?: TestOptions) => {
    setupPrintOverride();

    const runtimeOptions = readTestOptions();
    const rootSuites = getAllTestSuites();

    rootSuites.forEach(suite => {
        runSuite(suite);
    });

    sendTestEnd();

    clearTestSuites();

    if (runtimeOptions.shouldCloseOnComplete) {
        playdate.simulator.exit();
    }

    playdate.update = () => {
        withReload(() => {})();
    };
};
