/// <reference path="../libs/types/types/3.0.6.d.ts" />

// Run this example with `crankscript simulator examples/hello-world.ts`
playdate.update = () => {
    playdate.graphics.clear(PlaydateColor.Black);
    playdate.graphics.setImageDrawMode(PlaydateDrawMode.FillWhite);
    playdate.graphics.drawTextAligned(
        'Hello, World!',
        10,
        10,
        PlaydateTextAlignment.Left,
    );
};
