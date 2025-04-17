export enum PlaydateColor {
    Black = playdate.graphics.kColorBlack,
    White = playdate.graphics.kColorWhite,
    Clear = playdate.graphics.kColorClear,
    XOR = playdate.graphics.kColorXOR,
}

export enum PlaydateFlip {
    Unflipped = playdate.graphics.kImageUnflipped,
    FlippedX = playdate.graphics.kImageFlippedX,
    FlippedY = playdate.graphics.kImageFlippedY,
    FlippedXY = playdate.graphics.kImageFlippedXY,
}

export enum PlaydatePolygonFill {
    NonZero = playdate.graphics.kPolygonFillNonZero,
    EvenOdd = playdate.graphics.kPolygonFillEvenOdd,
}

export enum PlaydateButton {
    Left = playdate.kButtonLeft,
    Right = playdate.kButtonRight,
    Up = playdate.kButtonUp,
    Down = playdate.kButtonDown,
    B = playdate.kButtonB,
    A = playdate.kButtonA,
}

export enum PlaydateLanguage {
    English = playdate.graphics.font.kLanguageEnglish,
    Japanese = playdate.graphics.font.kLanguageJapanese,
}

export enum PlaydateFileOpenMode {
    Read = playdate.file.kFileRead,
    Write = playdate.file.kFileWrite,
    Append = playdate.file.kFileAppend,
}

export enum PlaydateDitherType {
    None = playdate.graphics.image.kDitherTypeNone,
    DiagonalLine = playdate.graphics.image.kDitherTypeDiagonalLine,
    VerticalLine = playdate.graphics.image.kDitherTypeVerticalLine,
    HorizontalLine = playdate.graphics.image.kDitherTypeHorizontalLine,
    Screen = playdate.graphics.image.kDitherTypeScreen,
    Bayer2x2 = playdate.graphics.image.kDitherTypeBayer2x2,
    Bayer4x4 = playdate.graphics.image.kDitherTypeBayer4x4,
    Bayer8x8 = playdate.graphics.image.kDitherTypeBayer8x8,
    FloydSteinberg = playdate.graphics.image.kDitherTypeFloydSteinberg,
    Burkes = playdate.graphics.image.kDitherTypeBurkes,
    Atkinson = playdate.graphics.image.kDitherTypeAtkinson,
}

export enum PlaydateLineCapStyle {
    Butt = playdate.graphics.kLineCapStyleButt,
    Square = playdate.graphics.kLineCapStyleSquare,
    Round = playdate.graphics.kLineCapStyleRound,
}

export enum PlaydateDrawMode {
    Copy = playdate.graphics.kDrawModeCopy,
    WhiteTransparent = playdate.graphics.kDrawModeWhiteTransparent,
    BlackTransparent = playdate.graphics.kDrawModeBlackTransparent,
    FillWhite = playdate.graphics.kDrawModeFillWhite,
    FillBlack = playdate.graphics.kDrawModeFillBlack,
    XOR = playdate.graphics.kDrawModeXOR,
    NXOR = playdate.graphics.kDrawModeNXOR,
    Inverted = playdate.graphics.kDrawModeInverted,
}

export enum PlaydateStrokeLocation {
    Centered = playdate.graphics.kStrokeCentered,
    Inside = playdate.graphics.kStrokeInside,
    Outside = playdate.graphics.kStrokeOutside,
}

export enum PlaydateFontVariant {
    Normal = playdate.graphics.font.kVariantNormal,
    Bold = playdate.graphics.font.kVariantBold,
    Italic = playdate.graphics.font.kVariantItalic,
}

export enum PlaydateTextAlignment {
    Left = playdate.graphics.kAlignLeft,
    Right = playdate.graphics.kAlignRight,
    Center = playdate.graphics.kAlignCenter,
}

export enum PlaydateCollisionResponse {
    Slide = playdate.graphics.sprite.kCollisionTypeSlide,
    Freeze = playdate.graphics.sprite.kCollisionTypeFreeze,
    Overlap = playdate.graphics.sprite.kCollisionTypeOverlap,
    Bounce = playdate.graphics.sprite.kCollisionTypeBounce,
}

export enum PlaydateCapitalizationBehavior {
    Normal = playdate.keyboard.kCapitalizationNormal,
    Words = playdate.keyboard.kCapitalizationWords,
    Sentences = playdate.keyboard.kCapitalizationSentences,
}

export enum PlaydateSoundFormat {
    '8bitMono' = playdate.sound.kFormat8bitMono,
    '8bitStereo' = playdate.sound.kFormat8bitStereo,
    '16bitMono' = playdate.sound.kFormat16bitMono,
    '16bitStereo' = playdate.sound.kFormat16bitStereo,
}

export enum PlaydateSoundWave {
    Square = playdate.sound.kWaveSquare,
    Triangle = playdate.sound.kWaveTriangle,
    Sine = playdate.sound.kWaveSine,
    Noise = playdate.sound.kWaveNoise,
    Sawtooth = playdate.sound.kWaveSawtooth,
    POPhase = playdate.sound.kWavePOPhase,
    PODigital = playdate.sound.kWavePODigital,
    POVosim = playdate.sound.kWavePOVosim,
}

export enum PlaydateSoundLfoType {
    Square = playdate.sound.kLFOSquare,
    Triangle = playdate.sound.kLFOTriangle,
    Sine = playdate.sound.kLFOSine,
    SampleAndHold = playdate.sound.kLFOSampleAndHold,
    SawtoothUp = playdate.sound.kLFOSawtoothUp,
    SawtoothDown = playdate.sound.kLFOSawtoothDown,
}

export enum PlaydateSoundTwoPoleFilterType {
    LowPass = playdate.sound.kFilterLowPass,
    HighPass = playdate.sound.kFilterHighPass,
    BandPass = playdate.sound.kFilterBandPass,
    Notch = playdate.sound.kFilterNotch,
    PEQ = playdate.sound.kFilterPEQ,
    LowShelf = playdate.sound.kFilterLowShelf,
    HighShelf = playdate.sound.kFilterHighShelf,
}

export enum PlaydateSeekWhence {
    Set = playdate.file.kSeekSet,
    FromCurrent = playdate.file.kSeekFromCurrent,
    FromEnd = playdate.file.kSeekFromEnd,
}

export enum PlaydateWrapMode {
    Clip = playdate.graphics.kWrapClip,
    Character = playdate.graphics.kWrapCharacter,
    Word = playdate.graphics.kWrapWord,
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
            playdate.getCurrentTimeMilliseconds() / interval,
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
