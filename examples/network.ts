/// <reference path="../libs/types/types/latest.d.ts" />

let networkEnabled = false;

playdate.network.setEnabled(true, (error) => {
    if (error) {
        print(`Network error: ${error}`);
    } else {
        print('Network enabled');
        networkEnabled = true;
    }
});

playdate.update = () => {
    playdate.graphics.clear();

    if (!networkEnabled) {
        playdate.graphics.drawText('Network not enabled', 10, 10);
    } else {
        playdate.graphics.drawText('Network enabled', 10, 10);
    }
};
