/// <reference path="../libs/types/types/latest.d.ts" />

// Run this example with `crankscript simulator examples/hello-world.ts`
playdate.update = () => {
    playdate.graphics.clear(playdate.graphics.kColorBlack);
    playdate.graphics.setImageDrawMode(playdate.graphics.kDrawModeFillWhite);
    playdate.graphics.drawText('Hello, World!', 10, 10);
};
