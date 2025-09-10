import { useMemo } from 'react';
import { glob } from 'zx';

export const useTestFiles = ({ path }: { path: string }) => {
    return useMemo(() => {
        return glob.sync(`${path}/**/*.test.ts`);
    }, [path]);
};
