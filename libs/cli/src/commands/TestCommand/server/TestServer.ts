import type { Server } from 'node:http';
import cors from 'cors';
import express, { type Request, type Response } from 'express';

export interface TestLine {
    type: 'log' | 'error' | 'info' | 'result';
    content: string;
    timestamp: string;
    file?: string;
    line?: number;
}

export interface TestResult {
    test: string;
    result: 'passed' | 'failed';
    lines: TestLine[];
    startTime?: string;
    endTime?: string;
}

export interface TestSuite {
    name: string;
    testCount: number;
    status: 'pending' | 'running' | 'completed';
    tests: TestResult[];
    children: TestSuite[];
    parent?: TestSuite;
    depth: number;
    startTime?: string;
    endTime?: string;
}

export interface TestState {
    suites: TestSuite[];
    status: 'idle' | 'collecting' | 'running' | 'completed' | 'failed';
    totalTests: number;
    completedTests: number;
    passedTests: number;
    failedTests: number;
    startTime?: string;
    endTime?: string;
    timestamp: string;
}

export interface TestResultsResponse {
    results: TestResult[];
    totalTests: number;
    isComplete: boolean;
    timestamp: string;
}

export interface TestMessageData {
    suiteName: string;
    testName: string;
    result: string;
    error: string;
    file: string;
    line: number;
}

export interface TestMessage {
    type: string;
    data: TestMessageData;
}

export class TestServer {
    private app: express.Application;
    private server: Server | undefined;
    private testState: TestState;
    private onStateChange?: (state: TestState) => void;
    private suiteStack: TestSuite[] = []; // Track nested suite hierarchy

    constructor() {
        this.app = express();
        this.testState = this.createInitialState();
        this.setupRoutes();
    }

    private createInitialState(): TestState {
        return {
            suites: [],
            status: 'idle',
            totalTests: 0,
            completedTests: 0,
            passedTests: 0,
            failedTests: 0,
            timestamp: new Date().toISOString(),
        };
    }

    private setupRoutes() {
        // Enable CORS for all routes
        this.app.use(cors());

        // Handle standardized test messages
        this.app.get('/test-message', (req: Request, res: Response) => {
            const { message } = req.query;

            if (message) {
                try {
                    const parsedMessage = JSON.parse(String(message));
                    this.handleTestMessage(parsedMessage);
                } catch (error) {
                    console.error(`Failed to parse message:`, error);
                }
            }

            res.send('OK');
        });

        // Legacy endpoint for backward compatibility
        this.app.get('/test-result', (req: Request, res: Response) => {
            const { test, result } = req.query;

            if (test && result) {
                const newResult: TestResult = {
                    test: String(test),
                    result: result === 'passed' ? 'passed' : 'failed',
                    lines: [],
                };
                this.addTestResult(newResult);
            }

            res.send('OK');
        });

        // API endpoint for React app to get test state
        this.app.get('/api/test-results', (_req: Request, res: Response) => {
            res.json(this.testState);
        });

        // Health check endpoint
        this.app.get('/health', (_req: Request, res: Response) => {
            res.json({ status: 'ok', timestamp: new Date().toISOString() });
        });
    }

    public start(port = 9844): Promise<void> {
        return new Promise((resolve) => {
            this.server = this.app.listen(port, () => {
                resolve();
            });
        });
    }

