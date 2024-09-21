import { getPlaydateSdkPath } from '../getPlaydateSdkPath.js';
import { PlaydateSdkPathVariableNotSetError } from '../error/PlaydateSdkPathVariableNotSetError.js';

describe('getPlaydateSdkPath', () => {
    it('should return the path if available', () => {
        const environment = {
            PLAYDATE_SDK_PATH: 'path/to/sdk',
        };
        expect(getPlaydateSdkPath({ environment })).toEqual({
            path: 'path/to/sdk',
        });
    });

    it('should return false if the path is not available', () => {
        const environment = {};
        expect(() => getPlaydateSdkPath({ environment })).toThrow(
            PlaydateSdkPathVariableNotSetError
        );
    });
});
