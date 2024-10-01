export enum PlaydateColor {
    Black = 0,
    White = 1,
    Clear = 2,
    XOR = 4,
}

export enum PlaydateFlip {
    Unflipped = 0,
    FlippedX = 1,
    FlippedY = 2,
    FlippedXY = 4,
}

export enum PlaydatePolygonFill {
    NonZero = 1,
    EvenOdd = 2,
}

export enum PlaydateButton {
    Left = 1,
    Right = 2,
    Up = 4,
    Down = 8,
    B = 16,
    A = 32,
    Menu = 64,
    Lock = 124,
}

export enum PlaydateLanguage {
    English = 1,
    Japanese = 2,
}

export enum PlaydateFileOpenMode {
    Read = 1,
    Write = 2,
    Append = 4,
}

export enum PlaydateDitherType {
    None = 0,
    DiagonalLine = 1,
    VerticalLine = 2,
    HorizontalLine = 4,
    Screen = 8,
    Bayer2x2 = 16,
    Bayer4x4 = 32,
    Bayer8x8 = 64,
    FloydSteinberg = 128,
    Burkes = 256,
    Atkinson = 512,
}

export enum PlaydateLineCapStyle {
    Butt = 0,
    Round = 0,
    Square = 0,
}

export enum PlaydateDrawMode {
    Copy = 0,
    WhiteTransparent = 1,
    BlackTransparent = 2,
    FillWhite = 4,
    FillBlack = 8,
    XOR = 16,
    NXOR = 32,
    Inverted = 64,
}

export enum PlaydateStrokeLocation {
    Centered = 0,
    Outside = 1,
    Inside = 2,
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
    Bounce = 4,
}

export enum PlaydateCapitalizationBehavior {
    Normal = 0,
    Words = 1,
    Sentences = 2,
}

export enum PlaydateSoundFormat {
    '8bitMono' = 0,
    '8bitStereo' = 1,
    '16bitMono' = 2,
    '16bitStereo' = 4,
}

export enum PlaydateSoundWave {
    Sine = 0,
    Square = 1,
    Sawtooth = 2,
    Triangle = 4,
    Noise = 8,
    POPhase = 16,
    PODigital = 32,
    POVosim = 64,
}

export enum PlaydateSoundLfoType {
    Square = 0,
    SawtoothUp = 1,
    SawtoothDown = 2,
    Triangle = 4,
    Sine = 8,
    SampleAndHold = 16,
}

export enum PlaydateSoundTwoPoleFilterType {
    LowPass = 0,
    HighPass = 1,
    BandPass = 0,
    Notch = 2,
    PEQ = 4,
    LowShelf = 8,
    HighShelf = 16,
}
