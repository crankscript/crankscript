export declare enum PlaydateColor {
    Black = 0,
    White = 1,
    Clear = 2,
    XOR = 3
}
export declare enum PlaydateFlip {
    Unflipped = 0,
    FlippedX = 1,
    FlippedY = 2,
    FlippedXY = 3
}
export declare enum PlaydatePolygonFill {
    NonZero = 0,
    EvenOdd = 1
}
export declare enum PlaydateButton {
    Left = 1,
    Right = 2,
    Up = 4,
    Down = 8,
    B = 16,
    A = 32
}
export declare enum PlaydateLanguage {
    English = 0,
    Japanese = 1
}
export declare enum PlaydateFileOpenMode {
    Read = 3,
    Write = 4,
    Append = 8
}
export declare enum PlaydateDitherType {
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
    Atkinson = 10
}
export declare enum PlaydateLineCapStyle {
    Butt = 0,
    Square = 1,
    Round = 2
}
export declare enum PlaydateDrawMode {
    Copy = 0,
    WhiteTransparent = 1,
    BlackTransparent = 2,
    FillWhite = 3,
    FillBlack = 4,
    XOR = 5,
    NXOR = 6,
    Inverted = 7
}
export declare enum PlaydateStrokeLocation {
    Centered = 0,
    Inside = 1,
    Outside = 2
}
export declare enum PlaydateFontVariant {
    Normal = 0,
    Bold = 1,
    Italic = 2
}
export declare enum PlaydateTextAlignment {
    Left = 0,
    Right = 1,
    Center = 2
}
export declare enum PlaydateCollisionResponse {
    Slide = 0,
    Freeze = 1,
    Overlap = 2,
    Bounce = 3
}
export declare enum PlaydateCapitalizationBehavior {
    Normal = 1,
    Words = 2,
    Sentences = 3
}
export declare enum PlaydateSoundFormat {
    '8bitMono' = 0,
    '8bitStereo' = 1,
    '16bitMono' = 2,
    '16bitStereo' = 3
}
export declare enum PlaydateSoundWave {
    Square = 0,
    Triangle = 1,
    Sine = 2,
    Noise = 3,
    Sawtooth = 4,
    POPhase = 5,
    PODigital = 6,
    POVosim = 7
}
export declare enum PlaydateSoundLfoType {
    Square = 0,
    Triangle = 1,
    Sine = 2,
    SampleAndHold = 3,
    SawtoothUp = 4,
    SawtoothDown = 5
}
export declare enum PlaydateSoundTwoPoleFilterType {
    LowPass = 0,
    HighPass = 1,
    BandPass = 2,
    Notch = 3,
    PEQ = 4,
    LowShelf = 5,
    HighShelf = 6
}
