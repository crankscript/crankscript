/// <reference path="../libs/types/types/latest.d.ts" />

// This file is generated automatically by the generate-constant-debug.ts script.

let hasRun = false;

playdate.update = () => {
    if (!hasRun) {
        hasRun = true;

        const results: Record<string, Record<string, unknown>[]> = {};

        results.playdate = [];
        results.playdate.push({
            name: 'kButtonA',
            type: String(playdate.kButtonA),
        });
        results.playdate.push({
            name: 'kButtonB',
            type: String(playdate.kButtonB),
        });
        results.playdate.push({
            name: 'kButtonDown',
            type: String(playdate.kButtonDown),
        });
        results.playdate.push({
            name: 'kButtonLeft',
            type: String(playdate.kButtonLeft),
        });
        results.playdate.push({
            name: 'kButtonRight',
            type: String(playdate.kButtonRight),
        });
        results.playdate.push({
            name: 'kButtonUp',
            type: String(playdate.kButtonUp),
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

        print(json.encodePretty(results));

        playdate.stop();
    }
};