    public stop(): Promise<void> {
        return new Promise((resolve) => {
            if (this.server) {
                this.server.close(() => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    public getState(): TestState {
        return { ...this.testState };
    }

    public clearState(): void {
        this.testState = this.createInitialState();
        this.suiteStack = [];
        this.notifyStateChange();
    }

    public setStateChangeCallback(callback: (state: TestState) => void): void {
        this.onStateChange = callback;
    }

    private notifyStateChange(): void {
        this.testState.timestamp = new Date().toISOString();
        // Create a new object reference to ensure React detects the change
        this.onStateChange?.({ ...this.testState });
    }

    private addTestResult(result: TestResult): void {
        // Find the current suite and add the test result
        const currentSuite = this.testState.suites.find(
            (s) => s.status === 'running',
        );
        if (currentSuite) {
            currentSuite.tests.push(result);
            this.testState.completedTests++;
            if (result.result === 'passed') {
                this.testState.passedTests++;
            } else {
                this.testState.failedTests++;
            }
        }
        this.notifyStateChange();
    }

    private handleTestMessage(message: TestMessage): void {
        switch (message.type) {
            case 'suite-start':
                {
                    const currentParent =
                        this.suiteStack.length > 0
                            ? this.suiteStack[this.suiteStack.length - 1]
                            : undefined;
                    const suite: TestSuite = {
                        name: message.data.suiteName,
                        testCount: 0,
                        status: 'running',
                        tests: [],
                        children: [],
                        parent: currentParent,
                        depth: this.suiteStack.length,
                        startTime: new Date().toISOString(),
                    };

                    if (currentParent) {
                        currentParent.children.push(suite);
                    } else {
                        this.testState.suites.push(suite);
                    }

                    this.suiteStack.push(suite);
                    this.testState.status = 'running';
                    if (!this.testState.startTime) {
                        this.testState.startTime = new Date().toISOString();
                    }
                }
                break;

            case 'suite-end':
                {
                    const endingSuite = this.suiteStack.find(
                        (s) =>
                            s.name === message.data.suiteName &&
                            s.status === 'running',
                    );
                    if (endingSuite) {
                        endingSuite.status = 'completed';
                        endingSuite.endTime = new Date().toISOString();
                        // Remove from stack
                        const index = this.suiteStack.indexOf(endingSuite);
                        if (index > -1) {
                            this.suiteStack.splice(index, 1);
                        }
                    }
                }
                break;

            case 'test-start':
                {
                    const currentSuite =
                        this.suiteStack.length > 0
                            ? this.suiteStack[this.suiteStack.length - 1]
                            : undefined;
                    if (currentSuite) {
                        const existingTest = currentSuite.tests.find(
                            (t) => t.test === message.data.testName,
                        );
                        if (existingTest) {
                            existingTest.startTime = new Date().toISOString();
                        } else {
                            const testResult: TestResult = {
                                test: message.data.testName,
                                result: 'failed',
                                startTime: new Date().toISOString(),
                                lines: [],
                            };
                            currentSuite.tests.push(testResult);
                            currentSuite.testCount++;
                            this.testState.totalTests++;
                        }
                    }
                }
                break;

            case 'test-result':
                {
                    const {
                        testName: resultTestName,
                        result,
                        error,
                        file,
                        line,
                    } = message.data;
                    const suiteWithTest =
                        this.suiteStack.length > 0
                            ? this.suiteStack[this.suiteStack.length - 1]
                            : undefined;
                    if (suiteWithTest) {
                        const test = suiteWithTest.tests.find(
                            (t) => t.test === resultTestName,
                        );
                        if (test) {
                            test.result = result as 'passed' | 'failed';
                            test.endTime = new Date().toISOString();
                            if (error) {
                                test.lines.push({
                                    type: 'error',
                                    content: error,
                                    timestamp: new Date().toISOString(),
                                    file,
                                    line,
                                });
                            }

                            this.testState.completedTests++;
                            if (result === 'passed') {
                                this.testState.passedTests++;
                            } else {
                                this.testState.failedTests++;
                            }
                        }
                    }
                }
                break;

            case 'test-end':
                {
                    this.testState.status = 'completed';
                    this.testState.endTime = new Date().toISOString();
                    this.testState.suites.forEach((s) => {
                        if (s.status === 'running') {
                            s.status = 'completed';
                            s.endTime = new Date().toISOString();
                        }
                    });
                }
                break;

            case 'log':
                {
                    const { data } = message;
                    const logData =
                        typeof data === 'string' ? data : data.testName || '';
                    const logTestName = data.testName;
                    const currentTest = this.testState.suites
                        .flatMap((s) => s.tests)
                        .find((t) => t.test === logTestName);
                    if (currentTest) {
                        const isDuplicate = currentTest.lines.some(
                            (line) =>
                                line.type === 'log' && line.content === logData,
                        );
                        if (!isDuplicate) {
                            currentTest.lines.push({
                                type: 'log',
                                content: logData,
                                timestamp: new Date().toISOString(),
                            });
                        }
                    }
                }
                break;

            default:
                break;
        }

        this.notifyStateChange();
    }
}
