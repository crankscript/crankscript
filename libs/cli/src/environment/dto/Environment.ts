import { PlaydateSdkPath } from '../path/dto/PlaydateSdkPath.js';
import { ConfigurationType } from '../configuration/ConfigurationSchema.js';

export class Environment {
    configuration: ConfigurationType;
    sdkPath: PlaydateSdkPath;

    public constructor({
        configuration,
        sdkPath,
    }: {
        configuration: ConfigurationType;
        sdkPath: PlaydateSdkPath;
    }) {
        this.configuration = configuration;
        this.sdkPath = sdkPath;
    }
}
