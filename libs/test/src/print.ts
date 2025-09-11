import { getCurrentTestName } from './state';

interface TestMessage {
    type:
        | 'suite-start'
        | 'suite-end'
        | 'test-start'
        | 'test-result'
        | 'test-end'
        | 'log';
    data: any;
    testName?: string;
}

const sendMessage = (message: TestMessage) => {
    try {
        const url = `http://localhost:9844/test-message`;
        const encodedMessage = json.encode(message);
        const fullUrl = `${url}?message=${encodedMessage}`;

        if (
            playdate !== undefined &&
            playdate.simulator !== undefined &&
            playdate.simulator.getURL !== undefined
        ) {
            playdate.simulator.getURL(fullUrl);
        }
    } catch (error) {}
};

/**
 * @noSelf
 */
let originalPrint: any;

export const setupPrintOverride = () => {
    originalPrint = print;

    /**
     * @noSelf
     */
    // @ts-ignore
    print = (...args: unknown[]) => {
        originalPrint(...args);

        const currentTest = getCurrentTestName() || 'unknown';
        const message: TestMessage = {
            type: 'log',
            data: args
                .map(arg =>
                    typeof arg === 'string'
                        ? arg
                        : typeof arg === 'object' && arg !== null
                        ? json.encode(arg)
                        : String(args),
                )
                .join(' '),
            testName: currentTest,
        };

        sendMessage(message);
    };
};

export const logToConsole = (...args: any[]) => {
    if (originalPrint) {
        originalPrint(...args);
    } else {
        print(...args);
    }
};

export const sendSuiteStart = (suiteName: string) => {
    sendMessage({
        type: 'suite-start',
        data: { suiteName },
    });
};

export const sendSuiteEnd = (suiteName: string) => {
    sendMessage({
        type: 'suite-end',
        data: { suiteName },
    });
};

export const sendTestStart = (testName: string) => {
    sendMessage({
        type: 'test-start',
        data: { testName },
    });
};

export const sendTestResult = (
    testName: string,
    result: 'passed' | 'failed',
    error?: string,
    file?: string,
    line?: number,
) => {
    sendMessage({
        type: 'test-result',
        data: { testName, result, error, file, line },
    });
};

export const sendTestEnd = () => {
    sendMessage({
        type: 'test-end',
        data: {},
    });
};
