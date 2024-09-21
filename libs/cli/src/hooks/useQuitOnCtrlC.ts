import { useInput } from 'ink';

export const useQuitOnCtrlC = () => {
    useInput((input, key) => {
        if (key.ctrl && input === 'c') {
            process.exit();
        }
    });
};
