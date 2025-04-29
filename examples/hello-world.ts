/// <reference path="../libs/types/types/latest.d.ts" />

// Run this example with `crankscript simulator examples/hello-world.ts`
playdate.update = () => {
    playdate.graphics.drawText('Hello, World...', 30, 10);
};
