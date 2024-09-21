export class PlaydateSdkPath {
    private constructor(public readonly path: string) {}

    public static fromString(path: string): PlaydateSdkPath {
        return new PlaydateSdkPath(path);
    }
}
