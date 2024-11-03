export class ImportMap {
    private imports = new Set<string>();

    toArray() {
        return Array.from(this.imports);
    }

    map(callback: Parameters<ReturnType<typeof this.toArray>['map']>[0]) {
        return this.toArray().map(callback);
    }

    add(importName: string) {
        this.imports.add(importName);
    }

    processName(name: string) {
        for (const [key, value] of Object.entries(this.map)) {
            if (value instanceof Set && value.has(name)) {
                this.add(key);
            }
        }
    }

    static map = {
        graphics: new Set(['graphics']),
        sprites: new Set(['sprite']),
        crank: new Set(['getCrankTicks']),
        object: new Set(['printTable']),
        'utilities/where': new Set(['where']),
        easing: new Set(['easingFunctions']),
        nineSlice: new Set(['nineSlice']),
        qrcode: new Set(['generateQRCode']),
        animation: new Set(['animation']),
        animator: new Set(['animator']),
        keyboard: new Set(['keyboard']),
        math: new Set(['math']),
        string: new Set(['string']),
        timer: new Set(['timer']),
        frameTimer: new Set(['frameTimer']),
        ui: new Set(['ui']),
    };
}
