export declare enum PlaydateColor {
    Black,
    White,
    Clear,
    XOR,
}

export declare enum PlaydateFlip {
    Unflipped,
    FlippedX,
    FlippedY,
    FlippedXY,
}

export declare enum PlaydatePolygonFill {
    NonZero,
    EvenOdd,
}

export declare enum PlaydateButton {
    Left,
    Right,
    Up,
    Down,
    B,
    A,
}

export declare enum PlaydateLanguage {
    English,
    Japanese,
}

export declare enum PlaydateFileOpenMode {
    Read,
    Write,
    Append,
}

export declare enum PlaydateDitherType {
    None,
    DiagonalLine,
    VerticalLine,
    HorizontalLine,
    Screen,
    Bayer2x2,
    Bayer4x4,
    Bayer8x8,
    FloydSteinberg,
    Burkes,
    Atkinson,
}

export declare enum PlaydateLineCapStyle {
    Butt,
    Square,
    Round,
}

export declare enum PlaydateDrawMode {
    Copy,
    WhiteTransparent,
    BlackTransparent,
    FillWhite,
    FillBlack,
    XOR,
    NXOR,
    Inverted,
}

export declare enum PlaydateStrokeLocation {
    Centered,
    Inside,
    Outside,
}

export declare enum PlaydateFontVariant {
    Normal,
    Bold,
    Italic,
}

export declare enum PlaydateTextAlignment {
    Left,
    Right,
    Center,
}

export declare enum PlaydateCollisionResponse {
    Slide,
    Freeze,
    Overlap,
    Bounce,
}

export declare enum PlaydateCapitalizationBehavior {
    Normal,
    Words,
    Sentences,
}

export declare enum PlaydateSoundFormat {
    '8bitMono',
    '8bitStereo',
    '16bitMono',
    '16bitStereo',
}

export declare enum PlaydateSoundWave {
    Square,
    Triangle,
    Sine,
    Noise,
    Sawtooth,
    POPhase,
    PODigital,
    POVosim,
}

export declare enum PlaydateSoundLfoType {
    Square,
    Triangle,
    Sine,
    SampleAndHold,
    SawtoothUp,
    SawtoothDown,
}

export declare enum PlaydateSoundTwoPoleFilterType {
    LowPass,
    HighPass,
    BandPass,
    Notch,
    PEQ,
    LowShelf,
    HighShelf,
}

export declare enum PlaydateSeekWhence {
    Set,
    FromCurrent,
    FromEnd,
}

export declare enum PlaydateWrapMode {
    Clip,
    Character,
    Word,
}

export declare enum PlaydateNetworkStatus {
    NotConnected,
    Connected,
    NotAvailable,
}

export interface ReloadOptions {
    interval?: number;
}

export declare const withReload: (
    update: () => void,
    options?: ReloadOptions,
) => () => void;
