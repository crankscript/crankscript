import { functionTypeOverrides } from '@/cli/commands/GenerateTypes/utils/functionTypeOverrides.js';

export const getFunctionTypeOverride = (version: string) => {
    return (
        functionTypeOverrides[version] ??
        functionTypeOverrides['defaultVersion']
    );
};
