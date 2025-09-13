import type { PlaydateSdkPath } from '../path/dto/PlaydateSdkPath.js';

export class Environment {
    sdkPath: PlaydateSdkPath;

    public constructor({ sdkPath }: { sdkPath: PlaydateSdkPath }) {
        this.sdkPath = sdkPath;
    }
}
