import { useEffect, useRef, useState } from 'react';
import { TestServer, type TestState } from '../server/TestServer.js';

export const useTestServer = () => {
    const serverRef = useRef<TestServer | null>(null);
    const [testState, setTestState] = useState<TestState | null>(null);

    useEffect(() => {
        serverRef.current = new TestServer();

        serverRef.current.setStateChangeCallback((state) => {
            setTestState(state);
        });

        serverRef.current.start(9844);

        return () => {
            serverRef.current?.stop();
        };
    }, []);

    return {
        testState,
        resetTestState: () => {
            setTestState(null);
            serverRef.current?.clearState();
        },
    };
};
