import { functionTypeOverrides } from '@/cli/commands/GenerateTypes/utils/functionTypeOverrides.js';

export const getFunctionTypeOverride = (version: string) => {
    return (
        functionTypeOverrides[version] ??
        // biome-ignore lint/complexity/useLiteralKeys: otherwise TypeScript will complain
        functionTypeOverrides['defaultVersion']
    );
};
