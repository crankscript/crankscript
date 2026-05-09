/// <reference path="../libs/types/types/latest.d.ts" />

// This file is generated automatically by the generate-constant-debug.ts script.
// Run this example with `crankscript simulator examples/constants.ts`

let hasRun = false;

playdate.update = () => {
    if (!hasRun) {
        hasRun = true;

        print('=== PLAYDATE CONSTANTS DEBUG ===');
        print('');

        const results: Record<string, any[]> = {};

        print('=== global ===');
        print(
            'kTextAlignment =',
            kTextAlignment,
            '(expected: { left: 0, right: 1, center: 2 })',
        );
        print('');
        print('=== playdate ===');
        print('kButtonA =', playdate.kButtonA, '(expected: 32)');
        print('kButtonB =', playdate.kButtonB, '(expected: 16)');
        print('kButtonDown =', playdate.kButtonDown, '(expected: 8)');
        print('kButtonLeft =', playdate.kButtonLeft, '(expected: 1)');
        print('kButtonRight =', playdate.kButtonRight, '(expected: 2)');
        print('kButtonUp =', playdate.kButtonUp, '(expected: 4)');
        print('');
        print('=== playdate.file ===');
        print('kFileAppend =', playdate.file.kFileAppend, '(expected: 8)');
        print('kFileRead =', playdate.file.kFileRead, '(expected: 3)');
        print('kFileWrite =', playdate.file.kFileWrite, '(expected: 4)');
        print('kSeekSet =', playdate.file.kSeekSet, '(expected: 0)');
        print(
            'kSeekFromCurrent =',
            playdate.file.kSeekFromCurrent,
            '(expected: 1)',
        );
        print('kSeekFromEnd =', playdate.file.kSeekFromEnd, '(expected: 2)');
        print('');
        print('=== playdate.graphics ===');
        print('kColorBlack =', playdate.graphics.kColorBlack, '(expected: 0)');
        print('kColorWhite =', playdate.graphics.kColorWhite, '(expected: 1)');
        print('kColorClear =', playdate.graphics.kColorClear, '(expected: 2)');
        print('kColorXOR =', playdate.graphics.kColorXOR, '(expected: 3)');
        print(
            'kImageUnflipped =',
            playdate.graphics.kImageUnflipped,
            '(expected: 0)',
        );
        print(
            'kImageFlippedX =',
            playdate.graphics.kImageFlippedX,
            '(expected: 1)',
        );
        print(
            'kImageFlippedY =',
            playdate.graphics.kImageFlippedY,
            '(expected: 2)',
        );
        print(
            'kImageFlippedXY =',
            playdate.graphics.kImageFlippedXY,
            '(expected: 3)',
        );
        print(
            'kPolygonFillNonZero =',
            playdate.graphics.kPolygonFillNonZero,
            '(expected: 0)',
        );
        print(
            'kPolygonFillEvenOdd =',
            playdate.graphics.kPolygonFillEvenOdd,
            '(expected: 1)',
        );
        print(
            'kLineCapStyleButt =',
            playdate.graphics.kLineCapStyleButt,
            '(expected: 0)',
        );
        print(
            'kLineCapStyleRound =',
            playdate.graphics.kLineCapStyleRound,
            '(expected: 2)',
        );
        print(
            'kLineCapStyleSquare =',
            playdate.graphics.kLineCapStyleSquare,
            '(expected: 1)',
        );
        print(
            'kDrawModeBlackTransparent =',
            playdate.graphics.kDrawModeBlackTransparent,
            '(expected: 2)',
        );
        print(
            'kDrawModeCopy =',
            playdate.graphics.kDrawModeCopy,
            '(expected: 0)',
        );
        print(
            'kDrawModeFillBlack =',
            playdate.graphics.kDrawModeFillBlack,
            '(expected: 4)',
        );
        print(
            'kDrawModeFillWhite =',
            playdate.graphics.kDrawModeFillWhite,
            '(expected: 3)',
        );
        print(
            'kDrawModeInverted =',
            playdate.graphics.kDrawModeInverted,
            '(expected: 7)',
        );
        print(
            'kDrawModeNXOR =',
            playdate.graphics.kDrawModeNXOR,
            '(expected: 6)',
        );
        print(
            'kDrawModeWhiteTransparent =',
            playdate.graphics.kDrawModeWhiteTransparent,
            '(expected: 1)',
        );
        print(
            'kDrawModeXOR =',
            playdate.graphics.kDrawModeXOR,
            '(expected: 5)',
        );
        print(
            'kStrokeCentered =',
            playdate.graphics.kStrokeCentered,
            '(expected: 0)',
        );
        print(
            'kStrokeInside =',
            playdate.graphics.kStrokeInside,
            '(expected: 1)',
        );
        print(
            'kStrokeOutside =',
            playdate.graphics.kStrokeOutside,
            '(expected: 2)',
        );
        print(
            'kAlignCenter =',
            playdate.graphics.kAlignCenter,
            '(expected: 33554433)',
        );
        print(
            'kAlignLeft =',
            playdate.graphics.kAlignLeft,
            '(expected: 33554432)',
        );
        print(
            'kAlignRight =',
            playdate.graphics.kAlignRight,
            '(expected: 33554434)',
        );
        print(
            'kWrapCharacter =',
            playdate.graphics.kWrapCharacter,
            '(expected: 16777217)',
        );
        print(
            'kWrapClip =',
            playdate.graphics.kWrapClip,
            '(expected: 16777216)',
        );
        print(
            'kWrapWord =',
            playdate.graphics.kWrapWord,
            '(expected: 16777218)',
        );
        print('');
        print('=== playdate.graphics.font ===');
        print(
            'kLanguageEnglish =',
            playdate.graphics.font.kLanguageEnglish,
            '(expected: 0)',
        );
        print(
            'kLanguageJapanese =',
            playdate.graphics.font.kLanguageJapanese,
            '(expected: 1)',
        );
        print(
            'kVariantBold =',
            playdate.graphics.font.kVariantBold,
            '(expected: 1)',
        );
        print(
            'kVariantItalic =',
            playdate.graphics.font.kVariantItalic,
            '(expected: 2)',
        );
        print(
            'kVariantNormal =',
            playdate.graphics.font.kVariantNormal,
            '(expected: 0)',
        );
        print('');
        print('=== playdate.graphics.image ===');
        print(
            'kDitherTypeNone =',
            playdate.graphics.image.kDitherTypeNone,
            '(expected: 0)',
        );
        print(
            'kDitherTypeDiagonalLine =',
            playdate.graphics.image.kDitherTypeDiagonalLine,
            '(expected: 1)',
        );
        print(
            'kDitherTypeVerticalLine =',
            playdate.graphics.image.kDitherTypeVerticalLine,
            '(expected: 2)',
        );
        print(
            'kDitherTypeHorizontalLine =',
            playdate.graphics.image.kDitherTypeHorizontalLine,
            '(expected: 3)',
        );
        print(
            'kDitherTypeScreen =',
            playdate.graphics.image.kDitherTypeScreen,
            '(expected: 4)',
        );
        print(
            'kDitherTypeBayer2x2 =',
            playdate.graphics.image.kDitherTypeBayer2x2,
            '(expected: 5)',
        );
        print(
            'kDitherTypeBayer4x4 =',
            playdate.graphics.image.kDitherTypeBayer4x4,
            '(expected: 6)',
        );
        print(
            'kDitherTypeBayer8x8 =',
            playdate.graphics.image.kDitherTypeBayer8x8,
            '(expected: 7)',
        );
        print(
            'kDitherTypeFloydSteinberg =',
            playdate.graphics.image.kDitherTypeFloydSteinberg,
            '(expected: 8)',
        );
        print(
            'kDitherTypeBurkes =',
            playdate.graphics.image.kDitherTypeBurkes,
            '(expected: 9)',
        );
        print(
            'kDitherTypeAtkinson =',
            playdate.graphics.image.kDitherTypeAtkinson,
            '(expected: 10)',
        );
        print('');
        print('=== playdate.graphics.sprite ===');
        print(
            'kCollisionTypeBounce =',
            playdate.graphics.sprite.kCollisionTypeBounce,
            '(expected: 3)',
        );
        print(
            'kCollisionTypeFreeze =',
            playdate.graphics.sprite.kCollisionTypeFreeze,
            '(expected: 1)',
        );
        print(
            'kCollisionTypeOverlap =',
            playdate.graphics.sprite.kCollisionTypeOverlap,
            '(expected: 2)',
        );
        print(
            'kCollisionTypeSlide =',
            playdate.graphics.sprite.kCollisionTypeSlide,
            '(expected: 0)',
        );
        print('');
        print('=== playdate.keyboard ===');
        print(
            'kCapitalizationNormal =',
            playdate.keyboard.kCapitalizationNormal,
            '(expected: 1)',
        );
        print(
            'kCapitalizationWords =',
            playdate.keyboard.kCapitalizationWords,
            '(expected: 2)',
        );
        print(
            'kCapitalizationSentences =',
            playdate.keyboard.kCapitalizationSentences,
            '(expected: 3)',
        );
        print('');
        print('=== playdate.network ===');
        print(
            'kStatusNotConnected =',
            playdate.network.kStatusNotConnected,
            '(expected: 0)',
        );
        print(
            'kStatusConnected =',
            playdate.network.kStatusConnected,
            '(expected: 1)',
        );
        print(
            'kStatusNotAvailable =',
            playdate.network.kStatusNotAvailable,
            '(expected: 2)',
        );
        print('');
        print('=== playdate.sound ===');
        print(
            'kFormat16bitMono =',
            playdate.sound.kFormat16bitMono,
            '(expected: 2)',
        );
        print(
            'kFormat16bitStereo =',
            playdate.sound.kFormat16bitStereo,
            '(expected: 3)',
        );
        print(
            'kFormat8bitMono =',
            playdate.sound.kFormat8bitMono,
            '(expected: 0)',
        );
        print(
            'kFormat8bitStereo =',
            playdate.sound.kFormat8bitStereo,
            '(expected: 1)',
        );
        print('kWaveNoise =', playdate.sound.kWaveNoise, '(expected: 3)');
        print(
            'kWavePODigital =',
            playdate.sound.kWavePODigital,
            '(expected: 6)',
        );
        print('kWavePOPhase =', playdate.sound.kWavePOPhase, '(expected: 5)');
        print('kWavePOVosim =', playdate.sound.kWavePOVosim, '(expected: 7)');
        print('kWaveSawtooth =', playdate.sound.kWaveSawtooth, '(expected: 4)');
        print('kWaveSine =', playdate.sound.kWaveSine, '(expected: 2)');
        print('kWaveSquare =', playdate.sound.kWaveSquare, '(expected: 0)');
        print('kWaveTriangle =', playdate.sound.kWaveTriangle, '(expected: 1)');
        print(
            'kLFOSampleAndHold =',
            playdate.sound.kLFOSampleAndHold,
            '(expected: 3)',
        );
        print(
            'kLFOSawtoothDown =',
            playdate.sound.kLFOSawtoothDown,
            '(expected: 5)',
        );
        print(
            'kLFOSawtoothUp =',
            playdate.sound.kLFOSawtoothUp,
            '(expected: 4)',
        );
        print('kLFOSine =', playdate.sound.kLFOSine, '(expected: 2)');
        print('kLFOSquare =', playdate.sound.kLFOSquare, '(expected: 0)');
        print('kLFOTriangle =', playdate.sound.kLFOTriangle, '(expected: 1)');
        print(
            'kFilterBandPass =',
            playdate.sound.kFilterBandPass,
            '(expected: 2)',
        );
        print(
            'kFilterHighPass =',
            playdate.sound.kFilterHighPass,
            '(expected: 1)',
        );
        print(
            'kFilterHighShelf =',
            playdate.sound.kFilterHighShelf,
            '(expected: 6)',
        );
        print(
            'kFilterLowPass =',
            playdate.sound.kFilterLowPass,
            '(expected: 0)',
        );
        print(
            'kFilterLowShelf =',
            playdate.sound.kFilterLowShelf,
            '(expected: 5)',
        );
        print('kFilterNotch =', playdate.sound.kFilterNotch, '(expected: 3)');
        print('kFilterPEQ =', playdate.sound.kFilterPEQ, '(expected: 4)');
        print('');

        print('=== COLLECTING RESULTS FOR JSON ===');

        results[''] = [];
        results[''].push({
            name: 'kTextAlignment',
            type: String(kTextAlignment),
        });
        results['playdate'] = [];
        results['playdate'].push({
            name: 'kButtonA',
            type: String(playdate.kButtonA),
        });
        results['playdate'].push({
            name: 'kButtonB',
            type: String(playdate.kButtonB),
        });
        results['playdate'].push({
            name: 'kButtonDown',
            type: String(playdate.kButtonDown),
        });
        results['playdate'].push({
            name: 'kButtonLeft',
            type: String(playdate.kButtonLeft),
        });
        results['playdate'].push({
            name: 'kButtonRight',
            type: String(playdate.kButtonRight),
        });
        results['playdate'].push({
            name: 'kButtonUp',
            type: String(playdate.kButtonUp),
        });
        results['playdate.file'] = [];
        results['playdate.file'].push({
            name: 'kFileAppend',
            type: String(playdate.file.kFileAppend),
        });
        results['playdate.file'].push({
            name: 'kFileRead',
            type: String(playdate.file.kFileRead),
        });
        results['playdate.file'].push({
            name: 'kFileWrite',
            type: String(playdate.file.kFileWrite),
        });
        results['playdate.file'].push({
            name: 'kSeekSet',
            type: String(playdate.file.kSeekSet),
        });
        results['playdate.file'].push({
            name: 'kSeekFromCurrent',
            type: String(playdate.file.kSeekFromCurrent),
        });
        results['playdate.file'].push({
            name: 'kSeekFromEnd',
            type: String(playdate.file.kSeekFromEnd),
        });
        results['playdate.graphics'] = [];
        results['playdate.graphics'].push({
            name: 'kColorBlack',
            type: String(playdate.graphics.kColorBlack),
        });
        results['playdate.graphics'].push({
            name: 'kColorWhite',
            type: String(playdate.graphics.kColorWhite),
        });
        results['playdate.graphics'].push({
            name: 'kColorClear',
            type: String(playdate.graphics.kColorClear),
        });
        results['playdate.graphics'].push({
            name: 'kColorXOR',
            type: String(playdate.graphics.kColorXOR),
        });
        results['playdate.graphics'].push({
            name: 'kImageUnflipped',
            type: String(playdate.graphics.kImageUnflipped),
        });
        results['playdate.graphics'].push({
            name: 'kImageFlippedX',
            type: String(playdate.graphics.kImageFlippedX),
        });
        results['playdate.graphics'].push({
            name: 'kImageFlippedY',
            type: String(playdate.graphics.kImageFlippedY),
        });
        results['playdate.graphics'].push({
            name: 'kImageFlippedXY',
            type: String(playdate.graphics.kImageFlippedXY),
        });
        results['playdate.graphics'].push({
            name: 'kPolygonFillNonZero',
            type: String(playdate.graphics.kPolygonFillNonZero),
        });
        results['playdate.graphics'].push({
            name: 'kPolygonFillEvenOdd',
            type: String(playdate.graphics.kPolygonFillEvenOdd),
        });
        results['playdate.graphics'].push({
            name: 'kLineCapStyleButt',
            type: String(playdate.graphics.kLineCapStyleButt),
        });
        results['playdate.graphics'].push({
            name: 'kLineCapStyleRound',
            type: String(playdate.graphics.kLineCapStyleRound),
        });
        results['playdate.graphics'].push({
            name: 'kLineCapStyleSquare',
            type: String(playdate.graphics.kLineCapStyleSquare),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeBlackTransparent',
            type: String(playdate.graphics.kDrawModeBlackTransparent),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeCopy',
            type: String(playdate.graphics.kDrawModeCopy),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeFillBlack',
            type: String(playdate.graphics.kDrawModeFillBlack),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeFillWhite',
            type: String(playdate.graphics.kDrawModeFillWhite),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeInverted',
            type: String(playdate.graphics.kDrawModeInverted),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeNXOR',
            type: String(playdate.graphics.kDrawModeNXOR),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeWhiteTransparent',
            type: String(playdate.graphics.kDrawModeWhiteTransparent),
        });
        results['playdate.graphics'].push({
            name: 'kDrawModeXOR',
            type: String(playdate.graphics.kDrawModeXOR),
        });
        results['playdate.graphics'].push({
            name: 'kStrokeCentered',
            type: String(playdate.graphics.kStrokeCentered),
        });
        results['playdate.graphics'].push({
            name: 'kStrokeInside',
            type: String(playdate.graphics.kStrokeInside),
        });
        results['playdate.graphics'].push({
            name: 'kStrokeOutside',
            type: String(playdate.graphics.kStrokeOutside),
        });
        results['playdate.graphics'].push({
            name: 'kAlignCenter',
            type: String(playdate.graphics.kAlignCenter),
        });
        results['playdate.graphics'].push({
            name: 'kAlignLeft',
            type: String(playdate.graphics.kAlignLeft),
        });
        results['playdate.graphics'].push({
            name: 'kAlignRight',
            type: String(playdate.graphics.kAlignRight),
        });
        results['playdate.graphics'].push({
            name: 'kWrapCharacter',
            type: String(playdate.graphics.kWrapCharacter),
        });
        results['playdate.graphics'].push({
            name: 'kWrapClip',
            type: String(playdate.graphics.kWrapClip),
        });
        results['playdate.graphics'].push({
            name: 'kWrapWord',
            type: String(playdate.graphics.kWrapWord),
        });
        results['playdate.graphics.font'] = [];
        results['playdate.graphics.font'].push({
            name: 'kLanguageEnglish',
            type: String(playdate.graphics.font.kLanguageEnglish),
        });
        results['playdate.graphics.font'].push({
            name: 'kLanguageJapanese',
            type: String(playdate.graphics.font.kLanguageJapanese),
        });
        results['playdate.graphics.font'].push({
            name: 'kVariantBold',
            type: String(playdate.graphics.font.kVariantBold),
        });
        results['playdate.graphics.font'].push({
            name: 'kVariantItalic',
            type: String(playdate.graphics.font.kVariantItalic),
        });
        results['playdate.graphics.font'].push({
            name: 'kVariantNormal',
            type: String(playdate.graphics.font.kVariantNormal),
        });
        results['playdate.graphics.image'] = [];
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeNone',
            type: String(playdate.graphics.image.kDitherTypeNone),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeDiagonalLine',
            type: String(playdate.graphics.image.kDitherTypeDiagonalLine),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeVerticalLine',
            type: String(playdate.graphics.image.kDitherTypeVerticalLine),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeHorizontalLine',
            type: String(playdate.graphics.image.kDitherTypeHorizontalLine),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeScreen',
            type: String(playdate.graphics.image.kDitherTypeScreen),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeBayer2x2',
            type: String(playdate.graphics.image.kDitherTypeBayer2x2),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeBayer4x4',
            type: String(playdate.graphics.image.kDitherTypeBayer4x4),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeBayer8x8',
            type: String(playdate.graphics.image.kDitherTypeBayer8x8),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeFloydSteinberg',
            type: String(playdate.graphics.image.kDitherTypeFloydSteinberg),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeBurkes',
            type: String(playdate.graphics.image.kDitherTypeBurkes),
        });
        results['playdate.graphics.image'].push({
            name: 'kDitherTypeAtkinson',
            type: String(playdate.graphics.image.kDitherTypeAtkinson),
        });
        results['playdate.graphics.sprite'] = [];
        results['playdate.graphics.sprite'].push({
            name: 'kCollisionTypeBounce',
            type: String(playdate.graphics.sprite.kCollisionTypeBounce),
        });
        results['playdate.graphics.sprite'].push({
            name: 'kCollisionTypeFreeze',
            type: String(playdate.graphics.sprite.kCollisionTypeFreeze),
        });
        results['playdate.graphics.sprite'].push({
            name: 'kCollisionTypeOverlap',
            type: String(playdate.graphics.sprite.kCollisionTypeOverlap),
        });
        results['playdate.graphics.sprite'].push({
            name: 'kCollisionTypeSlide',
            type: String(playdate.graphics.sprite.kCollisionTypeSlide),
        });
        results['playdate.keyboard'] = [];
        results['playdate.keyboard'].push({
            name: 'kCapitalizationNormal',
            type: String(playdate.keyboard.kCapitalizationNormal),
        });
        results['playdate.keyboard'].push({
            name: 'kCapitalizationWords',
            type: String(playdate.keyboard.kCapitalizationWords),
        });
        results['playdate.keyboard'].push({
            name: 'kCapitalizationSentences',
            type: String(playdate.keyboard.kCapitalizationSentences),
        });
        results['playdate.network'] = [];
        results['playdate.network'].push({
            name: 'kStatusNotConnected',
            type: String(playdate.network.kStatusNotConnected),
        });
        results['playdate.network'].push({
            name: 'kStatusConnected',
            type: String(playdate.network.kStatusConnected),
        });
        results['playdate.network'].push({
            name: 'kStatusNotAvailable',
            type: String(playdate.network.kStatusNotAvailable),
        });
        results['playdate.sound'] = [];
        results['playdate.sound'].push({
            name: 'kFormat16bitMono',
            type: String(playdate.sound.kFormat16bitMono),
        });
        results['playdate.sound'].push({
            name: 'kFormat16bitStereo',
            type: String(playdate.sound.kFormat16bitStereo),
        });
        results['playdate.sound'].push({
            name: 'kFormat8bitMono',
            type: String(playdate.sound.kFormat8bitMono),
        });
        results['playdate.sound'].push({
            name: 'kFormat8bitStereo',
            type: String(playdate.sound.kFormat8bitStereo),
        });
        results['playdate.sound'].push({
            name: 'kWaveNoise',
            type: String(playdate.sound.kWaveNoise),
        });
        results['playdate.sound'].push({
            name: 'kWavePODigital',
            type: String(playdate.sound.kWavePODigital),
        });
        results['playdate.sound'].push({
            name: 'kWavePOPhase',
            type: String(playdate.sound.kWavePOPhase),
        });
        results['playdate.sound'].push({
            name: 'kWavePOVosim',
            type: String(playdate.sound.kWavePOVosim),
        });
        results['playdate.sound'].push({
            name: 'kWaveSawtooth',
            type: String(playdate.sound.kWaveSawtooth),
        });
        results['playdate.sound'].push({
            name: 'kWaveSine',
            type: String(playdate.sound.kWaveSine),
        });
        results['playdate.sound'].push({
            name: 'kWaveSquare',
            type: String(playdate.sound.kWaveSquare),
        });
        results['playdate.sound'].push({
            name: 'kWaveTriangle',
            type: String(playdate.sound.kWaveTriangle),
        });
        results['playdate.sound'].push({
            name: 'kLFOSampleAndHold',
            type: String(playdate.sound.kLFOSampleAndHold),
        });
        results['playdate.sound'].push({
            name: 'kLFOSawtoothDown',
            type: String(playdate.sound.kLFOSawtoothDown),
        });
        results['playdate.sound'].push({
            name: 'kLFOSawtoothUp',
            type: String(playdate.sound.kLFOSawtoothUp),
        });
        results['playdate.sound'].push({
            name: 'kLFOSine',
            type: String(playdate.sound.kLFOSine),
        });
        results['playdate.sound'].push({
            name: 'kLFOSquare',
            type: String(playdate.sound.kLFOSquare),
        });
        results['playdate.sound'].push({
            name: 'kLFOTriangle',
            type: String(playdate.sound.kLFOTriangle),
        });
        results['playdate.sound'].push({
            name: 'kFilterBandPass',
            type: String(playdate.sound.kFilterBandPass),
        });
        results['playdate.sound'].push({
            name: 'kFilterHighPass',
            type: String(playdate.sound.kFilterHighPass),
        });
        results['playdate.sound'].push({
            name: 'kFilterHighShelf',
            type: String(playdate.sound.kFilterHighShelf),
        });
        results['playdate.sound'].push({
            name: 'kFilterLowPass',
            type: String(playdate.sound.kFilterLowPass),
        });
        results['playdate.sound'].push({
            name: 'kFilterLowShelf',
            type: String(playdate.sound.kFilterLowShelf),
        });
        results['playdate.sound'].push({
            name: 'kFilterNotch',
            type: String(playdate.sound.kFilterNotch),
        });
        results['playdate.sound'].push({
            name: 'kFilterPEQ',
            type: String(playdate.sound.kFilterPEQ),
        });

        print('');
        print('=== COPY-PASTE JSON OUTPUT ===');
        print(
            'Copy the following JSON and replace the "constants" section in 2.7.6.json:',
        );
        print('');
        print(JSON.stringify(results, null, 4));
        print('');
        print('=== DEBUG COMPLETE ===');

        // Exit the simulator after printing
        playdate.stop();
    }
};
