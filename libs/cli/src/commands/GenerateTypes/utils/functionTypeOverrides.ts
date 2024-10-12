import { FunctionTypeOverrideMap } from '@/cli/types.js';

export const functionTypeOverrides: Record<string, FunctionTypeOverrideMap> = {
    defaultVersion: {
        'playdate.timer.timerEndedCallback': {
            isMethod: true,
        },
        'playdate.timer.updateCallback': {
            isMethod: true,
        },
        'playdate.frameTimer.timerEndedCallback': {
            isMethod: true,
        },
        'playdate.frameTimer.updateCallback': {
            isMethod: true,
        },
    },
};
