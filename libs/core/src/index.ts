export enum PlaydateColor {
    Black = 0,
    White = 1,
    Clear = 2,
    XOR = 3,
}

export enum PlaydateFlip {
    Unflipped = 0,
    FlippedX = 1,
    FlippedY = 2,
    FlippedXY = 3,
}

export enum PlaydatePolygonFill {
    NonZero = 0,
    EvenOdd = 1,
}

export enum PlaydateButton {
    Left = 1,
    Right = 2,
    Up = 4,
    Down = 8,
    B = 16,
    A = 32,
}

export enum PlaydateLanguage {
    English = 0,
    Japanese = 1,
}

export enum PlaydateFileOpenMode {
    Read = 3,
    Write = 4,
    Append = 8,
}

export enum PlaydateDitherType {
    None = 0,
    DiagonalLine = 1,
    VerticalLine = 2,
    HorizontalLine = 3,
    Screen = 4,
    Bayer2x2 = 5,
    Bayer4x4 = 6,
    Bayer8x8 = 7,
    FloydSteinberg = 8,
    Burkes = 9,
    Atkinson = 10,
}

export enum PlaydateLineCapStyle {
    Butt = 0,
    Square = 1,
    Round = 2,
}

export enum PlaydateDrawMode {
    Copy = 0,
    WhiteTransparent = 1,
    BlackTransparent = 2,
    FillWhite = 3,
    FillBlack = 4,
    XOR = 5,
    NXOR = 6,
    Inverted = 7,
}

export enum PlaydateStrokeLocation {
    Centered = 0,
    Inside = 1,
    Outside = 2,
}

export enum PlaydateFontVariant {
    Normal = 0,
    Bold = 1,
    Italic = 2,
}

export enum PlaydateTextAlignment {
    Left = 0,
    Right = 1,
    Center = 2,
}

export enum PlaydateCollisionResponse {
    Slide = 0,
    Freeze = 1,
    Overlap = 2,
    Bounce = 3,
}

export enum PlaydateCapitalizationBehavior {
    Normal = 1,
    Words = 2,
    Sentences = 3,
}

export enum PlaydateSoundFormat {
    '8bitMono' = 0,
    '8bitStereo' = 1,
    '16bitMono' = 2,
    '16bitStereo' = 3,
}

export enum PlaydateSoundWave {
    Square = 0,
    Triangle = 1,
    Sine = 2,
    Noise = 3,
    Sawtooth = 4,
    POPhase = 5,
    PODigital = 6,
    POVosim = 7,
}

export enum PlaydateSoundLfoType {
    Square = 0,
    Triangle = 1,
    Sine = 2,
    SampleAndHold = 3,
    SawtoothUp = 4,
    SawtoothDown = 5,
}

export enum PlaydateSoundTwoPoleFilterType {
    LowPass = 0,
    HighPass = 1,
    BandPass = 2,
    Notch = 3,
    PEQ = 4,
    LowShelf = 5,
    HighShelf = 6,
}

let lastTime = -1;
const { second, minute, hour, day, month, year } =
    playdate.file.modtime('main.pdz');

export interface ReloadOptions {
    interval?: number;
}

export const withReload = (update: () => void, options?: ReloadOptions) => {
    const { interval = 1000 } = options || {};

    return () => {
        const elapsedSeconds = Math.floor(
            playdate.getCurrentTimeMilliseconds() / interval
        );

        if (elapsedSeconds !== lastTime) {
            lastTime = elapsedSeconds;
            const newTime = playdate.file.modtime('main.pdz');

            if (
                newTime.second !== second ||
                newTime.minute !== minute ||
                newTime.hour !== hour ||
                newTime.day !== day ||
                newTime.month !== month ||
                newTime.year !== year
            ) {
                print('Reloading...');
                playdate.file.run('main.pdz');
            }
        }

        update();
    };
};
