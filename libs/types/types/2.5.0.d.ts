/// <reference types="lua-types/5.4" />
// noinspection JSUnusedGlobalSymbols,JSDuplicatedDeclaration,ReservedWordAsName

/** Playdate SDK */
namespace playdate {
    import {
        PlaydateColor,
        PlaydateButton,
        PlaydateLanguage,
        PlaydateFlip,
        PlaydatePolygonFill,
        PlaydateDitherType,
        PlaydateLineCapStyle,
        PlaydateDrawMode,
        PlaydateStrokeLocation,
        PlaydateFontVariant,
        PlaydateTextAlignment,
        PlaydateCollisionResponse,
        PlaydateCapitalizationBehavior,
        PlaydateSoundFormat,
        PlaydateSoundWave,
        PlaydateSoundLfoType,
        PlaydateSoundTwoPoleFilterType,
        PlaydateFileOpenMode,
    } from '@crankscript/core';
    type PlaydateInputHandler = {
        AButtonDown: typeof AButtonDown;
        AButtonHeld: typeof AButtonHeld;
        AButtonUp: typeof AButtonUp;
        BButtonDown: typeof BButtonDown;
        BButtonHeld: typeof BButtonHeld;
        BButtonUp: typeof BButtonUp;
        downButtonDown: typeof downButtonDown;
        downButtonUp: typeof downButtonUp;
        leftButtonDown: typeof leftButtonDown;
        leftButtonUp: typeof leftButtonUp;
        rightButtonDown: typeof rightButtonDown;
        rightButtonUp: typeof rightButtonUp;
        upButtonDown: typeof upButtonDown;
        upButtonUp: typeof upButtonUp;
        cranked: typeof cranked;
        crankDocked: typeof crankDocked;
        crankUndocked: typeof crankUndocked;
    };
    type PlaydateFontFamily = {
        [PlaydateFontVariant.Normal]: PlaydateGraphicsFont;
        [PlaydateFontVariant.Bold]: PlaydateGraphicsFont;
        [PlaydateFontVariant.Italic]: PlaydateGraphicsFont;
    };
    type PlaydateFontFamilyPaths = {
        [PlaydateFontVariant.Normal]: string;
        [PlaydateFontVariant.Bold]: string;
        [PlaydateFontVariant.Italic]: string;
    };
    type PlaydateGenericCollision<
        TType extends PlaydateCollisionResponse,
        TExtra = {}
    > = {
        sprite: PlaydateSprite;
        other: PlaydateSprite;
        type: TType;
        overlaps: boolean;
        ti: number;
        move: PlaydateGeometryVector2D;
        normal: PlaydateGeometryVector2D;
        touch: PlaydateGeometryPoint;
        spriteRect: PlaydateGeometryRect;
        otherRect: PlaydateGeometryRect;
    } & TExtra;
    type PlaydateCollision =
        | PlaydateGenericCollision<PlaydateCollisionResponse.Overlap>
        | PlaydateGenericCollision<PlaydateCollisionResponse.Freeze>
        | PlaydateGenericCollision<
              PlaydateCollisionResponse.Bounce,
              { bounce: PlaydateGeometryPoint }
          >
        | PlaydateGenericCollision<
              PlaydateCollisionResponse.Slide,
              { slide: PlaydateGeometryPoint }
          >;
    type PlaydateEasingFunction =
        | typeof easingFunctions.linear
        | typeof easingFunctions.inQuad
        | typeof easingFunctions.outQuad
        | typeof easingFunctions.inOutQuad
        | typeof easingFunctions.outInQuad
        | typeof easingFunctions.inCubic
        | typeof easingFunctions.outCubic
        | typeof easingFunctions.inOutCubic
        | typeof easingFunctions.outInCubic
        | typeof easingFunctions.inQuart
        | typeof easingFunctions.outQuart
        | typeof easingFunctions.inOutQuart
        | typeof easingFunctions.outInQuart
        | typeof easingFunctions.inQuint
        | typeof easingFunctions.outQuint
        | typeof easingFunctions.inOutQuint
        | typeof easingFunctions.outInQuint
        | typeof easingFunctions.inSine
        | typeof easingFunctions.outSine
        | typeof easingFunctions.inOutSine
        | typeof easingFunctions.outInSine
        | typeof easingFunctions.inExpo
        | typeof easingFunctions.outExpo
        | typeof easingFunctions.inOutExpo
        | typeof easingFunctions.outInExpo
        | typeof easingFunctions.inCirc
        | typeof easingFunctions.outCirc
        | typeof easingFunctions.inOutCirc
        | typeof easingFunctions.outInCirc
        | typeof easingFunctions.inElastic
        | typeof easingFunctions.outElastic
        | typeof easingFunctions.inOutElastic
        | typeof easingFunctions.outInElastic
        | typeof easingFunctions.inBack
        | typeof easingFunctions.outBack
        | typeof easingFunctions.inOutBack
        | typeof easingFunctions.outInBack
        | typeof easingFunctions.outBounce
        | typeof easingFunctions.inBounce
        | typeof easingFunctions.inOutBounce
        | typeof easingFunctions.outInBounce;
    type PlaydateCollisionInfo = {
        sprite: PlaydateGraphicsSprite;
        entryPoint: PlaydateGeometryPoint;
        exitPoint: PlaydateGeometryPoint;
        ti1: number;
        ti2: number;
    };
    type PlaydateAudioSource =
        | PlaydateSoundFileplayer
        | PlaydateSoundSampleplayer
        | PlaydateSoundSynth
        | PlaydateSoundInstrument;
    type PlaydateSoundEffect =
        | PlaydateSoundBitcrusher
        | PlaydateSoundTwopolefilter
        | PlaydateSoundOnepolefilter
        | PlaydateSoundRingmod
        | PlaydateSoundOverdrive
        | PlaydateSoundDelayline;

    interface PlaydateMenu {
        /**
         * <p><em>title</em> will be the title displayed by the menu item.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.addMenuItem)
         */
        addMenuItem(
            title: string,
            callback: () => void
        ): PlaydateMenuItem | [null, string];
        /**
         * <p>Creates a new menu item that can be checked or unchecked by the player.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>title</em> will be the title displayed by the menu item.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>initialValue</em> can be set to <code>true</code> or <code>false</code>, indicating the checked state of the menu item. Optional, defaults to <code>false</code>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If this menu item is interacted with while the system menu is open, <em>callback</em> will be called when the menu is closed, before <a href="https://sdk.play.date/2.5.0#c-gameWillResume">playdate.gameWillResume</a> is called. The callback function will be passed one argument, a boolean value, indicating the current value of the menu item.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the returned <a href="https://sdk.play.date/2.5.0#menu-item">playdate.menu.item</a> is nil, a second <code>errorMessage</code> return value will indicate the reason the operation failed.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Playdate OS allows a maximum of <strong>three</strong> custom menu items to be added to the System Menu.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.addCheckmarkMenuItem)
         */
        addCheckmarkMenuItem(
            title: string,
            initialValue: boolean = false,
            callback: () => void
        ): PlaydateMenuItem | [null, string];
        /**
         * <p>Creates a menu item that allows the player to cycle through a set of options.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>title</em> will be the title displayed by the menu item.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>options</em> should be an array-style table of strings representing the states the menu item can have. Due to limited horizontal space, the option strings and title should be kept short for this type of menu item.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>initialValue</em> can optionally be set to any of the values in the options array.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the value of this menu item is changed while the system menu is open, <em>callback</em> will be called when the menu is closed, before <a href="https://sdk.play.date/2.5.0#c-gameWillResume">playdate.gameWillResume</a> is called. The callback function will be passed one string argument indicating the currently selection option.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the returned <a href="https://sdk.play.date/2.5.0#menu-item">playdate.menu.item</a> is nil, a second <code>errorMessage</code> return value will indicate the reason the operation failed.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Playdate OS allows a maximum of <strong>three</strong> custom menu items to be added to the System Menu.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.addOptionsMenuItem)
         */
        addOptionsMenuItem<TOptions extends string[]>(
            title: string,
            options: TOptions,
            initalValue: TOptions[number],
            callback: () => void
        ): PlaydateMenuItem | [null, string];
        /**
         * [Read more](https://sdk.play.date/2.5.0#m-menu.getMenuItems)
         */
        getMenuItems(): PlaydateMenuItem[];
        /**
         * <p>Removes the specified <a href="https://sdk.play.date/2.5.0#menu-item">playdate.menu.item</a> from the menu.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.removeMenuItem)
         */
        removeMenuItem(menuItem: PlaydateMenuItem): void;
        /**
         * <p>Removes from the referenced menu object all <a href="https://sdk.play.date/2.5.0#menu-item">playdate.menu.item</a>s added by your game.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Items that were added to the System Menu by the operating system cannot be removed by this operation, or any other.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.removeAllMenuItems)
         */
        removeAllMenuItems(): void;
    }

    interface PlaydateMenuItem {
        /**
         * <p>Sets the callback function for this menu item.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.item.setCallback)
         */
        setCallback(callback: () => void): void;
        /**
         * <p>Sets the title displayed for this menu item.</p>
         * </div>
         * <div class="paragraph">
         * <p>The <code>title</code> for a menu item can also be set using dot syntax.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.item.setTitle)
         */
        setTitle(newTitle: string): void;
        /**
         * <p>Returns the title displayed for this menu item.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.item.getTitle)
         */
        getTitle(): string;
        /**
         * <p>Sets the value for this menu item. The value is of a different type depending on the type of menu item:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p>normal: integer</p>
         * </li>
         * <li>
         * <p>checkmark: boolean</p>
         * </li>
         * <li>
         * <p>options: string</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>Values for any menu type can also be set using integers.</p>
         * </div>
         * <div class="paragraph">
         * <p>The <code>value</code> for a menu item can also be set using dot syntax.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.item.setValue)
         */
        setValue(newValue: number | boolean | string): void;
        /**
         * <p>Returns the value for this menu item.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-menu.item.getValue)
         */
        getValue(): number | boolean | string;
    }

    interface PlaydateFileFile {
        /**
         * <p>Closes the file.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.close"><code>playdate-&gt;file-&gt;close()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-file.close)
         */
        close(): void;
        /**
         * <p>Writes the given string to the file and returns the number of bytes written if successful, or 0 and a second return value describing the error. If you wish to include line termination characters (<code>\n</code>, <code>\r</code>), please include them in the string.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-file.write)
         */
        write(string: string): number | [0, string];
        /**
         * <p>Flushes any buffered data written to the file to the disk.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.flush"><code>playdate-&gt;file-&gt;flush()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-file.flush)
         */
        flush(): void;
        /**
         * <p>Returns the next line of the file, delimited by either <code>\n</code> or <code>\r\n</code>. The returned string does not include newline characters.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-file.readline)
         */
        readline(): string;
        /**
         * <p>Returns a buffer containing up to <em>numberOfBytes</em> bytes from the file, and the number of bytes read. If the read failed, the function returns <code>nil</code> and a second value describing the error.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.read"><code>playdate-&gt;file-&gt;read()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-file.read)
         */
        read(numberOfBytes: number): [string, number] | [null, string];
        /**
         * <p>Sets the file read/write position to the given byte offset.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.seek"><code>playdate-&gt;file-&gt;seek()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-file.seek)
         */
        seek(offset: number): void;
        /**
         * <p>Returns the current byte offset of the read/write position in the file.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.tell"><code>playdate-&gt;file-&gt;tell()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-file.tell)
         */
        tell(): number;
    }

    interface PlaydatePathfinderNode {
        /**
         * <p>Adds a new connection between nodes.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>node</em>: The node the new connection will point to.</p>
         * </li>
         * <li>
         * <p><em>weight</em>: Weight for the new connection. Weights affect the path the A* algorithm will solve for. A longer, lighter-weighted path will be chosen over a shorter heavier path, if available.</p>
         * </li>
         * <li>
         * <p><em>addReciprocalConnection</em>: If true, a second connection will be created with the same weight in the opposite direction.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.node.addConnection)
         */
        addConnection(
            node: PlaydatePathfinderNode,
            weight: number,
            addReciprocalConnection: boolean
        ): void;
        /**
         * <p>Adds a new connection to each node in the nodes array.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>nodes</em>: An array of nodes which the new connections will point to.</p>
         * </li>
         * <li>
         * <p><em>weights</em>: An array of weights for the new connections. Must be of the same length as the nodes array. Weights affect the path the A* algorithm will solve for. A longer, lighter-weighted path will be chosen over a shorter heavier path, if available.</p>
         * </li>
         * <li>
         * <p><em>addReciprocalConnections</em>: If true, connections will also be added in the reverse direction for each node.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.node.addConnections)
         */
        addConnections(
            nodes: PlaydatePathfinderNode[],
            weights: number[],
            addReciprocalConnections: boolean
        ): void;
        /**
         * <p>Adds a connection to the first node found with matching <em>x</em> and <em>y</em> values, if it exists.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>weight</em>: The weight for the new connection. Weights affect the path the A* algorithm will solve for. A longer, lighter-weighted path will be chosen over a shorter heavier path, if available.</p>
         * </li>
         * <li>
         * <p><em>addReciprocalConnections</em>: If true, a connection will also be added in the reverse direction, from the node at x, y to the caller.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.node.addConnectionToNodeWithXY)
         */
        addConnectionToNodeWithXY(
            x: number,
            y: number,
            weight: number,
            addReciprocalConnection: boolean
        ): void;
        /**
         * <p>Returns an array of nodes that have been added as connections to this node.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.node.connectedNodes)
         */
        connectedNodes(): PlaydatePathfinderNode[];
        /**
         * <p>Removes a connection to node, if it exists. If <em>removeReciprocal</em> is true the reverse connection will also be removed, if it exists.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.node.removeConnection)
         */
        removeConnection(
            node: PlaydatePathfinderNode,
            removeReciprocal: boolean = false
        ): void;
        /**
         * <p>Removes all connections from the calling node.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <code>removeIncoming</code> is true, all connections from other nodes to the calling node are also removed. False by default. Please note: this can signficantly increase the time this function takes as it requires a full search of the graph - O(1) vs O(n)).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.node.removeAllConnections)
         */
        removeAllConnections(removeIncoming: boolean = false): void;
        /**
         * <p>Sets the <em>x</em> and <em>y</em> values for the node.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.node.setXY)
         */
        setXY(x: number, y: number): void;
    }

    interface PlaydateSoundSignal {
        /**
         * <p>Adds a constant offset to the signal (lfo, envelope, etc.).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.signal.setOffset)
         */
        setOffset(offset: number): void;
        /**
         * <p>Multiplies the signal’s output by the given scale factor. The scale is applied before the offset.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.signal.setScale)
         */
        setScale(scale: number): void;
    }

    interface PlaydateSoundDelaylinetap {
        /**
         * <p>Sets the position of the tap on the delay line, up to the delay line’s length.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delaylinetap.setDelay)
         */
        setDelay(time: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the tap delay. If the signal is continuous (e.g. an envelope or a triangle LFO, but not a square LFO) playback is sped up or slowed down to compress or expand time. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delaylinetap.setDelayMod)
         */
        setDelayMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the tap’s volume.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delaylinetap.setVolume)
         */
        setVolume(level: number): void;
        /**
         * <p>Returns the tap’s volume.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delaylinetap.getVolume)
         */
        getVolume(): number;
        /**
         * <p>If set and the delay line is stereo, the tap outputs the delay line’s left channel to its right output and vice versa.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delaylinetap.setFlipChannels)
         */
        setFlipChannels(flag: boolean): void;
    }

    export const argv: unknown;
    export const isSimulator: 1 | null;

    /**
     * <p>Returns two values, the current API version of the Playdate runtime and the minimum API version supported by the runtime.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-apiVersion)
     *
     * @noSelf
     */
    export function apiVersion(): [number, number];

    /**
     * <p>The <code>playdate.metadata</code> table contains the values in the current game’s <a href="https://sdk.play.date/2.5.0#pdxinfo">pdxinfo</a> file, keyed by variable name. To retrieve the version number of the game, for example, you would use <code>playdate.metadata.version</code>.</p>
     * </div>
     * <div class="paragraph">
     * <p>Changing values in this table at run time has no effect.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-metadata)
     *
     * @noSelf
     */
    export function metadata(): AnyTable;

    /**
     * <p>Implement this callback and Playdate OS will call it once per frame. This is the place to put the main update-and-draw code for your game. Playdate will attempt to call this function by default 30 times per second; that value can be changed by calling <a href="https://sdk.play.date/2.5.0#f-display.setRefreshRate">playdate.display.setRefreshRate()</a>.</p>
     * </div>
     * <div class="admonitionblock note">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Note</div>
     * </td>
     * <td class="content">
     * If your <code>update()</code> function takes too long to execute, Playdate OS may not be able to call it as often as specified by the current refresh rate. In this case, Playdate OS will simply try and call it as often as it can, with a not-to-exceed rate of <a href="https://sdk.play.date/2.5.0#f-display.getRefreshRate">playdate.display.getRefreshRate()</a> frames per second.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-update)
     *
     * @noSelf
     */
    export function update(): void;

    /**
     * <p>Suspends callbacks to <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> for the specified number of milliseconds.</p>
     * </div>
     * <div class="admonitionblock tip">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Tip</div>
     * </td>
     * <td class="content">
     * <code>playdate.wait()</code> is ideal for pausing game execution to, for example, show a message to the player. Because <code>.update()</code> will not be called, the screen will freeze during <code>.wait()</code>. Audio will continue to play. Animation during this wait period is possible, but you will need to explicitly call <a href="https://sdk.play.date/2.5.0#f-display.flush"><code>playdate.display.flush()</code></a> once per frame.
     * </td>
     * </tr>
     * </tbody></table>
     * </div>
     * <div class="admonitionblock caution">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Caution</div>
     * </td>
     * <td class="content">
     * While timers should pause during <code>playdate.wait()</code> (assuming <a href="https://sdk.play.date/2.5.0#f-timer.updateTimers"><code>playdate.timer.updateTimers()</code></a> and <a href="https://sdk.play.date/2.5.0#f-frameTimer.updateTimers"><code>playdate.frameTimer.updateTimers()</code></a> are invoked during <code>playdate.update()</code>), <a href="https://sdk.play.date/2.5.0#C-graphics.animator">animators</a> will <em>not</em> pause during <code>playdate.wait()</code>. Be sure to account for this in your code.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-wait)
     *
     * @noSelf
     */
    export function wait(milliseconds: number): void;

    /**
     * <p>Stops per-frame callbacks to <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a>. Useful in conjunction with <a href="https://sdk.play.date/2.5.0#f-display.flush">playdate.display.flush()</a> if your program only does things in response to button presses.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-stop)
     *
     * @noSelf
     */
    export function stop(): void;

    /**
     * <p>Resumes per-frame callbacks to <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-start)
     *
     * @noSelf
     */
    export function start(): void;

    /**
     * <p>Reinitializes the Playdate runtime and restarts the currently running game. The optional string <code>arg</code> passed in is available after restart in <a href="https://sdk.play.date/2.5.0#v-argv">playdate.argv</a> as if it had been passed in on the command line when launching the simulator.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-restart)
     *
     * @noSelf
     */
    export function restart(arg: unknown): void;

    /**
     * <p>Called when the player chooses to exit the game via the System Menu or Menu button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-gameWillTerminate)
     *
     * @noSelf
     */
    export function gameWillTerminate(): void;

    /**
     * <p>Called before the device goes to low-power sleep mode because of a low battery.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-deviceWillSleep)
     *
     * @noSelf
     */
    export function deviceWillSleep(): void;

    /**
     * <p>If your game is running on the Playdate when the device is locked, this function will be called. Implementing this function allows your game to take special action when the Playdate is locked, e.g., saving state.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-deviceWillLock)
     *
     * @noSelf
     */
    export function deviceWillLock(): void;

    /**
     * <p>If your game is running on the Playdate when the device is unlocked, this function will be called.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-deviceDidUnlock)
     *
     * @noSelf
     */
    export function deviceDidUnlock(): void;

    /**
     * <p>Called before the system pauses the game. (In the current version of Playdate OS, this only happens when the device’s Menu button is pushed.) Implementing these functions allows your game to take special action when it is paused, e.g., updating the <a href="https://sdk.play.date/2.5.0#f-setMenuImage">menu image</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-gameWillPause)
     *
     * @noSelf
     */
    export function gameWillPause(): void;

    /**
     * <p>Called before the system resumes the game.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-gameWillResume)
     *
     * @noSelf
     */
    export function gameWillResume(): void;

    /**
     * <p>Returns a <code>playdate.menu</code> object. Use this to add your custom menu items.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-menu.getSystemMenu)
     *
     * @noSelf
     */
    export function getSystemMenu(): void;

    /**
     * <p>While the game is paused it can optionally provide an image to be displayed alongside the System Menu. Use this function to set that image.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>image</em> should be a 400 x 240 pixel <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a>. All important content should be in the left half of the image in an area 200 pixels wide, as the menu will obscure the rest. The right side of the image will be visible briefly as the menu animates in and out.</p>
     * </div>
     * <div class="paragraph">
     * <p>Optionally, <em>xOffset</em> can be provided which must be a number between 0 and 200 and will cause the menu image to animate to a position offset left by <em>xOffset</em> pixels as the menu is animated in.</p>
     * </div>
     * <div class="paragraph">
     * <p>To remove a previously-set menu image, pass <code>nil</code> for the <em>image</em> argument.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setMenuImage)
     *
     * @noSelf
     */
    export function setMenuImage(
        image: PlaydateGraphicsImage | null,
        xOffset: number
    ): void;

    /**
     * <p>Returns the current language of the system, which will be one of the constants <em>playdate.graphics.font.kLanguageEnglish</em> or
     * <em>playdate.graphics.font.kLanguageJapanese</em>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getSystemLanguage)
     *
     * @noSelf
     */
    export function getSystemLanguage(): PlaydateLanguage;

    /**
     * <p>Returns <em>true</em> if the user has checked the "Reduce Flashing" option in Playdate Settings; <em>false</em> otherwise. Games should read this value and, if <em>true</em>, avoid visuals that could be problematic for people with sensitivities to flashing lights or patterns.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getReduceFlashing)
     *
     * @noSelf
     */
    export function getReduceFlashing(): boolean;

    /**
     * <p>Returns <em>true</em> if the user has checked the "Upside Down" option in Playdate Settings; <em>false</em> otherwise. (Upside Down mode can be convenient for players wanting to hold Playdate upside-down so they can use their left hand to operate the crank.)</p>
     * </div>
     * <div class="paragraph">
     * <p>Typically your game doesn’t need to anything in regards to this setting. But it is available in case your game wants to take some special actions, display special instructions, etc.</p>
     * </div>
     * <div class="admonitionblock important">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Important</div>
     * </td>
     * <td class="content">
     * Reported d-pad directions are flipped when in Upside Down mode&nbsp;—&nbsp;RIGHT will be reported as LEFT, UP as DOWN, etc.&nbsp;—&nbsp;so that the d-pad will make sense to a user holding Playdate upside-down. However, the A and B buttons —&nbsp;since they are still labeled as "A" and "B"&nbsp;—&nbsp;retain their normal meanings and will be reported as usual.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getFlipped)
     *
     * @noSelf
     */
    export function getFlipped(): boolean;

    /**
     * <p>The accelerometer is off by default, to save a bit of power. If you will be using the accelerometer in your game, you’ll first need to call <code>playdate.startAccelerometer()</code> then wait for the next update cycle before reading its values. If you won’t be using the accelerometer again for a while, calling <code>playdate.stopAccelerometer()</code> will put it back into a low-power idle state.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-startAccelerometer)
     *
     * @noSelf
     */
    export function startAccelerometer(): void;

    /**
     * <p>Puts the accelerometer into a low-power idle state. (Though, to be honest, the accelerometer draws so little power when it’s running you’d never notice the difference.)</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-stopAccelerometer)
     *
     * @noSelf
     */
    export function stopAccelerometer(): void;

    /**
     * <p>If the accelerometer has been turned on with <a href="https://sdk.play.date/2.5.0#f-startAccelerometer">playdate.startAccelerometer()</a>, returns the x, y, and z values from the accelerometer as a list. Positive x points right, positive y points to the bottom of the screen, and positive z points through the screen away from the viewer. For example, with the device held upright this function returns the values (0,1,0). With it flat on its back, it returns (0,0,1).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-readAccelerometer)
     *
     * @noSelf
     */
    export function readAccelerometer(): [number, number, number];

    /**
     * <p>Returns true if the accelerometer is currently running.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-accelerometerIsRunning)
     *
     * @noSelf
     */
    export function accelerometerIsRunning(): boolean;

    /**
     * <p>Returns true if <em>button</em> is currently being pressed.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>button</em> should be one of the constants:</p>
     * </div>
     * <div class="ulist">
     * <ul>
     * <li>
     * <p><em>playdate.kButtonA</em></p>
     * </li>
     * <li>
     * <p><em>playdate.kButtonB</em></p>
     * </li>
     * <li>
     * <p><em>playdate.kButtonUp</em></p>
     * </li>
     * <li>
     * <p><em>playdate.kButtonDown</em></p>
     * </li>
     * <li>
     * <p><em>playdate.kButtonLeft</em></p>
     * </li>
     * <li>
     * <p><em>playdate.kButtonRight</em></p>
     * </li>
     * </ul>
     * </div>
     * <div class="paragraph">
     * <p>Or one of the strings "a", "b", "up", "down", "left", "right".</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-buttonIsPressed)
     *
     * @noSelf
     */
    export function buttonIsPressed(button: PlaydateButton): boolean;

    /**
     * <p>Returns true for <em>just one update cycle</em> if <em>button</em> was pressed. <code>buttonJustPressed</code> will not return true again until the button is released and pressed again. This is useful for, say, a player "jump" action, so the jump action is taken only once and not on every single update.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>button</em> should be one of the constants listed in <a href="https://sdk.play.date/2.5.0#f-buttonIsPressed">playdate.buttonIsPressed()</a></p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-buttonJustPressed)
     *
     * @noSelf
     */
    export function buttonJustPressed(button: PlaydateButton): boolean;

    /**
     * <p>Returns true for <em>just one update cycle</em> if <em>button</em> was released. <code>buttonJustReleased</code> will not return true again until the button is pressed and released again.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>button</em> should be one of the constants listed in <a href="https://sdk.play.date/2.5.0#f-buttonIsPressed">playdate.buttonIsPressed()</a></p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-buttonJustReleased)
     *
     * @noSelf
     */
    export function buttonJustReleased(button: PlaydateButton): boolean;

    /**
     * <p>Returns the above data in one call, with multiple return values (<em>current</em>, <em>pressed</em>, <em>released</em>) containing bitmasks indicating which buttons are currently down, and which were pressed and released since the last update. For example, if the d-pad left button and the A button are both down, the <em>current</em> value will be (<em>playdate.kButtonA</em>|<em>playdate.kButtonLeft</em>).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getButtonState)
     *
     * @noSelf
     */
    export function getButtonState(): [number, number, number];

    /**
     * <p>When set, button up/down events on the D pad and the A and B buttons are added to a list instead of simply polled at the beginning of a frame, allowing the code to handle multiple taps on a given button in a single frame. At the default 30 FPS, a queue size of 5 should be adequate. At lower frame rates/longer frame times, the queue size should be extended until all button presses are caught. Additionally, when the button queue is enabled the button callbacks listed below are passed the event time as an argument.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setButtonQueueSize)
     *
     * @noSelf
     */
    export function setButtonQueueSize(size: number): void;

    /**
     * <p>Called immediately after the player presses the A Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-AButtonDown)
     *
     * @noSelf
     */
    export function AButtonDown(): void;

    /**
     * <p>Called after the A Button is held down for one second. This can be used for secondary actions (e.g., displaying a game world map, changing weapons).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-AButtonHeld)
     *
     * @noSelf
     */
    export function AButtonHeld(): void;

    /**
     * <p>Called immediately after the player releases the A Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-AButtonUp)
     *
     * @noSelf
     */
    export function AButtonUp(): void;

    /**
     * <p>Called immediately after the player presses the B Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-BButtonDown)
     *
     * @noSelf
     */
    export function BButtonDown(): void;

    /**
     * <p>Called after the B Button is held down for one second. This can be used for secondary actions (e.g., displaying a game world map, changing weapons).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-BButtonHeld)
     *
     * @noSelf
     */
    export function BButtonHeld(): void;

    /**
     * <p>Called immediately after the player releases the B Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-BButtonUp)
     *
     * @noSelf
     */
    export function BButtonUp(): void;

    /**
     * <p>Called immediately after the player presses the down direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-downButtonDown)
     *
     * @noSelf
     */
    export function downButtonDown(): void;

    /**
     * <p>Called immediately after the player releases the down direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-downButtonUp)
     *
     * @noSelf
     */
    export function downButtonUp(): void;

    /**
     * <p>Called immediately after the player presses the left direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-leftButtonDown)
     *
     * @noSelf
     */
    export function leftButtonDown(): void;

    /**
     * <p>Called immediately after the player releases the left direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-leftButtonUp)
     *
     * @noSelf
     */
    export function leftButtonUp(): void;

    /**
     * <p>Called immediately after the player presses the right direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-rightButtonDown)
     *
     * @noSelf
     */
    export function rightButtonDown(): void;

    /**
     * <p>Called immediately after the player releases the right direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-rightButtonUp)
     *
     * @noSelf
     */
    export function rightButtonUp(): void;

    /**
     * <p>Called immediately after the player presses the up direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-upButtonDown)
     *
     * @noSelf
     */
    export function upButtonDown(): void;

    /**
     * <p>Called immediately after the player releases the up direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-upButtonUp)
     *
     * @noSelf
     */
    export function upButtonUp(): void;

    /**
     * <p>Returns a boolean indicating whether or not the crank is folded into the unit.</p>
     * </div>
     * <div class="admonitionblock tip">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Tip</div>
     * </td>
     * <td class="content">
     * If your game requires the crank and <code>:isCrankDocked()</code> is true, you can use a <a href="https://sdk.play.date/2.5.0#C-ui.crankIndicator">crank alert</a> to notify the user that the crank should be extended.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-isCrankDocked)
     *
     * @noSelf
     */
    export function isCrankDocked(): boolean;

    /**
     * <p>Returns the absolute position of the crank (in degrees). Zero is pointing straight up parallel to the device. Turning the crank clockwise (when looking at the right edge of an upright device) increases the angle, up to a maximum value 359.9999. The value then resets back to zero as the crank continues its rotation.</p>
     * </div>
     * <div class="listingblock">
     * <div class="content">
     * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">crankPosition</span> = playdate.getCrankPosition()</code></pre>
     * </div>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getCrankPosition)
     *
     * @noSelf
     */
    export function getCrankPosition(): number;

    /**
     * <p>Returns two values, <em>change</em> and <em>acceleratedChange</em>. <em>change</em> represents the angle change (in degrees) of the crank since the last time this function (or the <a href="https://sdk.play.date/2.5.0#c-cranked">playdate.cranked()</a> callback) was called. Negative values are anti-clockwise. <em>acceleratedChange</em> is change multiplied by a value that increases as the crank moves faster, similar to the way mouse acceleration works.</p>
     * </div>
     * <div class="listingblock">
     * <div class="content">
     * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">change</span>, <span class="local-variable">acceleratedChange</span> = playdate.getCrankChange()</code></pre>
     * </div>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getCrankChange)
     *
     * @noSelf
     */
    export function getCrankChange(): [number, number];

    /**
     * <p>Returns the number of "ticks" — whose frequency is defined by the value of <em>ticksPerRevolution</em>  — the crank has turned through since the last time this function was called. Tick boundaries are set at absolute positions along the crank’s rotation. Ticks can be positive or negative, depending upon the direction of rotation.</p>
     * </div>
     * <div class="paragraph">
     * <p>For example, say you have a movie player and you want your movie to advance 6 frames for every one revolution of the crank. Calling <code>playdate.getCrankTicks(6)</code> during each update will give you a return value of 1 as the crank turns past each 60 degree increment. (Since we passed in a 6, each tick represents 360 ÷ 6 = 60 degrees.) So <code>getCrankTicks(6)</code> will return a 1 as the crank turns past the 0 degree absolute position, the 60 degree absolute position, and so on for the 120, 180, 240, and 300 degree positions. Otherwise, 0 will be returned. (-1 will be returned if the crank moves past one of these mentioned positions while going in a backward direction.)</p>
     * </div>
     * <div class="admonitionblock important">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Important</div>
     * </td>
     * <td class="content">
     * You must import <em>CoreLibs/crank</em> to use <code>getCrankTicks()</code>.
     * </td>
     * </tr>
     * </tbody></table>
     * </div>
     * <div class="listingblock">
     * <div class="title">Example: Reading crank input using getCrankTicks</div>
     * <div class="content">
     * <pre class="CodeRay highlight"><code data-lang="lua">import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/crank</span><span class="delimiter">"</span></span>
     *
     * <span class="keyword">local</span> <span class="local-variable">ticksPerRevolution</span> = <span class="integer">6</span>
     *
     * <span class="keyword">function</span> playdate.<span class="function">update</span>()
     *     <span class="keyword">local</span> <span class="local-variable">crankTicks</span> = playdate.getCrankTicks(ticksPerRevolution)
     *
     *     <span class="keyword">if</span> crankTicks == <span class="integer">1</span> <span class="keyword">then</span>
     *         <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Forward tick</span><span class="delimiter">"</span></span>)
     *     <span class="keyword">elseif</span> crankTicks == <span class="integer">-1</span> <span class="keyword">then</span>
     *         <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Backward tick</span><span class="delimiter">"</span></span>)
     *     <span class="keyword">end</span>
     * <span class="keyword">end</span></code></pre>
     * </div>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getCrankTicks)
     *
     * @noSelf
     */
    export function getCrankTicks(ticksPerRevolution: number): number;

    /**
     * <p>For playdate.cranked(), <em>change</em> is the angle change in degrees. <em>acceleratedChange</em> is <em>change</em> multiplied by a value that increases as the crank moves faster, similar to the way mouse acceleration works. Negative values are anti-clockwise.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-cranked)
     *
     * @noSelf
     */
    export function cranked(change: number, acceleratedChange: number): void;

    /**
     * <p>This function, if defined, is called when the crank is docked.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-crankDocked)
     *
     * @noSelf
     */
    export function crankDocked(): void;

    /**
     * <p>This function, if defined, is called when the crank is undocked.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-crankUndocked)
     *
     * @noSelf
     */
    export function crankUndocked(): void;

    /**
     * <p><em>True</em> disables the default crank docking/undocking sound effects. <em>False</em> re-enables them. Useful if the crank sounds seem out-of-place in your game.</p>
     * </div>
     * <div class="admonitionblock note">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Note</div>
     * </td>
     * <td class="content">
     * When your game terminates, crank sounds will automatically be re-enabled.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setCrankSoundsDisabled)
     *
     * @noSelf
     */
    export function setCrankSoundsDisabled(disable: boolean): void;

    /**
     * <p><em>True</em> disables the 3 minute auto-lock feature. <em>False</em> re-enables it and resets the timer back to 3 minutes.</p>
     * </div>
     * <div class="admonitionblock note">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Note</div>
     * </td>
     * <td class="content">
     * Auto-lock will automatically be re-enabled when your game terminates.
     * </td>
     * </tr>
     * </tbody></table>
     * </div>
     * <div class="admonitionblock tip">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Tip</div>
     * </td>
     * <td class="content">
     * If disabling auto-lock, developers should look for opportunities to re-enable auto-lock when appropriate. (For example, if your game is an MP3 audio player, auto-lock could be re-enabled when the user pauses the audio.)
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setAutoLockDisabled)
     *
     * @noSelf
     */
    export function setAutoLockDisabled(disable: boolean): boolean;

    /**
     * <p>Returns the number of milliseconds the game has been <em>active</em> since launched.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getCurrentTimeMilliseconds)
     *
     * @noSelf
     */
    export function getCurrentTimeMilliseconds(): number;

    /**
     * <p>Resets the high-resolution timer.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-resetElapsedTime)
     *
     * @noSelf
     */
    export function resetElapsedTime(): number;

    /**
     * <p>Returns the number of seconds since <code>playdate.resetElapsedTime()</code> was called. The value is a floating-point number with microsecond accuracy.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getElapsedTime)
     *
     * @noSelf
     */
    export function getElapsedTime(): number;

    /**
     * <p>Returns the number of seconds and milliseconds elapsed since midnight (hour 0), January 1 2000 UTC, as a list: <em>(seconds, milliseconds)</em>. This function is suitable for seeding the random number generator:</p>
     * </div>
     * <div class="listingblock">
     * <div class="title">Sample code for seeding the random number generator</div>
     * <div class="content">
     * <pre class="CodeRay highlight"><code data-lang="lua">math.randomseed(playdate.getSecondsSinceEpoch())</code></pre>
     * </div>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getSecondsSinceEpoch)
     *
     * @noSelf
     */
    export function getSecondsSinceEpoch(): number;

    /**
     * <p>Returns a table with values for the local time, accessible via the following keys:</p>
     * </div>
     * <div class="ulist">
     * <ul>
     * <li>
     * <p><em>year</em>: 4-digit year (until 10,000 AD)</p>
     * </li>
     * <li>
     * <p><em>month</em>: month of the year, where 1 is January and 12 is December</p>
     * </li>
     * <li>
     * <p><em>day</em>: day of the month, 1 - 31</p>
     * </li>
     * <li>
     * <p><em>weekday</em>: day of the week, where 1 is Monday and 7 is Sunday</p>
     * </li>
     * <li>
     * <p><em>hour</em>: 0 - 23</p>
     * </li>
     * <li>
     * <p><em>minute</em>: 0 - 59</p>
     * </li>
     * <li>
     * <p><em>second</em>: 0 - 59 (or 60 on a leap second)</p>
     * </li>
     * <li>
     * <p><em>millisecond</em>: 0 - 999</p>
     * </li>
     * </ul>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getTime)
     *
     * @noSelf
     */
    export function getTime(): {
        year: number;
        month: number;
        day: number;
        weekday: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    };

    /**
     * <p>Returns a table in the same format as <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>, but in GMT rather than local time.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getGMTTime)
     *
     * @noSelf
     */
    export function getGMTTime(): {
        year: number;
        month: number;
        day: number;
        weekday: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    };

    /**
     * <p>Returns the number of seconds and milliseconds between midnight (hour 0), January 1 2000 UTC and <em>time</em>, specified in local time, as a list: <em>(seconds, milliseconds)</em>.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>time</em> should be a table of the same format as the one returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-epochFromTime)
     *
     * @noSelf
     */
    export function epochFromTime(time: {
        year: number;
        month: number;
        day: number;
        weekday: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    }): [number, number];

    /**
     * <p>Returns the number of seconds and milliseconds between midnight (hour 0), January 1 2000 UTC and <em>time</em>, specified in GMT time, as a list: <em>(seconds, milliseconds)</em>.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>time</em> should be a table of the same format as the one returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-epochFromGMTTime)
     *
     * @noSelf
     */
    export function epochFromGMTTime(time: {
        year: number;
        month: number;
        day: number;
        weekday: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    }): [number, number];

    /**
     * <p>Converts the epoch to a local date and time table, in the same format as the table returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-timeFromEpoch)
     *
     * @noSelf
     */
    export function timeFromEpoch(
        seconds: number,
        milliseconds: number
    ): {
        year: number;
        month: number;
        day: number;
        weekday: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    };

    /**
     * <p>Converts the epoch to a GMT date and time table, in the same format as the table returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-GMTTimeFromEpoch)
     *
     * @noSelf
     */
    export function GMTTimeFromEpoch(
        seconds: number,
        milliseconds: number
    ): {
        year: number;
        month: number;
        day: number;
        weekday: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number;
    };

    /**
     * <p>Returns true if the user has set the 24-Hour Time preference in the Settings program.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-shouldDisplay24HourTime)
     *
     * @noSelf
     */
    export function shouldDisplay24HourTime(): boolean;

    /**
     * <p><em>flag</em> determines whether or not the print() function adds a newline to the end of the printed text.  Default is <em>true</em>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setNewlinePrinted)
     *
     * @noSelf
     */
    export function setNewlinePrinted(flag: boolean): void;

    /**
     * <p>Calculates the current frames per second and draws that value at <em>x, y</em>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-drawFPS)
     *
     * @noSelf
     */
    export function drawFPS(x: number, y: number): void;

    /**
     * <p>Returns the <em>measured, actual</em> refresh rate in frames per second. This value may be different from the <em>specified</em> refresh rate (see <a href="https://sdk.play.date/2.5.0#f-display.getRefreshRate">playdate.display.getRefreshRate()</a>) by a little or a lot depending upon how much calculation is being done per frame.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getFPS)
     *
     * @noSelf
     */
    export function getFPS(): number;

    /**
     * <p>Returns a table containing percentages of time spent in each system task over the last interval, if more than zero. Possible keys are</p>
     * </div>
     * <div class="ulist">
     * <ul>
     * <li>
     * <p><code>kernel</code></p>
     * </li>
     * <li>
     * <p><code>serial</code></p>
     * </li>
     * <li>
     * <p><code>game</code></p>
     * </li>
     * <li>
     * <p><code>GC</code></p>
     * </li>
     * <li>
     * <p><code>wifi</code></p>
     * </li>
     * <li>
     * <p><code>audio</code></p>
     * </li>
     * <li>
     * <p><code>trace</code></p>
     * </li>
     * <li>
     * <p><code>idle</code></p>
     * </li>
     * </ul>
     * </div>
     * <div class="admonitionblock important">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Important</div>
     * </td>
     * <td class="content">
     * <code>playdate.getStats()</code> only functions on a Playdate device. In the Simulator, this function returns <code>nil</code>.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getStats)
     *
     * @noSelf
     */
    export function getStats(): {
        kernel: number;
        serial: number;
        game: number;
        GC: number;
        wifi: number;
        audio: number;
        trace: number;
        idle: number;
    };

    /**
     * <p><code>setStatsInterval()</code> sets the length of time for each sample frame of runtime stats. Set <em>seconds</em> to zero to disable stats collection.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setStatsInterval)
     *
     * @noSelf
     */
    export function setStatsInterval(seconds: number): void;

    /**
     * <p>Returns a table holding booleans with the following keys:</p>
     * </div>
     * <div class="ulist">
     * <ul>
     * <li>
     * <p><em>charging</em>: The battery is actively being charged</p>
     * </li>
     * <li>
     * <p><em>USB</em>: There is a powered USB cable connected</p>
     * </li>
     * <li>
     * <p><em>screws</em>: There is 5V being applied to the corner screws (via the dock, for example)</p>
     * </li>
     * </ul>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getPowerStatus)
     *
     * @noSelf
     */
    export function getPowerStatus(): {
        charging: boolean;
        USB: boolean;
        screws: boolean;
    };

    /**
     * <p>Returns a value from 0-100 denoting the current level of battery charge. 0 = empty; 100 = full.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getBatteryPercentage)
     *
     * @noSelf
     */
    export function getBatteryPercentage(): number;

    /**
     * <p>Returns the battery’s current voltage level.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getBatteryVoltage)
     *
     * @noSelf
     */
    export function getBatteryVoltage(): number;

    /**
     * <p>Clears the simulator console.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-clearConsole)
     *
     * @noSelf
     */
    export function clearConsole(): void;

    /**
     * <p>Sets the color of the <a href="https://sdk.play.date/2.5.0#c-debugDraw">playdate.debugDraw()</a> overlay image. Values are in the range 0-1.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setDebugDrawColor)
     *
     * @noSelf
     */
    export function setDebugDrawColor(
        r: number,
        g: number,
        b: number,
        a: number
    ): void;

    /**
     * <p>Lets you act on keyboard keypresses when running in the Simulator ONLY. These can be useful for adding debugging functions that can be enabled via your keyboard.</p>
     * </div>
     * <div class="admonitionblock note">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Note</div>
     * </td>
     * <td class="content">
     * It is possible test a game on Playdate hardware and trap computer keyboard keypresses if you are using the Simulator’s <code>Control Device with Simulator</code> option.
     * </td>
     * </tr>
     * </tbody></table>
     * </div>
     * <div class="paragraph">
     * <p><code>key</code> is a string containing the character pressed or released on the keyboard. Note that:</p>
     * </div>
     * <div class="ulist">
     * <ul>
     * <li>
     * <p>The key in question needs to have a textual representation or these functions will not be called. For instance, alphanumeric keys will call these functions; keyboard directional arrows will not.</p>
     * </li>
     * <li>
     * <p>If the keypress in question is already in use by the Simulator for another purpose (say, to control the d-pad or A/B buttons), these functions will not be called.</p>
     * </li>
     * <li>
     * <p>If <em>key</em> is an alphabetic character, the value will always be lowercase, even if the user deliberately typed an uppercase character.</p>
     * </li>
     * </ul>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-keyPressed)
     *
     * @noSelf
     */
    export function keyPressed(key: string): void;

    /**
     * <p>Lets you act on keyboard key releases when running in the Simulator ONLY. These can be useful for adding debugging functions that can be enabled via your keyboard.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-keyReleased)
     *
     * @noSelf
     */
    export function keyReleased(key: string): void;

    /**
     * <p>Called immediately after <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a>, any drawing performed during this callback is overlaid on the display in 50% transparent red (or another color selected with <a href="https://sdk.play.date/2.5.0#f-setDebugDrawColor">playdate.setDebugDrawColor()</a>).</p>
     * </div>
     * <div class="paragraph">
     * <p>White pixels are drawn in the <a href="https://sdk.play.date/2.5.0#f-setDebugDrawColor">debugDrawColor</a>. Black pixels are transparent.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-debugDraw)
     *
     * @noSelf
     */
    export function debugDraw(): void;

    /**
     * <p>If <em>flag</em> is false, automatic garbage collection is disabled and the game should manually collect garbage with Lua’s <code>collectgarbage()</code> function.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setCollectsGarbage)
     *
     * @noSelf
     */
    export function setCollectsGarbage(flag: boolean): void;

    /**
     * <p>Force the Lua garbage collector to run for at least <em>ms</em> milliseconds every frame, so that garbage doesn’t pile up and cause the game to run out of memory and stall in emergency garbage collection. The default value is 1 millisecond.</p>
     * </div>
     * <div class="admonitionblock tip">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Tip</div>
     * </td>
     * <td class="content">
     * If your game isn’t generating a lot of garbage, it might be advantageous to set a smaller minimum GC time, granting more CPU bandwidth to your game.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setMinimumGCTime)
     *
     * @noSelf
     */
    export function setMinimumGCTime(ms: number): void;

    /**
     * <p>When the amount of used memory is less than <code>min</code> (scaled from 0-1, as a percentage of total system memory), the system will only run the collector for the minimum GC time, as set by <a href="https://sdk.play.date/2.5.0#f-setGCScaling">playdate.setGCScaling()</a>, every frame. If the used memory is more than <code>max</code>, the system will spend all free time running the collector. Between the two, the time used by the garbage collector is scaled proportionally.</p>
     * </div>
     * <div class="paragraph">
     * <p>For example, if the scaling is set to a min of 0.4 and max of 0.7, and memory is half full, the collector will run for the minimum GC time plus 1/3 of whatever time is left before the next frame (because (0.5 - 0.4) / (0.7 - 0.4) = 1/3).</p>
     * </div>
     * <div class="paragraph">
     * <p>The default behavior is a scaling of <code>(0.0, 1.0)</code>. If set to <code>(0.0, 0.0)</code>, the system will use all available extra time each frame running GC.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setGCScaling)
     *
     * @noSelf
     */
    export function setGCScaling(min: number, max: number): void;

    /**
     * <p>Called when a <code>msg &lt;text&gt;</code> command is received on the serial port. The text following the command is passed to the function as the string <em>message</em>.</p>
     * </div>
     * <div class="paragraph">
     * <p>Running <code>!msg &lt;message&gt;</code> in the simulator Lua console sends the command to the device if one is connected, otherwise it sends it to the game running in the simulator.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-serialMessageReceived)
     *
     * @noSelf
     */
    export function serialMessageReceived(message: string): void;

    namespace inputHandlers {
        /**
         * <p>Pushes a new input handler onto the stack.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>handler:</em> A table containing one or more custom input functions.</p>
         * </li>
         * <li>
         * <p><em>masksPreviousHandlers:</em> If true, input functions not defined in <em>handler</em> will not be called. If missing or false, the previously-pushed input handler tables will be searched for input functions missing from <em>handler</em>, cascading down to the default <code>playdate</code> table.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-inputHandlers.push)
         *
         * @noSelf
         */
        export function push(
            handler: PlaydateInputHandler,
            masksPreviousHandlers: boolean
        ): void;

        /**
         * <p>Pops the last input handler off of the stack.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-inputHandlers.pop)
         *
         * @noSelf
         */
        export function pop(): void;
    }

    namespace display {
        /**
         * <p>Sets the desired refresh rate in frames per second. The default is 30 fps, which is a recommended figure that balances animation smoothness with performance and power considerations. Maximum is 50 fps.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>rate</em> is 0, <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a> is called as soon as possible. Since the display refreshes line-by-line, and unchanged lines aren’t sent to the display, the update cycle will be faster than 30 times a second but at an indeterminate rate. <a href="https://sdk.play.date/2.5.0#f-getCurrentTimeMilliseconds">playdate.getCurrentTimeMilliseconds()</a> should then be used as a steady time base.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setRefreshRate"><code>playdate-&gt;display-&gt;setRefreshRate()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setRefreshRate)
         *
         * @noSelf
         */
        export function setRefreshRate(rate: number): void;

        /**
         * <p>Returns the specified refresh rate in frames per second. See also <a href="https://sdk.play.date/2.5.0#f-getFPS">playdate.getFPS()</a> for <em>measured, actual</em> frame rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getRefreshRate)
         *
         * @noSelf
         */
        export function getRefreshRate(): number;

        /**
         * <p>Sends the contents of the frame buffer to the display immediately. Useful if you have called <a href="https://sdk.play.date/2.5.0#f-stop">playdate.stop()</a> to disable update callbacks in, say, the case where your app updates the display only in reaction to button presses.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.flush)
         *
         * @noSelf
         */
        export function flush(): void;

        /**
         * <p>Returns the height the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.getHeight"><code>playdate-&gt;display-&gt;getHeight()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getHeight)
         *
         * @noSelf
         */
        export function getHeight(): number;

        /**
         * <p>Returns the width the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.getWidth"><code>playdate-&gt;display-&gt;getWidth()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getWidth)
         *
         * @noSelf
         */
        export function getWidth(): number;

        /**
         * <p>Returns the values <em>(width, height)</em> describing the Playdate display size. Takes the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getSize)
         *
         * @noSelf
         */
        export function getSize(): [number, number];

        /**
         * <p>Returns the values <em>(x, y, width, height)</em> describing the Playdate display size. Takes the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getRect)
         *
         * @noSelf
         */
        export function getRect(): [number, number, number, number];

        /**
         * <p>Sets the display scale factor. Valid values for <em>scale</em> are 1, 2, 4, and 8.</p>
         * </div>
         * <div class="paragraph">
         * <p>The top-left corner of the frame buffer is scaled up to fill the display; e.g., if the scale is set to 4, the pixels in rectangle [0,100] x [0,60] are drawn on the screen as 4 x 4 squares.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setScale"><code>playdate-&gt;display-&gt;setScale()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setScale)
         *
         * @noSelf
         */
        export function setScale(scale: 1 | 2 | 4 | 8): void;

        /**
         * <p>Gets the display scale factor. Valid values for <em>scale</em> are 1, 2, 4, and 8.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getScale)
         *
         * @noSelf
         */
        export function getScale(): 1 | 2 | 4 | 8;

        /**
         * <p>If the argument passed to <code>setInverted()</code> is true, the frame buffer will be drawn inverted (everything onscreen that was black will now be white, etc.)</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setInverted"><code>playdate-&gt;display-&gt;setInverted()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setInverted)
         *
         * @noSelf
         */
        export function setInverted(flag: boolean): void;

        /**
         * <p>Returns the current value of the display invert flag.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getInverted)
         *
         * @noSelf
         */
        export function getInverted(): boolean;

        /**
         * <p>Adds a mosaic effect to the display. Valid <em>x</em> and <em>y</em> values are between 0 and 3, inclusive.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setMosaic"><code>playdate-&gt;display-&gt;setMosaic()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setMosaic)
         *
         * @noSelf
         */
        export function setMosaic(x: number, y: number): void;

        /**
         * <p>Returns the current mosaic effect settings as multiple values (<em>x</em>, <em>y</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getMosaic)
         *
         * @noSelf
         */
        export function getMosaic(): [number, number];

        /**
         * <p>Offsets the entire display by <em>x</em>, <em>y</em>. Offset values can be negative. The "exposed" part of the display is black or white, according to the value set in <a href="https://sdk.play.date/2.5.0#f-graphics.setBackgroundColor">playdate.graphics.setBackgroundColor()</a>. This is an efficient way to make a "shake" effect without redrawing anything.</p>
         * </div>
         * <div class="admonitionblock caution">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Caution</div>
         * </td>
         * <td class="content">
         * This function is different from <a href="https://sdk.play.date/2.5.0#f-graphics.setDrawOffset">playdate.graphics.setDrawOffset()</a>.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setOffset"><code>playdate-&gt;display-&gt;setOffset()</code></a> in the C API.</p>
         * </div>
         * <div class="listingblock">
         * <div class="title">Example: A screen shake effect using setOffset</div>
         * <div class="content">
         * <pre class="CodeRay highlight"><code data-lang="lua"><span class="comment">-- You can copy and paste this example directly as your main.lua file to see it in action</span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/graphics</span><span class="delimiter">"</span></span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/timer</span><span class="delimiter">"</span></span>
         *
         * <span class="comment">-- This function relies on the use of timers, so the timer core library</span>
         * <span class="comment">-- must be imported, and updateTimers() must be called in the update loop</span>
         * <span class="keyword">local</span> <span class="keyword">function</span> <span class="function">screenShake</span>(shakeTime, shakeMagnitude)
         *     <span class="comment">-- Creating a value timer that goes from shakeMagnitude to 0, over</span>
         *     <span class="comment">-- the course of 'shakeTime' milliseconds</span>
         *     <span class="keyword">local</span> <span class="local-variable">shakeTimer</span> = playdate.timer.new(shakeTime, shakeMagnitude, <span class="integer">0</span>)
         *     <span class="comment">-- Every frame when the timer is active, we shake the screen</span>
         *     shakeTimer.updateCallback = <span class="keyword">function</span>(timer)
         *         <span class="comment">-- Using the timer value, so the shaking magnitude</span>
         *         <span class="comment">-- gradually decreases over time</span>
         *         <span class="keyword">local</span> <span class="local-variable">magnitude</span> = math.floor(timer.value)
         *         <span class="keyword">local</span> <span class="local-variable">shakeX</span> = math.random(-magnitude, magnitude)
         *         <span class="keyword">local</span> <span class="local-variable">shakeY</span> = math.random(-magnitude, magnitude)
         *         playdate.display.setOffset(shakeX, shakeY)
         *     <span class="keyword">end</span>
         *     <span class="comment">-- Resetting the display offset at the end of the screen shake</span>
         *     shakeTimer.timerEndedCallback = <span class="keyword">function</span>()
         *         playdate.display.setOffset(<span class="integer">0</span>, <span class="integer">0</span>)
         *     <span class="keyword">end</span>
         * <span class="keyword">end</span>
         *
         * <span class="keyword">function</span> playdate.<span class="function">update</span>()
         *     playdate.timer.updateTimers()
         *     <span class="keyword">if</span> playdate.buttonJustPressed(playdate.kButtonA) <span class="keyword">then</span>
         *         <span class="comment">-- Shake the screen for 500ms, with the screen</span>
         *         <span class="comment">-- shaking around by about 5 pixels on each side</span>
         *         screenShake(<span class="integer">500</span>, <span class="integer">5</span>)
         *     <span class="keyword">end</span>
         *
         *     <span class="comment">-- A circle to be able to view what the shaking looks like</span>
         *     playdate.graphics.fillCircleAtPoint(<span class="integer">200</span>, <span class="integer">120</span>, <span class="integer">10</span>)
         * <span class="keyword">end</span></code></pre>
         * </div>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setOffset)
         *
         * @noSelf
         */
        export function setOffset(x: number, y: number): void;

        /**
         * <p><code>getOffset()</code> returns the current display offset as multiple values (<em>x</em>, <em>y</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getOffset)
         *
         * @noSelf
         */
        export function getOffset(): [number, number];

        /**
         * <p>Flips the display on the x or y axis, or both.</p>
         * </div>
         * <div class="admonitionblock caution">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Caution</div>
         * </td>
         * <td class="content">
         * Function arguments are booleans, and in Lua <code>0</code> evaluates to <code>true</code>.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setFlipped"><code>playdate-&gt;display-&gt;setFlipped()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setFlipped)
         *
         * @noSelf
         */
        export function setFlipped(x: boolean, y: boolean): void;

        /**
         * <p>The simplest method for putting an image on the display. Copies the contents of the image at <em>path</em> directly to the frame buffer. The image must be 400x240 pixels with no transparency.</p>
         * </div>
         * <div class="admonitionblock tip">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Tip</div>
         * </td>
         * <td class="content">
         * Loading an image via <a href="https://sdk.play.date/2.5.0#f-graphics.image.new-path">playdate.graphics.image.new()</a> and drawing it at a desired coordinate with <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw">playdate.graphics.image:draw()</a> offers more flexibility.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.loadImage)
         *
         * @noSelf
         */
        export function loadImage(path: string): void;
    }

    namespace easingFunctions {
        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function linear(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inQuad(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outQuad(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutQuad(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInQuad(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inCubic(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outCubic(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutCubic(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInCubic(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inQuart(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outQuart(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutQuart(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInQuart(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inQuint(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outQuint(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutQuint(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInQuint(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inSine(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outSine(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutSine(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInSine(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inExpo(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outExpo(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutExpo(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInExpo(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inCirc(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outCirc(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutCirc(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInCirc(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inElastic(
            t: number,
            b: number,
            c: number,
            d: number,
            a: number,
            p: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outElastic(
            t: number,
            b: number,
            c: number,
            d: number,
            a: number,
            p: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutElastic(
            t: number,
            b: number,
            c: number,
            d: number,
            a: number,
            p: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInElastic(
            t: number,
            b: number,
            c: number,
            d: number,
            a: number,
            p: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inBack(
            t: number,
            b: number,
            c: number,
            d: number,
            s: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outBack(
            t: number,
            b: number,
            c: number,
            d: number,
            s: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutBack(
            t: number,
            b: number,
            c: number,
            d: number,
            s: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInBack(
            t: number,
            b: number,
            c: number,
            d: number,
            s: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outBounce(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inBounce(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function inOutBounce(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;

        /**
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>t</em> is elapsed time</p>
         * </li>
         * <li>
         * <p><em>b</em> is the beginning value</p>
         * </li>
         * <li>
         * <p><em>c</em> is the change (or end value - start value)</p>
         * </li>
         * <li>
         * <p><em>d</em> is the duration</p>
         * </li>
         * <li>
         * <p><em>a</em> - amplitude</p>
         * </li>
         * <li>
         * <p><em>p</em> - period parameter</p>
         * </li>
         * <li>
         * <p><em>s</em> - amount of "overshoot"</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-easingFunctions)
         *
         * @noSelf
         */
        export function outInBounce(
            t: number,
            b: number,
            c: number,
            d: number
        ): void;
    }

    namespace datastore {
        /**
         * <p>Encodes the given table into the named file. (The <code>.json</code> extension should be omitted from the file name.) The default file name is "data". If <em>pretty-print</em> is true, the JSON will be nicely formatted.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.write)
         *
         * @noSelf
         */
        export function write(
            table: AnyTable,
            filename: string,
            prettyPrint: boolean
        ): void;

        /**
         * <p>Returns a table instantiated with the data in the JSON-encoded file you specify. (The <code>.json</code> extension should be omitted.)  The default file name is "data". If no file is found, this function returns nil.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.read)
         *
         * @noSelf
         */
        export function read(filename: string): AnyTable | null;

        /**
         * <p>Deletes the specified datastore file. The default file name is "data". Returns <code>false</code> if the datastore file could not be deleted.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.delete)
         *
         * @noSelf
         */
        function _delete(filename: string): boolean;

        export { _delete as delete };

        /**
         * <p>Saves a <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a> to a file. If <em>path</em> doesn’t contain a folder name, the image is stored in a folder named "images".</p>
         * </div>
         * <div class="paragraph">
         * <p>By default, this method writes out a PDI file, a custom image format used by Playdate that can be read back in using <a href="https://sdk.play.date/2.5.0#f-datastore.readImage">readImage()</a>. If you want to write out a GIF file, append a <code>.gif</code> extension to your <em>path</em>.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * Because <code>writeImage()</code> doesn’t currently support GIF transparency, if you attempt to write a GIF from an image buffer you instantiated, you must call <a href="https://sdk.play.date/2.5.0#f-graphics.image.new">playdate.graphics.image.new( <em>width, height, bgcolor</em> )</a> with <em>bgcolor</em> set to <code>playdate.graphics.kColorWhite</code> or <code>playdate.graphics.kColorBlack</code>, otherwise your image will render improperly to the file.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.writeImage)
         *
         * @noSelf
         */
        export function writeImage(
            image: PlaydateGraphicsImage,
            path: string
        ): void;

        /**
         * <p>Reads a <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a> from a file in the data folder. If <em>path</em> doesn’t contain a folder name, the image is searched for in a folder named "images".</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * <code>readImage()</code> can only load compiled pdi files. (<a href="https://sdk.play.date/2.5.0#f-datastore.writeImage"><code>writeImage()</code></a> by default creates compiled pdi files.)
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.readImage)
         *
         * @noSelf
         */
        export function readImage(path: string): PlaydateGraphicsImage;
    }

    namespace file {
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#M-file">playdate.file.file</a> corresponding to the opened file. <em>mode</em> should be one of the following:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><strong>playdate.file.kFileRead</strong>: the file is opened for reading; the system first looks in the /Data/&lt;bundleid&gt; folder for the given file, then in the game’s pdx folder if it isn’t found</p>
         * </li>
         * <li>
         * <p><strong>playdate.file.kFileWrite</strong>: the file is created if it doesn’t exist, truncated to zero length if it does, then opened for writing</p>
         * </li>
         * <li>
         * <p><strong>playdate.file.kFileAppend</strong>: the file is created if it doesn’t exist, opened for writing, with new data written to the end of the file</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>If <em>mode</em> is not specified, the default is <em>playdate.file.kFileRead</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the file couldn’t be opened, a second return value indicates the error. The filesystem has a limit of 64 simultaneous open files.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.open"><code>playdate-&gt;file-&gt;open()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.open)
         *
         * @noSelf
         */
        export function open(
            path: string,
            mode: PlaydateFileOpenMode = PlaydateFileOpenMode.Read
        ): PlaydateFileFile;

        /**
         * <p>Returns an array containing the file names in the given directory path as strings. Folders are indicated by a slash <code>/</code> at the end of the filename. If <em>showhidden</em> is set, files beginning with a period will be included; otherwise, they are skipped.</p>
         * </div>
         * <div class="paragraph">
         * <p>Call with no argument to get a list of all files and folders your game has access to. (For a game with default access permissions, <code>listFiles()</code>, <code>listFiles("/")</code>, and <code>listFiles(".")</code> should all return the same result.)</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.listfiles"><code>playdate-&gt;file-&gt;listfiles()</code></a> in the C API.</p>
         * </div>
         * <div class="paragraph">
         * <p><a href="https://sdk.play.date/2.5.0#about-playdate-filesystem">Learn more about the Playdate filesystem</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.listFiles)
         *
         * @noSelf
         */
        export function listFiles(path: string, showhidden: boolean): string[];

        /**
         * <p>Returns true if a file exists at the given path. Unlike the <a href="https://sdk.play.date/2.5.0#f-graphics.image.new-path">image</a> or <a href="https://sdk.play.date/2.5.0#f-sound.sample.new-path">sound</a> loading functions, this function requires <em>path</em> to include the file extension since it cannot be inferred from context. Additionally, note that asset files are compiled into a format easier for Playdate to use and will have a different extension: <code>.wav</code> and <code>.aiff</code> audio files are compiled to <code>.pda</code> format, and <code>.gif</code> and <code>.png</code> files become `.pdi`s.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.exists)
         *
         * @noSelf
         */
        export function exists(path: string): boolean;

        /**
         * <p>Returns true if a directory exists at the given path.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.isdir)
         *
         * @noSelf
         */
        export function isdir(path: string): boolean;

        /**
         * <p>Creates a directory at the given path, under the /Data/&lt;bundleid&gt; folder. See <a href="https://sdk.play.date/2.5.0#about-playdate-filesystem">About the Playdate Filesystem</a> for details.</p>
         * </div>
         * <div class="paragraph">
         * <p><code>playdate.file.mkdir()</code> will create all intermediate directories, if a succession of directories ("testdir/testdir/testdir/") is specified in <em>path</em>.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.mkdir"><code>playdate-&gt;file-&gt;mkdir()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.mkdir)
         *
         * @noSelf
         */
        export function mkdir(path: string): void;

        /**
         * <p>Deletes the file at the given path. Returns true if successful, else false.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>recursive</em> is <code>true</code>, this function will delete the directory at <em>path</em> and its contents, otherwise the directory must be empty to be deleted.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.delete)
         *
         * @noSelf
         */
        function _delete(path: string, recursive: boolean): boolean;

        export { _delete as delete };

        /**
         * <p>Returns the size of the file at the given path.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.getSize)
         *
         * @noSelf
         */
        export function getSize(path: string): number;

        /**
         * <p>Returns the type of the file at the given path.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.getType)
         *
         * @noSelf
         */
        export function getType(path: string): number;

        /**
         * <p>Returns the modification date/time of the file at the given path, as a table with keys:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>year</em>: 4-digit year (until 10,000 AD)</p>
         * </li>
         * <li>
         * <p><em>month</em>: month of the year, where 1 is January and 12 is December</p>
         * </li>
         * <li>
         * <p><em>day</em>: day of the month, 1 - 31</p>
         * </li>
         * <li>
         * <p><em>hour</em>: 0 - 23</p>
         * </li>
         * <li>
         * <p><em>minute</em>: 0 - 59</p>
         * </li>
         * <li>
         * <p><em>second</em>: 0 - 59 (or 60 on a leap second)</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.modtime)
         *
         * @noSelf
         */
        export function modtime(path: string): {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            second: number;
        };

        /**
         * <p>Renames the file at <em>path</em>, if it exists, to the value of newPath. This can result in the file being moved to a new directory, but directories will not be created. Returns true if the operation was successful.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.rename"><code>playdate-&gt;file-&gt;rename()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.rename)
         *
         * @noSelf
         */
        export function rename(path: string, newPath: string): boolean;

        /**
         * <p>Loads the compiled <em>.pdz</em> file at the given location and returns the contents as a function. The .pdz extension on <em>path</em> is optional.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>env</em>, if specified, is a table to use as the function’s global namespace instead of <em>_G</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.load)
         *
         * @noSelf
         */
        export function load(path: string, env: AnyTable): void;

        /**
         * <p>Runs the pdz file at the given location. Equivalent to <code>playdate.file.load(path, env)()</code>.</p>
         * </div>
         * <div class="paragraph">
         * <p>The <em>.pdz</em> extension on <em>path</em> is optional. Values returned from the pdz file are left on the stack.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>env</em>, if specified, is a table to use as the function’s global namespace instead of <em>_G</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.run)
         *
         * @noSelf
         */
        export function run(path: string, env: AnyTable): void;
    }

    namespace geometry {
        /**
         * <p>Returns the square of the distance from point <em>(x1, y1)</em> to point <em>(x2, y2)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Compared to <a href="https://sdk.play.date/2.5.0#m-geometry.point.squaredDistanceToPoint">geometry.point:squaredDistanceToPoint()</a>, this version will be slightly faster.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-geometry.squaredDistanceToPoint)
         *
         * @noSelf
         */
        export function squaredDistanceToPoint(
            x1: number,
            y1: number,
            x2: number,
            y2: number
        ): number;

        /**
         * <p>Returns the the distance from point <em>(x1, y1)</em> to point <em>(x2, y2)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Compared to <a href="https://sdk.play.date/2.5.0#m-geometry.point.distanceToPoint">geometry.point:distanceToPoint()</a>, this version will be slightly faster.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-geometry.distanceToPoint)
         *
         * @noSelf
         */
        export function distanceToPoint(
            x1: number,
            y1: number,
            x2: number,
            y2: number
        ): number;

        namespace affineTransform {
            /**
             * <p>Returns a new playdate.geometry.affineTransform. Use new() instead to get a new copy of the identity transform.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.affineTransform.new)
             *
             * @noSelf
             */
            function _new(
                m11: number,
                m12: number,
                m21: number,
                m22: number,
                tx: number,
                ty: number
            ): PlaydateGeometryAffineTransform;

            export { _new as new };

            /**
             * <p>Returns a new playdate.geometry.affineTransform that is the identity transform.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.affineTransform.new-1)
             *
             * @noSelf
             */
            function _new(): PlaydateGeometryAffineTransform;

            export { _new as new };
        }

        namespace arc {
            /**
             * <p>Returns a new playdate.geometry.arc. Angles should be specified in degrees. Zero degrees represents the top of the circle.</p>
             * </div>
             * <div class="imageblock diagram">
             * <div class="content">
             * <img src="Inside%20Playdate/unitcircle.png" alt="unitcircle">
             * </div>
             * </div>
             * <div class="paragraph">
             * <p>If specified, <em>direction</em> should be true for clockwise, false for counterclockwise. If not specified, the direction is inferred from the start and end angles.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.arc.new)
             *
             * @noSelf
             */
            function _new(
                x: number,
                y: number,
                radius: number,
                startAngle: number,
                endAngle: number,
                direction: boolean
            ): PlaydateGeometryArc;

            export { _new as new };
        }

        namespace lineSegment {
            /**
             * <p>Returns a new playdate.geometry.lineSegment.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.lineSegment.new)
             *
             * @noSelf
             */
            function _new(
                x1: number,
                y1: number,
                x2: number,
                y2: number
            ): PlaydateGeometryLineSegment;

            export { _new as new };

            /**
             * <p>For use in inner loops where speed is the priority.</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns true if there is an intersection between the line segments defined by <em>(x1, y1)</em>, <em>(x2, y2)</em> and <em>(x3, y3)</em>, <em>(x4, y4)</em>.
             * If there is an intersection, <em>x, y</em> values representing the intersection point are also returned.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.fast_intersection)
             *
             * @noSelf
             */
            export function fast_intersection(
                x1: number,
                y1: number,
                x2: number,
                y2: number,
                x3: number,
                y3: number,
                x4: number,
                y4: number
            ): [boolean, number];
        }

        namespace point {
            /**
             * <p>Returns a new playdate.geometry.point.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.point.new)
             *
             * @noSelf
             */
            function _new(x: number, y: number): PlaydateGeometryPoint;

            export { _new as new };
        }

        namespace polygon {
            /**
             * <p><code>new(x1, y1, x2, y2, ..., xn, yn)</code> returns a new playdate.geometry.polygon with vertices <em>(x1, y1)</em> through <em>(xn, yn)</em>.  The Lua function <code>table.unpack()</code> can be used to turn an array into function arguments.</p>
             * </div>
             * <div class="paragraph">
             * <p><code>new(p1, p2, ..., pn)</code> does the same, except the points are expressed via <a href="https://sdk.play.date/2.5.0#C-geometry.point">point objects</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p><code>new(numberOfVertices)</code> returns a new playdate.geometry.polygon with space allocated for <em>numberOfVertices</em> vertices. All vertices are initially (0, 0). Vertex coordinates can be set with <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.setPointAt">playdate.geometry.polygon:setPointAt()</a>.</p>
             * </div>
             * <div class="admonitionblock note">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Note</div>
             * </td>
             * <td class="content">
             * If the polygon’s first and last points are coincident, the polygon will be considered <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.isClosed">closed</a>. Alternatively, you may call <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.close">:close()</a> to automatically close the polygon.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="admonitionblock tip">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Tip</div>
             * </td>
             * <td class="content">
             * To draw a polygon, use <a href="https://sdk.play.date/2.5.0#f-graphics.drawPolygon"><code>playdate.graphics.drawPolygon()</code></a>.
             * </td>
             * </tr>
             * </tbody></table>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.polygon.new)
             *
             * @noSelf
             */
            function _new(...coordinates: number): PlaydateGeometryPolygon;

            export { _new as new };

            /**
             * <p><code>new(x1, y1, x2, y2, ..., xn, yn)</code> returns a new playdate.geometry.polygon with vertices <em>(x1, y1)</em> through <em>(xn, yn)</em>.  The Lua function <code>table.unpack()</code> can be used to turn an array into function arguments.</p>
             * </div>
             * <div class="paragraph">
             * <p><code>new(p1, p2, ..., pn)</code> does the same, except the points are expressed via <a href="https://sdk.play.date/2.5.0#C-geometry.point">point objects</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p><code>new(numberOfVertices)</code> returns a new playdate.geometry.polygon with space allocated for <em>numberOfVertices</em> vertices. All vertices are initially (0, 0). Vertex coordinates can be set with <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.setPointAt">playdate.geometry.polygon:setPointAt()</a>.</p>
             * </div>
             * <div class="admonitionblock note">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Note</div>
             * </td>
             * <td class="content">
             * If the polygon’s first and last points are coincident, the polygon will be considered <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.isClosed">closed</a>. Alternatively, you may call <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.close">:close()</a> to automatically close the polygon.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="admonitionblock tip">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Tip</div>
             * </td>
             * <td class="content">
             * To draw a polygon, use <a href="https://sdk.play.date/2.5.0#f-graphics.drawPolygon"><code>playdate.graphics.drawPolygon()</code></a>.
             * </td>
             * </tr>
             * </tbody></table>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.polygon.new)
             *
             * @noSelf
             */
            function _new(
                ...points: PlaydateGeometryPoint
            ): PlaydateGeometryPolygon;

            export { _new as new };

            /**
             * <p><code>new(x1, y1, x2, y2, ..., xn, yn)</code> returns a new playdate.geometry.polygon with vertices <em>(x1, y1)</em> through <em>(xn, yn)</em>.  The Lua function <code>table.unpack()</code> can be used to turn an array into function arguments.</p>
             * </div>
             * <div class="paragraph">
             * <p><code>new(p1, p2, ..., pn)</code> does the same, except the points are expressed via <a href="https://sdk.play.date/2.5.0#C-geometry.point">point objects</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p><code>new(numberOfVertices)</code> returns a new playdate.geometry.polygon with space allocated for <em>numberOfVertices</em> vertices. All vertices are initially (0, 0). Vertex coordinates can be set with <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.setPointAt">playdate.geometry.polygon:setPointAt()</a>.</p>
             * </div>
             * <div class="admonitionblock note">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Note</div>
             * </td>
             * <td class="content">
             * If the polygon’s first and last points are coincident, the polygon will be considered <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.isClosed">closed</a>. Alternatively, you may call <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.close">:close()</a> to automatically close the polygon.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="admonitionblock tip">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Tip</div>
             * </td>
             * <td class="content">
             * To draw a polygon, use <a href="https://sdk.play.date/2.5.0#f-graphics.drawPolygon"><code>playdate.graphics.drawPolygon()</code></a>.
             * </td>
             * </tr>
             * </tbody></table>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.polygon.new)
             *
             * @noSelf
             */
            function _new(numberOfVertices: number): PlaydateGeometryPolygon;

            export { _new as new };
        }

        namespace rect {
            /**
             * <p>Returns a new playdate.geometry.rect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.rect.new)
             *
             * @noSelf
             */
            function _new(
                x: number,
                y: number,
                width: number,
                height: number
            ): PlaydateGeometryRect;

            export { _new as new };

            /**
             * <p>For use in inner loops where speed is the priority. About 3x faster than <a href="https://sdk.play.date/2.5.0#m-geometry.rect.intersection">intersection</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns multiple values (<em>x, y, width, height</em>) representing the overlapping portion of the two rects defined by <em>x1, y1, w1, h1</em> and <em>x2, y2, w2, h2</em>. If there is no intersection, (0, 0, 0, 0) is returned.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.rect.fast_intersection)
             *
             * @noSelf
             */
            export function fast_intersection(
                x1: number,
                y1: number,
                w1: number,
                h1: number,
                x2: number,
                y2: number,
                w2: number,
                h2: number
            ):
                | [number, number, number, number]
                | [number, number, number, number][];

            /**
             * <p>For use in inner loops where speed is the priority. About 3x faster than <a href="https://sdk.play.date/2.5.0#m-geometry.rect.union">union</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns multiple values (<em>x, y, width, height</em>) representing the smallest possible rect that contains the two rects defined by <em>x1, y1, w1, h1</em> and <em>x2, y2, w2, h2</em>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.rect.fast_union)
             *
             * @noSelf
             */
            export function fast_union(
                x1: number,
                y1: number,
                w1: number,
                h1: number,
                x2: number,
                y2: number,
                w2: number,
                h2: number
            ): [number, number, number, number][];
        }

        namespace size {
            /**
             * <p>Returns a new playdate.geometry.size.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.size.new)
             *
             * @noSelf
             */
            function _new(width: number, height: number): PlaydateGeometrySize;

            export { _new as new };
        }

        namespace vector2D {
            /**
             * <p>Returns a new playdate.geometry.vector2D.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.vector2D.new)
             *
             * @noSelf
             */
            function _new(x: number, y: number): PlaydateGeometryVector2D;

            export { _new as new };

            /**
             * <p>Returns a new playdate.geometry.vector2D. Angles should be specified in degrees. Zero degrees represents the top of the circle.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.vector2D.newPolar)
             *
             * @noSelf
             */
            export function newPolar(
                length: number,
                angle: number
            ): PlaydateGeometryVector2D;
        }
    }

    interface PlaydateGeometryAffineTransform {
        /**
         * <p>Returns a new copy of the affine transform.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.copy)
         */
        copy(): PlaydateGeometryAffineTransform;
        /**
         * <p>Mutates the caller so that it is an affine transformation matrix constructed by inverting itself.</p>
         * </div>
         * <div class="paragraph">
         * <p>Inversion is generally used to provide reverse transformation of points within transformed objects. Given the coordinates (x, y), which have been transformed by a given matrix to new coordinates (x’, y’), transforming the coordinates (x’, y’) by the inverse matrix produces the original coordinates (x, y).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.invert)
         */
        invert(): void;
        /**
         * <p>Mutates the the caller, changing it to an identity transform matrix.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.reset)
         */
        reset(): void;
        /**
         * <p>Mutates the the caller. The affine transform <em>af</em> is concatenated to the caller.</p>
         * </div>
         * <div class="paragraph">
         * <p>Concatenation combines two affine transformation matrices by multiplying them together. You might perform several concatenations in order to create a single affine transform that contains the cumulative effects of several transformations.</p>
         * </div>
         * <div class="paragraph">
         * <p>Note that matrix operations are not commutative — the order in which you concatenate matrices is important. That is, the result of multiplying matrix t1 by matrix t2 does not necessarily equal the result of multiplying matrix t2 by matrix t1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.concat)
         */
        concat(af: PlaydateGeometryAffineTransform): void;
        /**
         * <p>Mutates the caller by applying a translate transformation.  x values are moved by <em>dx</em>, y values by <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.translate)
         */
        translate(dx: number, dy: number): void;
        /**
         * <p>Returns a copy of the calling affine transform with a translate transformation appended.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.translatedBy)
         */
        translatedBy(dx: number, dy: number): PlaydateGeometryAffineTransform;
        /**
         * <p>Mutates the caller by applying a scaling transformation.</p>
         * </div>
         * <div class="paragraph">
         * <p>If both parameters are passed, <em>sx</em> is used to scale the x values of the transform, <em>sy</em> is used to scale the y values.</p>
         * </div>
         * <div class="paragraph">
         * <p>If only one parameter is passed, it is used to scale both x and y values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.scale)
         */
        scale(sx: number, sy: number): void;
        /**
         * <p>Returns a copy of the calling affine transform with a scaling transformation appended.</p>
         * </div>
         * <div class="paragraph">
         * <p>If both parameters are passed, <em>sx</em> is used to scale the x values of the transform, <em>sy</em> is used to scale the y values.</p>
         * </div>
         * <div class="paragraph">
         * <p>If only one parameter is passed, it is used to scale both x and y values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.scaledBy)
         */
        scaledBy(sx: number, sy: number): PlaydateGeometryAffineTransform;
        /**
         * <p>Mutates the caller by applying a rotation transformation.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>angle</em> is the value, in degrees, by which to rotate the affine transform. A positive value specifies clockwise rotation and a negative value specifies counterclockwise rotation. If the optional <em>x</em> and <em>y</em> arguments are given, the transform rotates around (<em>x</em>,<em>y</em>) instead of (0,0).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.rotate)
         */
        rotate(angle: number, x: number, y: number): void;
        /**
         * <p>Mutates the caller by applying a rotation transformation.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>angle</em> is the value, in degrees, by which to rotate the affine transform. A positive value specifies clockwise rotation and a negative value specifies counterclockwise rotation. If the optional <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> <em>point</em> argument is given, the transform rotates around the <em>point</em> instead of (0,0).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform:rotate-point)
         */
        rotate(angle: number, point: PlaydateGeometryPoint): void;
        /**
         * <p>Returns a copy of the calling affine transform with a rotate transformation appended.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>angle</em> is the value, in degrees, by which to rotate the affine transform. A positive value specifies clockwise rotation and a negative value specifies counterclockwise rotation.  If the optional <em>x</em> and <em>y</em> arguments are given, the transform rotates around (<em>x</em>,<em>y</em>) instead of (0,0).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.rotatedBy)
         */
        rotatedBy(
            angle: number,
            x: number,
            y: number
        ): PlaydateGeometryAffineTransform;
        /**
         * <p>Returns a copy of the calling affine transform with a rotate transformation appended.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>angle</em> is the value, in degrees, by which to rotate the affine transform. A positive value specifies clockwise rotation and a negative value specifies counterclockwise rotation.  If the optional <a href="https://sdk.play.date/2.5.0#C-geometry.point">point</a> <em>point</em> argument is given, the transform rotates around the <em>point</em> instead of (0,0).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform:rotatedBy-point)
         */
        rotatedBy(
            angle: number,
            point: PlaydateGeometryPoint
        ): PlaydateGeometryAffineTransform;
        /**
         * <p>Mutates the caller, appending a skew transformation.  <em>sx</em> is the value by which to skew the x axis, and <em>sy</em> the value for the y axis. Values are in degrees.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.skew)
         */
        skew(sx: number, sy: number): void;
        /**
         * <p>Returns the given transform with a skew transformation appended.  <em>sx</em> is the value by which to skew the x axis, and <em>sy</em> the value for the y axis. Values are in degrees.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.skewedBy)
         */
        skewedBy(sx: number, sy: number): PlaydateGeometryAffineTransform;
        /**
         * <p>Modifies the <a href="https://sdk.play.date/2.5.0#C-geometry.point">point</a> <em>p</em> by applying the affine transform.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformPoint)
         */
        transformPoint(p: PlaydateGeometryPoint): void;
        /**
         * <p>As above, but returns a new point rather than modifying <em>p</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformedPoint)
         */
        transformedPoint(p: PlaydateGeometryPoint): PlaydateGeometryPoint;
        /**
         * <p>Returns two values calculated by applying the affine transform to the point (<em>x</em>, <em>y</em>)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformXY)
         */
        transformXY(x: number, y: number): [number, number];
        /**
         * <p>Modifies the <a href="https://sdk.play.date/2.5.0#C-geometry.lineSegment">line segment</a> <em>ls</em> by applying the affine transform.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformLineSegment)
         */
        transformLineSegment(ls: PlaydateGeometryLineSegment): void;
        /**
         * <p>As above, but returns a new <a href="https://sdk.play.date/2.5.0#C-geometry.lineSegment">line segment</a> rather than modifying <em>ls</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformedLineSegment)
         */
        transformedLineSegment(
            ls: PlaydateGeometryLineSegment
        ): PlaydateGeometryLineSegment;
        /**
         * <p>Modifies the axis aligned bounding box <em>r</em> (a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a>) by applying the affine transform.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformAABB)
         */
        transformAABB(r: PlaydateGeometryRect): void;
        /**
         * <p>As above, but returns a new <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a> rather than modifying <em>r</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformedAABB)
         */
        transformedAABB(r: PlaydateGeometryRect): PlaydateGeometryRect;
        /**
         * <p>Modifies the <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">polygon</a> <em>p</em> by applying the affine transform.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformPolygon)
         */
        transformPolygon(p: PlaydateGeometryPolygon): void;
        /**
         * <p>As above, but returns a new <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">polygon</a> rather than modifying <em>p</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.affineTransform.transformedPolygon)
         */
        transformedPolygon(p: PlaydateGeometryPolygon): PlaydateGeometryPolygon;
    }

    interface PlaydateGeometryArc {
        /**
         * <p>Returns a new copy of the arc.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.arc.copy)
         */
        copy(): PlaydateGeometryArc;
        /**
         * <p>Returns the length of the arc.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.arc.length)
         */
        length(): number;
        /**
         * <p>Returns true if the direction of the arc is clockwise.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.arc.isClockwise)
         */
        isClockwise(): boolean;
        /**
         * <p>Sets the direction of the arc.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.arc.setIsClockwise)
         */
        setIsClockwise(flag: boolean): void;
        /**
         * <p>Returns a new <a href="https://sdk.play.date/2.5.0#C-geometry.point">point</a> on the arc, <code>distance</code> pixels from the arc’s start angle. If <code>extend</code> is true, the returned point is allowed to project past the arc’s endpoints; otherwise, it is constrained to the arc’s initial point if <code>distance</code> is negative, or the end point if <code>distance</code> is greater than the arc’s length.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.arc.pointOnArc)
         */
        pointOnArc(distance: number, extend: boolean): PlaydateGeometryPoint;
    }

    interface PlaydateGeometryLineSegment {
        /**
         * <p>Returns a new copy of the line segment.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.copy)
         */
        copy(): PlaydateGeometryLineSegment;
        /**
         * <p>Returns the values <em>x1, y1, x2, y2</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.unpack)
         */
        unpack(): [number, number, number, number];
        /**
         * <p>Returns the length of the line segment.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.length)
         */
        length(): number;
        /**
         * <p>Modifies the line segment, offsetting its values by <em>dx</em>, <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.offset)
         */
        offset(dx: number, dy: number): void;
        /**
         * <p>Returns a new line segment, the given segment offset by <em>dx</em>, <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.offsetBy)
         */
        offsetBy(dx: number, dy: number): PlaydateGeometryLineSegment;
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> representing the mid point of the line segment.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.midPoint)
         */
        midPoint(): PlaydateGeometryPoint;
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> on the line segment, <code>distance</code> pixels from the start of the line. If <code>extend</code> is true, the returned point is allowed to project past the segment’s endpoints; otherwise, it is constrained to the line segment’s initial point if <code>distance</code> is negative, or the end point if <code>distance</code> is greater than the segment’s length.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.pointOnLine)
         */
        pointOnLine(distance: number, extend: boolean): PlaydateGeometryPoint;
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-geometry.vector2D">playdate.geometry.vector2D</a> representation of the line segment.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.segmentVector)
         */
        segmentVector(): PlaydateGeometryVector2D;
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> that is the closest point to point <em>p</em> that is on the line segment.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.closestPointOnLineToPoint)
         */
        closestPointOnLineToPoint(
            p: PlaydateGeometryPoint
        ): PlaydateGeometryPoint;
        /**
         * <p>Returns true if there is an intersection between the caller and the line segment <em>ls</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If there is an intersection, a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> representing that point is also returned.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.intersectsLineSegment)
         */
        intersectsLineSegment(
            ls: PlaydateGeometryLineSegment
        ): false | [true, PlaydateGeometryPoint];
        /**
         * <p>Returns the values (<em>intersects</em>, <em>intersectionPoints</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>intersects</em> is true if there is at least one intersection between the caller and <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">poly</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>intersectionPoints</em> is an array of <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a>s containing all intersection points between the caller and <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">poly</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.intersectsPolygon)
         */
        intersectsPolygon(poly: PlaydateGeometryPolygon): [boolean, number];
        /**
         * <p>Returns the values (<em>intersects</em>, <em>intersectionPoints</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>intersects</em> is true if there is at least one intersection between the caller and <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>intersectionPoints</em> is an array of <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a>s containing all intersection points between the caller and <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.intersectsRect)
         */
        intersectsRect(rect: PlaydateGeometryRect): [boolean, number];
    }

    interface PlaydateGeometryPoint {
        /**
         * <p>Returns a new copy of the point.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.point.copy)
         */
        copy(): PlaydateGeometryPoint;
        /**
         * <p>Returns the values <em>x, y</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.point.unpack)
         */
        unpack(): [number, number];
        /**
         * <p>Modifies the point, offsetting its values by <em>dx</em>, <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.point.offset)
         */
        offset(dx: number, dy: number): void;
        /**
         * <p>Returns a new point object, the given point offset by <em>dx</em>, <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.point.offsetBy)
         */
        offsetBy(dx: number, dy: number): PlaydateGeometryPoint;
        /**
         * <p>Returns the square of the distance to point <em>p</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.point.squaredDistanceToPoint)
         */
        squaredDistanceToPoint(p: PlaydateGeometryPoint): number;
        /**
         * <p>Returns the distance to point <em>p</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.point.distanceToPoint)
         */
        distanceToPoint(p: PlaydateGeometryPoint): number;
    }

    interface PlaydateGeometryPolygon {
        /**
         * <p>Returns a copy of a polygon.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.copy)
         */
        copy(): PlaydateGeometryPolygon;
        /**
         * <p><code>:close()</code> closes a polygon. If the polygon’s first and last point aren’t coincident, a line segment will be generated to connect them.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.close)
         */
        close(): void;
        /**
         * <p>Returns true if the polygon is closed, false if not.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.isClosed)
         */
        isClosed(): boolean;
        /**
         * <p>Returns a boolean value, true if the <a href="https://sdk.play.date/2.5.0#C-geometry.point">point</a> <em>p</em> or the point at <em>(x, y)</em> is contained within the caller polygon.</p>
         * </div>
         * <div class="paragraph">
         * <p><code>fillrule</code> is an optional argument that can be one of the values defined in <a href="https://sdk.play.date/2.5.0#f-graphics.setPolygonFillRule">playdate.graphics.setPolygonFillRule</a>. By default <code><em>playdate.graphics.kPolygonFillEvenOdd</em></code> is used.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.containsPoint)
         */
        containsPoint(
            p: PlaydateGeometryPoint,
            fillRule: PlaydatePolygonFill = PlaydatePolygonFill.EvenOdd
        ): boolean;
        /**
         * <p>Returns a boolean value, true if the <a href="https://sdk.play.date/2.5.0#C-geometry.point">point</a> <em>p</em> or the point at <em>(x, y)</em> is contained within the caller polygon.</p>
         * </div>
         * <div class="paragraph">
         * <p><code>fillrule</code> is an optional argument that can be one of the values defined in <a href="https://sdk.play.date/2.5.0#f-graphics.setPolygonFillRule">playdate.graphics.setPolygonFillRule</a>. By default <code><em>playdate.graphics.kPolygonFillEvenOdd</em></code> is used.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.containsPoint)
         */
        containsPoint(
            x: number,
            y: number,
            fillRule: PlaydatePolygonFill = PlaydatePolygonFill.EvenOdd
        ): boolean;
        /**
         * <p>Returns multiple values (<em>x</em>, <em>y</em>, <em>width</em>, <em>height</em>) giving the axis-aligned bounding box for the polygon.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.getBounds)
         */
        getBounds(): [number, number, number, number];
        /**
         * <p>Returns the axis-aligned bounding box for the given polygon as a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a> object.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.getBoundsRect)
         */
        getBoundsRect(): PlaydateGeometryRect;
        /**
         * <p>Returns the number of points in the polygon.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.count)
         */
        count(): number;
        /**
         * <p>Returns the total length of all line segments in the polygon.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.length)
         */
        length(): number;
        /**
         * <p>Sets the polygon’s <em>n</em>-th point to (<em>x</em>, <em>y</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.setPointAt)
         */
        setPointAt(n: number, x: number, y: number): void;
        /**
         * <p>Returns the polygon’s <em>n</em>-th point.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.getPointAt)
         */
        getPointAt(n: number): PlaydateGeometryPoint;
        /**
         * <p>Returns true if the given polygon intersects the polygon <em>p</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.intersects)
         */
        intersects(p: PlaydateGeometryPolygon): boolean;
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> on one of the polygon’s line segments, <code>distance</code> pixels from the start of the polygon. If <code>extend</code> is true, the  point is allowed to project past the polygon’s ends; otherwise, it is constrained to the polygon’s initial point if <code>distance</code> is negative, or the last point if <code>distance</code> is greater than the polygon’s length.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.pointOnPolygon)
         */
        pointOnPolygon(
            distance: number,
            extend: boolean
        ): PlaydateGeometryPoint;
        /**
         * <p>Translates each point on the polygon by <em>dx</em>, <em>dy</em> pixels.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.polygon.translate)
         */
        translate(dx: number, dy: number): void;
    }

    interface PlaydateGeometryRect {
        /**
         * <p>Returns a new copy of the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.copy)
         */
        copy(): PlaydateGeometryRect;
        /**
         * <p>Returns a new playdate.geometry.polygon version of the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.toPolygon)
         */
        toPolygon(): PlaydateGeometryPolygon;
        /**
         * <p>Returns <em>x</em>, <em>y</em>, <em>width</em> and <em>height</em> as individual values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.unpack)
         */
        unpack(): [number, number, number, number];
        /**
         * <p>Returns true if a rectangle has zero width or height.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.isEmpty)
         */
        isEmpty(): boolean;
        /**
         * <p>Returns true if the <em>x</em>, <em>y</em>, <em>width</em>, and <em>height</em> values of the caller and <em>r2</em> are all equal.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.isEqual)
         */
        isEqual(r2: PlaydateGeometryRect): boolean;
        /**
         * <p>Returns true if <em>r2</em> intersects the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.intersects)
         */
        intersects(r2: PlaydateGeometryRect): boolean;
        /**
         * <p>Returns a rect representing the overlapping portion of the caller and <em>r2</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.intersection)
         */
        intersection(r2: PlaydateGeometryRect): PlaydateGeometryRect;
        /**
         * <p>Returns the smallest possible rect that contains both the source rect and <em>r2</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.union)
         */
        union(r2: PlaydateGeometryRect): PlaydateGeometryRect;
        /**
         * <p>Insets the rect by the given <em>dx</em> and <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.inset)
         */
        inset(dx: number, dy: number): void;
        /**
         * <p>Returns a rect that is inset by the given <em>dx</em> and <em>dy</em>, with the same center point.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.insetBy)
         */
        insetBy(dx: number, dy: number): PlaydateGeometryRect;
        /**
         * <p>Offsets the rect by the given <em>dx</em> and <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.offset)
         */
        offset(dx: number, dy: number): void;
        /**
         * <p>Returns a rect with its origin point offset by <em>dx</em>, <em>dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.offsetBy)
         */
        offsetBy(dx: number, dy: number): PlaydateGeometryRect;
        /**
         * <p>Returns true if the <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a> <em>r2</em> is contained within the caller <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.containsRect-r2)
         */
        containsRect(r2: PlaydateGeometryRect): boolean;
        /**
         * <p>Returns true if the rect defined by <em>(x, y, width, height)</em> is contained within the caller <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.containsRect)
         */
        containsRect(
            x: number,
            y: number,
            width: number,
            height: number
        ): boolean;
        /**
         * <p>Returns true if the <a href="https://sdk.play.date/2.5.0#C-geometry.point">point</a> <em>p</em> is contained within the caller <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.containsPoint)
         */
        containsPoint(p: PlaydateGeometryPoint): boolean;
        /**
         * <p>Returns true if the point at <em>(x, y)</em> is contained within the caller <a href="https://sdk.play.date/2.5.0#C-geometry.rect">rect</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.containsPoint-xy)
         */
        containsPoint(x: number, y: number): boolean;
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-geometry.point">point</a> at the center of the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.centerPoint)
         */
        centerPoint(): PlaydateGeometryPoint;
        /**
         * <p>Flips the caller about the center of rect <em>r2</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>flip</em> should be one of the following constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.geometry.kUnflipped</em></p>
         * </li>
         * <li>
         * <p><em>playdate.geometry.kFlippedX</em></p>
         * </li>
         * <li>
         * <p><em>playdate.geometry.kFlippedY</em></p>
         * </li>
         * <li>
         * <p><em>playdate.geometry.kFlippedXY</em></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.rect.flipRelativeToRect)
         */
        flipRelativeToRect(r2: PlaydateGeometryRect, flip: PlaydateFlip): void;
    }

    interface PlaydateGeometrySize {
        /**
         * <p>Returns a new copy of the size.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.size.copy)
         */
        copy(): PlaydateGeometrySize;
        /**
         * <p>Returns the values <em>width, height</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.size.unpack)
         */
        unpack(): [number, number];
    }

    interface PlaydateGeometryVector2D {
        /**
         * <p>Returns a new copy of the vector2D.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.copy)
         */
        copy(): PlaydateGeometryVector2D;
        /**
         * <p>Returns the values <em>dx, dy</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.unpack)
         */
        unpack(): [number, number];
        /**
         * <p>Modifies the caller by adding vector <em>v</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.addVector)
         */
        addVector(v: PlaydateGeometryVector2D): void;
        /**
         * <p>Modifies the caller, scaling it by amount <em>s</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.scale)
         */
        scale(s: number): void;
        /**
         * <p>Returns the given vector scaled by <em>s</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.scaledBy)
         */
        scaledBy(s: number): PlaydateGeometryVector2D;
        /**
         * <p>Modifies the caller by normalizing it so that its length is 1. If the vector is (0,0), the vector is unchanged.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.normalize)
         */
        normalize(): void;
        /**
         * <p>Returns a new vector by normalizing the given vector.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.normalized)
         */
        normalized(): PlaydateGeometryVector2D;
        /**
         * <p>Returns the dot product of the caller and the vector <em>v</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.dotProduct)
         */
        dotProduct(v: PlaydateGeometryVector2D): number;
        /**
         * <p>Returns the magnitude of the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.magnitude)
         */
        magnitude(): number;
        /**
         * <p>Returns the square of the magnitude of the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.magnitudeSquared)
         */
        magnitudeSquared(): number;
        /**
         * <p>Modifies the caller by projecting it along the vector <em>v</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.projectAlong)
         */
        projectAlong(v: PlaydateGeometryVector2D): void;
        /**
         * <p>Returns a new vector created by projecting the given vector along the vector <em>v</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.projectedAlong)
         */
        projectedAlong(v: PlaydateGeometryVector2D): PlaydateGeometryVector2D;
        /**
         * <p>Returns the angle between the caller and the vector <em>v</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.angleBetween)
         */
        angleBetween(v: PlaydateGeometryVector2D): number;
        /**
         * <p>Returns a vector that is the left normal of the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.leftNormal)
         */
        leftNormal(): PlaydateGeometryVector2D;
        /**
         * <p>Returns a vector that is the right normal of the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-geometry.vector2D.rightNormal)
         */
        rightNormal(): PlaydateGeometryVector2D;
    }

    namespace graphics {
        /**
         * <p>Pushes the current graphics state to the context stack and creates a new context. If a <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a> is given, drawing functions are applied to the image instead of the screen buffer.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * If you draw into an image context with color set to <em>playdate.graphics.kColorClear</em>, those drawn pixels will be set to transparent. When you later draw the image into the framebuffer, those pixels will not be rendered, i.e., will act as transparent pixels in the image.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * <a href="https://sdk.play.date/2.5.0#f-graphics.lockFocus">playdate.graphics.lockFocus(<em>image</em>)</a> will reroute drawing into an image, without saving the overall graphics context.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.pushContext"><code>playdate-&gt;graphics-&gt;pushContext()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.pushContext)
         *
         * @noSelf
         */
        export function pushContext(image: PlaydateGraphicsImage): void;

        /**
         * <p>Pops a graphics context off the context stack and restores its state.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.popContext"><code>playdate-&gt;graphics-&gt;popContext()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.popContext)
         *
         * @noSelf
         */
        export function popContext(): void;

        /**
         * <p>Clears the entire display, setting the color to either the given <em>color</em> argument, or the current background color set in <a href="https://sdk.play.date/2.5.0#f-graphics.setBackgroundColor">setBackgroundColor(color)</a> if no argument is given.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.clear"><code>playdate-&gt;graphics-&gt;clear()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.clear)
         *
         * @noSelf
         */
        export function clear(color: PlaydateColor): void;

        /**
         * <p>Returns the pair (<em>width</em>, <em>height</em>) for the image at <em>path</em> without actually loading the image.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.image.imageSizeAtPath)
         *
         * @noSelf
         */
        export function imageSizeAtPath(path: string): [number, number];

        /**
         * <p>Returns true if the non-alpha-masked portions of <em>image1</em> and <em>image2</em> overlap if they were drawn at positions (<em>x1</em>, <em>y1</em>) and (<em>x2</em>, <em>y2</em>) and flipped according to <em>flip1</em> and <em>flip2</em>, which should each be one of the values listed in <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw"><code>playdate.graphics.image:draw()</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.checkAlphaCollision)
         *
         * @noSelf
         */
        export function checkAlphaCollision(
            image1: PlaydateGraphicsImage,
            x1: number,
            y1: number,
            flip1: PlaydateFlip,
            image2: PlaydateGraphicsImage,
            x2: number,
            y2: number,
            flip2: PlaydateFlip
        ): boolean;

        /**
         * <p>Sets and gets the current drawing color for primitives.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>color</em> should be one of the constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kColorBlack</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kColorWhite</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kColorClear</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kColorXOR</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>This color applies to drawing primitive shapes such as lines and rectangles, not bitmap images.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * <a href="https://sdk.play.date/2.5.0#f-graphics.setColor"><code>setColor()</code></a> and <a href="https://sdk.play.date/2.5.0#f-graphics.setPattern"><code>setPattern()</code></a> / <a href="https://sdk.play.date/2.5.0#f-graphics.setDitherPattern"><code>setDitherPattern()</code></a> are mutually exclusive. Setting a color will overwrite a pattern, and vice versa.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setColor)
         *
         * @noSelf
         */
        export function setColor(color: PlaydateColor): void;

        /**
         * <p>Gets the current drawing color for primitives.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getColor)
         *
         * @noSelf
         */
        export function getColor(): PlaydateColor;

        /**
         * <p>Sets the color used for drawing the background, if necessary, before <a href="https://sdk.play.date/2.5.0#C-graphics.sprite">playdate.graphics.sprite</a>s are drawn on top.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>color</em> should be one of the constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kColorBlack</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kColorWhite</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kColorClear</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>Use <em>kColorClear</em> if you intend to draw behind sprites.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setBackgroundColor"><code>playdate-&gt;graphics-&gt;setBackgroundColor()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setBackgroundColor)
         *
         * @noSelf
         */
        export function setBackgroundColor(color: PlaydateColor): void;

        /**
         * <p>Gets the color used for drawing the background, if necessary, before <a href="https://sdk.play.date/2.5.0#C-graphics.sprite">playdate.graphics.sprite</a>s are drawn on top.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getBackgroundColor)
         *
         * @noSelf
         */
        export function getBackgroundColor(): PlaydateColor;

        /**
         * <p>Sets the 8x8 pattern used for drawing. The <em>pattern</em> argument is an array of 8 numbers describing the bitmap for each row; for example, <em>{ 0xaa, 0x55, 0xaa, 0x55, 0xaa, 0x55, 0xaa, 0x55 }</em> specifies a checkerboard pattern. An additional 8 numbers can be specified for an alpha mask bitmap.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * To "un-set" a pattern, call <a href="https://sdk.play.date/2.5.0#f-graphics.setColor"><code>setColor()</code></a>. <a href="https://sdk.play.date/2.5.0#f-graphics.setColor"><code>setColor()</code></a> and <a href="https://sdk.play.date/2.5.0#f-graphics.setPattern"><code>setPattern()</code></a> / <a href="https://sdk.play.date/2.5.0#f-graphics.setDitherPattern"><code>setDitherPattern()</code></a> are mutually exclusive. Setting a pattern will overwrite a color, and vice versa.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p><code><strong>playdate.graphics.setPattern(image, [x, y])</strong></code></p>
         * </div>
         * <div class="paragraph">
         * <p>Uses the given <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a> to set the 8 x 8 pattern used for drawing. The optional <em>x</em>, <em>y</em> offset (default 0, 0) indicates the top left corner of the 8 x 8 pattern.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setPattern)
         *
         * @noSelf
         */
        export function setPattern(
            pattern: [
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number
            ]
        ): void;

        /**
         * <p>Sets the pattern used for drawing to a dithered pattern. If the current drawing color is white, the pattern is white pixels on a transparent background and (due to a bug) the <em>alpha</em> value is inverted: 1.0 is transparent and 0 is opaque. Otherwise, the pattern is black pixels on a transparent background and <em>alpha</em> 0 is transparent while 1.0 is opaque.</p>
         * </div>
         * <div class="paragraph">
         * <p>The optional <em>ditherType</em> argument is a dither type as used in <a href="https://sdk.play.date/2.5.0#m-graphics.image.blurredImage"><code>playdate.graphics.image:blurredImage()</code></a>, and should be an ordered dither type; i.e., line, screen, or Bayer.</p>
         * </div>
         * <div class="admonitionblock caution">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Caution</div>
         * </td>
         * <td class="content">
         * The error-diffusing dither types Floyd-Steinberg (<code>kDitherTypeFloydSteinberg</code>), Burkes (<code>kDitherTypeBurkes</code>), and Atkinson (<code>kDitherTypeAtkinson</code>) are allowed but produce very unpredictable results here.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setDitherPattern)
         *
         * @noSelf
         */
        export function setDitherPattern(
            alpha: number,
            ditherType: PlaydateDitherType
        ): void;

        /**
         * <p>Draws a line from (<em>x1</em>, <em>y1</em>) to (<em>x2</em>, <em>y2</em>), or draws the <a href="https://sdk.play.date/2.5.0#C-geometry.lineSegment">playdate.geometry.lineSegment</a> <em>ls</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Line width is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineWidth">setLineWidth()</a>. End cap style is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineCapStyle">setLineCapStyle()</a>.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.drawLine"><code>playdate-&gt;graphics-&gt;drawLine()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawLine)
         *
         * @noSelf
         */
        export function drawLine(
            x1: number,
            y1: number,
            x2: number,
            y2: number
        ): void;

        /**
         * <p>Draws a line from (<em>x1</em>, <em>y1</em>) to (<em>x2</em>, <em>y2</em>), or draws the <a href="https://sdk.play.date/2.5.0#C-geometry.lineSegment">playdate.geometry.lineSegment</a> <em>ls</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Line width is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineWidth">setLineWidth()</a>. End cap style is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineCapStyle">setLineCapStyle()</a>.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.drawLine"><code>playdate-&gt;graphics-&gt;drawLine()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawLine)
         *
         * @noSelf
         */
        export function drawLine(ls: PlaydateGeometryLineSegment): void;

        /**
         * <p>Specifies the shape of the endpoints drawn by <a href="https://sdk.play.date/2.5.0#f-graphics.drawLine">drawLine</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>style</em> should be one of these constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kLineCapStyleButt</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kLineCapStyleRound</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kLineCapStyleSquare</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setLineCapStyle"><code>playdate-&gt;graphics-&gt;setLineCapStyle()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setLineCapStyle)
         *
         * @noSelf
         */
        export function setLineCapStyle(style: PlaydateLineCapStyle): void;

        /**
         * <p>Draw a single pixel in the current color at (<em>x</em>, <em>y</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><code><strong>playdate.graphics.drawPixel(p)</strong></code></p>
         * </div>
         * <div class="paragraph">
         * <p>Draw a single pixel in the current color at <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> <em>p</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawPixel)
         *
         * @noSelf
         */
        export function drawPixel(x: number, y: number): void;

        /**
         * <p>Draws the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) with a size of (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p>Line width is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineWidth">setLineWidth()</a>. Stroke location is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setStrokeLocation">setStrokeLocation()</a>.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.drawRect"><code>playdate-&gt;graphics-&gt;drawRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawRect)
         *
         * @noSelf
         */
        export function drawRect(
            x: number,
            y: number,
            w: number,
            h: number
        ): void;

        /**
         * <p>Draws the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) with a size of (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p>Line width is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineWidth">setLineWidth()</a>. Stroke location is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setStrokeLocation">setStrokeLocation()</a>.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.drawRect"><code>playdate-&gt;graphics-&gt;drawRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawRect)
         *
         * @noSelf
         */
        export function drawRect(r: PlaydateGeometryRect): void;

        /**
         * <p>Draws the filled rectangle <em>r</em> or the rect at (<em>x</em>, <em>y</em>) of the given width and height.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillRect"><code>playdate-&gt;graphics-&gt;fillRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRect)
         *
         * @noSelf
         */
        export function fillRect(
            x: number,
            y: number,
            width: number,
            height: number
        ): void;

        /**
         * <p>Draws the filled rectangle <em>r</em> or the rect at (<em>x</em>, <em>y</em>) of the given width and height.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillRect"><code>playdate-&gt;graphics-&gt;fillRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRect)
         *
         * @noSelf
         */
        export function fillRect(r: PlaydateGeometryRect): void;

        /**
         * <p>Draws a rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawRoundRect)
         *
         * @noSelf
         */
        export function drawRoundRect(
            x: number,
            y: number,
            w: number,
            h: number,
            radius: number
        ): void;

        /**
         * <p>Draws a rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawRoundRect)
         *
         * @noSelf
         */
        export function drawRoundRect(
            r: PlaydateGeometryRect,
            radius: number
        ): void;

        /**
         * <p>Draws a filled rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRoundRect)
         *
         * @noSelf
         */
        export function fillRoundRect(
            x: number,
            y: number,
            w: number,
            h: number,
            radius: number
        ): void;

        /**
         * <p>Draws a filled rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRoundRect)
         *
         * @noSelf
         */
        export function fillRoundRect(
            r: PlaydateGeometryRect,
            radius: number
        ): void;

        /**
         * <p>Draws an arc using the current color.</p>
         * </div>
         * <div class="paragraph">
         * <p>Angles are specified in degrees, not radians.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawArc)
         *
         * @noSelf
         */
        export function drawArc(arc: PlaydateGeometryArc): void;

        /**
         * <p>Draws an arc using the current color.</p>
         * </div>
         * <div class="paragraph">
         * <p>Angles are specified in degrees, not radians.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawArc)
         *
         * @noSelf
         */
        export function drawArc(
            x: number,
            y: number,
            radius: number,
            startAngle: number,
            endAngle: number
        ): void;

        /**
         * <p>Draws a circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleAtPoint)
         *
         * @noSelf
         */
        export function drawCircleAtPoint(
            x: number,
            y: number,
            radius: number
        ): void;

        /**
         * <p>Draws a circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleAtPoint)
         *
         * @noSelf
         */
        export function drawCircleAtPoint(
            p: PlaydateGeometryPoint,
            radius: number
        ): void;

        /**
         * <p>Draws a circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleInRect)
         *
         * @noSelf
         */
        export function drawCircleInRect(
            x: number,
            y: number,
            width: number,
            height: number
        ): void;

        /**
         * <p>Draws a circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleInRect)
         *
         * @noSelf
         */
        export function drawCircleInRect(r: PlaydateGeometryRect): void;

        /**
         * <p>Draws a filled circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleAtPoint)
         *
         * @noSelf
         */
        export function fillCircleAtPoint(
            x: number,
            y: number,
            radius: number
        ): void;

        /**
         * <p>Draws a filled circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleAtPoint)
         *
         * @noSelf
         */
        export function fillCircleAtPoint(
            p: PlaydateGeometryPoint,
            radius: number
        ): void;

        /**
         * <p>Draws a filled circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleInRect)
         *
         * @noSelf
         */
        export function fillCircleInRect(
            x: number,
            y: number,
            width: number,
            height: number
        ): void;

        /**
         * <p>Draws a filled circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleInRect)
         *
         * @noSelf
         */
        export function fillCircleInRect(r: PlaydateGeometryRect): void;

        /**
         * <p>Draws an ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawEllipseInRect)
         *
         * @noSelf
         */
        export function drawEllipseInRect(
            x: number,
            y: number,
            width: number,
            height: number,
            startAngle: number,
            endAngle: number
        ): void;

        /**
         * <p>Draws an ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawEllipseInRect)
         *
         * @noSelf
         */
        export function drawEllipseInRect(
            rect: PlaydateGeometryRect,
            startAngle: number,
            endAngle: number
        ): void;

        /**
         * <p>Draws a filled ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillEllipseInRect)
         *
         * @noSelf
         */
        export function fillEllipseInRect(
            x: number,
            y: number,
            width: number,
            height: number,
            startAngle: number,
            endAngle: number
        ): void;

        /**
         * <p>Draws a filled ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillEllipseInRect)
         *
         * @noSelf
         */
        export function fillEllipseInRect(
            rect: PlaydateGeometryRect,
            startAngle: number,
            endAngle: number
        ): void;

        /**
         * <p>Draw the <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">playdate.geometry.polygon</a> <em>p</em>. Only draws a line between the first and last vertex if the polygon is <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.close">closed</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Line width is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineWidth">setLineWidth()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawPolygon)
         *
         * @noSelf
         */
        export function drawPolygon(p: PlaydateGeometryPolygon): void;

        /**
         * <p>Fills the polygon specified by a list of x,y coordinates. An edge between the last vertex and the first is assumed.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillPolygon"><code>playdate-&gt;graphics-&gt;fillPolygon()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillPolygon)
         *
         * @noSelf
         */
        export function fillPolygon(...coordinates: number): void;

        /**
         * <p>Sets the winding rule for filling polygons, one of:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kPolygonFillNonZero</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kPolygonFillEvenOdd</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>See <a href="https://en.wikipedia.org/wiki/Nonzero-rule" class="bare">https://en.wikipedia.org/wiki/Nonzero-rule</a> for an explanation of the winding rule.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setPolygonFillRule)
         *
         * @noSelf
         */
        export function setPolygonFillRule(rule: PlaydateFillRule): void;

        /**
         * <p>Draws a triangle with vertices (<em>x1</em>, <em>y1</em>), (<em>x2</em>, <em>y2</em>), and (<em>x3</em>, <em>y3</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawTriangle)
         *
         * @noSelf
         */
        export function drawTriangle(
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            x3: number,
            y3: number
        ): void;

        /**
         * <p>Draws a filled triangle with vertices (<em>x1</em>, <em>y1</em>), (<em>x2</em>, <em>y2</em>), and (<em>x3</em>, <em>y3</em>).</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillTriangle"><code>playdate-&gt;graphics-&gt;fillTriangle()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillTriangle)
         *
         * @noSelf
         */
        export function fillTriangle(
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            x3: number,
            y3: number
        ): void;

        /**
         * <p>Returns the Perlin value (from 0.0 to 1.0) at position <em>(x, y, z)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>repeat</em> is greater than 0, the pattern of noise will repeat at that point on all 3 axes.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>octaves</em> is the number of octaves of noise to apply.  Compute time increases linearly with each additional octave, but the results are a bit more organic, consisting of a combination of larger and smaller variations.</p>
         * </div>
         * <div class="paragraph">
         * <p>When using more than one octave, <em>persistence</em> is a value from 0.0 - 1.0 describing the amount the amplitude is scaled each octave.  The lower the value of <em>persistence</em>, the less influence each successive octave has on the final value.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.perlin)
         *
         * @noSelf
         */
        export function perlin(
            x: number,
            y: number,
            z: number,
            repeat: number,
            octaves: number,
            persistence: number
        ): void;

        /**
         * <p>Returns an array of Perlin values at once, avoiding the performance penalty of calling <em>perlin()</em> multiple times in a loop.</p>
         * </div>
         * <div class="paragraph">
         * <p>The parameters are the same as <em>perlin()</em> except:</p>
         * </div>
         * <div class="paragraph">
         * <p><em>count</em> is the number of values to be returned.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>dx</em>, <em>dy</em>, and <em>dz</em> are how far to step along the x, y, and z axes in each iteration.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.perlinArray)
         *
         * @noSelf
         */
        export function perlinArray(
            count: number,
            x: number,
            dx: number,
            y: number,
            dy: number,
            z: number,
            dz: number,
            repeat: number,
            octaves: number,
            persistence: number
        ): number[];

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/qrcode</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock caution">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Caution</div>
         * </td>
         * <td class="content">
         * This function uses <a href="https://sdk.play.date/2.5.0#C-timer"><code>playdate.timer</code></a> internally, so be sure to call <a href="https://sdk.play.date/2.5.0#f-timer.updateTimers"><code>playdate.timer.updateTimers()</code></a> in your main <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> function, otherwise the callback will never be invoked.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Asynchronously returns an image representing a QR code for the passed-in string to the function <code>callback</code>. The arguments passed to the callback are <a href="https://sdk.play.date/2.5.0#C-graphics.image"><em>image</em></a>, <em>errorMessage</em>. (If an <em>errorMessage</em> string is returned, <em>image</em> will be nil.)</p>
         * </div>
         * <div class="paragraph">
         * <p><code>desiredEdgeDimension</code> lets you specify an approximate edge dimension in pixels for the desired QR code,&nbsp;though the function has limited flexibility in sizing QR codes, based on the amount of information to be encoded, and the restrictions of a 1-bit screen. The function will attempt to generate a QR code <em>smaller</em> than <code>desiredEdgeDimension</code> if possible. (Note that QR codes always have the same width and height.)</p>
         * </div>
         * <div class="paragraph">
         * <p>If you specify nil for <code>desiredEdgeDimension</code>, the returned image will balance small size with easy readability. If you specify 0, the returned image will be the smallest possible QR code for the specified string.</p>
         * </div>
         * <div class="paragraph">
         * <p><code>generateQRCode()</code> will return a reference to the <a href="https://sdk.play.date/2.5.0#C-timer">timer</a> it uses to run asynchronously. If you wish to stop execution of the background process generating the QR code, call <a href="https://sdk.play.date/2.5.0#m-timer.remove"><code>:remove()</code></a> on that returned timer.</p>
         * </div>
         * <div class="admonitionblock tip">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Tip</div>
         * </td>
         * <td class="content">
         * If you know ahead of time what data you plan to encode, it is much faster to pre-generate the QR code, store it as a .png file in your game, and draw the .png at runtime. You can use <a href="https://sdk.play.date/2.5.0#f-simulator.writeToFile"><code>playdate.simulator.writeToFile()</code></a> to create this .png file.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.generateQRCode)
         *
         * @noSelf
         */
        export function generateQRCode(
            stringToEncode: string,
            desiredEdgeDimension: number,
            callback: () => void
        ): PlaydateGraphicsImage;

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Draws an approximation of a sine wave between the points <em>startX, startY</em> and <em>endX, endY</em>.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>startAmplitude</em>: The number of pixels above and below the line from <em>startX, startY</em> and <em>endX, endY</em> the peaks and valleys of the wave will be drawn at the start of the wave.</p>
         * </li>
         * <li>
         * <p><em>endAmplitude</em>: The number of pixels above and below the line from <em>startX, startY</em> and <em>endX, endY</em> the peaks and valleys of the wave will be drawn at the end of the wave.</p>
         * </li>
         * <li>
         * <p><em>period</em>: The distance between peaks, in pixels.</p>
         * </li>
         * <li>
         * <p><em>phaseShift</em>: If provided, specifies the wave’s offset, in pixels.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawSineWave)
         *
         * @noSelf
         */
        export function drawSineWave(
            startX: number,
            startY: number,
            endX: number,
            endY: number,
            startAmplitude: number,
            endAmplitude: number,
            period: number,
            phaseShift: number
        ): void;

        /**
         * <p><code>setClipRect()</code> sets the clipping rectangle for all subsequent graphics drawing, including bitmaps. The argument can either be separate dimensions or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> object. The clip rect is automatically cleared at the beginning of the <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> callback. The function uses world coordinates; that is, the given rectangle will be translated by the current drawing offset. To use screen coordinates instead, use <a href="https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect"><code>setScreenClipRect()</code></a></p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setClipRect"><code>playdate-&gt;graphics-&gt;setClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setClipRect)
         *
         * @noSelf
         */
        export function setClipRect(
            x: number,
            y: number,
            width: number,
            height: number
        ): void;

        /**
         * <p><code>setClipRect()</code> sets the clipping rectangle for all subsequent graphics drawing, including bitmaps. The argument can either be separate dimensions or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> object. The clip rect is automatically cleared at the beginning of the <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> callback. The function uses world coordinates; that is, the given rectangle will be translated by the current drawing offset. To use screen coordinates instead, use <a href="https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect"><code>setScreenClipRect()</code></a></p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setClipRect"><code>playdate-&gt;graphics-&gt;setClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setClipRect)
         *
         * @noSelf
         */
        export function setClipRect(rect: PlaydateGeometryRect): void;

        /**
         * <p><code>getClipRect()</code> returns multiple values (<em>x</em>, <em>y</em>, <em>width</em>, <em>height</em>) giving the current clipping rectangle.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getClipRect)
         *
         * @noSelf
         */
        export function getClipRect(): [number, number, number, number];

        /**
         * <p>Sets the clip rectangle as above, but uses screen coordinates instead of world coordinates—​that is, it ignores the current drawing offset.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setScreenClipRect"><code>playdate-&gt;graphics-&gt;setScreenClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect)
         *
         * @noSelf
         */
        export function setScreenClipRect(
            x: number,
            y: number,
            width: number,
            height: number
        ): void;

        /**
         * <p>Sets the clip rectangle as above, but uses screen coordinates instead of world coordinates—​that is, it ignores the current drawing offset.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setScreenClipRect"><code>playdate-&gt;graphics-&gt;setScreenClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect)
         *
         * @noSelf
         */
        export function setScreenClipRect(rect: PlaydateGeometryRect): void;

        /**
         * <p>Returns the clip rect as in <code>getClipRect()</code>, but using screen coordinates instead of world coordinates.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getScreenClipRect)
         *
         * @noSelf
         */
        export function getScreenClipRect(): [number, number, number, number];

        /**
         * <p>Clears the current clipping rectangle, set with <a href="https://sdk.play.date/2.5.0#f-graphics.setClipRect"><code>setClipRect()</code></a>.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.clearClipRect"><code>playdate-&gt;graphics-&gt;clearClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.clearClipRect)
         *
         * @noSelf
         */
        export function clearClipRect(): void;

        /**
         * <p>Sets the current <a href="https://en.wikipedia.org/wiki/Stencil_buffer">stencil</a> to the given image. If <em>tile</em> is set, the the stencil will be tiled; in this case, the image width must be a multiple of 32 pixels.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setStencilImage"><code>playdate-&gt;graphics-&gt;setStencilImage()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setStencilImage)
         *
         * @noSelf
         */
        export function setStencilImage(
            image: PlaydateGraphicsImage,
            tile: boolean
        ): void;

        /**
         * <p>Sets a pattern to use for stenciled drawing, as an alternative to creating an image, drawing a pattern into the image, then using that in <code>setStencilImage()</code>. <code>pattern</code> should be a table of the form <code>{ row1, row2, row3, row4, row5, row6, row7, row8 }</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setStencilPattern)
         *
         * @noSelf
         */
        export function setStencilPattern(
            pattern: [
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number
            ]
        ): void;

        /**
         * <p>Sets the stencil to a dither pattern specified by <em>level</em> and optional <em>ditherType</em> (defaults to <code>playdate.graphics.image.kDitherTypeBayer8x8</code>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setStencilPattern-dither)
         *
         * @noSelf
         */
        export function setStencilPattern(
            level: number,
            ditherType: PlaydateDitherType
        ): void;

        /**
         * <p>Clears the <a href="https://en.wikipedia.org/wiki/Stencil_buffer">stencil buffer</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.clearStencil)
         *
         * @noSelf
         */
        export function clearStencil(): void;

        /**
         * <div class="admonitionblock caution">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Caution</div>
         * </td>
         * <td class="content">
         * <em>Deprecated.</em>
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Clears the <a href="https://en.wikipedia.org/wiki/Stencil_buffer">stencil buffer</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.clearStencilImage)
         *
         * @noSelf
         */
        export function clearStencilImage(): void;

        /**
         * <p>Sets the current drawing mode for images.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * The draw mode applies to images and fonts (which are technically images). The draw mode does not apply to primitive shapes such as lines or rectangles.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>The available options for <em>mode</em> (demonstrated by drawing a two-color background image first, setting the specified draw mode, then drawing the Crankin' character on top) are:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeCopy</em>: Images are drawn exactly as they are (black pixels are drawn black and white pixels are drawn white)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-copy.png" alt="drawmode copy">
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeWhiteTransparent</em>: Any white portions of an image are drawn transparent (black pixels are drawn black and white pixels are drawn transparent)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-whitetransparent.png" alt="drawmode whitetransparent">
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeBlackTransparent</em>: Any black portions of an image are drawn transparent (black pixels are drawn transparent and white pixels are drawn white)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-blacktransparent.png" alt="drawmode blacktransparent">
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeFillWhite</em>: All non-transparent pixels are drawn white (black pixels are drawn white and white pixels are drawn white)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-fillwhite.png" alt="drawmode fillwhite">
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeFillBlack</em>: All non-transparent pixels are drawn black (black pixels are drawn black and white pixels are drawn black)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-fillblack.png" alt="drawmode fillblack">
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeXOR</em>: Pixels are drawn inverted on white backgrounds, creating an effect where any white pixels in the original image will always be visible, regardless of the background color, and any black pixels will appear transparent (on a white background, black pixels are drawn white and white pixels are drawn black)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-xor.png" alt="drawmode xor">
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeNXOR</em>: Pixels are drawn inverted on black backgrounds, creating an effect where any black pixels in the original image will always be visible, regardless of the background color, and any white pixels will appear transparent (on a black background, black pixels are drawn white and white pixels are drawn black)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-nxor.png" alt="drawmode nxor">
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kDrawModeInverted</em>: Pixels are drawn inverted (black pixels are drawn white and white pixels are drawn black)</p>
         * </li>
         * </ul>
         * </div>
         * <div class="imageblock pixelart">
         * <div class="content">
         * <img src="Inside%20Playdate/drawmode-inverted.png" alt="drawmode inverted">
         * </div>
         * </div>
         * <div class="paragraph">
         * <p>Instead of the above-specified constants, you can also use one of the following strings: "copy", "inverted", "XOR", "NXOR", "whiteTransparent", "blackTransparent", "fillWhite", or "fillBlack".</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setDrawMode"><code>playdate-&gt;graphics-&gt;setDrawMode()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setImageDrawMode)
         *
         * @noSelf
         */
        export function setImageDrawMode(mode: PlaydateDrawMode): void;

        /**
         * <p>Gets the current drawing mode for images.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getImageDrawMode)
         *
         * @noSelf
         */
        export function getImageDrawMode(): PlaydateDrawMode;

        /**
         * <p>Sets the width of the line for <a href="https://sdk.play.date/2.5.0#f-graphics.drawLine">drawLine</a>, <a href="https://sdk.play.date/2.5.0#f-graphics.drawRect">drawRect</a>, <a href="https://sdk.play.date/2.5.0#f-graphics.drawPolygon">drawPolygon</a>, and <a href="https://sdk.play.date/2.5.0#f-graphics.drawArc">drawArc</a> when a <a href="https://sdk.play.date/2.5.0#C-geometry.arc">playdate.geometry.arc</a> is passed as the argument. This value is saved and restored when pushing and popping the <a href="https://sdk.play.date/2.5.0#f-graphics.pushContext">graphics context</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setLineWidth)
         *
         * @noSelf
         */
        export function setLineWidth(width: number): void;

        /**
         * <p>Gets the current line width.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getLineWidth)
         *
         * @noSelf
         */
        export function getLineWidth(): number;

        /**
         * <p>Specifies where the stroke is placed relative to the rectangle passed into <a href="https://sdk.play.date/2.5.0#f-graphics.drawRect">drawRect</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>location</em> is one of these constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.kStrokeCentered</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kStrokeOutside</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.kStrokeInside</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>This value is saved and restored when pushing and popping the <a href="https://sdk.play.date/2.5.0#f-graphics.pushContext">graphics context</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setStrokeLocation)
         *
         * @noSelf
         */
        export function setStrokeLocation(
            location: PlaydateStrokeLocation
        ): void;

        /**
         * <p>Gets the current stroke position.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getStrokeLocation)
         *
         * @noSelf
         */
        export function getStrokeLocation(): PlaydateStrokeLocation;

        /**
         * <p><code>lockFocus()</code> routes all drawing to the given <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a>. <a href="https://sdk.play.date/2.5.0#f-graphics.unlockFocus">playdate.graphics.unlockFocus()</a> returns drawing to the frame buffer.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * If you draw into an image with color set to <em>playdate.graphics.kColorClear</em>, those drawn pixels will be set to transparent. When you later draw the image into the framebuffer, those pixels will not be rendered, i.e., will act as transparent pixels in the image.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * <a href="https://sdk.play.date/2.5.0#f-graphics.pushContext">playdate.graphics.pushContext(<em>image</em>)</a> will also allow offscreen drawing into an image, with the additional benefit of being able to save and restore the graphics state.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.lockFocus)
         *
         * @noSelf
         */
        export function lockFocus(image: PlaydateGraphicsImage): void;

        /**
         * <p>After calling <code>unlockFocus()</code>, drawing is routed to the frame buffer.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.unlockFocus)
         *
         * @noSelf
         */
        export function unlockFocus(): void;

        /**
         * <p><code>setDrawOffset(x, y)</code> offsets the origin point for all drawing calls to <em>x</em>, <em>y</em> (can be negative). So, for example, if the offset is set to -20, -20, an image drawn at 20, 20 will appear at the origin (in the upper left corner.)</p>
         * </div>
         * <div class="paragraph">
         * <p>This is useful, for example, for centering a "camera" on a sprite that is moving around a world larger than the screen.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * The <em>x</em> and <em>y</em> arguments to <code>.setDrawOffset()</code> are always specified in the original, unaltered coordinate system. So, for instance, repeated calls to <code>playdate.graphics.setDrawOffset(-10, -10)</code> will leave the draw offset unchanged. Likewise, <code>.setDrawOffset(0, 0)</code> will always "disable" the offset.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock tip">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Tip</div>
         * </td>
         * <td class="content">
         * It can be useful to have operations sometimes ignore the draw offsets. For example, you may want to have the score or some other heads-up display appear onscreen apart from scrolling content. A sprite can be set to ignore offsets by calling <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setIgnoresDrawOffset">playdate.graphics.sprite:setIgnoresDrawOffset(true)</a>. <a href="https://sdk.play.date/2.5.0#m-graphics.image.drawIgnoringOffset">playdate.graphics.image:drawIgnoringOffsets()</a> lets you render an image using screen coordinates.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setDrawOffset"><code>playdate-&gt;graphics-&gt;setDrawOffset()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setDrawOffset)
         *
         * @noSelf
         */
        export function setDrawOffset(x: number, y: number): void;

        /**
         * <p><code>getDrawOffset()</code> returns multiple values (<em>x</em>, <em>y</em>) giving the current draw offset.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getDrawOffset)
         *
         * @noSelf
         */
        export function getDrawOffset(): [number, number];

        /**
         * <p>Returns a copy the contents of the <em>last completed frame</em>, i.e., a "screenshot", as a <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a>.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Display functions like <a href="https://sdk.play.date/2.5.0#f-display.setMosaic">setMosaic()</a>, <a href="https://sdk.play.date/2.5.0#f-display.setInverted">setInverted()</a>, <a href="https://sdk.play.date/2.5.0#f-display.setScale">setScale()</a>, and <a href="https://sdk.play.date/2.5.0#f-display.setOffset">setOffset()</a> do not affect the returned image.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getDisplayImage)
         *
         * @noSelf
         */
        export function getDisplayImage(): PlaydateGraphicsImage;

        /**
         * <p>Returns a copy the contents of the working frame buffer — <em>the current frame, in-progress</em> — as a <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a>.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Display functions like <a href="https://sdk.play.date/2.5.0#f-display.setMosaic">setMosaic()</a>, <a href="https://sdk.play.date/2.5.0#f-display.setInverted">setInverted()</a>, <a href="https://sdk.play.date/2.5.0#f-display.setScale">setScale()</a>, and <a href="https://sdk.play.date/2.5.0#f-display.setOffset">setOffset()</a> do not affect the returned image.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getWorkingImage)
         *
         * @noSelf
         */
        export function getWorkingImage(): PlaydateGraphicsImage;

        /**
         * <p>Sets the sprite’s stencil to the given pattern, tiled across the screen.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setStencilPattern)
         *
         * @noSelf
         */
        export function setStencilPattern(
            pattern: [
                number,
                number,
                number,
                number,
                number,
                number,
                number,
                number
            ]
        ): void;

        /**
         * <p>Sets the current font, a <a href="https://sdk.play.date/2.5.0#C-graphics.font">playdate.graphics.font</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>variant</em> should be one of the strings "normal", "bold", or "italic", or one of the constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.font.kVariantNormal</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.font.kVariantBold</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.font.kVariantItalic</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>If no variant is specified, <em>kFontVariantNormal</em> is used.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setFont"><code>playdate-&gt;graphics-&gt;setFont()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setFont)
         *
         * @noSelf
         */
        export function setFont(
            font: PlaydateGraphicsFont,
            variant: PlaydateFontVariant
        ): void;

        /**
         * <p>Returns the current font, a <a href="https://sdk.play.date/2.5.0#C-graphics.font">playdate.graphics.font</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getFont)
         *
         * @noSelf
         */
        export function getFont(
            variant: PlaydateFontVariant
        ): PlaydateGraphicsFont;

        /**
         * <p>Sets multiple font variants at once. <code>fontFamily</code> should be a table using the following format:</p>
         * </div>
         * <div class="literalblock">
         * <div class="content">
         * <pre>local fontFamily = {
         *  [playdate.graphics.font.kVariantNormal] = normal_font,
         *     [playdate.graphics.font.kVariantBold] = bold_font,
         *     [playdate.graphics.font.kVariantItalic] = italic_font
         * }</pre>
         * </div>
         * </div>
         * <div class="paragraph">
         * <p>All fonts and font variants need not be present in the table.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setFontFamily)
         *
         * @noSelf
         */
        export function setFontFamily(fontFamily: PlaydateFontVariant): void;

        /**
         * <p>Sets the global font tracking (spacing between letters) in pixels. This value is added to the font’s own tracking value as specified in its .fnt file.</p>
         * </div>
         * <div class="paragraph">
         * <p>See <a href="https://sdk.play.date/2.5.0#m-graphics.font.setTracking">playdate.graphics.font:setTracking</a> to adjust tracking on a specific font.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setFontTracking)
         *
         * @noSelf
         */
        export function setFontTracking(pixels: number): void;

        /**
         * <p>Gets the global font tracking (spacing between letters) in pixels.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getFontTracking)
         *
         * @noSelf
         */
        export function getFontTracking(): number;

        /**
         * <p>Like <a href="https://sdk.play.date/2.5.0#f-graphics.getFont">getFont()</a> but returns the system font rather than the currently set font.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>variant</em> should be one of the strings "normal", "bold", or "italic", or one of the constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.font.kVariantNormal</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.font.kVariantBold</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.font.kVariantItalic</em></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getSystemFont)
         *
         * @noSelf
         */
        export function getSystemFont(
            variant: PlaydateFontVariant
        ): PlaydateGraphicsFont;

        /**
         * <p>Draws the text using the current font and font advance at location (<em>x</em>, <em>y</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>fontFamily</em> is provided, the text is draw using the given fonts instead of the currently set font. <em>fontFamily</em> should be a table of fonts using keys as specified in <a href="https://sdk.play.date/2.5.0#f-graphics.setFontFamily">setFontFamily(fontFamily)</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p>The optional <em>leadingAdjustment</em> may be used to modify the spacing between lines of text. Pass nil to use the default leading for the font.</p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <code><em>width</em></code>, <code><em>height</em></code>, indicating the size in pixels of the drawn text.</p>
         * </div>
         * <div class="paragraph">
         * <p><strong>Styling text</strong></p>
         * </div>
         * <div class="paragraph">
         * <p>To draw bold text, surround the bold portion of text with asterisks. To draw italic text, surround the italic portion of text with underscores. For example:</p>
         * </div>
         * <div class="literalblock">
         * <div class="content">
         * <pre>playdate.graphics.drawText("normal *bold* _italic_", x, y)</pre>
         * </div>
         * </div>
         * <div class="paragraph">
         * <p>which will output: "normal <strong>bold</strong> <em>italic</em>". Bold and italic font variations must be set using <a href="https://sdk.play.date/2.5.0#f-graphics.setFont">setFont()</a> with the appropriate variant argument, otherwise the default Playdate fonts will be used.</p>
         * </div>
         * <div class="paragraph">
         * <p><strong>Escaping styling characters</strong></p>
         * </div>
         * <div class="paragraph">
         * <p>To draw an asterisk or underscore, use a double-asterisk or double-underscore. Styles may not be nested, but double-characters can be used inside of a styled portion of text.</p>
         * </div>
         * <div class="paragraph">
         * <p>For a complete set of characters allowed in <em>text</em>, see <a href="https://sdk.play.date/2.5.0#C-graphics.font">playdate.graphics.font</a>. In addition, the newline character <code>\n</code> is allowed and works as expected.</p>
         * </div>
         * <div class="paragraph">
         * <p><strong>Avoiding styling</strong></p>
         * </div>
         * <div class="paragraph">
         * <p>Use <a href="https://sdk.play.date/2.5.0#m-graphics.font.drawText">playdate.graphics.font:drawText()</a>, which doesn’t support formatted text.</p>
         * </div>
         * <div class="paragraph">
         * <p><strong>Inverting text color</strong></p>
         * </div>
         * <div class="paragraph">
         * <p>To draw white-on-black text (assuming the font you are using is defined in the standard black-on-transparent manner), first call <a href="https://sdk.play.date/2.5.0#f-graphics.setImageDrawMode">playdate.graphics.setImageDrawMode(playdate.graphics.kDrawModeFillWhite)</a>, followed by the appropriate drawText() call. setImageDrawMode() affects how text is rendered because characters are technically images.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.drawText"><code>playdate-&gt;graphics-&gt;drawText()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawText)
         *
         * @noSelf
         */
        export function drawText(
            text: number,
            x: number,
            y: number,
            fontFamily: PlaydateFontFamily,
            leadingAdjustment: number
        ): [number, number];

        /**
         * <p>Draws the text found by doing a lookup of <em>key</em> in the .strings file corresponding to the current system language, or <em>language</em>, if specified.</p>
         * </div>
         * <div class="paragraph">
         * <p>The optional <em>language</em> argument can be one of the strings "en", "jp", or one of the constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.font.kLanguageEnglish</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.font.kLanguageJapanese</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>For more information about localization and strings files, see the <a href="https://sdk.play.date/2.5.0#localization">Localization</a> section.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawLocalizedText)
         *
         * @noSelf
         */
        export function drawLocalizedText(
            key: string,
            x: number,
            y: number,
            language: PlaydateLanguage,
            leadingAdjustment: number
        ): void;

        /**
         * <p>Returns a string found by doing a lookup of <em>key</em> in the .strings file corresponding to the current system language, or <em>language</em>, if specified.</p>
         * </div>
         * <div class="paragraph">
         * <p>The optional <em>language</em> argument can be one of the strings "en", "jp", or one of the constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.font.kLanguageEnglish</em></p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.font.kLanguageJapanese</em></p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>For more information about localization and strings files, see the <a href="https://sdk.play.date/2.5.0#localization">Localization</a> section.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getLocalizedText)
         *
         * @noSelf
         */
        export function getLocalizedText(
            key: string,
            language: PlaydateLanguage
        ): string;

        /**
         * <p>Returns multiple values <em>(width, height)</em> giving the dimensions required to draw the text <em>str</em> using <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">drawText()</a>. Newline characters (<code>\n</code>) are respected.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>fontFamily</em> should be a table of fonts using keys as specified in <a href="https://sdk.play.date/2.5.0#f-graphics.setFontFamily">setFontFamily(fontFamily)</a>. If provided, fonts from <em>fontFamily</em> will be used for calculating the size of <em>str</em> instead of the currently set font.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getTextSize)
         *
         * @noSelf
         */
        export function getTextSize(
            str: string,
            fontFamily: PlaydateFontFamily,
            leadingAdjustment: number
        ): [number, number];

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Draws the string <em>text</em> aligned to the left, right, or centered on the <em>x</em> coordinate. Pass one of <em>kTextAlignment.left</em>, <em>kTextAlignment.center</em>, <em>kTextAlignment.right</em> for the <em>alignment</em> parameter.</p>
         * </div>
         * <div class="paragraph">
         * <p>For text formatting options, see <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">drawText()</a></p>
         * </div>
         * <div class="paragraph">
         * <p>To draw unstyled text using a single font, see <a href="https://sdk.play.date/2.5.0#m-graphics.font.drawTextAligned">playdate.graphics.font:drawTextAligned()</a></p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawTextAligned)
         *
         * @noSelf
         */
        export function drawTextAligned(
            text: string,
            x: number,
            y: number,
            alignment: PlaydateTextAlignment,
            leadingAdjustment: number
        ): void;

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use these functions.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Draws the text using the current font and font advance into the rect defined by (<code><em>x</em></code>, <code><em>y</em></code>, <code><em>width</em></code>, <code><em>height</em></code>) (or <code><em>rect</em></code>).</p>
         * </div>
         * <div class="paragraph">
         * <p>If <code><em>truncationString</em></code> is provided and the text cannot fit in the rect, <code><em>truncationString</em></code> will be appended to the last line.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>alignment</em></code>, if provided, should be one of one of <code><em>kTextAlignment.left</em></code>, <code><em>kTextAlignment.center</em></code>, <code><em>kTextAlignment.right</em></code>. Pass <code>nil</code> for <code><em>leadingAdjustment</em></code> and <code><em>truncationString</em></code> if those parameters are not required.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>font</em></code>, if provided, will cause the text to be drawn unstyled using <a href="https://sdk.play.date/2.5.0#m-graphics.font.drawText">font:drawText()</a> rather than <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">playdate.graphics.drawText()</a> using the currently-set system fonts.</p>
         * </div>
         * <div class="paragraph">
         * <p>For text formatting options, see <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">drawText()</a></p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <code><em>width</em></code>, <code><em>height</em></code>, <code><em>textWasTruncated</em></code></p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>width</em></code> and <code><em>height</em></code> indicate the size in pixels of the drawn text. These values may be smaller than the width and height specified when calling the function.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>textWasTruncated</em></code> indicates if the text was truncated to fit within the specified rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawTextInRect)
         *
         * @noSelf
         */
        export function drawTextInRect(
            text: string,
            x: number,
            y: number,
            width: number,
            height: number,
            leadingAdjustment: number,
            truncationString: string,
            alignment: PlaydateTextAlignment,
            font: PlaydateGraphicsFont
        ): [number, number, boolean];

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use these functions.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Draws the text using the current font and font advance into the rect defined by (<code><em>x</em></code>, <code><em>y</em></code>, <code><em>width</em></code>, <code><em>height</em></code>) (or <code><em>rect</em></code>).</p>
         * </div>
         * <div class="paragraph">
         * <p>If <code><em>truncationString</em></code> is provided and the text cannot fit in the rect, <code><em>truncationString</em></code> will be appended to the last line.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>alignment</em></code>, if provided, should be one of one of <code><em>kTextAlignment.left</em></code>, <code><em>kTextAlignment.center</em></code>, <code><em>kTextAlignment.right</em></code>. Pass <code>nil</code> for <code><em>leadingAdjustment</em></code> and <code><em>truncationString</em></code> if those parameters are not required.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>font</em></code>, if provided, will cause the text to be drawn unstyled using <a href="https://sdk.play.date/2.5.0#m-graphics.font.drawText">font:drawText()</a> rather than <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">playdate.graphics.drawText()</a> using the currently-set system fonts.</p>
         * </div>
         * <div class="paragraph">
         * <p>For text formatting options, see <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">drawText()</a></p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <code><em>width</em></code>, <code><em>height</em></code>, <code><em>textWasTruncated</em></code></p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>width</em></code> and <code><em>height</em></code> indicate the size in pixels of the drawn text. These values may be smaller than the width and height specified when calling the function.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>textWasTruncated</em></code> indicates if the text was truncated to fit within the specified rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawTextInRect)
         *
         * @noSelf
         */
        export function drawTextInRect(
            text: string,
            rect: PlaydateGeometryRect,
            leadingAdjustment: number,
            truncationString: string,
            alignment: PlaydateTextAlignment,
            font: PlaydateGraphicsFont
        ): [number, number, boolean];

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Same as <a href="https://sdk.play.date/2.5.0#f-graphics.drawTextAligned">drawTextAligned()</a> except localized text is drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawLocalizedTextAligned)
         *
         * @noSelf
         */
        export function drawLocalizedTextAligned(
            text: string,
            x: number,
            y: number,
            alignment: PlaydateTextAlignment,
            language: PlaydateLanguage,
            leadingAdjustment: number
        ): void;

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use these functions.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Same as <a href="https://sdk.play.date/2.5.0#f-graphics.drawTextInRect">drawTextInRect()</a> except localized text is drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawLocalizedTextInRect)
         *
         * @noSelf
         */
        export function drawLocalizedTextInRect(
            text: string,
            x: number,
            y: number,
            width: number,
            height: number,
            leadingAdjustment: number,
            truncationString: string,
            alignment: PlaydateTextAlignment,
            font: PlaydateGraphicsFont,
            language: PlaydateLanguage
        ): [number, number, boolean];

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use these functions.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Same as <a href="https://sdk.play.date/2.5.0#f-graphics.drawTextInRect">drawTextInRect()</a> except localized text is drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawLocalizedTextInRect)
         *
         * @noSelf
         */
        export function drawLocalizedTextInRect(
            text: string,
            rect: PlaydateGeometryRect,
            leadingAdjustment: number,
            truncationString: string,
            alignment: PlaydateTextAlignment,
            font: PlaydateGraphicsFont,
            language: PlaydateLanguage
        ): [number, number, boolean];

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Returns <code><em>width</em></code>, <code><em>height</em></code> which indicate the minimum size required for <code><em>text</em></code> to be drawn using <a href="https://sdk.play.date/2.5.0#f-graphics.drawTextInRect">drawTextInRect()</a>. The <code><em>width</em></code> returned will be less than or equal to <code><em>maxWidth</em></code>.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>font</em></code>, if provided, will cause the text size to be calculated without bold or italic styling using the specified font.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getTextSizeForMaxWidth)
         *
         * @noSelf
         */
        export function getTextSizeForMaxWidth(
            text: string,
            maxWidth: number,
            leadingAdjustment: number,
            font: PlaydateGraphicsFont
        ): [number, number];

        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Generates an image containing <code><em>text</em></code>. This is useful if you need to redraw the same text frequently.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>maxWidth</em></code> and <code><em>maxHeight</em></code> specify the maximum size of the returned image.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>backgroundColor</em></code>, if specified, will cause the image’s background to be one of <em>playdate.graphics.kColorWhite</em>, <em>playdate.graphics.kColorBlack</em>, or <em>playdate.graphics.kColorClear</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>font</em></code>, if provided, will cause the text to be drawn without bold or italic styling using the specified font.</p>
         * </div>
         * <div class="paragraph">
         * <p>The remaining arguments are the same as those in <a href="https://sdk.play.date/2.5.0#f-graphics.drawTextInRect">drawTextInRect()</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <code><em>image</em></code>, <code><em>textWasTruncated</em></code></p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>image</em></code> is a newly-created image containing the specified text, or nil if an image could not be created. The image’s dimensions may be smaller than <code><em>maxWidth</em></code>, <code><em>maxHeight</em></code>.</p>
         * </div>
         * <div class="paragraph">
         * <p><code><em>textWasTruncated</em></code> indicates if the text was truncated to fit within the specified width and height.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.imageWithText)
         *
         * @noSelf
         */
        export function imageWithText(
            text: string,
            maxWidth: number,
            maxHeight: number,
            backgroundColor: PlaydateColor,
            leadingAdjustment: number,
            truncationString: string,
            alignment: PlaydateTextAlignment,
            font: PlaydateGraphicsFont
        ): [PlaydateGraphicsImage, boolean];

        namespace image {
            /**
             * <p>Creates a new blank image of the given width and height. The image can be drawn on using <a href="https://sdk.play.date/2.5.0#f-graphics.pushContext">playdate.graphics.pushContext()</a> or <a href="https://sdk.play.date/2.5.0#f-graphics.lockFocus">playdate.graphics.lockFocus()</a>. The optional <em>bgcolor</em> argument is one of the color constants as used in <a href="https://sdk.play.date/2.5.0#f-graphics.setColor">playdate.graphics.setColor()</a>, defaulting to <em>kColorClear</em>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.image.new)
             *
             * @noSelf
             */
            function _new(
                width: number,
                height: number,
                bgcolor: PlaydateColor
            ): PlaydateGraphicsImage;

            export { _new as new };

            /**
             * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a> object from the data at <em>path</em>. If there is no file at <em>path</em>, the function returns nil and a second value describing the error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.image.new-path)
             *
             * @noSelf
             */
            function _new(path: string): PlaydateGraphicsImage;

            export { _new as new };
        }

        namespace nineSlice {
            /**
             * <p>Returns a new 9 slice image from the image at imagePath with the stretchable region defined by other parameters. The arguments represent the origin and dimensions of the innermost ("center") slice.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.nineSlice.new)
             *
             * @noSelf
             */
            function _new(
                imagePath: string,
                innerX: number,
                innerY: number,
                innerWidth: number,
                innerHeight: number
            ): PlaydateGraphicsNineSlice;

            export { _new as new };
        }

        namespace animation {
            namespace loop {
                /**
                 * <p>Creates a new animation object.</p>
                 * </div>
                 * <div class="ulist">
                 * <ul>
                 * <li>
                 * <p><strong><em>imageTable</em></strong> should be a <a href="https://sdk.play.date/2.5.0#C-graphics.imagetable"><code>playdate.graphics.imagetable</code></a>, or nil.</p>
                 * </li>
                 * </ul>
                 * </div>
                 * <div class="paragraph">
                 * <p>The following properties can be read or set directly, and have these defaults:</p>
                 * </div>
                 * <div class="ulist">
                 * <ul>
                 * <li>
                 * <p><strong><em>delay</em></strong> : the value of <em>delay</em>, if passed, or 100ms (the delay before moving to the next frame)</p>
                 * </li>
                 * <li>
                 * <p><strong><em>startFrame</em></strong> : 1 (the value the object resets to when the loop completes)</p>
                 * </li>
                 * <li>
                 * <p><strong><em>endFrame</em></strong> : the number of images in <em>imageTable</em> if passed, or 1 (the last frame value in the loop)</p>
                 * </li>
                 * <li>
                 * <p><strong><em>frame</em></strong> : 1 (the current frame counter)</p>
                 * </li>
                 * <li>
                 * <p><strong><em>step</em></strong> : 1 (the value by which frame increments)</p>
                 * </li>
                 * <li>
                 * <p><strong><em>shouldLoop</em></strong> : the value of <em>shouldLoop</em>, if passed, or true. (whether the object loops when it completes)</p>
                 * </li>
                 * <li>
                 * <p><strong><em>paused</em></strong> : false (paused loops don’t change their frame value)</p>
                 * </li>
                 * </ul>
                 *
                 * [Read more](https://sdk.play.date/2.5.0#f-graphics.animation.loop.new)
                 *
                 * @noSelf
                 */
                function _new(
                    delay: number,
                    imageTable: PlaydateGraphicsImagetable,
                    shouldLoop: boolean
                ): PlaydateGraphicsAnimationLoop;

                export { _new as new };
            }

            namespace blinker {
                /**
                 * <p>Creates a new blinker object. Check the object’s <code>on</code> property to determine whether the blinker is on (<code>true</code>) or off (<code>false</code>). The default properties are:</p>
                 * </div>
                 * <div class="ulist">
                 * <ul>
                 * <li>
                 * <p><em>onDuration</em>: 200 (the number of milliseconds the blinker is "on")</p>
                 * </li>
                 * <li>
                 * <p><em>offDuration</em>: 200 (the number of milliseconds the blinker is "off")</p>
                 * </li>
                 * <li>
                 * <p><em>loop</em>: false (should the blinker restart after completing)</p>
                 * </li>
                 * <li>
                 * <p><em>cycles</em>: 6 (the number of changes the blinker goes through before it’s complete)</p>
                 * </li>
                 * <li>
                 * <p><em>default</em>: true (the state the blinker will start in. <strong>Note:</strong> if default is <code>true</code>, <code>blinker.on</code> will return <code>true</code> when the blinker is in its <em>onDuration</em> phase. If default is <code>false</code>, <code>blinker.on</code> will return <code>false</code> when the blinker is in its <em>onDuration</em> phase.)</p>
                 * </li>
                 * </ul>
                 * </div>
                 * <div class="paragraph">
                 * <p>Other informative properties:</p>
                 * </div>
                 * <div class="ulist">
                 * <ul>
                 * <li>
                 * <p><em>counter</em>: Read this property to see which cycle the blinker is on (counts from <em>n</em> down to zero)</p>
                 * </li>
                 * <li>
                 * <p><em>on</em>: Read this property to determine the current state of the blinker. The blinker always starts in the state specified by the <code>default</code> property.</p>
                 * </li>
                 * <li>
                 * <p><em>running</em>: Read this property to see if the blinker is actively running</p>
                 * </li>
                 * </ul>
                 *
                 * [Read more](https://sdk.play.date/2.5.0#f-graphics.animation.blinker.new)
                 *
                 * @noSelf
                 */
                function _new(
                    onDuration: number = 200,
                    offDuration: number = 200,
                    loop: boolean = false,
                    cycles: number = 6,
                    _default: boolean = true
                ): PlaydateGraphicsAnimationBlinker;

                export { _new as new };

                /**
                 * <p>Updates the state of all valid blinkers by calling <a href="https://sdk.play.date/2.5.0#m-graphics.animation.blinker.update">:update()</a> on each.</p>
                 * </div>
                 * <div class="admonitionblock important">
                 * <table>
                 * <tbody><tr>
                 * <td class="icon">
                 * <div class="title">Important</div>
                 * </td>
                 * <td class="content">
                 * If you intend to use blinkers, be sure to call <code>:updateAll()</code> once a cycle, ideally in your game’s <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> function.
                 * </td>
                 * </tr>
                 * </tbody></table>
                 *
                 * [Read more](https://sdk.play.date/2.5.0#f-graphics.animation.blinker.updateAll)
                 *
                 * @noSelf
                 */
                export function updateAll(): void;

                /**
                 * <p>Stops all blinkers.</p>
                 *
                 * [Read more](https://sdk.play.date/2.5.0#f-graphics.animation.blinker.stopAll)
                 *
                 * @noSelf
                 */
                export function stopAll(): void;
            }
        }

        namespace animator {
            /**
             * <p>Animates between two number or <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> values.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>duration</em> is the total time of the animation in milliseconds.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>startValue</em> and <em>endValue</em> should be either numbers or <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a></p>
             * </div>
             * <div class="paragraph">
             * <p><em>easingFunction</em>, if supplied, should be a value from <a href="https://sdk.play.date/2.5.0#M-easingFunctions">playdate.easingFunctions</a>. If your easing function requires additional variables <em>s</em>, <em>a</em>, or <em>p</em>, set them on the animator directly after creation.
             * For example:</p>
             * </div>
             * <div class="listingblock">
             * <div class="content">
             * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">a</span> = playdate.graphics.animator.new(<span class="integer">1000</span>, <span class="integer">0</span>, <span class="integer">100</span>, playdate.easingFunctions.inBack)
             * a.s = <span class="float">1.9</span></code></pre>
             * </div>
             * </div>
             * <div class="paragraph">
             * <p><em>startTimeOffset</em>, if supplied, will shift the start time of the animation by the specified number of milliseconds. (If positive, the animation will be delayed. If negative, the animation will effectively have started before the moment the animator is instantiated.)</p>
             * </div>
             * <div class="listingblock">
             * <div class="title">Example: Using an animator to animate movement</div>
             * <div class="content">
             * <pre class="CodeRay highlight"><code data-lang="lua"><span class="comment">-- You can copy and paste this example directly as your main.lua file to see it in action</span>
             * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/graphics</span><span class="delimiter">"</span></span>
             * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/animator</span><span class="delimiter">"</span></span>
             *
             * <span class="comment">-- We'll be demonstrating how to use an animator to animate a square moving across the screen</span>
             * <span class="keyword">local</span> <span class="local-variable">square</span> = playdate.graphics.image.new(<span class="integer">20</span>, <span class="integer">20</span>, playdate.graphics.kColorBlack)
             *
             * <span class="comment">-- 1000ms, or 1 second</span>
             * <span class="keyword">local</span> <span class="local-variable">animationDuration</span> = <span class="integer">1000</span>
             * <span class="comment">-- We're animating from the left to the right of the screen</span>
             * <span class="keyword">local</span> <span class="local-variable">startX</span>, <span class="local-variable">endX</span> = <span class="integer">-20</span>, <span class="integer">400</span>
             * <span class="comment">-- Setting an easing function to get a nice, smooth movement</span>
             * <span class="keyword">local</span> <span class="local-variable">easingFunction</span> = playdate.easingFunctions.inOutCubic
             * <span class="keyword">local</span> <span class="local-variable">animator</span> = playdate.graphics.animator.new(animationDuration, startX, endX, easingFunction)
             * animator.repeatCount = <span class="integer">-1</span> <span class="comment">-- Make animator repeat forever</span>
             *
             * <span class="keyword">function</span> playdate.<span class="function">update</span>()
             *     <span class="comment">-- Clear the screen</span>
             *     playdate.graphics.clear()
             *
             *     <span class="comment">-- By using :currentValue() as the x value, the square follows along with the animation</span>
             *     square:draw(animator:currentValue(), <span class="integer">120</span>)
             * <span class="keyword">end</span></code></pre>
             * </div>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.animator.new1)
             *
             * @noSelf
             */
            function _new<TSubject extends number | PlaydateGeometryPoint>(
                duration: number,
                startValue: TSubject,
                endValue: TSubect,
                easingFunction: PlaydateEasingFunction,
                startTimeOffset: number
            ): PlaydateGraphicsAnimator<TSubject>;

            export { _new as new };

            /**
             * <p>Creates a new Animator that will animate along the provided <a href="https://sdk.play.date/2.5.0#C-geometry.lineSegment">playdate.geometry.lineSegment</a></p>
             * </div>
             * <div class="listingblock">
             * <div class="title">Example: Using an animator to animate along a line</div>
             * <div class="content">
             * <pre class="CodeRay highlight"><code data-lang="lua"><span class="comment">-- You can copy and paste this example directly as your main.lua file to see it in action</span>
             * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/graphics</span><span class="delimiter">"</span></span>
             * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/animator</span><span class="delimiter">"</span></span>
             *
             * <span class="comment">-- We'll be demonstrating how to use an animator to animate a square moving across the screen</span>
             * <span class="keyword">local</span> <span class="local-variable">square</span> = playdate.graphics.image.new(<span class="integer">20</span>, <span class="integer">20</span>, playdate.graphics.kColorBlack)
             *
             * <span class="comment">-- 1000ms, or 1 second</span>
             * <span class="keyword">local</span> <span class="local-variable">animationDuration</span> = <span class="integer">1000</span>
             * <span class="comment">-- We're animating from the top left to the bottom right of the screen</span>
             * <span class="keyword">local</span> <span class="local-variable">line</span> = playdate.geometry.lineSegment.new(<span class="integer">0</span>, <span class="integer">0</span>, <span class="integer">400</span>, <span class="integer">240</span>)
             * <span class="keyword">local</span> <span class="local-variable">animator</span> = playdate.graphics.animator.new(animationDuration, line)
             *
             * <span class="keyword">function</span> playdate.<span class="function">update</span>()
             *     <span class="comment">-- Clear the screen</span>
             *     playdate.graphics.clear()
             *
             *     <span class="comment">-- We can use :currentValue() directly, as it returns a point</span>
             *     square:draw(animator:currentValue())
             * <span class="keyword">end</span></code></pre>
             * </div>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.animator.new2)
             *
             * @noSelf
             */
            function _new(
                duration: number,
                lineSegment: PlaydateGeometryLineSegment,
                easingFunction: PlaydateEasingFunction,
                startTimeOffset: number
            ): PlaydateGraphicsAnimator;

            export { _new as new };

            /**
             * <p>Creates a new Animator that will animate along the provided <a href="https://sdk.play.date/2.5.0#C-geometry.arc">playdate.geometry.arc</a></p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.animator.new3)
             *
             * @noSelf
             */
            function _new(
                duration: number,
                arc: PlaydateGeometryArc,
                easingFunction: PlaydateEasingFunction,
                startTimeOffset: number
            ): PlaydateGraphicsAnimator;

            export { _new as new };

            /**
             * <p>Creates a new Animator that will animate along the provided <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">playdate.geometry.polygon</a></p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.animator.new4)
             *
             * @noSelf
             */
            function _new(
                duration: number,
                polygon: PlaydateGeometryPolygon,
                easingFunction: PlaydateEasingFunction,
                startTimeOffset: number
            ): PlaydateGraphicsAnimator;

            export { _new as new };

            /**
             * <p>Creates a new Animator that will animate along each of the items in the <em>parts</em> array in order, which should be comprised of <a href="https://sdk.play.date/2.5.0#C-geometry.lineSegment">playdate.geometry.lineSegment</a>, <a href="https://sdk.play.date/2.5.0#C-geometry.arc">playdate.geometry.arc</a>, or <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">playdate.geometry.polygon</a> objects.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>durations</em> should be an array of durations, one for each item in <em>parts</em>.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>easingFunctions</em> should be an array of <a href="https://sdk.play.date/2.5.0#M-easingFunctions">playdate.easingFunctions</a>, one for each item in <em>parts</em>.</p>
             * </div>
             * <div class="admonitionblock note">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Note</div>
             * </td>
             * <td class="content">
             * By default, animators do not repeat. If you would like them to, set the animator’s <em>repeatCount</em> property to the number of times the animation should repeat. It can be set to any positive number or -1 to indicate the animation should repeat forever. Note that a repeat count of 1 means the animation will play twice - once for the initial animation plus one repeat.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="listingblock">
             * <div class="title">Example: Using an animator with parts</div>
             * <div class="content">
             * <pre class="CodeRay highlight"><code data-lang="lua"><span class="comment">-- You can copy and paste this example directly as your main.lua file to see it in action</span>
             * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/graphics</span><span class="delimiter">"</span></span>
             * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/animator</span><span class="delimiter">"</span></span>
             *
             * <span class="comment">-- We'll be demonstrating how to animate something with parts</span>
             * <span class="keyword">local</span> <span class="local-variable">square</span> = playdate.graphics.image.new(<span class="integer">20</span>, <span class="integer">20</span>, playdate.graphics.kColorBlack)
             *
             * <span class="comment">-- First part will take 3 seconds, second part will take 1, and third part will take 2</span>
             * <span class="keyword">local</span> <span class="local-variable">animationDurations</span> = <span class="map"><span class="delimiter">{</span><span class="integer">3000</span>, <span class="integer">1000</span>, <span class="integer">2000</span><span class="delimiter">}</span></span>
             * <span class="comment">-- We'll first animate along a line, then an arc, and then a polygon</span>
             * <span class="keyword">local</span> <span class="local-variable">animationParts</span> = <span class="map"><span class="delimiter">{</span>
             *     playdate.geometry.lineSegment.new(<span class="integer">0</span>, <span class="integer">0</span>, <span class="integer">200</span>, <span class="integer">80</span>),
             *     playdate.geometry.arc.new(<span class="integer">200</span>, <span class="integer">120</span>, <span class="integer">40</span>, <span class="integer">0</span>, <span class="integer">180</span>),
             *     playdate.geometry.polygon.new(<span class="integer">200</span>, <span class="integer">160</span>, <span class="integer">300</span>, <span class="integer">90</span>, <span class="integer">390</span>, <span class="integer">230</span>)
             * <span class="delimiter">}</span></span>
             * <span class="comment">-- We must set the easing functions for each part, and they can all be different</span>
             * <span class="keyword">local</span> <span class="local-variable">animationEasingFunctions</span> = <span class="map"><span class="delimiter">{</span>
             *     playdate.easingFunctions.outQuart,
             *     playdate.easingFunctions.inOutCubic,
             *     playdate.easingFunctions.outBounce
             * <span class="delimiter">}</span></span>
             *
             * <span class="comment">-- To animate by parts, each argument must be arrays of equal length</span>
             * <span class="keyword">local</span> <span class="local-variable">animator</span> = playdate.graphics.animator.new(animationDurations, animationParts, animationEasingFunctions)
             *
             * <span class="keyword">function</span> playdate.<span class="function">update</span>()
             *     <span class="comment">-- Clear the screen</span>
             *     playdate.graphics.clear()
             *
             *     <span class="comment">-- We can use :currentValue() directly, as it returns a point</span>
             *     square:draw(animator:currentValue())
             * <span class="keyword">end</span></code></pre>
             * </div>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.animator.new5)
             *
             * @noSelf
             */
            function _new(
                durations: number,
                parts: (
                    | PlaydateGeometryLineSegment
                    | PlaydateGeometryArc
                    | PlaydateGeometryPolygon
                )[],
                easingFunctions: PlaydateEasingFunction[],
                startTimeOffset: number
            ): PlaydateGraphicsAnimator;

            export { _new as new };
        }

        namespace imagetable {
            /**
             * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.imagetable">playdate.graphics.imagetable</a> object from the data at <em>path</em>. If there is no file at <em>path</em>, the function returns nil and a second value describing the error. If the file at <em>path</em> is an animated GIF, successive frames of the GIF will be loaded as consecutive bitmaps in the imagetable. Any timing data in the animated GIF will be ignored.</p>
             * </div>
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * To load a <strong>matrix</strong> image table defined in <code>frames-table-16-16.png</code>, you call <code>playdate.graphics.imagetable.new("frames")</code>.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * To load a <strong>sequential</strong> image table defined with the files <code>frames-table-1.png</code>, <code>frames-table-2.png</code>, etc., you call <code>playdate.graphics.imagetable.new("frames")</code>.
             * </td>
             * </tr>
             * </tbody></table>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.imagetable.new)
             *
             * @noSelf
             */
            function _new(path: string): PlaydateGraphicsImageTable;

            export { _new as new };

            /**
             * <p>Returns an empty image table for loading images into via <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.load">imagetable:load()</a> or setting already-loaded images into with <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.setImage">imagetable:setImage()</a>. If set, <em>cellsWide</em> is used to locate images by x,y position. The optional <em>cellSize</em> argument gives the allocation size for the images, if <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.load">load()</a> will be used. (This is a weird technical detail, so ask us if you need guidance here.)</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.imagetable.new-alloc)
             *
             * @noSelf
             */
            function _new(
                count: number,
                cellsWide: number,
                cellSize: any
            ): PlaydateGraphicsImageTable;

            export { _new as new };
        }

        namespace tilemap {
            /**
             * <p>Creates a new tilemap object.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.tilemap.new)
             *
             * @noSelf
             */
            function _new(): PlaydateGraphicsTilemap;

            export { _new as new };
        }

        namespace sprite {
            /**
             * <p>This class method (note the "." syntax rather than ":") returns a new sprite object. A previously-loaded <a href="https://sdk.play.date/2.5.0#C-graphics.image">image</a> or <a href="https://sdk.play.date/2.5.0#C-graphics.tilemap">tilemap</a> object can be optionally passed-in.</p>
             * </div>
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * To see your sprite onscreen, you will need to call <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.add"><code>:add()</code></a> on your sprite to add it to the display list.
             * </td>
             * </tr>
             * </tbody></table>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.new)
             *
             * @noSelf
             */
            function _new(
                image_or_tilemap:
                    | PlaydateGraphicsImage
                    | PlaydateGraphicsTilemap
            ): PlaydateGraphicsSprite;

            export { _new as new };

            /**
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You must import <em>CoreLibs/sprites</em> to use this function.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="paragraph">
             * <p>A conveneince function that creates a sprite with an image of <code><em>text</em></code>, as generated by <a href="https://sdk.play.date/2.5.0#f-graphics.imageWithText">imageWithText()</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p>The arguments are the same as those in <a href="https://sdk.play.date/2.5.0#f-graphics.imageWithText">imageWithText()</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns <code><em>sprite</em></code>, <code><em>textWasTruncated</em></code></p>
             * </div>
             * <div class="paragraph">
             * <p><code><em>sprite</em></code> is a newly-created <a href="https://sdk.play.date/2.5.0#C-graphics.sprite">sprite</a> with its image set to an image of the text specified. The sprite’s dimensions may be smaller than <code><em>maxWidth</em></code>, <code><em>maxHeight</em></code>.</p>
             * </div>
             * <div class="paragraph">
             * <p><code><em>textWasTruncated</em></code> indicates if the text was truncated to fit within the specified width and height.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.spriteWithText)
             *
             * @noSelf
             */
            export function spriteWithText(
                text: string,
                maxWidth: number,
                maxHeight: number,
                backgroundColor: PlaydateColor,
                leadingAdjustment: number,
                truncationString: string,
                alignment: PlaydateTextAlignment,
                font: PlaydateGraphicsFont
            ): PlaydateGraphicsSprite;

            /**
             * <p>This class method (note the "." syntax rather than ":") calls the <a href="https://sdk.play.date/2.5.0#c-graphics.sprite.update">update()</a> function on every sprite in the global sprite list and redraws all of the dirty rects.</p>
             * </div>
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You will generally want to call <code>playdate.graphics.sprite.update()</code> once in your <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> method, to ensure that your sprites are updated and drawn during every frame. Failure to do so may mean your sprites will not appear onscreen.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="admonitionblock caution">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Caution</div>
             * </td>
             * <td class="content">
             * Be careful not confuse <code>sprite.update()</code> with <a href="https://sdk.play.date/2.5.0#c-graphics.sprite.update"><code>sprite:update()</code></a>: the former updates all sprites; the latter updates just the sprite being invoked.
             * </td>
             * </tr>
             * </tbody></table>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.update)
             *
             * @noSelf
             */
            export function update(): void;

            /**
             * <p>Adds the given sprite to the display list, so that it is drawn in the current scene. Note that this is called with a period <code>.</code> instead of a colon <code>:</code>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.addSprite)
             *
             * @noSelf
             */
            export function addSprite(sprite: PlaydateGraphicsSprite): void;

            /**
             * <p>Removes the given sprite from the display list. As with <code>add()</code>/<code>addSprite()</code>, note that this is called with a period <code>.</code> instead of a colon <code>:</code>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.removeSprite)
             *
             * @noSelf
             */
            export function removeSprite(sprite: PlaydateGraphicsSprite): void;

            /**
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You must import <em>CoreLibs/sprites</em> to use this function.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="paragraph">
             * <p>A convenience function for drawing a background image behind your sprites.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>drawCallback</em> is a routine you specify that implements your background drawing. The callback should be a function taking the arguments <code>x, y, width, height</code>, where <em>x, y, width, height</em> specify the region (in screen coordinates, not world coordinates) of the background region that needs to be updated.</p>
             * </div>
             * <div class="admonitionblock note">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Note</div>
             * </td>
             * <td class="content">
             * Some implementation details: <code>setBackgroundDrawingCallback()</code> creates a screen-sized sprite with a z-index set to the lowest possible value so it will draw behind other sprites, and adds the sprite to the display list so that it is drawn in the current scene. The background sprite ignores the <a href="https://sdk.play.date/2.5.0#f-graphics.setDrawOffset">drawOffset</a>, and will not be automatically redrawn when the draw offset changes; use <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.redrawBackground">playdate.graphics.sprite.redrawBackground()</a> if necessary in this case. <em>drawCallback</em> will be called from the newly-created background sprite’s <a href="https://sdk.play.date/2.5.0#c-graphics.sprite.draw">playdate.graphics.sprite:draw()</a> callback function and is where you should do your background drawing. This function returns the newly created <a href="https://sdk.play.date/2.5.0#C-graphics.sprite">playdate.graphics.sprite</a>.
             * </td>
             * </tr>
             * </tbody></table>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.setBackgroundDrawingCallback)
             *
             * @noSelf
             */
            export function setBackgroundDrawingCallback(
                drawCallback: (
                    x: number,
                    y: number,
                    width: number,
                    height: number
                ) => void
            ): void;

            /**
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You must import <em>CoreLibs/sprites</em> to use this function.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="paragraph">
             * <p>Marks the background sprite dirty, forcing the drawing callback to be run when <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.update">playdate.graphics.sprite.update()</a> is called.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.redrawBackground)
             *
             * @noSelf
             */
            export function redrawBackground(): void;

            /**
             * <p>Sets the clip rect for sprites in the given z-index range.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.setClipRectsInRange)
             *
             * @noSelf
             */
            export function setClipRectsInRange(
                x: number,
                y: number,
                width: number,
                height: number,
                startz: number,
                endz: number
            ): void;

            /**
             * <p>Sets the clip rect for sprites in the given z-index range.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.setClipRectsInRange)
             *
             * @noSelf
             */
            export function setClipRectsInRange(
                rect: PlaydateGeometryRect,
                startz: number,
                endz: number
            ): void;

            /**
             * <p>Clears sprite clip rects in the given z-index range.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.clearClipRectsInRange)
             *
             * @noSelf
             */
            export function clearClipRectsInRange(
                startz: number,
                endz: number
            ): void;

            /**
             * <p>If set to true, causes all sprites to draw each frame, whether or not they have been marked dirty. This may speed up the performance of your game if the system’s dirty rect tracking is taking up too much time - for example if there are many sprites moving around on screen at once.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.setAlwaysRedraw)
             *
             * @noSelf
             */
            export function setAlwaysRedraw(flag: boolean): void;

            /**
             * <p>Return’s the sprites "always redraw" flag.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.getAlwaysRedraw)
             *
             * @noSelf
             */
            export function getAlwaysRedraw(): boolean;

            /**
             * <p>Marks the given rectangle (in screen coordinates) as needing a redraw. playdate.graphics drawing functions now call this automatically, adding their drawn areas to the sprite’s dirty list, so there’s likely no need to call this manually any more. This behavior may change in the future, though.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.addDirtyRect)
             *
             * @noSelf
             */
            export function addDirtyRect(
                x: number,
                y: number,
                width: number,
                height: number
            ): void;

            /**
             * <p>Returns an array of all sprites in the display list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.getAllSprites)
             *
             * @noSelf
             */
            export function getAllSprites(): PlaydateGraphicsSprite[];

            /**
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You must import <em>CoreLibs/sprites</em> to use this function.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="paragraph">
             * <p>Performs the function <em>f</em> on all sprites in the display list. <em>f</em> should take one argument, which will be a sprite.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.performOnAllSprites)
             *
             * @noSelf
             */
            export function performOnAllSprites(
                f: (sprite: PlaydateGraphicsSprite) => void
            ): void;

            /**
             * <p>Returns the number of sprites in the display list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.spriteCount)
             *
             * @noSelf
             */
            export function spriteCount(): number;

            /**
             * <p>Removes all sprites from the global sprite list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.removeAll)
             *
             * @noSelf
             */
            export function removeAll(): void;

            /**
             * <p>Removes all sprites in <code>spriteArray</code> from the global sprite list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.removeSprites)
             *
             * @noSelf
             */
            export function removeSprites(
                spriteArray: PlaydateGraphicsSprite[]
            ): void;

            /**
             * <p>Returns an array of array-style tables, each containing two sprites that have overlapping collide rects. All sprite pairs that are have overlapping collide rects (taking the sprites' group and collides-with masks into consideration) are returned.</p>
             * </div>
             * <div class="listingblock">
             * <div class="title">An example of iterating over the collisions array:</div>
             * <div class="content">
             * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">collisions</span> = gfx.sprite.allOverlappingSprites()
             *
             * <span class="keyword">for</span> i = <span class="integer">1</span>, #collisions <span class="keyword">do</span>
             *         <span class="keyword">local</span> <span class="local-variable">collisionPair</span> = collisions[i]
             *         <span class="keyword">local</span> <span class="local-variable">sprite1</span> = collisionPair[<span class="integer">1</span>]
             *         <span class="keyword">local</span> <span class="local-variable">sprite2</span> = collisionPair[<span class="integer">2</span>]
             *         <span class="comment">-- do something with the colliding sprites</span>
             * <span class="keyword">end</span></code></pre>
             * </div>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.allOverlappingSprites)
             *
             * @noSelf
             */
            export function allOverlappingSprites(): [
                PlaydateGraphicsSprite,
                PlaydateGraphicsSprite
            ][];

            /**
             * <p>Returns all sprites with collision rects containing the point.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAtPoint)
             *
             * @noSelf
             */
            export function querySpritesAtPoint(
                x: number,
                y: number
            ): PlaydateGraphicsSprite[];

            /**
             * <p>Returns all sprites with collision rects containing the point.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAtPoint)
             *
             * @noSelf
             */
            export function querySpritesAtPoint(
                p: PlaydateGeometryPoint
            ): PlaydateGraphicsSprite[];

            /**
             * <p>Returns all sprites with collision rects overlapping the rect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesInRect)
             *
             * @noSelf
             */
            export function querySpritesInRect(
                x: number,
                y: number,
                width: number,
                height: number
            ): PlaydateGraphicsSprite[];

            /**
             * <p>Returns all sprites with collision rects overlapping the rect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesInRect)
             *
             * @noSelf
             */
            export function querySpritesInRect(
                rect: PlaydateGeometryRect
            ): PlaydateGraphicsSprite[];

            /**
             * <p>Returns all sprites with collision rects intersecting the line segment.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAlongLine)
             *
             * @noSelf
             */
            export function querySpritesAlongLine(
                x1: number,
                y1: number,
                x2: number,
                y2: number
            ): PlaydateGraphicsSprite[];

            /**
             * <p>Returns all sprites with collision rects intersecting the line segment.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAlongLine)
             *
             * @noSelf
             */
            export function querySpritesAlongLine(
                lineSegment: PlaydateGeometryLineSegment
            ): PlaydateGraphicsSprite[];

            /**
             * <p>Similar to <em>querySpritesAlongLine()</em>, but instead of sprites returns an array of <em>collisionInfo</em> tables containing information about sprites intersecting the line segment, and <em>len</em>, which is the number of collisions found. If you don’t need this information, use <em>querySpritesAlongLine()</em> as it will be faster.</p>
             * </div>
             * <div class="paragraph">
             * <p>Each <em>collisionInfo</em> table contains:</p>
             * </div>
             * <div class="ulist">
             * <ul>
             * <li>
             * <p><em>sprite</em>: the sprite being intersected by the segment.</p>
             * </li>
             * <li>
             * <p><em>entryPoint</em>: a <a href="https://sdk.play.date/2.5.0#C-geometry.point"><code>point</code></a> representing the coordinates of the first intersection between <code>sprite</code> and the line segment.</p>
             * </li>
             * <li>
             * <p><em>exitPoint</em>: a <a href="https://sdk.play.date/2.5.0#C-geometry.point"><code>point</code></a> representing  the coordinates of the second intersection between <code>sprite</code> and the line segment.</p>
             * </li>
             * <li>
             * <p><em>ti1</em> &amp; <em>ti2</em>: numbers between 0 and 1 which indicate how far from the starting point of the line segment the collision happened; t1 for the entry point, t2 for the exit point. This can be useful for things like having a laser cause more damage if the impact is close.</p>
             * </li>
             * </ul>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpriteInfoAlongLine)
             *
             * @noSelf
             */
            export function querySpriteInfoAlongLine(
                x1: number,
                y1: number,
                x2: number,
                y2: number
            ): PlaydateCollisionInfo;

            /**
             * <p>Similar to <em>querySpritesAlongLine()</em>, but instead of sprites returns an array of <em>collisionInfo</em> tables containing information about sprites intersecting the line segment, and <em>len</em>, which is the number of collisions found. If you don’t need this information, use <em>querySpritesAlongLine()</em> as it will be faster.</p>
             * </div>
             * <div class="paragraph">
             * <p>Each <em>collisionInfo</em> table contains:</p>
             * </div>
             * <div class="ulist">
             * <ul>
             * <li>
             * <p><em>sprite</em>: the sprite being intersected by the segment.</p>
             * </li>
             * <li>
             * <p><em>entryPoint</em>: a <a href="https://sdk.play.date/2.5.0#C-geometry.point"><code>point</code></a> representing the coordinates of the first intersection between <code>sprite</code> and the line segment.</p>
             * </li>
             * <li>
             * <p><em>exitPoint</em>: a <a href="https://sdk.play.date/2.5.0#C-geometry.point"><code>point</code></a> representing  the coordinates of the second intersection between <code>sprite</code> and the line segment.</p>
             * </li>
             * <li>
             * <p><em>ti1</em> &amp; <em>ti2</em>: numbers between 0 and 1 which indicate how far from the starting point of the line segment the collision happened; t1 for the entry point, t2 for the exit point. This can be useful for things like having a laser cause more damage if the impact is close.</p>
             * </li>
             * </ul>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpriteInfoAlongLine)
             *
             * @noSelf
             */
            export function querySpriteInfoAlongLine(
                lineSegment: PlaydateGeometryLineSegment
            ): PlaydateCollisionInfo;

            /**
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You must import <em>CoreLibs/sprites</em> to use this function.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="paragraph">
             * <p>This convenience function adds an invisible sprite defined by the rectangle <em>x</em>, <em>y</em>, <em>w</em>, <em>h</em> (or the <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> <em>r</em>) for the purpose of triggering collisions.  This is useful for making areas impassable, triggering an event when a sprite enters a certain area, and so on.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.addEmptyCollisionSprite)
             *
             * @noSelf
             */
            export function addEmptyCollisionSprite(
                r: PlaydateGeometryRect
            ): void;

            /**
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You must import <em>CoreLibs/sprites</em> to use this function.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="paragraph">
             * <p>This convenience function adds an invisible sprite defined by the rectangle <em>x</em>, <em>y</em>, <em>w</em>, <em>h</em> (or the <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> <em>r</em>) for the purpose of triggering collisions.  This is useful for making areas impassable, triggering an event when a sprite enters a certain area, and so on.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.addEmptyCollisionSprite)
             *
             * @noSelf
             */
            export function addEmptyCollisionSprite(
                x: number,
                y: number,
                w: number,
                h: number
            ): void;

            /**
             * <div class="admonitionblock important">
             * <table>
             * <tbody><tr>
             * <td class="icon">
             * <div class="title">Important</div>
             * </td>
             * <td class="content">
             * You must import <em>CoreLibs/sprites</em> to use this function.
             * </td>
             * </tr>
             * </tbody></table>
             * </div>
             * <div class="paragraph">
             * <p>This convenience function automatically adds empty collision sprites necessary to restrict movement within a tilemap.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>tilemap</em> is a <a href="https://sdk.play.date/2.5.0#C-graphics.tilemap">playdate.graphics.tilemap</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>emptyIDs</em> is an array of tile IDs that should be considered "passable" — in other words, not walls. Tiles with default IDs of 0 are treated as passable by default, so you do not need to include 0 in the array.</p>
             * </div>
             * <div class="paragraph">
             * <p><em>xOffset, yOffset</em> optionally indicate the distance the new sprites should be offset from (0,0).</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns an array-style table of the newly created sprites.</p>
             * </div>
             * <div class="paragraph">
             * <p>Calling this function is effectively a shortcut for calling <a href="https://sdk.play.date/2.5.0#m-graphics.tilemap.getCollisionRects">playdate.graphics.tilemap:getCollisionRects()</a> and passing the resulting rects to <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.addEmptyCollisionSprite">addEmptyCollisionSprite()</a>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.addWallSprites)
             *
             * @noSelf
             */
            export function addWallSprites(
                tilemap: PlaydateGraphicsTilemap,
                emptyIDs: number[],
                xOffset: number,
                yOffset: number
            ): void;
        }

        namespace font {
            /**
             * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.font">playdate.graphics.font</a> object from the data at <em>path</em>. If there is no file at <em>path</em>, the function returns nil.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.font.new)
             *
             * @noSelf
             */
            function _new(path: string): PlaydateGraphicsFont;

            export { _new as new };

            /**
             * <p>Returns a font family table from the font files specified in <em>fontPaths</em>. <em>fontPaths</em> should be a table with the following format:</p>
             * </div>
             * <div class="literalblock">
             * <div class="content">
             * <pre>local fontPaths = {
             *  [playdate.graphics.font.kVariantNormal] = "path/to/normalFont",
             *     [playdate.graphics.font.kVariantBold] = "path/to/boldFont",
             *     [playdate.graphics.font.kVariantItalic] = "path/to/italicFont"
             * }</pre>
             * </div>
             * </div>
             * <div class="paragraph">
             * <p>The table returned is of the same format with font objects in place of the paths, and is appropriate to pass to the functions <a href="https://sdk.play.date/2.5.0#f-graphics.setFontFamily">setFontFamily()</a> and <a href="https://sdk.play.date/2.5.0#f-graphics.getTextSize">getTextSize()</a>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.font.newFamily)
             *
             * @noSelf
             */
            export function newFamily(
                fontPaths: PlaydateFontFamilyPaths
            ): PlaydateFontFamily;
        }

        namespace video {
            /**
             * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.video">playdate.graphics.video</a> object from the pdv file at <em>path</em>. If the file at <em>path</em> can’t be opened, the function returns nil.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.video.new)
             *
             * @noSelf
             */
            function _new(path: string): PlaydateGraphicsVideo;

            export { _new as new };
        }
    }

    interface PlaydateGraphicsImage {
        /**
         * <p>Loads a new image from the data at <em>path</em> into an already-existing image, without allocating additional memory. The image at <em>path</em> must be of the same dimensions as the original.</p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <em>(success, [error])</em>. If the boolean <em>success</em> is false, <em>error</em> is also returned.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.load)
         */
        load(path: string): true | [false, string];
        /**
         * <p>Returns a new <code>playdate.graphics.image</code> that is an exact copy of the original.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.copy)
         */
        copy(): PlaydateGraphicsImage;
        /**
         * <p>Returns the pair (<em>width</em>, <em>height</em>)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.getSize)
         */
        getSize(): [number, number];
        /**
         * <p>Draws the image with its upper-left corner at location (<em>x</em>, <em>y</em>) or <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> <em>p</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>The optional <em>flip</em> argument can be one of the following:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><a id="k-graphics.kImageUnflipped"></a> <em class="constant">playdate.graphics.kImageUnflipped</em>: the image is drawn normally</p>
         * </li>
         * <li>
         * <p><a id="k-graphics.kImageFlippedX"></a> <em class="constant">playdate.graphics.kImageFlippedX</em>: the image is flipped left to right</p>
         * </li>
         * <li>
         * <p><a id="k-graphics.kImageFlippedY"></a> <em class="constant">playdate.graphics.kImageFlippedY</em>: the image is flipped top to bottom</p>
         * </li>
         * <li>
         * <p><a id="k-graphics.kImageFlippedXY"></a> <em class="constant">playdate.graphics.kImageFlippedXY</em>: the image if flipped both ways; i.e., rotated 180 degrees</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>Alternately, one of the strings "flipX", "flipY", or "flipXY" can be used for the <em>flip</em> argument.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>sourceRect</em>, if specified, will cause only the part of the image within sourceRect to be drawn. <em>sourceRect</em> should be relative to the image’s bounds and can be a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> or four integers, (<em>x</em>, <em>y</em>, <em>w</em>, <em>h</em>), representing the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imgDraw)
         */
        draw(
            x: number,
            y: number,
            flip: PlaydateFlip,
            sourceRect: PlaydateGeometryRect
        ): void;
        /**
         * <p>Draws the image with its upper-left corner at location (<em>x</em>, <em>y</em>) or <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> <em>p</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>The optional <em>flip</em> argument can be one of the following:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><a id="k-graphics.kImageUnflipped"></a> <em class="constant">playdate.graphics.kImageUnflipped</em>: the image is drawn normally</p>
         * </li>
         * <li>
         * <p><a id="k-graphics.kImageFlippedX"></a> <em class="constant">playdate.graphics.kImageFlippedX</em>: the image is flipped left to right</p>
         * </li>
         * <li>
         * <p><a id="k-graphics.kImageFlippedY"></a> <em class="constant">playdate.graphics.kImageFlippedY</em>: the image is flipped top to bottom</p>
         * </li>
         * <li>
         * <p><a id="k-graphics.kImageFlippedXY"></a> <em class="constant">playdate.graphics.kImageFlippedXY</em>: the image if flipped both ways; i.e., rotated 180 degrees</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>Alternately, one of the strings "flipX", "flipY", or "flipXY" can be used for the <em>flip</em> argument.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>sourceRect</em>, if specified, will cause only the part of the image within sourceRect to be drawn. <em>sourceRect</em> should be relative to the image’s bounds and can be a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> or four integers, (<em>x</em>, <em>y</em>, <em>w</em>, <em>h</em>), representing the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imgDraw)
         */
        draw(
            p: PlaydateGeometryPoint,
            flip: PlaydateFlip,
            sourceRect: PlaydateGeometryRect
        ): void;
        /**
         * <p>Draws the image at location <em>(x, y)</em> centered at the point within the image represented by <em>(ax, ay)</em> in unit coordinate space. For example, values of <em>ax = 0.0</em>, <em>ay = 0.0</em> represent the image’s top-left corner, <em>ax = 1.0</em>, <em>ay = 1.0</em> represent the bottom-right, and <em>ax = 0.5</em>, <em>ay = 0.5</em> represent the center of the image.</p>
         * </div>
         * <div class="paragraph">
         * <p>The <em>flip</em> argument is optional; see <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw"><code>playdate.graphics.image:draw()</code></a> for valid values.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this method.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawAnchored)
         */
        drawAnchored(
            x: number,
            y: number,
            ax: number,
            ay: number,
            flip: PlaydateFlip
        ): void;
        /**
         * <p>Draws the image centered at location <em>(x, y)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>The <em>flip</em> argument is optional; see <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw"><code>playdate.graphics.image:draw()</code></a> for valid values.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this method.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawCentered)
         */
        drawCentered(x: number, y: number, flip: PlaydateFlip): void;
        /**
         * <p>Draws the image ignoring the currently-set <a href="https://sdk.play.date/2.5.0#f-graphics.setDrawOffset"><code>drawOffset</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawIgnoringOffset)
         */
        drawIgnoringOffset(x: number, y: number, flip: PlaydateFlip): void;
        /**
         * <p>Draws the image ignoring the currently-set <a href="https://sdk.play.date/2.5.0#f-graphics.setDrawOffset"><code>drawOffset</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawIgnoringOffset)
         */
        drawIgnoringOffset(p: PlaydateGeometryPoint, flip: PlaydateFlip): void;
        /**
         * <p>Erases the contents of the image, setting all pixels to white if <em>color</em> is <em>playdate.graphics.kColorWhite</em>, black if it’s <em>playdate.graphics.kColorBlack</em>, or clear if it’s <em>playdate.graphics.kColorClear</em>. If the image is cleared to black or white, the mask (if it exists) is set to fully opaque. If the image is cleared to kColorClear and the image doesn’t have a mask, a mask is added to it.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.clear)
         */
        clear(color: PlaydateColor): void;
        /**
         * <p>Returns <em>playdate.graphics.kColorWhite</em> if the image is white at (<em>x</em>, <em>y</em>), <em>playdate.graphics.kColorBlack</em> if it’s black, or <em>playdate.graphics.kColorClear</em> if it’s transparent.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * The upper-left pixel of the image is at coordinate <em>(0, 0)</em>.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.sample)
         */
        sample(x: number, y: number): Omit<PlaydateColor, PlaydateColor.XOR>;
        /**
         * <p>Draws this image centered at point <em>(x,y)</em> at (clockwise) <em>angle</em> degrees, scaled by optional argument <em>scale</em>, with an optional separate scaling for the y axis.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawRotated)
         */
        drawRotated(
            x: number,
            y: number,
            angle: number,
            scale: number,
            yscale: number
        ): void;
        /**
         * <p>Returns a new image containing this image rotated by (clockwise) <em>angle</em> degrees, scaled by optional argument <em>scale</em>, with an optional separate scaling for the y axis.</p>
         * </div>
         * <div class="admonitionblock caution">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Caution</div>
         * </td>
         * <td class="content">
         * Unless rotating by a multiple of 180 degrees, the new image will have different dimensions than the original.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.rotatedImage)
         */
        rotatedImage(
            angle: number,
            scale: number,
            yscale: number
        ): PlaydateGraphicsImage;
        /**
         * <p>Draws this image with its upper-left corner at  point <em>(x,y)</em>, scaled by amount <em>scale</em>, with an optional separate scaling for the y axis.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawScaled)
         */
        drawScaled(x: number, y: number, scale: number, yscale: number): void;
        /**
         * <p>Returns a new image containing this image scaled by amount <em>scale</em>, with an optional separate scaling for the y axis.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.scaledImage)
         */
        scaledImage(scale: number, yscale: number): PlaydateGraphicsImage;
        /**
         * <p>Draws this image centered at point <em>(x,y)</em> with the <a href="https://sdk.play.date/2.5.0#C-geometry.affineTransform">transform</a> <em>xform</em> applied.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawWithTransform)
         */
        drawWithTransform(
            xform: PlaydateGeometryAffineTransform,
            x: number,
            y: number
        ): void;
        /**
         * <p>Returns a new image containing the image with the <a href="https://sdk.play.date/2.5.0#C-geometry.affineTransform">transform</a> <em>xform</em> applied.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.transformedImage)
         */
        transformedImage(
            xform: PlaydateGeometryAffineTransform
        ): PlaydateGraphicsImage;
        /**
         * <p>Draws the image as if it’s mapped onto a tilted plane, transforming the target coordinates to image coordinates using an affine transform:</p>
         * </div>
         * <div class="literalblock">
         * <div class="content">
         * <pre>x' = dxx * x + dyx * y + dx
         * y' = dxy * x + dyy * y + dy</pre>
         * </div>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>x, y, width, height</em>: The rectangle to fill</p>
         * </li>
         * <li>
         * <p><em>centerx, centery</em>: The point in the above rectangle [in (0,1)x(0,1) coordinates] for the center of the transform</p>
         * </li>
         * <li>
         * <p><em>dxx, dyx, dxy, dyy, dx, dy</em>: Defines an affine transform from geometry coordinates to image coordinates</p>
         * </li>
         * <li>
         * <p><em>z</em>: The distance from the viewer to the target plane — lower z means more exaggerated perspective</p>
         * </li>
         * <li>
         * <p><em>tiltAngle</em>: The tilt of the target plane about the x axis, in degrees</p>
         * </li>
         * <li>
         * <p><em>tile</em>: A boolean, indicating whether the image is tiled on the target plane</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>The <em>Mode7Driver</em> demo in the <em>/Examples</em> folder of the SDK demonstrates the usage of this function.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawSampled)
         */
        drawSampled(
            x: number,
            y: number,
            width: number,
            height: number,
            centerx: number,
            centery: number,
            dxx: number,
            dyx: number,
            dxy: number,
            dyy: number,
            dx: number,
            dy: number,
            z: number,
            tiltAngle: number,
            tile: number
        ): void;
        /**
         * <p>Sets the image’s mask to a copy of <em>maskImage</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.setMaskImage)
         */
        setMaskImage(maskImage: PlaydateGraphicsImage): void;
        /**
         * <p>If the image has a mask, returns the mask as a separate image. Otherwise, returns <code>nil</code>.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * The returned image references the original’s data, so drawing into this image alters the original image’s mask.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.getMaskImage)
         */
        getMaskImage(): PlaydateGraphicsImage;
        /**
         * <p>Adds a mask to the image if it doesn’t already have one. If <em>opaque</em> is <code>true</code> or not specified, the image mask applied will be completely white, so the image will be entirely opaque. If <em>opaque</em> is <code>false</code>, the mask will be completely black, so the image will be entirely transparent.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.addMask)
         */
        addMask(opaque: boolean): void;
        /**
         * <p>Removes the mask from the image if it has one.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.removeMask)
         */
        removeMask(): void;
        /**
         * <p>Returns <em>true</em> if the image has a mask.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.hasMask)
         */
        hasMask(): boolean;
        /**
         * <p>Erases the contents of the image’s mask, so that the image is entirely opaque if <em>opaque</em> is 1, transparent otherwise. This function has no effect if the image doesn’t have a mask.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.clearMask)
         */
        clearMask(opaque: number): 1 | 0;
        /**
         * <p>Tiles the image into the given rectangle, using either listed dimensions or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a> object, and the optional flip style.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawTiled)
         */
        drawTiled(
            x: number,
            y: number,
            width: number,
            height: number,
            flip: PlaydateFlip
        ): void;
        /**
         * <p>Tiles the image into the given rectangle, using either listed dimensions or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a> object, and the optional flip style.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawTiled)
         */
        drawTiled(rect: PlaydateGeometryRect, flip: PlaydateFlip): void;
        /**
         * <p>Draws a blurred version of the image at (<em>x</em>, <em>y</em>).</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>radius</em>: A bigger radius means a more blurred result. Processing time is independent of the radius.</p>
         * </li>
         * <li>
         * <p><em>numPasses</em>: A box blur is used to blur the image. The more passes, the more closely the blur approximates a gaussian blur. However, higher values will take more time to process.</p>
         * </li>
         * <li>
         * <p><em>ditherType</em>: The algorithm to use when blurring the image, must be one of the values listed in <a href="https://sdk.play.date/2.5.0#m-graphics.image.blurredImage"><code>playdate.graphics.image:blurredImage()</code></a></p>
         * </li>
         * <li>
         * <p><em>flip</em>: optional; see <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw"><code>playdate.graphics.image:draw()</code></a> for valid values.</p>
         * </li>
         * <li>
         * <p><em>xPhase</em>, <em>yPhase</em>: optional; integer values that affect the appearance of <em>playdate.graphics.image.kDitherTypeDiagonalLine</em>,  <em>playdate.graphics.image.kDitherTypeVerticalLine</em>, <em>playdate.graphics.image.kDitherTypeHorizontalLine</em>,  <em>playdate.graphics.image.kDitherTypeScreen</em>, <em>playdate.graphics.image.kDitherTypeBayer2x2</em>, <em>playdate.graphics.image.kDitherTypeBayer4x4</em>, and <em>playdate.graphics.image.kDitherTypeBayer8x8</em>.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawBlurred)
         */
        drawBlurred(
            x: number,
            y: number,
            radius: number,
            numPasses: number,
            ditherType: number,
            flip: PlaydateFlip,
            xPhase: number,
            yPhase: number
        ): void;
        /**
         * <p>Returns a blurred copy of the caller.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>radius</em>: A bigger radius means a more blurred result. Processing time is independent of the radius.</p>
         * </li>
         * <li>
         * <p><em>numPasses</em>: A box blur is used to blur the image. The more passes, the more closely the blur approximates a gaussian blur. However, higher values will take more time to process.</p>
         * </li>
         * <li>
         * <p><em>ditherType</em>: The original image is blurred into a greyscale image then dithered back to 1-bit using one of the following dithering algorithms:</p>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeNone"></a> <em class="constant">playdate.graphics.image.kDitherTypeNone</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeDiagonalLine"></a> <em class="constant">playdate.graphics.image.kDitherTypeDiagonalLine</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeVerticalLine"></a> <em class="constant">playdate.graphics.image.kDitherTypeVerticalLine</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeHorizontalLine"></a> <em class="constant">playdate.graphics.image.kDitherTypeHorizontalLine</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeScreen"></a> <em class="constant">playdate.graphics.image.kDitherTypeScreen</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeBayer2x2"></a> <em class="constant">playdate.graphics.image.kDitherTypeBayer2x2</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeBayer4x4"></a> <em class="constant">playdate.graphics.image.kDitherTypeBayer4x4</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeBayer8x8"></a> <em class="constant">playdate.graphics.image.kDitherTypeBayer8x8</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeFloydSteinberg"></a> <em class="constant">playdate.graphics.image.kDitherTypeFloydSteinberg</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeBurkes"></a> <em class="constant">playdate.graphics.image.kDitherTypeBurkes</em></p>
         * </li>
         * <li>
         * <p><a id="k-graphics.image.kDitherTypeAtkinson"></a> <em class="constant">playdate.graphics.image.kDitherTypeAtkinson</em></p>
         * </li>
         * </ul>
         * </div>
         * </li>
         * <li>
         * <p><em>padEdges</em>: Boolean indicating whether the edges of the images should be padded to accommodate the blur radius. Defaults to false.</p>
         * </li>
         * <li>
         * <p><em>xPhase</em>, <em>yPhase</em>: optional; integer values that affect the appearance of <em>playdate.graphics.image.kDitherTypeDiagonalLine</em>,  <em>playdate.graphics.image.kDitherTypeVerticalLine</em>, <em>playdate.graphics.image.kDitherTypeHorizontalLine</em>,  <em>playdate.graphics.image.kDitherTypeScreen</em>, <em>playdate.graphics.image.kDitherTypeBayer2x2</em>, <em>playdate.graphics.image.kDitherTypeBayer4x4</em>, and <em>playdate.graphics.image.kDitherTypeBayer8x8</em>.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.blurredImage)
         */
        blurredImage(
            radius: number,
            numPasses: number,
            ditherType: number,
            padEdges: number,
            xPhase: number,
            yPhase: number
        ): PlaydateGraphicsImage;
        /**
         * <p>Draws a partially transparent image with its upper-left corner at location (<em>x</em>, <em>y</em>)</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>alpha</em>: The alpha value used to draw the image, with 1 being fully opaque, and 0 being completely transparent.</p>
         * </li>
         * <li>
         * <p><em>ditherType</em>: The caller is faded using one of the dithering algorithms listed in <a href="https://sdk.play.date/2.5.0#m-graphics.image.blurredImage"><code>playdate.graphics.image:blurredImage()</code></a></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.drawFaded)
         */
        drawFaded(
            x: number,
            y: number,
            alpha: number,
            ditherType: number
        ): void;
        /**
         * <p>Returns a faded version of the caller.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>alpha</em>: The alpha value assigned to the caller, in the range 0.0 - 1.0. If an image mask already exists it is multiplied by <em>alpha</em>.</p>
         * </li>
         * <li>
         * <p><em>ditherType</em>: The caller is faded into a greyscale image and dithered with one of the dithering algorithms listed in <a href="https://sdk.play.date/2.5.0#m-graphics.image.blurredImage">playdate.graphics.image:blurredImage()</a></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.fadedImage)
         */
        fadedImage(alpha: number, ditherType: number): PlaydateGraphicsImage;
        /**
         * <p>If <em>flag</em> is true, the image will be drawn with its colors inverted. If the image is being used as a stencil, its behavior is reversed: pixels are drawn where the stencil is black, nothing is drawn where the stencil is white.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.setInverted)
         */
        setInverted(flag: boolean): void;
        /**
         * <p>Returns a color-inverted copy of the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.invertedImage)
         */
        invertedImage(): PlaydateGraphicsImage;
        /**
         * <p>Returns an image that is a blend between the caller and <em>image</em>.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>image</em>: the playdate.graphics.image to be blended with the caller.</p>
         * </li>
         * <li>
         * <p><em>alpha</em>: The alpha value assigned to the caller. <em>image</em> will have an alpha of (1 - <em>alpha</em>).</p>
         * </li>
         * <li>
         * <p><em>ditherType</em>: The caller and <em>image</em> are blended into a greyscale image and dithered with one of the dithering algorithms listed in <a href="https://sdk.play.date/2.5.0#m-graphics.image.blurredImage"><code>playdate.graphics.image:blurredImage()</code></a></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.blendWithImage)
         */
        blendWithImage(
            image: PlaydateGraphicsImage,
            alpha: number,
            ditherType: PlaydateDitherType
        ): PlaydateGraphicsImage;
        /**
         * <p>Returns an image created by applying a VCR pause effect to the calling image.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.image.vcrPauseFilterImage)
         */
        vcrPauseFilterImage(): PlaydateGraphicsImage;
    }

    interface PlaydateGraphicsNineSlice {
        /**
         * <p>Returns the size of the 9 slice image as a pair <em>(width, height)</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.nineSlice.getSize)
         */
        getSize(): [number, number];
        /**
         * <p>Returns the minimum size of the 9 slice image as a pair <em>(width, height)</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.nineSlice.getMinSize)
         */
        getMinSize(): [number, number];
        /**
         * <p>Draws the 9 slice image at the desired coordinates by stretching the defined region to achieve the width and height inputs.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.nineSlice.drawInRect)
         */
        drawInRect(x: number, y: number, width: number, height: number): void;
        /**
         * <p>Draws the 9 slice image at the desired coordinates by stretching the defined region to achieve the width and height inputs.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.nineSlice.drawInRect)
         */
        drawInRect(rect: PlaydateGeometryRect): void;
    }

    interface PlaydateGraphicsAnimationLoop {
        /**
         * <p>Draw’s the loop’s current image at <em>x</em>, <em>y</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>The <em>flip</em> argument is optional; see <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw"><code>playdate.graphics.image:draw()</code></a> for valid values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.loop.draw)
         */
        draw(x: number, y: number, flip: PlaydateFlip): void;
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.image"><code>playdate.graphics.image</code></a> from the caller’s <em>imageTable</em> if it exists. The image returned will be at the imageTable’s index that matches the caller’s <em>frame</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.loop.image)
         */
        image(): PlaydateGraphicsImage;
        /**
         * <p>Returns false if the loop has passed its last frame and does not loop.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.loop.isValid)
         */
        isValid(): boolean;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-graphics.imagetable"><code>playdate.graphics.imagetable</code></a> to be used for this animation loop, and sets the loop’s endFrame property to #imageTable.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.loop.setImageTable)
         */
        setImageTable(imageTable: PlaydateGraphicsImagetable): void;
    }

    interface PlaydateGraphicsAnimator {
        /**
         * <p>Returns the current value of the animation, which will be either a number or a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a>, depending on the type of animator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animator.currentValue)
         */
        currentValue(): TSubject;
        /**
         * <p>Returns the value of the animation at the given number of milliseconds after the start time. The value will be either a number or a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a>, depending on the type of animator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animator.valueAtTime)
         */
        valueAtTime(time: number): TSubject;
        /**
         * <p>Returns the current progress of the animation as a value from 0 to 1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animator.progress)
         */
        progress(): number;
        /**
         * <p>Resets the animation, setting its start time to the current time, and changes the animation’s duration if a new duration is given.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animator.reset)
         */
        reset(duration: number): void;
        /**
         * <p>Returns true if the animation is completed. Only returns true if this function or <a href="https://sdk.play.date/2.5.0#m-graphics.animator.currentValue"><code>currentValue()</code></a> has been called since the animation ended in order to allow animations to fully finish before true is returned.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animator.ended)
         */
        ended(): void;
        /**
         * <p>For <a href="https://sdk.play.date/2.5.0#M-easingFunctions">easing functions</a> that take additional amplitude (such as <em>inOutElastic</em>), set these values on animator instances to the desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-graphics.animator.easingAmplitude)
         */
        easingAmplitude: number;
        /**
         * <p>For <a href="https://sdk.play.date/2.5.0#M-easingFunctions">easing functions</a> that take additional period arguments (such as <em>inOutElastic</em>), set these values on animator instances to the desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-graphics.animator.easingPeriod)
         */
        easingPeriod: number;
        /**
         * <p>Indicates the number of times after the initial animation the animator should repeat; i.e., if repeatCount is set to 2, the animation will play through 3 times.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-graphics.animator.repeatCount)
         */
        repeatCount: number;
        /**
         * <p>If set to true, after the animation reaches the end, it runs in reverse from the end to the start. The time to complete both the forward and reverse will be <em>duration</em> x 2. Defaults to false.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-graphics.animator.reverses)
         */
        reverses: number;
    }

    interface PlaydateGraphicsAnimationBlinker {
        /**
         * <p>Updates the caller’s state.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.blinker.update)
         */
        update(): void;
        /**
         * <p>Starts a blinker if it’s not running. Pass values for any property values you wish to modify.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.blinker.start)
         */
        start(
            onDuration: number = 200,
            offDuration: number = 200,
            loop: boolean = false,
            cycles: number = 6,
            _default: boolean = true
        ): void;
        /**
         * <p>Starts a blinker if it’s not running and sets its <code>loop</code> property to true. Equivalent to calling <code>playdate.graphics.animation.blinker:start(nil, nil, true)</code></p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.blinker.startLoop)
         */
        startLoop(): void;
        /**
         * <p>Stops a blinker if it’s running, returning the blinker’s <code>on</code> properly to the default value.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.blinker.stop)
         */
        stop(): void;
        /**
         * <p>Flags the caller for removal from the global list of blinkers</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.animation.blinker.remove)
         */
        remove(): void;
    }

    interface PlaydateGraphicsImagetable {
        /**
         * <p>Returns the <em>n</em>-th <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a> in the table (ordering left-to-right, top-to-bottom). The first image is at index 1. If .n_ or (<em>x</em>,<em>y</em>) is out of bounds, the function returns nil. See also <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.__len">imagetable[n]</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imagetable.getImage-n)
         */
        getImage(n: number): PlaydateGraphicsImage;
        /**
         * <p>Returns the image in cell (<em>x</em>,<em>y</em>) in the original bitmap. The first image is at index 1. If <em>n</em> or (<em>x</em>,<em>y</em>) is out of bounds, the function returns nil. See also <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.__len">imagetable[n]</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imagetable.getImage-xy)
         */
        getImage(x: number, y: number): PlaydateGraphicsImage | null;
        /**
         * <p>Sets the image at slot <em>n</em> in the image table by creating a reference to the data in <em>image</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imagetable.setImage)
         */
        setImage(n: number, image: PlaydateGraphicsImage): void;
        /**
         * <p>Loads a new image table from the data at <em>path</em> into an already-existing image table, without allocating additional memory. The image table at <em>path</em> must contain images of the same dimensions as the previous.</p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <code>(success, [error])</code>. If the boolean <code>success</code> is false, <code>error</code> is also returned.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imagetable.load)
         */
        load(path: string): true | [false, string];
        /**
         * <p>Returns the number of images in the table. See also <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.__len">#imagetable</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imagetable.getLength)
         */
        getLength(): number;
        /**
         * <p>Returns the pair (<em>cellsWide</em>, <em>cellsHigh</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imagetable.getSize)
         */
        getSize(): [number, number];
        /**
         * <p>Equivalent to <code>graphics.imagetable:getImage(n):draw(x,y,[flip])</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.imagetable.drawImage)
         */
        drawImage(n: number, x: number, y: number, flip: PlaydateFlip): void;
    }

    interface PlaydateGraphicsTilemap {
        /**
         * <p>Sets the tilemap’s <a href="https://sdk.play.date/2.5.0#C-graphics.imagetable">playdate.graphics.imagetable</a> to <em>table</em>, a <a href="https://sdk.play.date/2.5.0#C-graphics.imagetable">playdate.graphics.imagetable</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.setImageTable)
         */
        setImageTable(table: PlaydateGraphicsImagetable): void;
        /**
         * <p>Sets the tilemap’s width to <em>width</em>, then populates the tilemap with <em>data</em>, which should be a flat, one-dimensional array-like table containing index values to the <a href="https://sdk.play.date/2.5.0#m-graphics.tilemap.setImageTable">tilemap’s imagetable</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.setTiles)
         */
        setTiles(data: number[], width: number): void;
        /**
         * <p>Returns <em>data</em>, <em>width</em><br>
         * <em>data</em> is a flat, one-dimensional array-like table containing index values to the <a href="https://sdk.play.date/2.5.0#m-graphics.tilemap.setImageTable">tilemap’s imagetable</a>.<br>
         *  <em>width</em> is the width of the tile map, in number of tiles.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.getTiles)
         */
        getTiles(): [number[], number];
        /**
         * <p>Draws the tile map at screen coordinate (<em>x</em>, <em>y</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>sourceRect</em>, if specified, will cause only the part of the tilemap within sourceRect to be drawn. <em>sourceRect</em> should be relative to the tilemap’s bounds and can be a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> or four integers, (<em>x</em>, <em>y</em>, <em>w</em>, <em>h</em>), representing the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.draw)
         */
        draw(x: number, y: number, sourceRect: PlaydateGeometryRect): void;
        /**
         * <p>Draws the tilemap ignoring the currently-set <a href="https://sdk.play.date/2.5.0#f-graphics.setDrawOffset"><code>drawOffset</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.drawIgnoringOffset)
         */
        drawIgnoringOffset(
            x: number,
            y: number,
            sourceRect: PlaydateGeometryRect
        ): void;
        /**
         * <p>Sets the index of the tile at tilemap position (<em>x</em>, <em>y</em>). <em>index</em> is the (1-based) index of the image in the tilemap’s <a href="https://sdk.play.date/2.5.0#C-graphics.imagetable">playdate.graphics.imagetable</a>.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Tilemaps and imagetables, like Lua arrays, are 1-based, not 0-based. <code>tilemap:setTileAtPosition(1, 1, 2)</code> will set the index of the tile in the top-leftmost position to 2.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.setTileAtPosition)
         */
        setTileAtPosition(x: number, y: number, index: number): void;
        /**
         * <p>Returns the image index of the tile at the given <em>x</em> and <em>y</em> coordinate. If <em>x</em> or <em>y</em> is out of bounds, returns nil.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Tilemaps and imagetables, like Lua arrays, are 1-based, not 0-based. <code>tilemap:getTileAtPosition(1, 1)</code> will return the index of the top-leftmost tile.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.getTileAtPosition)
         */
        getTileAtPosition(x: number, y: number): number | null;
        /**
         * <p>Sets the tilemap’s width and height, in number of tiles.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.setSize)
         */
        setSize(width: number, height: number): void;
        /**
         * <p>Returns the size of the tile map, in tiles, as a pair, (<em>width</em>, <em>height</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.getSize)
         */
        getSize(): [number, number];
        /**
         * <p>Returns the size of the tilemap in pixels; that is, the size of the image multiplied by the number of rows and columns in the map. Returns multiple values (<em>width</em>, <em>height</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.getPixelSize)
         */
        getPixelSize(): [number, number];
        /**
         * <p>Returns multiple values (<em>width</em>, <em>height</em>), the pixel width and height of an individual tile.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.getTileSize)
         */
        getTileSize(): [number, number];
        /**
         * <p>This function returns an array of <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> objects that describe the areas of the tilemap that should trigger collisions.  You can also think of them as the "impassable" rects of your tilemap.  These rects will be in tilemap coordinates, not pixel coordinates.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>emptyIDs</em> is an array that contains the tile IDs of "empty" (or "passable") tiles in the tilemap — in other words, tile IDs that should not trigger a collision. Tiles with default IDs of 0 are treated as empty by default, so you do not need to include 0 in the array.</p>
         * </div>
         * <div class="paragraph">
         * <p>For example, if you have a tilemap describing terrain, where tile ID 1 represents grass the player can walk over, and tile ID 2 represents mountains that the player can’t cross, you’d pass an array containing just the value 1.  You’ll get a back an array of a minimal number of rects describing the areas where there are mountain tiles.</p>
         * </div>
         * <div class="paragraph">
         * <p>You can then pass each of those rects into <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.addEmptyCollisionSprite">playdate.graphics.sprite.addEmptyCollisionSprite()</a> to add an empty (invisible) sprite into the scene for the built-in collision detection methods.  In this example, collide rects would be added around mountain tiles but not grass tiles.</p>
         * </div>
         * <div class="paragraph">
         * <p>Alternatively, instead of calling getCollisionRects() at all, you can use the convenience function <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.addWallSprites">playdate.graphics.sprite.addWallSprites()</a>, which is effectively a shortcut for calling getCollisionRects() and passing all the resulting rects to <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.addEmptyCollisionSprite">addEmptyCollisionSprite()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.tilemap.getCollisionRects)
         */
        getCollisionRects(emptyIDs: number[]): PlaydateGeometryRect[];
    }

    interface PlaydateGraphicsSprite {
        /**
         * <p>Sets the sprite’s image to <code>image</code>, which should be an instance of <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a>. The .flip_ argument is optional; see <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw">playdate.graphics.image:draw()</a> for valid values. Optional scale arguments are also accepted. Unless disabled with <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setRedrawsOnImageChange">playdate.graphics.sprite:setRedrawOnImageChange()</a>, the sprite is automatically marked for redraw if the image isn’t the previous image.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setImage)
         */
        setImage(
            image: PlaydateGraphicsImage,
            flip: PlaydateFlip,
            scale: number,
            yscale: number
        ): void;
        /**
         * <p>Returns the playdate.graphics.image object that was set with setImage().</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getImage)
         */
        getImage(): PlaydateGraphicsImage;
        /**
         * <p>Adds the given sprite to the display list, so that it is drawn in the current scene.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.add)
         */
        add(): void;
        /**
         * <p>Removes the given sprite from the display list.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.remove)
         */
        remove(): void;
        /**
         * <p>Moves the sprite and resets the bounds based on the image dimensions and center.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.moveTo)
         */
        moveTo(x: number, y: number): void;
        /**
         * <p>Returns the sprite’s current x, y position as multiple values (<em>x</em>, <em>y</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getPosition)
         */
        getPosition(): [number, number];
        /**
         * <p>Moves the sprite by <em>x</em>, <em>y</em> pixels relative to its current position.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.moveBy)
         */
        moveBy(x: number, y: number): void;
        /**
         * <p>Sets the Z-index of the given sprite. Sprites with higher Z-indexes are drawn on top of those with lower Z-indexes. Valid values for <em>z</em> are in the range (-32768, 32767).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setZIndex)
         */
        setZIndex(z: number): void;
        /**
         * <p>Returns the Z-index of the given sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getZIndex)
         */
        getZIndex(): number;
        /**
         * <p>Sprites that aren’t visible don’t get their <a href="https://sdk.play.date/2.5.0#c-graphics.sprite.draw">draw()</a> method called.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setVisible)
         */
        setVisible(flag: boolean): void;
        /**
         * <p>Returns a boolean value, true if the sprite is visible.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.isVisible)
         */
        isVisible(): boolean;
        /**
         * <p>Sets the sprite’s drawing center as a fraction (ranging from 0.0 to 1.0) of the height and width. Default is 0.5, 0.5 (the center of the sprite). This means that when you call <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.moveTo">:moveTo(x, y)</a>, the center of your sprite will be positioned at <em>x</em>, <em>y</em>. If you want x and y to represent the upper left corner of your sprite, specify the center as 0, 0.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setCenter)
         */
        setCenter(x: number, y: number): void;
        /**
         * <p>Returns multiple values (<code>x, y</code>) representing the sprite’s drawing center as a fraction (ranging from 0.0 to 1.0) of the height and width.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getCenter)
         */
        getCenter(): [number, number];
        /**
         * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> representing the sprite’s drawing center as a fraction (ranging from 0.0 to 1.0) of the height and width.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getCenterPoint)
         */
        getCenterPoint(): PlaydateGeometryPoint;
        /**
         * <p>Sets the sprite’s size. The method has no effect if the sprite has an image set.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setSize)
         */
        setSize(width: number, height: number): void;
        /**
         * <p>Returns multiple values <em>(width, height)</em>, the current size of the sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getSize)
         */
        getSize(): [number, number];
        /**
         * <p>Sets the scaling factor for the sprite, with an optional separate scaling for the y axis. If setImage() is called after this, the scale factor is applied to the new image. Only affects sprites that have an image set.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setScale)
         */
        setScale(scale: number, yScale: any): void;
        /**
         * <p>Returns multiple values <em>(xScale, yScale)</em>, the current scaling of the sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getScale)
         */
        getScale(): [number, number];
        /**
         * <p>Sets the rotation for the sprite, in degrees clockwise, with an optional scaling factor. If setImage() is called after this, the rotation and scale is applied to the new image. Only affects sprites that have an image set. This function should be used with discretion, as it’s likely to be slow on the hardware. Consider pre-rendering rotated images for your sprites instead.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setRotation)
         */
        setRotation(angle: number, scale: number, yScale: any): void;
        /**
         * <p>Returns the current rotation of the sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getRotation)
         */
        getRotation(): number;
        /**
         * <p>Returns a copy of the caller.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.copy)
         */
        copy(): PlaydateGraphicsSprite;
        /**
         * <p>The sprite’s <em>updatesEnabled</em> flag (defaults to true) determines whether a sprite’s <a href="https://sdk.play.date/2.5.0#c-graphics.sprite.update">update()</a> method will be called. By default, a sprite’s <code>update</code> method does nothing; however, you may choose to have your sprite do something on every frame by implementing an update method on your sprite instance, or implementing it in your sprite subclass.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setUpdatesEnabled)
         */
        setUpdatesEnabled(flag: boolean): void;
        /**
         * <p>Returns a boolean value, true if updates are enabled on the sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.updatesEnabled)
         */
        updatesEnabled(): boolean;
        /**
         * <p>Sets the sprite’s tag, an integer value in the range of 0 to 255, useful for identifying sprites later, particularly when working with collisions.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setTag)
         */
        setTag(tag: number): void;
        /**
         * <p>Returns the sprite’s tag, an integer value.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getTag)
         */
        getTag(): number;
        /**
         * <p>Sets the mode for drawing the bitmap. See <a href="https://sdk.play.date/2.5.0#f-graphics.setImageDrawMode">playdate.graphics.setImageDrawMode(mode)</a> for valid modes.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setImageDrawMode)
         */
        setImageDrawMode(mode: PlaydateDrawMode): void;
        /**
         * <p>Flips the bitmap. See <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw">playdate.graphics.image:draw()</a> for valid <code>flip</code> values.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <code>true</code> is passed for the optional <em>flipCollideRect</em> argument, the sprite’s collideRect will be flipped as well.</p>
         * </div>
         * <div class="paragraph">
         * <p>Calling setImage() will reset the sprite to its default, non-flipped orientation.  So, if you call both setImage() and setImageFlip(), call setImage() first.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setImageFlip)
         */
        setImageFlip(flip: PlaydateFlip, flipCollideRect: boolean): void;
        /**
         * <p>Returns one of the values listed at <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw">playdate.graphics.image:draw()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getImageFlip)
         */
        getImageFlip(): PlaydateFlip;
        /**
         * <p>When set to <em>true</em>, the sprite will draw in screen coordinates, ignoring the currently-set <a href="https://sdk.play.date/2.5.0#f-graphics.setDrawOffset"><em>drawOffset</em></a>.</p>
         * </div>
         * <div class="paragraph">
         * <p>This only affects drawing, and should not be used on sprites being used for collisions, which will still happen in world-space.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setIgnoresDrawOffset)
         */
        setIgnoresDrawOffset(flag: boolean): void;
        /**
         * <p><code>setBounds()</code> positions and sizes the sprite, used for drawing and for calculating dirty rects. <em>upper-left-x</em> and <em>upper-left-y</em> are relative to the overall display coordinate system. (If an image is attached to the sprite, the size will be defined by that image, and not by the <em>width</em> and <em>height</em> parameters passed in to <code>setBounds()</code>.)</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * In <code>setBounds()</code>, <em>x</em> and <em>y</em> always correspond to the upper left corner of the sprite, regardless of how a <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCenter">sprite’s center</a> is defined. This makes it different from <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.moveTo">sprite:moveTo()</a>, where <em>x</em> and <em>y</em> honor the sprite’s defined center (by default, at a point 50% along the sprite’s width and height.)
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setBounds)
         */
        setBounds(
            upperLeftX: number,
            upperLeftY: number,
            width: number,
            height: number
        ): void;
        /**
         * <p><code>setBounds(rect)</code> sets the bounds of the sprite with a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a> object.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setBounds-rect)
         */
        setBounds(rect: PlaydateGeometryRect): void;
        /**
         * <p><code>getBounds()</code> returns multiple values (<em>x</em>, <em>y</em>, <em>width</em>, <em>height</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getBounds)
         */
        getBounds(): [number, number, number, number];
        /**
         * <p><code>getBoundsRect()</code> returns the sprite bounds as a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a> object.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getBoundsRect)
         */
        getBoundsRect(): PlaydateGeometryRect;
        /**
         * <p>Marking a sprite opaque tells the sprite system that it doesn’t need to draw anything underneath the sprite, since it will be overdrawn anyway. If you set an image without a mask/alpha channel on the sprite, it automatically sets the opaque flag.</p>
         * </div>
         * <div class="paragraph">
         * <p>Setting a sprite to opaque can have performance benefits.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setOpaque)
         */
        setOpaque(flag: boolean): void;
        /**
         * <p>Returns the sprite’s current opaque flag.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.isOpaque)
         */
        isOpaque(): boolean;
        /**
         * <p>Sets the sprite’s contents to the given <a href="https://sdk.play.date/2.5.0#C-graphics.tilemap">tilemap</a>. Useful if you want to automate drawing of your tilemap, especially if interleaved by depth with other sprites being drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setTilemap)
         */
        setTilemap(tilemap: PlaydateGraphicsTilemap): void;
        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/sprites</em> to use the <code>setAnimator</code> method.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p><code>setAnimator</code> assigns an <a href="https://sdk.play.date/2.5.0#C-graphics.animator">playdate.graphics.animator</a> to the sprite, which will cause the sprite to automatically update its position each frame while the animator is active.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>movesWithCollisions</em>, if provided and true will cause the sprite to move with collisions. A collision rect must be set on the sprite prior to passing true for this argument.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>removeOnCollision</em>, if provided and true will cause the animator to be removed from the sprite when a collision occurs.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * <code>setAnimator</code> should be called only after any custom update method has been set on the sprite.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setAnimator)
         */
        setAnimator(
            animator: PlaydateGraphicsAnimator,
            moveWithCollisions: boolean,
            removeOnCollision: boolean
        ): void;
        /**
         * <p>Removes a <a href="https://sdk.play.date/2.5.0#C-graphics.animator">playdate.graphics.animator</a> assigned to the sprite</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.removeAnimator)
         */
        removeAnimator(): void;
        /**
         * <p>Sets the clipping rectangle for the sprite, using separate parameters or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a> object. Only areas within the rect will be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setClipRect)
         */
        setClipRect(x: number, y: number, width: number, height: number): void;
        /**
         * <p>Sets the clipping rectangle for the sprite, using separate parameters or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a> object. Only areas within the rect will be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setClipRect)
         */
        setClipRect(rect: PlaydateGeometryRect): void;
        /**
         * <p>Clears the sprite’s current clipping rectangle.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.clearClipRect)
         */
        clearClipRect(): void;
        /**
         * <p>Specifies a stencil image to be set on the frame buffer before the sprite is drawn. If <em>tile</em> is set, the the stencil will be tiled; in this case, the image width must be a multiple of 32 pixels.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setStencilImage)
         */
        setStencilImage(stencil: PlaydateGraphicsImage, tile: boolean): void;
        /**
         * <p>Sets the sprite’s stencil to a dither pattern specified by <em>level</em> and optional <em>ditherType</em> (defaults to <code>playdate.graphics.image.kDitherTypeBayer8x8</code>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setStencilPattern-dither)
         */
        setStencilPattern(
            level: number,
            ditherType: PlaydateDitherType = PlaydateDitherType.Bayer8x8
        ): void;
        /**
         * <p>Clears the sprite’s stencil.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.clearStencil)
         */
        clearStencil(): void;
        /**
         * <p>Marks the rect defined by the sprite’s current bounds as needing a redraw.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.markDirty)
         */
        markDirty(): void;
        /**
         * <p>By default, sprites are automatically marked for redraw when their image is changed via <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setImage">playdate.graphics.sprite:setImage()</a>. If disabled by calling this function with a <em>false</em> argument, <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.addDirtyRect">playdate.graphics.sprite.addDirtyRect()</a> can be used to mark the (potentially smaller) area of the screen that needs to be redrawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setRedrawsOnImageChange)
         */
        setRedrawsOnImageChange(flag: boolean): void;
        /**
         * <p>If the sprite doesn’t have an image, the sprite’s draw function is called as needed to update the display. The rect passed in is the current dirty rect being updated by the display list. The rect coordinates passed in are relative to the sprite itself (i.e. x = 0, y = 0 refers to the top left corner of the sprite). Note that the callback is only called when the sprite is on screen and has a size specified via <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setSize">sprite:setSize()</a> or <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setBounds">sprite:setBounds()</a>.</p>
         * </div>
         * <div class="listingblock">
         * <div class="title">Example: Overriding the sprite draw method</div>
         * <div class="content">
         * <pre class="CodeRay highlight"><code data-lang="lua"><span class="comment">-- You can copy and paste this example directly as your main.lua file to see it in action</span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/graphics</span><span class="delimiter">"</span></span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/sprites</span><span class="delimiter">"</span></span>
         *
         * <span class="keyword">local</span> <span class="local-variable">mySprite</span> = playdate.graphics.sprite.new()
         * mySprite:moveTo(<span class="integer">200</span>, <span class="integer">120</span>)
         * <span class="comment">-- You MUST set a size first for anything to show up (either directly or by setting an image)</span>
         * mySprite:setSize(<span class="integer">30</span>, <span class="integer">30</span>)
         * mySprite:add()
         *
         * <span class="comment">-- The x, y, width, and height arguments refer to the dirty rect being updated, NOT the sprite dimensions</span>
         * <span class="keyword">function</span> mySprite:<span class="function">draw</span>(x, y, width, height)
         *     <span class="comment">-- Custom draw methods gives you more flexibility over what's drawn, but with the added benefits of sprites</span>
         *
         *     <span class="comment">-- Here we're just modulating the circle radius over time</span>
         *     <span class="keyword">local</span> <span class="local-variable">spriteWidth</span>, <span class="local-variable">spriteHeight</span> = self:getSize()
         *     <span class="keyword">if</span> <span class="keyword">not</span> self.radius <span class="keyword">or</span> self.radius &gt; spriteWidth <span class="keyword">then</span>
         *         self.radius = <span class="integer">0</span>
         *     <span class="keyword">end</span>
         *     self.radius += <span class="integer">1</span>
         *
         *     <span class="comment">-- Drawing coordinates are relative to the sprite (e.g. (0, 0) is the top left of the sprite)</span>
         *     playdate.graphics.fillCircleAtPoint(spriteWidth / <span class="integer">2</span>, spriteHeight / <span class="integer">2</span>, self.radius)
         * <span class="keyword">end</span>
         *
         * <span class="keyword">function</span> playdate.<span class="function">update</span>()
         *     <span class="comment">-- Your custom draw method gets called here, but only if the sprite is dirty</span>
         *     playdate.graphics.sprite.update()
         *
         *     <span class="comment">-- You might need to manually mark it dirty</span>
         *     mySprite:markDirty()
         * <span class="keyword">end</span></code></pre>
         * </div>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-graphics.sprite.draw)
         */
        draw(x: number, y: number, width: number, height: number): void;
        /**
         * <p>Called by <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.update">playdate.graphics.sprite.update()</a> (note the syntactic difference between the period and the colon) before sprites are drawn. Implementing <code>:update()</code> gives you the opportunity to perform some code upon every frame.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * The update method will only be called on sprites that have had <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.add">add()</a> called on them, and have their <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.updatesEnabled">updates enabled</a>.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock caution">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Caution</div>
         * </td>
         * <td class="content">
         * Be careful not confuse <code>sprite:update()</code> with <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.update"><code>sprite.update()</code></a>: the latter updates all sprites; the former updates just the sprite being invoked.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="listingblock">
         * <div class="title">Example: Overriding the sprite update method</div>
         * <div class="content">
         * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">mySprite</span> = playdate.graphics.sprite.new()
         * mySprite:moveTo(<span class="integer">200</span>, <span class="integer">120</span>)
         * mySprite:add() <span class="comment">-- Sprite needs to be added to get drawn and updated</span>
         * <span class="comment">-- mySprite:remove() will make it so the sprite stops getting drawn/updated</span>
         *
         * <span class="comment">-- Option 1: override the update method using an anonymous function</span>
         * mySprite.update = <span class="keyword">function</span>(self)
         *     <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">This gets called every frame when I'm added to the display list</span><span class="delimiter">"</span></span>)
         *     <span class="comment">-- Manipulate sprite using "self"</span>
         *     <span class="predefined">print</span>(self.x) <span class="comment">-- Prints 200.0</span>
         *     <span class="predefined">print</span>(self.y) <span class="comment">-- Prints 120.0</span>
         * <span class="keyword">end</span>
         *
         * <span class="comment">-- Option 2: override the update method using a function stored in a variable</span>
         * <span class="keyword">local</span> <span class="keyword">function</span> <span class="function">mySpriteUpdate</span>(self)
         *     <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">This gets called every frame when I'm added to the display list</span><span class="delimiter">"</span></span>)
         *     <span class="comment">-- Manipulate sprite using "self"</span>
         *     <span class="predefined">print</span>(self.x) <span class="comment">-- Prints 200.0</span>
         *     <span class="predefined">print</span>(self.y) <span class="comment">-- Prints 120.0</span>
         * <span class="keyword">end</span>
         * mySprite.update = mySpriteUpdate
         *
         * <span class="comment">-- Option 3: override the update method by directly defining it</span>
         * <span class="keyword">function</span> mySprite:<span class="function">update</span>()
         *     <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">This gets called every frame when I'm added to the display list</span><span class="delimiter">"</span></span>)
         *     <span class="comment">-- Manipulate sprite using "self"</span>
         *     <span class="predefined">print</span>(self.x) <span class="comment">-- Prints 200.0</span>
         *     <span class="predefined">print</span>(self.y) <span class="comment">-- Prints 120.0</span>
         * <span class="keyword">end</span>
         *
         * <span class="keyword">function</span> playdate.<span class="function">update</span>()
         *     <span class="comment">-- Your custom update method gets called here every frame if the sprite has been added</span>
         *     playdate.graphics.sprite.update()
         * <span class="keyword">end</span>
         *
         * <span class="comment">-- VERY simplified psuedocode explanation of what's happening in sprite.update() (not real code)</span>
         * <span class="keyword">local</span> <span class="local-variable">displayList</span> = <span class="map"><span class="delimiter">{</span><span class="delimiter">}</span></span> <span class="comment">-- Added sprites are kept track of in a list</span>
         * <span class="keyword">function</span> playdate.graphics.sprite.<span class="function">update</span>()
         *     <span class="comment">-- The display list is iterated over</span>
         *     <span class="keyword">for</span> i=<span class="integer">1</span>, #displayList <span class="keyword">do</span>
         *         <span class="keyword">local</span> <span class="local-variable">sprite</span> = displayList[i]
         *         <span class="comment">-- Checks if updates on the sprites are enabled</span>
         *         <span class="keyword">if</span> sprite:updatesEnabled() <span class="keyword">then</span>
         *             <span class="comment">-- The sprite update method is called</span>
         *             sprite:update()
         *         <span class="keyword">end</span>
         *         ...
         *         <span class="comment">-- Redraw all of the dirty rects, handle collisions, etc.</span>
         *     <span class="keyword">end</span>
         * <span class="keyword">end</span></code></pre>
         * </div>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-graphics.sprite.update)
         */
        update(): void;
        /**
         * <p><code>setCollideRect()</code> marks the area of the sprite, relative to its own internal coordinate system, to be checked for collisions with other sprites' collide rects. Note that the coordinate space is relative to the top-left corner of the bounds, regardless of where the sprite’s <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCenter">center/anchor</a> is located.</p>
         * </div>
         * <div class="admonitionblock tip">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Tip</div>
         * </td>
         * <td class="content">
         * If you want to set the sprite’s collide rect to be the same size as the sprite itself, you can write <code>sprite:setCollideRect( 0, 0, sprite:getSize() )</code>.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * <code>setCollideRect()</code> must be invoked on a sprite in order to get it to participate in collisions.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * Very large sprites with very large collide rects should be avoided, as they will have a negative impact on performance and memory usage.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setCollideRect)
         */
        setCollideRect(
            x: number,
            y: number,
            width: number,
            height: number
        ): void;
        /**
         * <p><code>setCollideRect()</code> marks the area of the sprite, relative to its own internal coordinate system, to be checked for collisions with other sprites' collide rects. Note that the coordinate space is relative to the top-left corner of the bounds, regardless of where the sprite’s <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCenter">center/anchor</a> is located.</p>
         * </div>
         * <div class="admonitionblock tip">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Tip</div>
         * </td>
         * <td class="content">
         * If you want to set the sprite’s collide rect to be the same size as the sprite itself, you can write <code>sprite:setCollideRect( 0, 0, sprite:getSize() )</code>.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * <code>setCollideRect()</code> must be invoked on a sprite in order to get it to participate in collisions.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * Very large sprites with very large collide rects should be avoided, as they will have a negative impact on performance and memory usage.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setCollideRect)
         */
        setCollideRect(rect: PlaydateGeometryRect): void;
        /**
         * <p>Returns the sprite’s collide rect set with <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCollideRect"><code>setCollideRect()</code></a>. Return value is a <a href="https://sdk.play.date/2.5.0#C-geometry.rect"><code>playdate.geometry.rect</code></a>.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * This function return coordinates relative to the sprite itself; the sprite’s position has no bearing on these values.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getCollideRect)
         */
        getCollideRect(): PlaydateGeometryRect;
        /**
         * <p>Returns the sprite’s collide rect as multiple values, (<em>x</em>, <em>y</em>, <em>width</em>, <em>height</em>).</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * This function return coordinates relative to the sprite itself; the sprite’s position has no bearing on these values.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getCollideBounds)
         */
        getCollideBounds(): [number, number, number, number];
        /**
         * <p>Clears the sprite’s collide rect set with <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCollideRect"><code>setCollideRect()</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.clearCollideRect)
         */
        clearCollideRect(): void;
        /**
         * <p>Returns an array of sprites that have collide rects that are currently overlapping the calling sprite’s collide rect, taking the sprites' groups and collides-with masks into consideration.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.overlappingSprites)
         */
        overlappingSprites(): PlaydateGraphicsSprite[];
        /**
         * <p>Returns a boolean value set to true if a pixel-by-pixel comparison of the sprite images shows that non-transparent pixels are overlapping, based on the current bounds of the sprites.</p>
         * </div>
         * <div class="paragraph">
         * <p>This method may be used in conjunction with the standard collision architecture. Say, if <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.overlappingSprites"><code>overlappingSprites()</code></a> or <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.moveWithCollisions"><code>moveWithCollisions()</code></a> report a collision of two sprite’s bounding rects, alphaCollision() could then be used to discern if a pixel-level collision occurred.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.alphaCollision)
         */
        alphaCollision(anotherSprite: PlaydateGraphicsSprite): boolean;
        /**
         * <p>The sprite’s <em>collisionsEnabled</em> flag (defaults to true) can be set to <code>false</code> in order to temporarily keep a sprite from colliding with any other sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setCollisionsEnabled)
         */
        setCollisionsEnabled(flag: boolean): void;
        /**
         * <p>Returns the sprite’s <em>collisionsEnabled</em> flag.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.collisionsEnabled)
         */
        collisionsEnabled(): boolean;
        /**
         * <p>Adds the sprite to one or more collision groups. A group is a collection of sprites that exhibit similar collision behavior. (An example: in Atari’s <em>Asteroids</em>, asteroid sprites would all be added to the same group, while the player’s spaceship might be in a different group.) Use <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCollidesWithGroups"><code>setCollidesWithGroups()</code></a> to define which groups a sprite should collide with.</p>
         * </div>
         * <div class="paragraph">
         * <p>There are 32 groups, each defined by the integer 1 through 32. To add a sprite to only groups 1 and 3, for example, call <code>mySprite:setGroups({1, 3})</code>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Alternatively, use <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setGroupMask"><code>setGroupMask()</code></a> to set group membership via a bitmask.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setGroups)
         */
        setGroups(groups: number[]): void;
        /**
         * <p>Pass in a group number or an array of group numbers to specify which groups this sprite can collide with. Groups are numbered 1 through 32. Use <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setGroups"><code>setGroups()</code></a> to specify which groups a sprite belongs to.</p>
         * </div>
         * <div class="paragraph">
         * <p>Alternatively, you can specify group collision behavior with a bitmask by using <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCollidesWithGroupsMask"><code>setCollidesWithGroupsMask()</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setCollidesWithGroups)
         */
        setCollidesWithGroups(groups: number | number[]): void;
        /**
         * <p><code>setGroupMask()</code> sets the sprite’s group bitmask, which is 32 bits. In conjunction with the <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.setCollidesWithGroupsMask"><code>setCollidesWithGroupsMask()</code></a> method, this controls which sprites can collide with each other.</p>
         * </div>
         * <div class="paragraph">
         * <p>For large group mask numbers, pass the number as a hex value, eg. <code>0xFFFFFFFF</code> to work around limitations in Lua’s integer sizes.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setGroupMask)
         */
        setGroupMask(mask: number): void;
        /**
         * <p><code>getGroupMask()</code> returns the integer value of the sprite’s group bitmask.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getGroupMask)
         */
        getGroupMask(): number;
        /**
         * <p>Sets the sprite’s collides-with-groups bitmask, which is 32 bits. The mask specifies which other sprite groups this sprite can collide with. Sprites only collide if the moving sprite’s <em>collidesWithGroupsMask</em> matches at least one group of a potential collision sprite (i.e. a bitwise AND (&amp;) between the moving sprite’s <em>collidesWithGroupsMask</em> and a potential collision sprite’s <em>groupMask</em> != zero) or if the moving sprite’s <em>collidesWithGroupsMask</em> and the other sprite’s <em>groupMask</em> are both set to 0x00000000 (the default values).</p>
         * </div>
         * <div class="paragraph">
         * <p>For large mask numbers, pass the number as a hex value, eg. <code>0xFFFFFFFF</code> to work around limitations in Lua’s integer sizes.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setCollidesWithGroupsMask)
         */
        setCollidesWithGroupsMask(mask: number): void;
        /**
         * <p>Returns the integer value of the sprite’s collision bitmask.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.getCollidesWithGroupsMask)
         */
        getCollidesWithGroupsMask(): number;
        /**
         * <p>Resets the sprite’s group mask to <code>0x00000000</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.resetGroupMask)
         */
        resetGroupMask(): void;
        /**
         * <p>Resets the sprite’s collides-with-groups mask to <code>0x00000000</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.resetCollidesWithGroupsMask)
         */
        resetCollidesWithGroupsMask(): void;
        /**
         * <p>Moves the sprite towards <em>goalX</em>, <em>goalY</em> or <em>goalPoint</em> taking collisions into account, which means the sprite’s final position may not be the same as <em>goalX</em>, <em>goalY</em> or <em>goalPoint</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <em>actualX</em>, <em>actualY</em>, <em>collisions</em>, <em>length</em>.</p>
         * </div>
         * <table class="tableblock frame-all grid-all stretch">
         * <colgroup>
         * <col style="width: 20%;">
         * <col style="width: 80%;">
         * </colgroup>
         * <tbody>
         * <tr>
         * <td class="tableblock halign-right valign-top"><p class="tableblock"><em>actualX</em>, <em>actualY</em></p></td>
         * <td class="tableblock halign-left valign-top"><p class="tableblock">the final position of the sprite. If no collisions occurred, this will be the same as <em>goalX</em>, <em>goalY</em>.</p></td>
         * </tr>
         * <tr>
         * <td class="tableblock halign-right valign-top"><p class="tableblock"><em>collisions</em></p></td>
         * <td class="tableblock halign-left valign-top"><p class="tableblock">an array of userdata objects containing information about all collisions that occurred. Each item in the array contains values for the following indices:</p>
         * <p class="tableblock">- <em>sprite</em>: The sprite being moved.</p>
         * <p class="tableblock">- <em>other</em>: The sprite colliding with the sprite being moved.</p>
         * <p class="tableblock">- <em>type</em>: The result of <a href="https://sdk.play.date/2.5.0#c-graphics.sprite.collisionResponse"><em>collisionResponse</em></a>.</p>
         * <p class="tableblock">- <em>overlaps</em>: Boolean. True if the sprite was overlapping <em>other</em> when the collision started. False if it didn’t overlap but tunneled through <em>other</em>.</p>
         * <p class="tableblock">- <em>ti</em>: A number between 0 and 1 indicating how far along the movement to the goal the collision occurred.</p>
         * <p class="tableblock">- <em>move</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.vector2D">playdate.geometry.vector2D</a>. The difference between the original coordinates and the actual ones when the collision happened.</p>
         * <p class="tableblock">- <em>normal</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.vector2D">playdate.geometry.vector2D</a>. The collision normal; usually -1, 0, or 1 in <em>x</em> and <em>y</em>. Use this value to determine things like if your character is touching the ground.</p>
         * <p class="tableblock">- <em>touch</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a>. The coordinates where the sprite started touching <em>other</em>.</p>
         * <p class="tableblock">- <em>spriteRect</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a>. The rectangle the sprite occupied when the touch happened.</p>
         * <p class="tableblock">- <em>otherRect</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a>. The rectangle <code>other</code> occupied when the touch happened.</p>
         * <p class="tableblock">If the collision type was <em>playdate.graphics.sprite.kCollisionTypeBounce</em> the table also contains <em>bounce</em>, a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> indicating the coordinates to which the sprite attempted to bounce (could be different than <em>actualX</em>, <em>actualY</em> if further collisions occurred).</p>
         * <p class="tableblock">If the collision type was <em>playdate.graphics.sprite.kCollisionTypeSlide</em> the table also contains <em>slide</em>, a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> indicating the coordinates to which the sprite attempted to slide.</p></td>
         * </tr>
         * <tr>
         * <td class="tableblock halign-right valign-top"><p class="tableblock"><em>length</em></p></td>
         * <td class="tableblock halign-left valign-top"><p class="tableblock">the length of the collisions array, equal to <em>#collisions</em></p></td>
         * </tr>
         * </tbody>
         * </table>
         * <div class="paragraph">
         * <p>Note that the collision info items are only valid until the next call of <em>moveWithCollisions</em> or <em>checkCollisions</em>. To save collision information for later, the data should be copied out of the collision info userdata object.</p>
         * </div>
         * <div class="paragraph">
         * <p>See also <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.checkCollisions"><code>checkCollisions()</code></a> to check for collisions without actually moving the sprite.</p>
         * </div>
         * <div class="listingblock">
         * <div class="title">Example: Using moveWithCollisions for a simple player collision example</div>
         * <div class="content">
         * <pre class="CodeRay highlight"><code data-lang="lua"><span class="comment">-- You can copy and paste this example directly as your main.lua file to see it in action</span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/graphics</span><span class="delimiter">"</span></span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/sprites</span><span class="delimiter">"</span></span>
         *
         * <span class="comment">-- Creating a tags object, to keep track of tags more easily</span>
         * TAGS = <span class="map"><span class="delimiter">{</span>
         *     <span class="key">player</span> = <span class="integer">1</span>,
         *     <span class="key">obstacle</span> = <span class="integer">2</span>,
         *     <span class="key">coin</span> = <span class="integer">3</span>,
         *     <span class="key">powerUp</span> = <span class="integer">4</span>
         * <span class="delimiter">}</span></span>
         *
         * <span class="comment">-- Creating a player sprite we can move around and collide things with</span>
         * <span class="keyword">local</span> <span class="local-variable">playerImage</span> = playdate.graphics.image.new(<span class="integer">20</span>, <span class="integer">20</span>)
         * playdate.graphics.pushContext(playerImage)
         *     playdate.graphics.fillCircleInRect(<span class="integer">0</span>, <span class="integer">0</span>, playerImage:getSize())
         * playdate.graphics.popContext()
         * <span class="keyword">local</span> <span class="local-variable">playerSprite</span> = playdate.graphics.sprite.new(playerImage)
         * <span class="comment">-- Setting a tag on the player, so we can check the tag to see if we're colliding against the player</span>
         * playerSprite:setTag(TAGS.player)
         * playerSprite:moveTo(<span class="integer">200</span>, <span class="integer">120</span>)
         * <span class="comment">-- Remember to set a collision rect, or this all doesn't work!</span>
         * playerSprite:setCollideRect(<span class="integer">0</span>, <span class="integer">0</span>, playerSprite:getSize())
         * playerSprite:add()
         *
         * <span class="comment">-- Creating an obstacle sprite we can collide against</span>
         * <span class="keyword">local</span> <span class="local-variable">obstacleImage</span> = playdate.graphics.image.new(<span class="integer">20</span>, <span class="integer">20</span>, playdate.graphics.kColorBlack)
         * <span class="keyword">local</span> <span class="local-variable">obstacleSprite</span> = playdate.graphics.sprite.new(obstacleImage)
         * <span class="comment">-- Setting a tag for the obstacle as well</span>
         * obstacleSprite:setTag(TAGS.obstacle)
         * obstacleSprite:moveTo(<span class="integer">300</span>, <span class="integer">120</span>)
         * <span class="comment">-- Can't forget this!</span>
         * obstacleSprite:setCollideRect(<span class="integer">0</span>, <span class="integer">0</span>, obstacleSprite:getSize())
         * obstacleSprite:add()
         *
         * <span class="keyword">function</span> playdate.<span class="function">update</span>()
         *     playdate.graphics.sprite.update()
         *
         *     <span class="comment">-- Some simple movement code for the sake of demonstration</span>
         *     <span class="keyword">local</span> <span class="local-variable">moveSpeed</span> = <span class="integer">3</span>
         *     <span class="keyword">local</span> <span class="local-variable">goalX</span>, <span class="local-variable">goalY</span> = playerSprite.x, playerSprite.y
         *     <span class="keyword">if</span> playdate.buttonIsPressed(playdate.kButtonUp) <span class="keyword">then</span>
         *         goalY -= moveSpeed
         *     <span class="keyword">elseif</span> playdate.buttonIsPressed(playdate.kButtonDown) <span class="keyword">then</span>
         *         goalY += moveSpeed
         *     <span class="keyword">elseif</span> playdate.buttonIsPressed(playdate.kButtonLeft) <span class="keyword">then</span>
         *         goalX -= moveSpeed
         *     <span class="keyword">elseif</span> playdate.buttonIsPressed(playdate.kButtonRight) <span class="keyword">then</span>
         *         goalX += moveSpeed
         *     <span class="keyword">end</span>
         *
         *     <span class="comment">-- Remember to use :moveWithCollisions(), and not :moveTo() or :moveBy(), or collisions won't happen!</span>
         *     <span class="comment">-- To do a "moveBy" operation, sprite:moveBy(5, 5) == sprite:moveWithCollisions(sprite.x + 5, sprite.y + 5)</span>
         *     <span class="keyword">local</span> <span class="local-variable">actualX</span>, <span class="local-variable">actualY</span>, <span class="local-variable">collisions</span>, <span class="local-variable">numberOfCollisions</span> = playerSprite:moveWithCollisions(goalX, goalY)
         *
         *     <span class="comment">-- If we get into this loop, there was a collision</span>
         *     <span class="keyword">for</span> i=<span class="integer">1</span>, numberOfCollisions <span class="keyword">do</span>
         *         <span class="comment">-- This is getting data about one of things we're currently colliding with. Since we could</span>
         *         <span class="comment">-- be colliding with multiple things at once, we have to handle each collision individually</span>
         *         <span class="keyword">local</span> <span class="local-variable">collision</span> = collisions[i]
         *
         *         <span class="comment">-- Always prints 'true', as the sprite property is the sprite being moved (in this case, the player)</span>
         *         <span class="predefined">print</span>(collision.sprite == playerSprite)
         *         <span class="comment">-- Also prints 'true', as we set the tag on the player sprite to the player tag</span>
         *         <span class="predefined">print</span>(collision.sprite:getTag() == TAGS.player)
         *
         *         <span class="comment">-- This gets the actual sprite object we're colliding with</span>
         *         <span class="keyword">local</span> <span class="local-variable">collidedSprite</span> = collision.other
         *         <span class="keyword">local</span> <span class="local-variable">collisionTag</span> = collidedSprite:getTag()
         *         <span class="comment">-- Since we set a tag on the obstacle, we can check if we're colliding with that</span>
         *         <span class="keyword">if</span> collisionTag == TAGS.obstacle <span class="keyword">then</span>
         *             <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Collided with an obstacle!</span><span class="delimiter">"</span></span>)
         *
         *             <span class="comment">-- We can use the collision normal to check which side we collided with</span>
         *             <span class="keyword">local</span> <span class="local-variable">collisionNormal</span> = collision.normal
         *             <span class="keyword">if</span> collisionNormal.x == <span class="integer">-1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched left side!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">elseif</span> collisionNormal.x == <span class="integer">1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched right side!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">end</span>
         *
         *             <span class="keyword">if</span> collisionNormal.y == <span class="integer">-1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched top!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">elseif</span> collisionNormal.y == <span class="integer">1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched bottom!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">end</span>
         *         <span class="comment">-- Handle some other collisions, like collecting a coin or a power up</span>
         *         <span class="keyword">elseif</span> collisionTag == TAGS.coin <span class="keyword">then</span>
         *             <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Coin collected!</span><span class="delimiter">"</span></span>)
         *         <span class="keyword">elseif</span> collisionTag == TAGS.powerUp <span class="keyword">then</span>
         *             <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Powered up!</span><span class="delimiter">"</span></span>)
         *         <span class="keyword">end</span>
         *     <span class="keyword">end</span>
         * <span class="keyword">end</span></code></pre>
         * </div>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.moveWithCollisions)
         */
        moveWithCollisions(
            goalX: number,
            goalY: number
        ): [number, number, PlaydateCollision[], number];
        /**
         * <p>Moves the sprite towards <em>goalX</em>, <em>goalY</em> or <em>goalPoint</em> taking collisions into account, which means the sprite’s final position may not be the same as <em>goalX</em>, <em>goalY</em> or <em>goalPoint</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <em>actualX</em>, <em>actualY</em>, <em>collisions</em>, <em>length</em>.</p>
         * </div>
         * <table class="tableblock frame-all grid-all stretch">
         * <colgroup>
         * <col style="width: 20%;">
         * <col style="width: 80%;">
         * </colgroup>
         * <tbody>
         * <tr>
         * <td class="tableblock halign-right valign-top"><p class="tableblock"><em>actualX</em>, <em>actualY</em></p></td>
         * <td class="tableblock halign-left valign-top"><p class="tableblock">the final position of the sprite. If no collisions occurred, this will be the same as <em>goalX</em>, <em>goalY</em>.</p></td>
         * </tr>
         * <tr>
         * <td class="tableblock halign-right valign-top"><p class="tableblock"><em>collisions</em></p></td>
         * <td class="tableblock halign-left valign-top"><p class="tableblock">an array of userdata objects containing information about all collisions that occurred. Each item in the array contains values for the following indices:</p>
         * <p class="tableblock">- <em>sprite</em>: The sprite being moved.</p>
         * <p class="tableblock">- <em>other</em>: The sprite colliding with the sprite being moved.</p>
         * <p class="tableblock">- <em>type</em>: The result of <a href="https://sdk.play.date/2.5.0#c-graphics.sprite.collisionResponse"><em>collisionResponse</em></a>.</p>
         * <p class="tableblock">- <em>overlaps</em>: Boolean. True if the sprite was overlapping <em>other</em> when the collision started. False if it didn’t overlap but tunneled through <em>other</em>.</p>
         * <p class="tableblock">- <em>ti</em>: A number between 0 and 1 indicating how far along the movement to the goal the collision occurred.</p>
         * <p class="tableblock">- <em>move</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.vector2D">playdate.geometry.vector2D</a>. The difference between the original coordinates and the actual ones when the collision happened.</p>
         * <p class="tableblock">- <em>normal</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.vector2D">playdate.geometry.vector2D</a>. The collision normal; usually -1, 0, or 1 in <em>x</em> and <em>y</em>. Use this value to determine things like if your character is touching the ground.</p>
         * <p class="tableblock">- <em>touch</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a>. The coordinates where the sprite started touching <em>other</em>.</p>
         * <p class="tableblock">- <em>spriteRect</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a>. The rectangle the sprite occupied when the touch happened.</p>
         * <p class="tableblock">- <em>otherRect</em>: <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a>. The rectangle <code>other</code> occupied when the touch happened.</p>
         * <p class="tableblock">If the collision type was <em>playdate.graphics.sprite.kCollisionTypeBounce</em> the table also contains <em>bounce</em>, a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> indicating the coordinates to which the sprite attempted to bounce (could be different than <em>actualX</em>, <em>actualY</em> if further collisions occurred).</p>
         * <p class="tableblock">If the collision type was <em>playdate.graphics.sprite.kCollisionTypeSlide</em> the table also contains <em>slide</em>, a <a href="https://sdk.play.date/2.5.0#C-geometry.point">playdate.geometry.point</a> indicating the coordinates to which the sprite attempted to slide.</p></td>
         * </tr>
         * <tr>
         * <td class="tableblock halign-right valign-top"><p class="tableblock"><em>length</em></p></td>
         * <td class="tableblock halign-left valign-top"><p class="tableblock">the length of the collisions array, equal to <em>#collisions</em></p></td>
         * </tr>
         * </tbody>
         * </table>
         * <div class="paragraph">
         * <p>Note that the collision info items are only valid until the next call of <em>moveWithCollisions</em> or <em>checkCollisions</em>. To save collision information for later, the data should be copied out of the collision info userdata object.</p>
         * </div>
         * <div class="paragraph">
         * <p>See also <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.checkCollisions"><code>checkCollisions()</code></a> to check for collisions without actually moving the sprite.</p>
         * </div>
         * <div class="listingblock">
         * <div class="title">Example: Using moveWithCollisions for a simple player collision example</div>
         * <div class="content">
         * <pre class="CodeRay highlight"><code data-lang="lua"><span class="comment">-- You can copy and paste this example directly as your main.lua file to see it in action</span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/graphics</span><span class="delimiter">"</span></span>
         * import <span class="string"><span class="delimiter">"</span><span class="content">CoreLibs/sprites</span><span class="delimiter">"</span></span>
         *
         * <span class="comment">-- Creating a tags object, to keep track of tags more easily</span>
         * TAGS = <span class="map"><span class="delimiter">{</span>
         *     <span class="key">player</span> = <span class="integer">1</span>,
         *     <span class="key">obstacle</span> = <span class="integer">2</span>,
         *     <span class="key">coin</span> = <span class="integer">3</span>,
         *     <span class="key">powerUp</span> = <span class="integer">4</span>
         * <span class="delimiter">}</span></span>
         *
         * <span class="comment">-- Creating a player sprite we can move around and collide things with</span>
         * <span class="keyword">local</span> <span class="local-variable">playerImage</span> = playdate.graphics.image.new(<span class="integer">20</span>, <span class="integer">20</span>)
         * playdate.graphics.pushContext(playerImage)
         *     playdate.graphics.fillCircleInRect(<span class="integer">0</span>, <span class="integer">0</span>, playerImage:getSize())
         * playdate.graphics.popContext()
         * <span class="keyword">local</span> <span class="local-variable">playerSprite</span> = playdate.graphics.sprite.new(playerImage)
         * <span class="comment">-- Setting a tag on the player, so we can check the tag to see if we're colliding against the player</span>
         * playerSprite:setTag(TAGS.player)
         * playerSprite:moveTo(<span class="integer">200</span>, <span class="integer">120</span>)
         * <span class="comment">-- Remember to set a collision rect, or this all doesn't work!</span>
         * playerSprite:setCollideRect(<span class="integer">0</span>, <span class="integer">0</span>, playerSprite:getSize())
         * playerSprite:add()
         *
         * <span class="comment">-- Creating an obstacle sprite we can collide against</span>
         * <span class="keyword">local</span> <span class="local-variable">obstacleImage</span> = playdate.graphics.image.new(<span class="integer">20</span>, <span class="integer">20</span>, playdate.graphics.kColorBlack)
         * <span class="keyword">local</span> <span class="local-variable">obstacleSprite</span> = playdate.graphics.sprite.new(obstacleImage)
         * <span class="comment">-- Setting a tag for the obstacle as well</span>
         * obstacleSprite:setTag(TAGS.obstacle)
         * obstacleSprite:moveTo(<span class="integer">300</span>, <span class="integer">120</span>)
         * <span class="comment">-- Can't forget this!</span>
         * obstacleSprite:setCollideRect(<span class="integer">0</span>, <span class="integer">0</span>, obstacleSprite:getSize())
         * obstacleSprite:add()
         *
         * <span class="keyword">function</span> playdate.<span class="function">update</span>()
         *     playdate.graphics.sprite.update()
         *
         *     <span class="comment">-- Some simple movement code for the sake of demonstration</span>
         *     <span class="keyword">local</span> <span class="local-variable">moveSpeed</span> = <span class="integer">3</span>
         *     <span class="keyword">local</span> <span class="local-variable">goalX</span>, <span class="local-variable">goalY</span> = playerSprite.x, playerSprite.y
         *     <span class="keyword">if</span> playdate.buttonIsPressed(playdate.kButtonUp) <span class="keyword">then</span>
         *         goalY -= moveSpeed
         *     <span class="keyword">elseif</span> playdate.buttonIsPressed(playdate.kButtonDown) <span class="keyword">then</span>
         *         goalY += moveSpeed
         *     <span class="keyword">elseif</span> playdate.buttonIsPressed(playdate.kButtonLeft) <span class="keyword">then</span>
         *         goalX -= moveSpeed
         *     <span class="keyword">elseif</span> playdate.buttonIsPressed(playdate.kButtonRight) <span class="keyword">then</span>
         *         goalX += moveSpeed
         *     <span class="keyword">end</span>
         *
         *     <span class="comment">-- Remember to use :moveWithCollisions(), and not :moveTo() or :moveBy(), or collisions won't happen!</span>
         *     <span class="comment">-- To do a "moveBy" operation, sprite:moveBy(5, 5) == sprite:moveWithCollisions(sprite.x + 5, sprite.y + 5)</span>
         *     <span class="keyword">local</span> <span class="local-variable">actualX</span>, <span class="local-variable">actualY</span>, <span class="local-variable">collisions</span>, <span class="local-variable">numberOfCollisions</span> = playerSprite:moveWithCollisions(goalX, goalY)
         *
         *     <span class="comment">-- If we get into this loop, there was a collision</span>
         *     <span class="keyword">for</span> i=<span class="integer">1</span>, numberOfCollisions <span class="keyword">do</span>
         *         <span class="comment">-- This is getting data about one of things we're currently colliding with. Since we could</span>
         *         <span class="comment">-- be colliding with multiple things at once, we have to handle each collision individually</span>
         *         <span class="keyword">local</span> <span class="local-variable">collision</span> = collisions[i]
         *
         *         <span class="comment">-- Always prints 'true', as the sprite property is the sprite being moved (in this case, the player)</span>
         *         <span class="predefined">print</span>(collision.sprite == playerSprite)
         *         <span class="comment">-- Also prints 'true', as we set the tag on the player sprite to the player tag</span>
         *         <span class="predefined">print</span>(collision.sprite:getTag() == TAGS.player)
         *
         *         <span class="comment">-- This gets the actual sprite object we're colliding with</span>
         *         <span class="keyword">local</span> <span class="local-variable">collidedSprite</span> = collision.other
         *         <span class="keyword">local</span> <span class="local-variable">collisionTag</span> = collidedSprite:getTag()
         *         <span class="comment">-- Since we set a tag on the obstacle, we can check if we're colliding with that</span>
         *         <span class="keyword">if</span> collisionTag == TAGS.obstacle <span class="keyword">then</span>
         *             <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Collided with an obstacle!</span><span class="delimiter">"</span></span>)
         *
         *             <span class="comment">-- We can use the collision normal to check which side we collided with</span>
         *             <span class="keyword">local</span> <span class="local-variable">collisionNormal</span> = collision.normal
         *             <span class="keyword">if</span> collisionNormal.x == <span class="integer">-1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched left side!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">elseif</span> collisionNormal.x == <span class="integer">1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched right side!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">end</span>
         *
         *             <span class="keyword">if</span> collisionNormal.y == <span class="integer">-1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched top!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">elseif</span> collisionNormal.y == <span class="integer">1</span> <span class="keyword">then</span>
         *                 <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Touched bottom!</span><span class="delimiter">"</span></span>)
         *             <span class="keyword">end</span>
         *         <span class="comment">-- Handle some other collisions, like collecting a coin or a power up</span>
         *         <span class="keyword">elseif</span> collisionTag == TAGS.coin <span class="keyword">then</span>
         *             <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Coin collected!</span><span class="delimiter">"</span></span>)
         *         <span class="keyword">elseif</span> collisionTag == TAGS.powerUp <span class="keyword">then</span>
         *             <span class="predefined">print</span>(<span class="string"><span class="delimiter">"</span><span class="content">Powered up!</span><span class="delimiter">"</span></span>)
         *         <span class="keyword">end</span>
         *     <span class="keyword">end</span>
         * <span class="keyword">end</span></code></pre>
         * </div>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.moveWithCollisions)
         */
        moveWithCollisions(
            goalPoint: PlaydateGeometryPoint
        ): [number, number, PlaydateCollision[], number];
        /**
         * <p>Returns the same values as <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.moveWithCollisions"><code>moveWithCollisions()</code></a> but does not actually move the sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.checkCollisions)
         */
        checkCollisions(
            x: number,
            y: number
        ): [number, number, PlaydateCollision[], number];
        /**
         * <p>Returns the same values as <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.moveWithCollisions"><code>moveWithCollisions()</code></a> but does not actually move the sprite.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.checkCollisions)
         */
        checkCollisions(
            point: PlaydateGeometryPoint
        ): [number, number, PlaydateCollision[], number];
        /**
         * <p>A callback that can be defined on a sprite to control the type of collision response that should happen when a collision with <em>other</em> occurs. This callback should return one of the following four values:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.graphics.sprite.kCollisionTypeSlide</em>: Use for collisions that should slide over other objects, like Super Mario does over a platform or the ground.</p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.sprite.kCollisionTypeFreeze</em>: Use for collisions where the sprite should stop moving as soon as it collides with <em>other</em>, such as an arrow hitting a wall.</p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.sprite.kCollisionTypeOverlap</em>: Use for collisions in which you want to know about the collision but it should not impact the movement of the sprite, such as when collecting a coin.</p>
         * </li>
         * <li>
         * <p><em>playdate.graphics.sprite.kCollisionTypeBounce</em>: Use when the sprite should move away from <em>other</em>, like the ball in Pong or Arkanoid.</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>The strings "slide", "freeze", "overlap", and "bounce" can be used instead of the constants.</p>
         * </div>
         * <div class="paragraph">
         * <p>Feel free to return different values based on the value of <em>other</em>. For example, if <em>other</em> is a wall sprite, you may want to return "slide" or "bounce", but if it’s a coin you might return "overlap".</p>
         * </div>
         * <div class="paragraph">
         * <p>If the callback is not present, or returns nil, <em>kCollisionTypeFreeze</em> is used.</p>
         * </div>
         * <div class="admonitionblock tip">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Tip</div>
         * </td>
         * <td class="content">
         * Instead of defining a callback, the collisionResponse property of a sprite can be set directly to one of the four collision response types. This will be faster, as the lua function will not need to be called, but does not allow for dynamic behavior.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>This method should not attempt to modify the sprites in any way. While it might be tempting to deal with collisions here, doing so will have unexpected and undesirable results. Instead, this function should return one of the collision response values as quickly as possible. If sprites need to be modified as the result of a collision, do so elsewhere, such as by inspecting the list of collisions returned by <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.moveWithCollisions"><code>moveWithCollisions()</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-graphics.sprite.collisionResponse)
         */
        collisionResponse(
            other: PlaydateGraphicsSprite
        ): PlaydateCollisionResponse;
    }

    interface PlaydateGraphicsFont {
        /**
         * <p>Draws a string at the specified x, y coordinate using this particular font instance. (Compare to <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">playdate.graphics.drawText(text, x, y)</a>, which draws the string with whatever the "current font", as defined by <a href="https://sdk.play.date/2.5.0#f-graphics.setFont">playdate.graphics.setFont(font)</a>).</p>
         * </div>
         * <div class="paragraph">
         * <p>The optional <em>leadingAdjustment</em> may be used to modify the spacing between lines of text. Pass nil to use the default leading for the font.</p>
         * </div>
         * <div class="paragraph">
         * <p>Returns <code><em>width</em></code>, <code><em>height</em></code>, indicating the size in pixels of the drawn text.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * <code>font:drawText()</code> does not support inline styles like bold and italics. Instead use <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">playdate.graphics.drawText()</a>.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.drawText)
         */
        drawText(
            text: string,
            x: number,
            y: number,
            leadingAdjustment: number
        ): void;
        /**
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/graphics</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         * </div>
         * <div class="paragraph">
         * <p>Draws the string <em>text</em> aligned to the left, right, or centered on the <em>x</em> coordinate. Pass one of <em>kTextAlignment.left</em>, <em>kTextAlignment.center</em>, <em>kTextAlignment.right</em> for the <em>alignment</em> parameter. (Compare to <a href="https://sdk.play.date/2.5.0#f-graphics.drawTextAligned">playdate.graphics.drawTextAligned(text, x, y, alignment)</a>, which draws the string with the "current font", as defined by <a href="https://sdk.play.date/2.5.0#f-graphics.setFont">playdate.graphics.setFont(font)</a>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.drawTextAligned)
         */
        drawTextAligned(
            text: string,
            x: number,
            y: number,
            alignment: PlaydateTextAlignment,
            leadingAdjustment: number
        ): void;
        /**
         * <p>Returns the pixel height of this font.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.getHeight)
         */
        getHeight(): number;
        /**
         * <p>Returns the pixel width of the text when rendered with this font.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.getTextWidth)
         */
        getTextWidth(text: string): number;
        /**
         * <p>Sets the tracking of this font (spacing between letters), in pixels.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setTextTracking"><code>playdate-&gt;graphics-&gt;setTextTracking()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.setTracking)
         */
        setTracking(pixels: number): void;
        /**
         * <p>Returns the tracking of this font (spacing between letters), in pixels.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.getTextTracking"><code>playdate-&gt;graphics-&gt;getTextTracking()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.getTracking)
         */
        getTracking(): number;
        /**
         * <p>Sets the leading (spacing between lines) of this font, in pixels.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setTextLeading"><code>playdate-&gt;graphics-&gt;setTextLeading()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.setLeading)
         */
        setLeading(pixels: number): void;
        /**
         * <p>Returns the leading (spacing between lines) of this font, in pixels.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.getLeading)
         */
        getLeading(): number;
        /**
         * <p>Returns the <a href="https://sdk.play.date/2.5.0#C-graphics.image"><code>playdate.graphics.image</code></a> containing the requested glyph. <em>character</em> can either be a string or a unicode codepoint number.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.font.getGlyph)
         */
        getGlyph(character: string): PlaydateGraphicsImage;
    }

    interface PlaydateGraphicsVideo {
        /**
         * <p>Returns the width and height of the video as multiple vlaues (<em>width</em>, <em>height</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.video.getSize)
         */
        getSize(): [number, number];
        /**
         * <p>Returns the number of frames in the video.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.video.getFrameCount)
         */
        getFrameCount(): number;
        /**
         * <p>Returns the number of frames per second of the video source. This number is simply for record-keeping, it is not used internally—​the game code is responsible for figuring out which frame to show when.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.video.getFrameRate)
         */
        getFrameRate(): number;
        /**
         * <p>Sets the given image to the video render context. Future <code>video:renderFrame()</code> calls will draw into this image.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.video.setContext)
         */
        setContext(image: PlaydateGraphicsImage): void;
        /**
         * <p>Returns the image into which the video will be rendered, creating it if needed.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.video.getContext)
         */
        getContext(): PlaydateGraphicsImage;
        /**
         * <p>Sets the display framebuffer as the video’s render context.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.video.useScreenContext)
         */
        useScreenContext(): void;
        /**
         * <p>Draws the given frame into the video’s render context.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.video.renderFrame)
         */
        renderFrame(number: number): void;
    }

    namespace keyboard {
        /**
         * <p>Opens the keyboard, taking over input focus.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>text</em>, if provided, will be used to set the initial text value of the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.show)
         *
         * @noSelf
         */
        export function show(text: string): void;

        /**
         * <p>Hides the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-keyboard.hide)
         *
         * @noSelf
         */
        export function hide(): void;

        /**
         * <p><em>behavior</em> should be one of the constants <em>playdate.keyboard.kCapitalizationNormal</em>, <em>playdate.keyboard.kCapitalizationWords</em>, or <em>playdate.keyboard.kCapitalizationSentences</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>In the case of <em>playdate.keyboard.kCapitalizationWords</em>, the keyboard selection will automatically move to the upper case column after a space is entered. For <em>playdate.keyboard.kCapitalizationSentences</em> the selection will automatically move to the upper case column after a period and a space have been entered.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.setCapitalizationBehavior)
         *
         * @noSelf
         */
        export function setCapitalizationBehavior(
            behavior: PlaydateCapitalizationBehavior
        ): void;

        /**
         * <p>Returns the current x location of the left edge of the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.left)
         *
         * @noSelf
         */
        export function left(): number;

        /**
         * <p>Returns the pixel width of the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.width)
         *
         * @noSelf
         */
        export function width(): number;

        /**
         * <p>Returns true if the keyboard is currently being shown.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.isVisible)
         *
         * @noSelf
         */
        export function isVisible(): boolean;

        /**
         * <p>If set, this function will be called when the keyboard is finished the opening animation.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-keyboard.keyboardDidShowCallback)
         *
         * @noSelf
         */
        export function keyboardDidShowCallback(): void;

        /**
         * <p>If set, this function will be called when the keyboard has finished the hide animation.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-keyboard.keyboardDidHideCallback)
         *
         * @noSelf
         */
        export function keyboardDidHideCallback(): void;

        /**
         * <p>If set, this function will be called when the keyboard starts to close. A Boolean argument will be passed to the callback, <code>true</code> if the user selected "OK" close the keyboard, <code>false</code> otherwise.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-keyboard.keyboardWillHideCallback)
         *
         * @noSelf
         */
        export function keyboardWillHideCallback(answer: boolean): void;

        /**
         * <p>If set, this function is called as the keyboard animates open or closed. Provided as a way to sync animations with the keyboard movement.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-keyboard.keyboardAnimatingCallback)
         *
         * @noSelf
         */
        export function keyboardAnimatingCallback(): void;

        /**
         * <p>If set, this function will be called every time a character is entered or deleted.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-keyboard.textChangedCallback)
         *
         * @noSelf
         */
        export function textChangedCallback(): void;
    }

    namespace math {
        /**
         * <p>Returns a number that is the linear interpolation between <em>min</em> and <em>max</em> based on <em>t</em>, where <em>t = 0.0</em> will return <em>min</em> and <em>t = 1.0</em> will return <em>max</em>.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * You must import <em>CoreLibs/math</em> to use this function.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-math.lerp)
         *
         * @noSelf
         */
        export function lerp(min: number, max: number, t: number): number;
    }

    namespace pathfinder {
        namespace graph {
            /**
             * <p>Returns a new empty <a href="https://sdk.play.date/2.5.0#C-playdate.pathfinder.graph">playdate.pathfinder.graph</a> object.</p>
             * </div>
             * <div class="paragraph">
             * <p>If <code>nodeCount</code> is supplied, that number of nodes will be allocated and added to the graph. Their IDs will be set from 1 to <code>nodeCount</code>.</p>
             * </div>
             * <div class="paragraph">
             * <p><code>coordinates</code>, if supplied, should be a table containing tables of x, y values, indexed by node IDs. For example, <code>{{10, 10}, {50, 30}, {20, 100}, {100, 120}, {160, 130}}</code>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-pathfinder.graph.new)
             *
             * @noSelf
             */
            function _new(
                nodeCount: number,
                coordinates: [number, number][]
            ): PlaydatePathfinderGraph;

            export { _new as new };

            /**
             * <p>Convenience function that returns a new <a href="https://sdk.play.date/2.5.0#C-playdate.pathfinder.graph">playdate.pathfinder.graph</a> object containing nodes for for each grid position, even if not connected to any other nodes. This allows for easier graph modification once the graph is generated. Weights for connections between nodes are set to 10 for horizontal and vertical connections and 14 for diagonal connections (if included), as this tends to produce nicer paths than using uniform weights. Nodes have their indexes set from 1 to <em>width</em> * <em>height</em>, and have their <em>x, y</em> values set appropriately for the node’s position.</p>
             * </div>
             * <div class="ulist">
             * <ul>
             * <li>
             * <p><em>width</em>: The width of the grid to be created.</p>
             * </li>
             * <li>
             * <p><em>height</em>: The height of the grid to be created.</p>
             * </li>
             * <li>
             * <p><em>allowDiagonals</em>: If true, diagonal connections will also be created.</p>
             * </li>
             * <li>
             * <p><em>includedNodes</em>: A one-dimensional array of length <em>width</em> * <em>height</em>. Each entry should be a 1 or a 0 to indicate nodes that should be connected to their neighbors and nodes that should not have any connections added. If not provided, all nodes will be connected to their neighbors.</p>
             * </li>
             * </ul>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-pathfinder.graph.new2DGrid)
             *
             * @noSelf
             */
            export function new2DGrid(
                width: number,
                height: number,
                allowDiagonals: boolean,
                includedNodes: (1 | 0)[]
            ): PlaydatePathfinderGraph;
        }
    }

    interface PlaydatePathfinderGraph {
        /**
         * <p>Creates a new <a href="https://sdk.play.date/2.5.0#C-playdate.pathfinder.node">playdate.pathfinder.node</a> and adds it to the graph.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>id</em>: id value for the new node.</p>
         * </li>
         * <li>
         * <p><em>x</em>: Optional x value for the node.</p>
         * </li>
         * <li>
         * <p><em>y</em>: Optional y value for the node.</p>
         * </li>
         * <li>
         * <p><em>connectedNodes</em>: Array of existing nodes to create connections to from the new node.</p>
         * </li>
         * <li>
         * <p><em>weights</em>: Array of weights for the new connections. Array must be the same length as <em>connectedNodes</em>. Weights affect the path the A* algorithm will solve for. A longer, lighter-weighted path will be chosen over a shorter heavier path, if available.</p>
         * </li>
         * <li>
         * <p><em>addReciprocalConnections</em>: If true, connections will also be added in the reverse direction for each node.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.addNewNode)
         */
        addNewNode(
            id: number,
            x: number,
            y: number,
            connectedNodes: PlaydatePathfinderNode[],
            weights: number[],
            addReciprocalConnections: boolean
        ): void;
        /**
         * <p>Creates <em>count</em> new nodes, adding them to the graph, and returns them in an array-style table. The new node’s <em>id_s will be assigned values 1 through _count</em>-1.</p>
         * </div>
         * <div class="paragraph">
         * <p>This method is useful to improve performance if many nodes need to be allocated at once rather than one at a time, for example when creating a new graph.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.addNewNodes)
         */
        addNewNodes(count: number): PlaydatePathfinderNode[];
        /**
         * <p>Adds an already-existing node to the graph. The node must have originally belonged to the same graph.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>node</em>: Node to be added to the graph.</p>
         * </li>
         * <li>
         * <p><em>connectedNodes</em>: Array of existing nodes to create connections to from the new node.</p>
         * </li>
         * <li>
         * <p><em>weights</em>: Array of weights for the new connections. Array must be the same length as <em>connectedNodes</em>. Weights affect the path the A* algorithm will solve for. A longer, lighter-weighted path will be chosen over a shorter heavier path, if available.</p>
         * </li>
         * <li>
         * <p><em>addReciprocalConnections</em>: If true, connections will also be added in the reverse direction for each connection added.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.addNode)
         */
        addNode(
            node: PlaydatePathfinderNode,
            connectedNodes: PlaydatePathfinderNode[],
            weights: number[],
            addReciprocalConnections: boolean
        ): void;
        /**
         * <p>Adds an array of already-existing nodes to the graph.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.addNodes)
         */
        addNodes(nodes: PlaydatePathfinderNode[]): void;
        /**
         * <p>Returns an array containing all nodes in the graph.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.allNodes)
         */
        allNodes(): PlaydatePathfinderNode[];
        /**
         * <p>Removes node from the graph. Also removes all connections to and from the node.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.removeNode)
         */
        removeNode(node: PlaydatePathfinderNode): void;
        /**
         * <p>Returns the first node found with coordinates matching <em>x, y</em>, after removing it from the graph and removing all connections to and from the node.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.removeNodeWithXY)
         */
        removeNodeWithXY(x: number, y: number): void;
        /**
         * <p>Returns the first node found with a matching <em>id</em>, after removing it from the graph and removing all connections to and from the node.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.removeNodeWithID)
         */
        removeNodeWithID(id: number): void;
        /**
         * <p>Returns the first node found in the graph with a matching <em>id</em>, or nil if no such node is found.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.nodeWithID)
         */
        nodeWithID(id: number): PlaydatePathfinderNode;
        /**
         * <p>Returns the first node found in the graph with matching <em>x</em> and <em>y</em> values, or nil if no such node is found.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.nodeWithXY)
         */
        nodeWithXY(x: number, y: number): PlaydatePathfinderNode;
        /**
         * <p><code>connections</code> should be a table of array-style tables. The keys of the outer table should correspond to node IDs, while the inner array should be a series if connecting node ID and weight combinations that will be assigned to that node. For example, <code>{[1]={2, 10, 3, 12}, [2]={1, 20}, [3]={1, 20, 2, 10}}</code> will create a connection from node ID 1 to node ID 2 with a weight of 10, and a connection to node ID 3 with a weight of 12, and so on for the other entries.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.addConnections)
         */
        addConnections(connections: Record<number, number[]>): void;
        /**
         * <p>Adds a connection from the node with <code>id</code> <code>fromNodeID</code> to the node with <code>id</code> <code>toNodeID</code> with a weight value of <code>weight</code>. Weights affect the path the A* algorithm will solve for. A longer, lighter-weighted path will be chosen over a shorter heavier path, if available. If <code>addReciprocalConnection</code> is true, the reverse connection will also be added.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.addConnectionToNodeWithID)
         */
        addConnectionToNodeWithID(
            fromNodeID: number,
            toNodeID: number,
            weight: number,
            addReciprocalConnection: boolean
        ): void;
        /**
         * <p>Removes all connections from all nodes in the graph.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.removeAllConnections)
         */
        removeAllConnections(): void;
        /**
         * <p>Removes all connections from the matching node.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <code>removeIncoming</code> is true, all connections from other nodes to the calling node are also removed. False by default. Please note: this can signficantly increase the time this function takes as it requires a full search of the graph - O(1) vs O(n)).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.removeAllConnectionsFromNodeWithID)
         */
        removeAllConnectionsFromNodeWithID(
            id: number,
            removeIncoming: boolean
        ): void;
        /**
         * <p>Returns an array of nodes representing the path from <em>startNode</em> to <em>goalNode</em>, or <em>nil</em> if no path can be found.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>heuristicFunction</em>: If provided, this function should be of the form <em>function(startNode, goalNode)</em> and should return an integer value estimate or underestimate of the distance from <em>startNode</em> to <em>goalNode</em>. If not provided, a manhattan distance function will be used to calculate the estimate. This requires that the <em>x, y</em> values of the nodes in the graph have been set properly.</p>
         * </li>
         * <li>
         * <p><em>findPathToGoalAdjacentNodes</em>: If true, a path will be found to any node adjacent to the goal node, based on the <em>x, y</em> values of those nodes and the goal node. This does not rely on connections between adjacent nodes and  the goal node, which can be entirely disconnected from the rest of the graph.</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.findPath)
         */
        findPath(
            startNode: PlaydatePathfinderNode,
            goalNode: PlaydatePathfinderNode,
            heuristicFunction: (
                startNode: PlaydatePathfinderNode,
                goalNode: PlaydatePathfinderNode
            ) => number,
            findPathToGoalAdjacentNodes: boolean
        ): PlaydatePathfinderNode[] | null;
        /**
         * <p>Works the same as <a href="https://sdk.play.date/2.5.0#m-pathfinder.graph.findPath">findPath</a>, but looks up nodes to find a path between using startNodeID and goalNodeID and returns a list of nodeIDs rather than the nodes themselves.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.findPathWithIDs)
         */
        findPathWithIDs(
            startNodeID: number,
            goalNodeID: number,
            heuristicFunction: (
                startNode: PlaydatePathfinderNode,
                goalNode: PlaydatePathfinderNode
            ) => number,
            findPathToGoalAdjacentNodes: boolean
        ): PlaydatePathfinderNode[] | null;
        /**
         * <p>Sets the matching node’s <code>x</code> and <code>y</code> values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-pathfinder.graph.setXYForNodeWithID)
         */
        setXYForNodeWithID(id: number, x: number, y: number): void;
    }

    namespace simulator {
        /**
         * <p>Writes an image to a PNG file at the path specified. Only available on the Simulator.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * <em>path</em> represents a path on your development computer, not the Playdate filesystem. It’s recommended you prefix your path with <code>~/</code> to ensure you are writing to a writeable directory, for example, <code>~/myImageFile.png</code>. Please include the <code>.png</code> file extension in your path name. Any directories in your path must already exist on your development computer in order for the file to be written.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-simulator.writeToFile)
         *
         * @noSelf
         */
        export function writeToFile(
            image: PlaydateGraphicsImage,
            path: string
        ): void;

        /**
         * <p>Quits the Playdate Simulator app.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-simulator.exit)
         *
         * @noSelf
         */
        export function exit(): void;

        /**
         * <p>Returns the contents of the URL <em>url</em> as a string.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-simulator.getURL)
         *
         * @noSelf
         */
        export function getURL(url: string): string;
    }

    namespace sound {
        /**
         * <p>Returns the sample rate of the audio system (44100). The sample rate is determined by the hardware, and is not currently mutable.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.getSampleRate)
         *
         * @noSelf
         */
        export function getSampleRate(): number;

        /**
         * <p>Returns a list of all sources currently playing.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.playingSources)
         *
         * @noSelf
         */
        export function playingSources(): PlaydateAudioSource[];

        /**
         * <p>Adds the given <a href="https://sdk.play.date/2.5.0#C-sound.effect">playdate.sound.effect</a> to the default sound channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.addEffect)
         *
         * @noSelf
         */
        export function addEffect(effect: PlaydateSoundEffect): void;

        /**
         * <p>Removes the given effect from the default sound channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.removeEffect)
         *
         * @noSelf
         */
        export function removeEffect(effect: PlaydateSoundEffect): void;

        /**
         * <p>Returns a pair of booleans (headphone, mic) indicating whether headphones are plugged in, and if so whether they have a microphone attached. If <em>changeCallback</em> is a function, it will be called every time the headphone state changes, until it is cleared by calling <code>playdate.sound.getHeadphoneState(nil)</code>. If a change callback is set, the audio does <strong>not</strong> automatically switch from speaker to headphones when headphones are plugged in (and vice versa), so the callback should use <code>playdate.sound.setOutputsActive()</code> to change the output if needed. The callback is passed two booleans, matching the return values from <code>getHeadphoneState()</code>: the first <code>true</code> if headphones are connect, and the second <code>true</code> if the headphones have a microphone.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-sound.getHeadphoneState"><code>playdate-&gt;sound-&gt;getHeadphoneState()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.getHeadphoneState)
         *
         * @noSelf
         */
        export function getHeadphoneState(
            changeCallback: ((headphone: boolean, mic: boolean) => void) | null
        ): [boolean, boolean];

        /**
         * <p>Forces sound to be played on the headphones or on the speaker, regardless of whether headphones are plugged in or not. (With the caveat that it is not actually possible to play on the headphones if they’re not plugged in.) This function has no effect in the Simulator.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-sound.setOutputsActive"><code>playdate-&gt;sound-&gt;setOutputsActive()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.setOutputsActive)
         *
         * @noSelf
         */
        export function setOutputsActive(
            headphones: boolean,
            speaker: boolean
        ): void;

        /**
         * <p>Returns the current time, in seconds, as measured by the audio device. The audio device uses its own time base in order to provide accurate timing.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-sound.getCurrentTime"><code>playdate-&gt;sound-&gt;getCurrentTime()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.getCurrentTime)
         *
         * @noSelf
         */
        export function getCurrentTime(): number;

        /**
         * <p>Resets the audio output device time counter.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.resetTime)
         *
         * @noSelf
         */
        export function resetTime(): void;

        namespace sampleplayer {
            /**
             * <p>Returns a new playdate.sound.sampleplayer object, with the sound data loaded in memory. If the sample can’t be loaded, the function returns nil and a second value containing the error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sampleplayer.new)
             *
             * @noSelf
             */
            function _new(path: string): PlaydateSoundSampleplayer;

            export { _new as new };

            /**
             * <p>Returns a new playdate.sound.sampleplayer object for playing the given <a href="https://sdk.play.date/2.5.0#C-sound.sample">sample</a>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sampleplayer.new-1)
             *
             * @noSelf
             */
            function _new(
                sample: PlaydateSoundSample
            ): PlaydateSoundSampleplayer;

            export { _new as new };
        }

        namespace fileplayer {
            /**
             * <p>Returns a fileplayer object, which can stream samples from disk. The file to play is set with the <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.load">playdate.sound.fileplayer:load()</a> function.</p>
             * </div>
             * <div class="paragraph">
             * <p>If given, <em>buffersize</em> specifies the size in seconds of the fileplayer’s data buffer. A shorter value reduces the latency of a <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setOffset">playdate.sound.fileplayer:setOffset()</a> call, but increases the chance of a buffer underrun.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.fileplayer.new-empty)
             *
             * @noSelf
             */
            function _new(buffersize: number): PlaydateSoundFileplayer;

            export { _new as new };

            /**
             * <p>Returns a fileplayer object for streaming samples from the file at <em>path</em>. Note that the file isn’t loaded until <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.play">playdate.sound.fileplayer:play()</a> or <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setBufferSize">playdate.sound.fileplayer:setBufferSize()</a> is called, in order to reduce initialization overhead.</p>
             * </div>
             * <div class="paragraph">
             * <p>If given, <em>buffersize</em> specifies the size in seconds of the fileplayer’s data buffer. A shorter value reduces the latency of a <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setOffset">playdate.sound.fileplayer:setOffset()</a> call, but increases the chance of a buffer underrun.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.fileplayer.new)
             *
             * @noSelf
             */
            function _new(
                path: string,
                buffersize: number
            ): PlaydateSoundFileplayer;

            export { _new as new };
        }

        namespace sample {
            /**
             * <p>Returns a new playdate.sound.sample object, with the sound data loaded in memory. If the sample can’t be loaded, the function returns nil and a second value containing the error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sample.new-path)
             *
             * @noSelf
             */
            function _new(path: string): PlaydateSoundSample;

            export { _new as new };

            /**
             * <p>Returns a new playdate.sound.sample object, with a buffer size of <em>seconds</em> in the given format. If <em>format</em> is not specified, it defaults to <a href="https://sdk.play.date/2.5.0#m-sound.sample.getFormat">playdate.sound.kFormat16bitStereo</a>. When used with playdate.sound.sample:load(), this allows you to swap in a different sample without re-allocating the buffer, which could lead to memory fragmentation.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sample.new)
             *
             * @noSelf
             */
            function _new(
                seconds: number,
                format: PlaydateSoundFormat = PlaydateSoundFormat['16bitStereo']
            ): PlaydateSoundSample;

            export { _new as new };
        }

        namespace channel {
            /**
             * <p>Returns a new channel object and adds it to the global list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.channel.new)
             *
             * @noSelf
             */
            function _new(): PlaydateSoundChannel;

            export { _new as new };
        }

        namespace synth {
            /**
             * <p>Returns a new synth object to play a waveform or wavetable. See <a href="https://sdk.play.date/2.5.0#m-sound.synth.setWaveform">playdate.sound.synth:setWaveform</a> for <code>waveform</code> values.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.synth.new_w)
             *
             * @noSelf
             */
            function _new(waveform: PlaydateSoundWave): PlaydateSoundSynth;

            export { _new as new };

            /**
             * <p>Returns a new synth object to play a <a href="https://sdk.play.date/2.5.0#C-sound.sample">Sample</a>. An optional sustain region (measured in samples) defines a loop to play while the note is on. Sample data must be uncompressed PCM, not ADPCM.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.synth.new)
             *
             * @noSelf
             */
            function _new(
                sample: PlaydateSoundSample,
                sustainStart: number,
                sustainEnd: number
            ): PlaydateSoundSynth;

            export { _new as new };
        }

        namespace lfo {
            /**
             * <p>Returns a new LFO object, which can be used to modulate sounds. See <a href="https://sdk.play.date/2.5.0#m-sound.lfo.setType">playdate.sound.lfo:setType()</a> for LFO types.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.lfo.new)
             *
             * @noSelf
             */
            function _new(type: PlaydateSoundLfoType): PlaydateSoundLfo;

            export { _new as new };
        }

        namespace envelope {
            /**
             * <p>Creates a new envelope with the given (optional) parameters.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.envelope.new)
             *
             * @noSelf
             */
            function _new(
                attack: number,
                decay: number,
                sustain: number,
                release: number
            ): PlaydateSoundEnvelope;

            export { _new as new };
        }

        namespace bitcrusher {
            /**
             * <p>Creates a new bitcrusher filter.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.bitcrusher.new)
             *
             * @noSelf
             */
            function _new(): PlaydateSoundBitcrusher;

            export { _new as new };
        }

        namespace ringmod {
            /**
             * <p>Creates a new ring modulator filter.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.ringmod.new)
             *
             * @noSelf
             */
            function _new(): PlaydateSoundRingmod;

            export { _new as new };
        }

        namespace onepolefilter {
            /**
             * <p>Returns a new one pole filter.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.onepolefilter.new)
             *
             * @noSelf
             */
            function _new(): PlaydateSoundOnepolefilter;

            export { _new as new };
        }

        namespace twopolefilter {
            /**
             * <p>Creates a new two pole IIR filter of the given <em>type</em>:</p>
             * </div>
             * <div class="ulist">
             * <ul>
             * <li>
             * <p><a id="k-sound.twopolefilter.kFilterLowPass"></a> <em class="constant">playdate.sound.kFilterLowPass</em> (or the string "lowpass" or "lopass")</p>
             * </li>
             * <li>
             * <p><a id="k-sound.twopolefilter.kFilterHighPass"></a> <em class="constant">playdate.sound.kFilterHighPass</em> (or "highpass" or "hipass")</p>
             * </li>
             * <li>
             * <p><a id="k-sound.twopolefilter.kFilterBandPass"></a> <em class="constant">playdate.sound.kFilterBandPass</em> (or "bandpass")</p>
             * </li>
             * <li>
             * <p><a id="k-sound.twopolefilter.kFilterNotch"></a> <em class="constant">playdate.sound.kFilterNotch</em> (or "notch")</p>
             * </li>
             * <li>
             * <p><a id="k-sound.twopolefilter.kFilterPEQ"></a> <em class="constant">playdate.sound.kFilterPEQ</em> (or "peq")</p>
             * </li>
             * <li>
             * <p><a id="k-sound.twopolefilter.kFilterLowShelf"></a> <em class="constant">playdate.sound.kFilterLowShelf</em> (or "lowshelf" or "loshelf")</p>
             * </li>
             * <li>
             * <p><a id="k-sound.twopolefilter.kFilterHighShelf"></a> <em class="constant">playdate.sound.kFilterHighShelf</em> (or "highshelf" or "hishelf")</p>
             * </li>
             * </ul>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.twopolefilter.new)
             *
             * @noSelf
             */
            function _new(
                type: PlaydateSoundTwoPoleFilterType
            ): PlaydateSoundTwopolefilter;

            export { _new as new };
        }

        namespace overdrive {
            /**
             * <p>Creates a new overdrive effect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.overdrive.new)
             *
             * @noSelf
             */
            function _new(): PlaydateSoundOverdrive;

            export { _new as new };
        }

        namespace delayline {
            /**
             * <p>Creates a new delay line effect, with the given length (in seconds).</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.delayline.new)
             *
             * @noSelf
             */
            function _new(length: number): PlaydateSoundDelayline;

            export { _new as new };
        }

        namespace sequence {
            /**
             * <p>Creates a new sound sequence. If <code>midi_path</code> is given, it attempts to load data from the midi file into the sequence.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sequence.new)
             *
             * @noSelf
             */
            function _new(midi_path: string): PlaydateSoundSequence;

            export { _new as new };
        }

        namespace track {
            /**
             * <p>Creates a new <code>playdate.sound.track</code> object.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.track.new)
             *
             * @noSelf
             */
            function _new(): PlaydateSoundTrack;

            export { _new as new };
        }

        namespace instrument {
            /**
             * <p>Creates a new <code>playdate.sound.instrument</code> object. If <code>synth</code> is given, adds it as a voice for the instrument.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.instrument.new)
             *
             * @noSelf
             */
            function _new(synth: PlaydateSoundSynth): PlaydateSoundInstrument;

            export { _new as new };
        }

        namespace controlsignal {
            /**
             * <p>Creates a new control signal object, for automating effect parameters, channel pan and level, etc.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.controlsignal.new)
             *
             * @noSelf
             */
            function _new(): PlaydateSoundControlsignal;

            export { _new as new };
        }

        namespace micinput {
            /**
             * <p><code>buffer</code> should be a <a href="https://sdk.play.date/2.5.0#C-sound.sample">Sample</a> created with the following code, with <em>secondsToRecord</em> replaced by a number specifying the record duration:</p>
             * </div>
             * <div class="listingblock">
             * <div class="content">
             * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">buffer</span> = playdate.sound.sample.new(_secondsToRecord_, playdate.sound.kFormat16bitMono)</code></pre>
             * </div>
             * </div>
             * <div class="paragraph">
             * <p><code>completionCallback</code> is a function called at the end of recording, when the buffer is full. It has one argument, the recorded sample. To override the device’s headset detection and force recording from either the internal mic or a headset mic or line in connected to a headset splitter, first call <a href="https://sdk.play.date/2.5.0#f-sound.micinput.startListening">playdate.sound.micinput.startListening()</a> with the required source. <code>recordToSample()</code> returns <code>true</code> on success, <code>false</code> on error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.recordToSample)
             *
             * @noSelf
             */
            export function recordToSample(
                buffer: PlaydateSoundSample,
                completionCallback: (sample: PlaydateSoundSample) => void
            ): boolean;

            /**
             * <p>Stops a sample recording started with recordToSample, if it hasn’t already reached the end of the buffer. The recording’s completion callback is called immediately.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.stopRecording)
             *
             * @noSelf
             */
            export function stopRecording(): void;

            /**
             * <p>Starts monitoring the microphone input level. The optional <em>source</em> argument of "headset" or "device" causes the mic input to record from the given source. If no source is given, it uses the headset detection circuit to determine which source to use. The function returns the pair <code>true</code> and a string indicating which source it’s recording from on success, or <code>false</code> on error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.startListening)
             *
             * @noSelf
             */
            export function startListening(
                source: 'headset' | 'device'
            ): [true, 'headset' | 'device'] | [false, string];

            /**
             * <p>Stops monitoring the microphone input level.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.stopListening)
             *
             * @noSelf
             */
            export function stopListening(): void;

            /**
             * <p>Returns the current microphone input level, a value from 0.0 (quietest) to 1.0 (loudest).</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.getLevel)
             *
             * @noSelf
             */
            export function getLevel(): number;

            /**
             * <p>Returns the current microphone input source, either "headset" or "device".</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.getSource)
             *
             * @noSelf
             */
            export function getSource(): 'headset' | 'device';
        }
    }

    interface PlaydateSoundSampleplayer {
        /**
         * <p>Returns a new playdate.sound.sampleplayer with the same sample, volume, and rate as the given sampleplayer.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.copy)
         */
        copy(): PlaydateSoundSampleplayer;
        /**
         * <p>Starts playing the sample. If <em>repeatCount</em> is greater than one, it loops the given number of times. If zero, it loops endlessly until it is stopped with <a href="https://sdk.play.date/2.5.0#m-sound.sampleplayer.stop">playdate.sound.sampleplayer:stop()</a>. If <em>rate</em> is set, the sample will be played at the given rate instead of the rate previous set with <a href="https://sdk.play.date/2.5.0#m-sound.sampleplayer.setRate">playdate.sound.sampleplayer.setRate()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.play)
         */
        play(repeatCount: number, rate: number): void;
        /**
         * <p>Schedules the sound for playing at device time <em>when</em>. If <em>vol</em> is specified, the sample will be played at level <em>vol</em> (with optional separate right channel volume <em>rightvol</em>), otherwise it plays at the volume set by <a href="https://sdk.play.date/2.5.0#m-sound.sampleplayer.setVolume">playdate.sound.sampleplayer.setVolume()</a>. Note that the <em>when</em> argument is an offset in the audio device’s time scale, as returned by <a href="https://sdk.play.date/2.5.0#f-sound.getCurrentTime">playdate.sound.getCurrentTime()</a>; it is <strong>not</strong> relative to the current time! If <em>when</em> is less than the current audio time, the sample is played immediately. If <em>rate</em> is set, the sample will be played at the given rate instead of the rate previously set with <a href="https://sdk.play.date/2.5.0#m-sound.sampleplayer.setRate">playdate.sound.sampleplayer.setRate()</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Only one event can be queued at a time. If <code>playAt()</code> is called while another event is queued, it will overwrite it with the new values.</p>
         * </div>
         * <div class="paragraph">
         * <p>The function returns true if the sample was successfully added to the sound channel, otherwise false (i.e., if the channel is full).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.playAt)
         */
        playAt(
            when: number,
            vol: number,
            rightvol: number,
            rate: number
        ): boolean;
        /**
         * <p>Sets the playback volume (0.0 - 1.0) for left and right channels. If the optional <em>right</em> argument is omitted, it is the same as <em>left</em>. If the sampleplayer is currently playing using the default volume (that is, it wasn’t triggered by <code>playAt()</code> with a volume given) it also changes the volume of the playing sample.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setVolume)
         */
        setVolume(left: number, right: number): void;
        /**
         * <p>Returns the playback volume for the sampleplayer, a single value for mono sources or a pair of values (left, right) for stereo sources.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.getVolume)
         */
        getVolume(): number | [number, number];
        /**
         * <p>Sets a function to be called every time the sample loops. The sample object is passed to this function as the first argument, and the optional <em>arg</em> argument is passed as the second.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setLoopCallback)
         */
        setLoopCallback<TArgument>(
            callback: (sample: PlaydateSoundSample, arg: TArgument) => void,
            arg: TArgument
        ): void;
        /**
         * <p>Sets the range of the sample to play. <em>start</em> and <em>end</em> are frame offsets from the beginning of the sample.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setPlayRange)
         */
        setPlayRange(start: number, end: number): void;
        /**
         * <p>Pauses or resumes playback.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setPaused)
         */
        setPaused(flag: boolean): void;
        /**
         * <p>Returns a boolean indicating whether the sample is playing.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.isPlaying)
         */
        isPlaying(): boolean;
        /**
         * <p>Stops playing the sample.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.stop)
         */
        stop(): void;
        /**
         * <p>Sets a function to be called when playback has completed. The sample object is passed to this function as the first argument, and the optional <em>arg</em> argument is passed as the second.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setFinishCallback)
         */
        setFinishCallback<TArgument>(
            func: (sample: PlaydateSoundSample, arg: TArgument) => void,
            arg: TArgument
        ): void;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-sound.sample">sample</a> to be played.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setSample)
         */
        setSample(sample: PlaydateSoundSample): void;
        /**
         * <p>Gets the <a href="https://sdk.play.date/2.5.0#C-sound.sample">sample</a> to be played.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.getSample)
         */
        getSample(): PlaydateSoundSample;
        /**
         * <p>Returns the length of the sampleplayer’s sample, in seconds. Length is not scaled by playback rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.getLength)
         */
        getLength(): number;
        /**
         * <p>Sets the playback rate for the sample. 1.0 is normal speed, 0.5 is down an octave, 2.0 is up an octave, etc. Sampleplayers can also play samples backwards, by setting a negative rate; note, however, this does not work with ADPCM-encoded files.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setRate)
         */
        setRate(rate: number): void;
        /**
         * <p>Returns the playback rate for the sample.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.getRate)
         */
        getRate(): number;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to use as a rate modulator, added to the rate set with <a href="https://sdk.play.date/2.5.0#m-sound.sampleplayer.setRate">playdate.sound.sampleplayer:setRate()</a>.  Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setRateMod)
         */
        setRateMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the current offset of the sampleplayer, in seconds. This value is not adjusted for rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.setOffset)
         */
        setOffset(seconds: number): void;
        /**
         * <p>Returns the current offset of the sampleplayer, in seconds. This value is not adjusted for rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sampleplayer.getOffset)
         */
        getOffset(): number;
    }

    interface PlaydateSoundFileplayer {
        /**
         * <p>Instructs the fileplayer to load the file at <em>path</em> when <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.play">play()</a> is called on it. The fileplayer must not be playing when this function is called. The fileplayer’s play offset is reset to the beginning of the file, and its loop range is cleared.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.load)
         */
        load(path: string): void;
        /**
         * <p>Opens and starts playing the file, first creating and filling a 1/4 second playback buffer if a buffer size hasn’t been set yet.</p>
         * </div>
         * <div class="paragraph">
         * <p>If repeatCount is set, playback repeats when it reaches the end of the file or the end of the <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setLoopRange">loop range</a> if one is set. After the loop has run <em>repeatCount</em> times, it continues playing to the end of the file. A <em>repeatCount</em> of zero loops endlessly. If repeatCount is not set, the file plays once.</p>
         * </div>
         * <div class="paragraph">
         * <p>The function returns true if the file was successfully opened and the fileplayer added to the sound channel, otherwise false and a string describing the error.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.play)
         */
        play(repeatCount: number): true | [false, string];
        /**
         * <p>Stops playing the file, resets the playback offset to zero, and calls the finish callback.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.stop)
         */
        stop(): void;
        /**
         * <p>Stops playing the file. A subsequent play() call resumes playback from where it was paused.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.pause)
         */
        pause(): void;
        /**
         * <p>Returns a boolean indicating whether the fileplayer is playing.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.isPlaying)
         */
        isPlaying(): boolean;
        /**
         * <p>Returns the length, in seconds, of the audio file.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.getLength)
         */
        getLength(): number;
        /**
         * <p>Sets a function to be called when playback has completed. The fileplayer is passed as the first argument to <em>func</em>. The optional argument <em>arg</em> is passed as the second.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setFinishCallback)
         */
        setFinishCallback<TArgument>(
            func: (fileplayer: PlaydateSoundFileplayer, arg: TArgument) => void,
            arg: TArgument
        ): void;
        /**
         * <p>Returns the fileplayer’s underrun flag, indicating that the player ran out of data. This can be checked in the finish callback function to check for an underrun error.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.didUnderrun)
         */
        didUnderrun(): boolean;
        /**
         * <p>By default, the fileplayer stops playback if it can’t provide data fast enough. Setting the flag to <em>false</em> tells the fileplayer to restart playback (after an audible stutter) as soon as data is available.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setStopOnUnderrun)
         */
        setStopOnUnderrun(flag: boolean): void;
        /**
         * <p>Provides a way to loop a portion of an audio file. In the following code:</p>
         * </div>
         * <div class="listingblock">
         * <div class="content">
         * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">fp</span> = playdate.sound.fileplayer.new( <span class="string"><span class="delimiter">"</span><span class="content">myaudiofile</span><span class="delimiter">"</span></span> )
         * fp:setLoopRange( <span class="integer">10</span>, <span class="integer">20</span> )
         * fp:play( <span class="integer">3</span> )</code></pre>
         * </div>
         * </div>
         * <div class="paragraph">
         * <p>…the fileplayer will start playing from the beginning of the audio file, loop the 10-20 second range three times, and then stop playing.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>start</em> and <em>end</em> are specified in seconds. If <em>end</em> is omitted, the end of the file is used. If the function <em>loopCallback</em> is provided, it is called every time the player loops, with the fileplayer as the first argument and the optional <em>arg</em> argument as the second.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * The <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.play">fileplayer:play([repeatCount])</a> call needs to be invoked with a <em>repeatCount</em> value of 0 (infinite looping), or 2 or greater in order for the looping action to happen.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setLoopRange)
         */
        setLoopRange<TArgument>(
            start: number,
            end: number,
            loopCallback: (
                fileplayer: PlaydateSoundFileplayer,
                arg: TArgument
            ) => void,
            arg: TArgument
        ): void;
        /**
         * <p>Sets a function to be called every time the fileplayer loops. The fileplayer object is passed to this function as the first argument, and <em>arg</em> as the second.</p>
         * </div>
         * <div class="admonitionblock important">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Important</div>
         * </td>
         * <td class="content">
         * The <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.play">fileplayer:play([repeatCount])</a> call needs to be invoked with a <em>repeatCount</em> value of 0 (infinite looping), or 2 or greater in order for the loop callback to be invoked.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setLoopCallback)
         */
        setLoopCallback<TArgument>(
            callback: (
                fileplayer: PlaydateSoundFileplayer,
                arg: TArgument
            ) => void,
            arg: TArgument
        ): void;
        /**
         * <p>Sets the buffer size for the fileplayer, in seconds. Larger buffers protect against buffer underruns, but consume more memory. Calling this function also fills the output buffer if a source file has been set. On success, the function returns <em>true</em>; otherwise it returns <em>false</em> and a string describing the error.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setBufferSize)
         */
        setBufferSize(seconds: number): true | [false, string];
        /**
         * <p>Sets the playback rate for the file. 1.0 is normal speed, 0.5 is down an octave, 2.0 is up an octave, etc. Unlike sampleplayers, fileplayers can’t play in reverse (i.e., rate &lt; 0).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setRate)
         */
        setRate(rate: number): void;
        /**
         * <p>Returns the playback rate for the file. as set with <code>setRate()</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.getRate)
         */
        getRate(): number;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to use as a rate modulator, added to the rate set with <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setRate">playdate.sound.fileplayer:setRate()</a>.  Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setRateMod)
         */
        setRateMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the playback volume (0.0 - 1.0). If a single value is passed in, both left side and right side volume are set to the given value. If two values are given, volumes are set separately. The optional <em>fadeSeconds</em> specifies the time it takes to fade from the current volume to the specified volume, in seconds. If the function <em>fadeCallback</em> is given, it is called when the volume fade has completed. The fileplayer object is passed as the first argument to the callback, and the optional <em>arg</em> argument is passed as the second.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setVolume)
         */
        setVolume<TArgument>(
            left: number,
            right: number,
            fadeSeconds: number,
            fadeCallback: (
                fileplayer: PlaydateSoundFileplayer,
                arg: TArgument
            ) => void,
            arg: TArgument
        ): void;
        /**
         * <p>Returns the current volume for the fileplayer, a single value for mono sources or a pair of values (left, right) for stereo sources.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.getVolume)
         */
        getVolume(): number | [number, number];
        /**
         * <p>Sets the current offset of the fileplayer, in seconds. This value is not adjusted for rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.setOffset)
         */
        setOffset(seconds: number): void;
        /**
         * <p>Returns the current offset of the fileplayer, in seconds. This value is not adjusted for rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.fileplayer.getOffset)
         */
        getOffset(): number;
    }

    interface PlaydateSoundSample {
        /**
         * <p>Returns a new subsample containing a subrange of the given sample. Offset values are in frames, not bytes.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.getSubsample)
         */
        getSubsample(
            startOffset: number,
            endOffset: number
        ): PlaydateSoundSample;
        /**
         * <p>Loads the sound data from the file at <em>path</em> into an existing sample buffer. If there is no file at <em>path</em>, the function returns nil.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.load)
         */
        load(path: string): void;
        /**
         * <p>If the sample is ADPCM compressed, decompresses the sample data to 16-bit PCM data. This increases the sample’s memory footprint by 4x and does not affect the quality in any way, but it is necessary if you want to use the sample in a synth or play the file backwards. Returns <code>true</code> if successful, or <code>false</code> and an error message as a second return value if decompression failed.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.decompress)
         */
        decompress(): true | [false, string];
        /**
         * <p>Returns the sample rate as an integer, such as 44100 or 22050.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.getSampleRate)
         */
        getSampleRate(): number;
        /**
         * <p>Returns the format of the sample, one of</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>playdate.sound.kFormat8bitMono</em></p>
         * </li>
         * <li>
         * <p><em>playdate.sound.kFormat8bitStereo</em></p>
         * </li>
         * <li>
         * <p><em>playdate.sound.kFormat16bitMono</em></p>
         * </li>
         * <li>
         * <p><em>playdate.sound.kFormat16bitStereo</em></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.getFormat)
         */
        getFormat(): PlaydateSoundFormat;
        /**
         * <p>Returns two values, the length of the available sample data and the size of the allocated buffer. Both values are measured in seconds. For a sample loaded from disk, these will be the same; for a sample used for recording, the available data may be less than the allocated size.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.getLength)
         */
        getLength(): [number, number];
        /**
         * <p>Convenience function: Creates a new sampleplayer for the sample and passes the function arguments to its <a href="https://sdk.play.date/2.5.0#m-sound.sampleplayer.play">play</a> function.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.play)
         */
        play(repeatCount: number, rate: number): PlaydateSoundSampleplayer;
        /**
         * <p>Convenience function: Creates a new sampleplayer for the sample and passes the function arguments to its <a href="https://sdk.play.date/2.5.0#m-sound.sampleplayer.playAt">playAt</a> function.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.playAt)
         */
        playAt(
            when: number,
            vol: number,
            rightvol: number,
            rate: number
        ): PlaydateSoundSampleplayer;
        /**
         * <p>Saves the sample to the given file. If <code>filename</code> has a <code>.wav</code> extension it will be saved in WAV format (and be unreadable by the Playdate sound functions), otherwise it will be saved in the Playdate pda format.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sample.save)
         */
        save(filename: string): void;
    }

    interface PlaydateSoundChannel {
        /**
         * <p>Removes the channel from the global list.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.remove)
         */
        remove(): void;
        /**
         * <p>Adds an <a href="https://sdk.play.date/2.5.0#C-sound.effect">effect</a> to the channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.addEffect)
         */
        addEffect(effect: PlaydateSoundEffect): void;
        /**
         * <p>Removes an <a href="https://sdk.play.date/2.5.0#C-sound.effect">effect</a> from the channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.removeEffect)
         */
        removeEffect(effect: PlaydateSoundEffect): void;
        /**
         * <p>Adds a <a href="https://sdk.play.date/2.5.0#C-sound.source">source</a> to the channel. If a source is not assigned to a channel, it plays on the default global channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.addSource)
         */
        addSource(source: PlaydateAudioSource): void;
        /**
         * <p>Removes a <a href="https://sdk.play.date/2.5.0#C-sound.source">source</a> from the channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.removeSource)
         */
        removeSource(source: PlaydateAudioSource): void;
        /**
         * <p>Sets the volume (0.0 - 1.0) for the channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.setVolume)
         */
        setVolume(volume: number): void;
        /**
         * <p>Gets the volume (0.0 - 1.0) for the channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.getVolume)
         */
        getVolume(): number;
        /**
         * <p>Sets the pan parameter for the channel. -1 is left, 0 is center, and 1 is right.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.setPan)
         */
        setPan(pan: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to automate the pan parameter. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.setPanMod)
         */
        setPanMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to automate the volume parameter. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.channel.setVolumeMod)
         */
        setVolumeMod(signal: PlaydateSoundSignal | null): void;
    }

    interface PlaydateSoundSynth {
        /**
         * <p>Returns a copy of the given synth.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.copy)
         */
        copy(): PlaydateSoundSynth;
        /**
         * <p>Plays a note with the current waveform or sample.</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><em>pitch</em>: the pitch value is in Hertz. If a sample is playing, pitch=261.63 (C4) plays at normal speed</p>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p>in either function, a string like <code>Db3</code> can be used instead of a number</p>
         * </li>
         * </ul>
         * </div>
         * </li>
         * <li>
         * <p><em>volume</em>: 0 to 1, defaults to 1</p>
         * </li>
         * <li>
         * <p><em>length</em>: in seconds. If omitted, note will play until you call noteOff()</p>
         * </li>
         * <li>
         * <p><em>when</em>: seconds since the sound engine started (see <a href="https://sdk.play.date/2.5.0#f-sound.getCurrentTime">playdate.sound.getCurrentTime</a>). Defaults to the current time.</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>The function returns true if the synth was successfully added to the sound channel, otherwise false (i.e., if the channel is full).</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>pitch</em> is zero, this function calls <code>noteOff()</code> instead of potentially adding a non-zero sample, or DC offset, to the output.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Synths currently only have a buffer of one note event. If you call <em>playNote()</em> while another note is waiting to play, it will replace that note. To create a sequence of notes to play over a period of time, see <a href="https://sdk.play.date/2.5.0#C-sound.sequence">playdate.sound.sequence</a>.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.playNote)
         */
        playNote(
            pitch: number,
            volume: number,
            length: number,
            when: number
        ): boolean;
        /**
         * <p>Identical to <a href="https://sdk.play.date/2.5.0#m-sound.synth.playNote">playNote</a> but uses a note name like "C4", or MIDI note number (60=C4, 61=C#4, etc.). In the latter case, fractional values are allowed.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.playMIDINote)
         */
        playMIDINote(
            note: string,
            volume: number,
            length: number,
            when: number
        ): boolean;
        /**
         * <p>Releases the note, if one is playing. The note will continue to be voiced through the release section of the synth’s envelope.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.noteOff)
         */
        noteOff(): void;
        /**
         * <p>Stops the synth immediately, without playing the release part of the envelope.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.stop)
         */
        stop(): void;
        /**
         * <p>Returns true if the synth is still playing, including the release phase of the envelope.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.isPlaying)
         */
        isPlaying(): boolean;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to use as the amplitude modulator. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setAmplitudeMod)
         */
        setAmplitudeMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the attack time, decay time, sustain level, and release time for the sound envelope, and optionally the <a href="https://sdk.play.date/2.5.0#m-sound.synth.setEnvelopeCurvature">curvature</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setADSR)
         */
        setADSR(
            attack: number,
            decay: number,
            sustain: number,
            release: number
        ): void;
        /**
         * <p>Sets the attack time, in seconds.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setAttack)
         */
        setAttack(time: number): void;
        /**
         * <p>Sets the decay time, in seconds.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setDecay)
         */
        setDecay(time: number): void;
        /**
         * <p>Sets the sustain level, as a proportion of the total level (0.0 to 1.0).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setSustain)
         */
        setSustain(level: number): void;
        /**
         * <p>Sets the release time, in seconds.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setRelease)
         */
        setRelease(time: number): void;
        /**
         * <p>Smoothly changes the envelope’s shape from linear (amount=0) to exponential (amount=1).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setEnvelopeCurvature)
         */
        setEnvelopeCurvature(amount: number): void;
        /**
         * <p>Returns the synth’s envelope as a <a href="https://sdk.play.date/2.5.0#C-sound.envelope">playdate.sound.envelope</a> object.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.getEnvelope)
         */
        getEnvelope(): PlaydateSoundEnvelope;
        /**
         * <p>Sets a function to be called when the synth stops playing.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setFinishCallback)
         */
        setFinishCallback(func: () => void): void;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to use as the frequency modulator. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setFrequencyMod)
         */
        setFrequencyMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets whether to use legato phrasing for the synth. If the legato flag is set and a new note starts while a previous note is still playing, the synth’s envelope remains in the sustain phase instead of starting a new attack.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setLegato)
         */
        setLegato(flag: boolean): void;
        /**
         * <p>Sets the synth volume. If a single value is passed in, sets both left side and right side volume to the given value. If two values are given, volumes are set separately.</p>
         * </div>
         * <div class="paragraph">
         * <p>Volume values are between 0.0 and 1.0.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setVolume)
         */
        setVolume(left: number, right: number): void;
        /**
         * <p>Returns the current volume for the synth, a single value for mono sources or a pair of values (left, right) for stereo sources.</p>
         * </div>
         * <div class="paragraph">
         * <p>Volume values are between 0.0 and 1.0.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.getVolume)
         */
        getVolume(): number | [number, number];
        /**
         * <p>Sets the waveform or <a href="https://sdk.play.date/2.5.0#C-sound.sample">Sample</a> the synth plays. If a sample is given, its data must be uncompressed PCM, not ADPCM. Otherwise <em>waveform</em> should be one of the following constants:</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><a id="k-sound.kWaveSine"></a> <em class="constant">playdate.sound.kWaveSine</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kWaveSquare"></a> <em class="constant">playdate.sound.kWaveSquare</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kWaveSawtooth"></a> <em class="constant">playdate.sound.kWaveSawtooth</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kWaveTriangle"></a> <em class="constant">playdate.sound.kWaveTriangle</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kWaveNoise"></a> <em class="constant">playdate.sound.kWaveNoise</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kWavePOPhase"></a> <em class="constant">playdate.sound.kWavePOPhase</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kWavePODigital"></a> <em class="constant">playdate.sound.kWavePODigital</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kWavePOVosim"></a> <em class="constant">playdate.sound.kWavePOVosim</em></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setWaveform)
         */
        setWaveform(waveform: PlaydateSoundWave | PlaydateSoundSample): void;
        /**
         * <p>Sets a wavetable for the synth to play. Sample data must be 16-bit mono uncompressed. <code>samplesize</code> is the number of samples in each waveform "cell" in the table and must be a power of 2. <code>xsize</code> is the number of cells across the wavetable. If the wavetable is two-dimensional, <code>ysize</code> gives the number of cells in the y direction.</p>
         * </div>
         * <div class="paragraph">
         * <p>The synth’s "position" in the wavetable is set manually with <a href="https://sdk.play.date/2.5.0#m-sound.synth.setParameter">setParameter()</a> or automated with <a href="https://sdk.play.date/2.5.0#m-sound.synth.setParameterModulator">setParameterModulator()</a>. In some cases it’s easier to use a parameter that matches the waveform position in the table, in others (notably when using envelopes and lfos) it’s more convenient to use a 0-1 scale, so there’s some redundancy here. Parameters are</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p>1: x position, values are from 0 to the table width</p>
         * </li>
         * <li>
         * <p>2: x position, values are from 0 to 1, parameter is scaled up to table width</p>
         * </li>
         * </ul>
         * </div>
         * <div class="paragraph">
         * <p>For 2-D tables (<code>rowwidth</code> &gt; 0):</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p>3: y position, values are from 0 to the table height</p>
         * </li>
         * <li>
         * <p>4: y position, values are from 0 to 1, parameter is scaled up to table height</p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setWavetable)
         */
        setWavetable(
            sample: PlaydateSoundSample,
            samplesize: number,
            xsize: number,
            ysize: number
        ): void;
        /**
         * <p>Sets the parameter at (1-based) position <em>num</em> to the given value. Unless otherwise specified, <em>value</em> ranges from 0 to 1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setParameter)
         */
        setParameter(parameter: number, value: number): void;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the parameter. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.synth.setParameterMod)
         */
        setParameterMod(
            parameter: number,
            signal: PlaydateSoundSignal | null
        ): void;
    }

    interface PlaydateSoundLfo {
        /**
         * <p>Sets the waveform of the LFO. Valid values are</p>
         * </div>
         * <div class="ulist">
         * <ul>
         * <li>
         * <p><a id="k-sound.kLFOSquare"></a> <em class="constant">playdate.sound.kLFOSquare</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kLFOSawtoothUp"></a> <em class="constant">playdate.sound.kLFOSawtoothUp</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kLFOSawtoothDown"></a> <em class="constant">playdate.sound.kLFOSawtoothDown</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kLFOTriangle"></a> <em class="constant">playdate.sound.kLFOTriangle</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kLFOSine"></a> <em class="constant">playdate.sound.kLFOSine</em></p>
         * </li>
         * <li>
         * <p><a id="k-sound.kLFOSampleAndHold"></a> <em class="constant">playdate.sound.kLFOSampleAndHold</em></p>
         * </li>
         * </ul>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setType)
         */
        setType(type: PlaydateSoundWave): void;
        /**
         * <p>Sets the LFO type to arpeggio, where the given values are in half-steps from the center note. For example, the sequence (0, 4, 7, 12) plays the notes of a major chord.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setArpeggio)
         */
        setArpeggio(...notes: number): void;
        /**
         * <p>Sets the center value of the LFO.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setCenter)
         */
        setCenter(center: number): void;
        /**
         * <p>Sets the depth of the LFO’s modulation.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setDepth)
         */
        setDepth(depth: number): void;
        /**
         * <p>Sets the rate of the LFO, in cycles per second.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setRate)
         */
        setRate(rate: number): void;
        /**
         * <p>Sets the current phase of the LFO, from 0 to 1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setPhase)
         */
        setPhase(phase: number): void;
        /**
         * <p>Sets the initial phase of the LFO, from 0 to 1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setStartPhase)
         */
        setStartPhase(phase: number): void;
        /**
         * <p>If an LFO is marked global, it is continuously updated whether or not it’s attached to any source.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setGlobal)
         */
        setGlobal(flag: boolean): void;
        /**
         * <p>If retrigger is on, the LFO’s phase is reset to its initial phase (default 0) when a synth using the LFO starts playing a note.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setRetrigger)
         */
        setRetrigger(flag: boolean): void;
        /**
         * <p>Sets an initial holdoff time for the LFO where the LFO remains at its center value, and a ramp time where the value increases linearly to its maximum depth. Values are in seconds.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.lfo.setDelay)
         */
        setDelay(holdoff: number, ramp: number): void;
    }

    interface PlaydateSoundEnvelope {
        /**
         * <p>Sets the envelope attack time to <em>attack</em>, in seconds.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setAttack)
         */
        setAttack(attack: number): void;
        /**
         * <p>Sets the envelope decay time to <em>decay</em>, in seconds.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setDecay)
         */
        setDecay(decay: number): void;
        /**
         * <p>Sets the envelope sustain level to <em>sustain</em>, as a proportion of the maximum. For example, if the sustain level is 0.5, the signal value rises to its full value over the attack phase of the envelope, then drops to half its maximum over the decay phase, and remains there while the envelope is active.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setSustain)
         */
        setSustain(sustain: number): void;
        /**
         * <p>Sets the envelope release time to <em>release</em>, in seconds.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setRelease)
         */
        setRelease(release: number): void;
        /**
         * <p>Smoothly changes the envelope’s shape from linear (amount=0) to exponential (amount=1).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setCurvature)
         */
        setCurvature(amount: number): void;
        /**
         * <p>Changes the amount by which note velocity scales output level. At the default value of 1, output is proportional to velocity; at 0 velocity has no effect on output level.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setVelocitySensitivity)
         */
        setVelocitySensitivity(amount: number): void;
        /**
         * <p>Scales the envelope rate according to the played note. For notes below <code>start</code>, the envelope’s set rate is used; for notes above <code>end</code> envelope rates are scaled by the <code>scaling</code> parameter. Between the two notes the scaling factor is interpolated from 1.0 to <code>scaling</code>. <code>start</code> and <code>end</code> are either MIDI note numbers or names like "C4". If omitted, the default range is C1 (36) to C5 (84).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setRateScaling)
         */
        setRateScaling(
            scaling: number,
            start: number | string = 'C1',
            end: number | string = 'C5'
        ): void;
        /**
         * <p>Sets the scale value for the envelope. The transformed envelope has an initial value of <em>offset</em> and a maximum (minimum if <em>scale</em> is negative) of <em>offset</em> + <em>scale</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setScale)
         */
        setScale(scale: number): void;
        /**
         * <p>Sets the offset value for the envelope. The transformed envelope has an initial value of <em>offset</em> and a maximum (minimum if <em>scale</em> is negative) of <em>offset</em> + <em>scale</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setOffset)
         */
        setOffset(offset: number): void;
        /**
         * <p>Sets whether to use legato phrasing for the envelope. If the legato flag is set, when the envelope is re-triggered before it’s released, it remains in the sustain phase instead of jumping back to the attack phase.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setLegato)
         */
        setLegato(flag: boolean): void;
        /**
         * <p>If retrigger is on, the envelope always starts from 0 when a note starts playing, instead of the current value if it’s active.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setRetrigger)
         */
        setRetrigger(flag: boolean): void;
        /**
         * <p>Triggers the envelope at the given <em>velocity</em>. If a <em>length</em> parameter is given, the envelope moves to the release phase after the given time. Otherwise, the envelope is held in the sustain phase until the trigger function is called again with <em>velocity</em> equal to zero.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.trigger)
         */
        trigger(velocity: number, length: number): void;
        /**
         * <p>If an envelope is marked global, it is continuously updated whether or not it’s attached to any source.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.envelope.setGlobal)
         */
        setGlobal(flag: boolean): void;
    }

    interface PlaydateSoundBitcrusher {
        /**
         * <p>Sets the wet/dry mix for the effect. A level of 1 (full wet) replaces the input with the effect output; 0 leaves the effect out of the mix.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.bitcrusher.setMix)
         */
        setMix(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the mix level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.bitcrusher.setMixMod)
         */
        setMixMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the amount of crushing to <em>amt</em>. Valid values are 0 (no effect) to 1 (quantizing output to 1-bit).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.bitcrusher.setAmount)
         */
        setAmount(amt: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the filter level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.bitcrusher.setAmountMod)
         */
        setAmountMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the number of samples to repeat; 0 is no undersampling, 1 effectively halves the sample rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.bitcrusher.setUndersampling)
         */
        setUndersampling(amt: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the filter level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.bitcrusher.setUndersamplingMod)
         */
        setUndersamplingMod(signal: PlaydateSoundSignal | null): void;
    }

    interface PlaydateSoundRingmod {
        /**
         * <p>Sets the wet/dry mix for the effect. A level of 1 (full wet) replaces the input with the effect output; 0 leaves the effect out of the mix.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.ringmod.setMix)
         */
        setMix(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the mix level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.ringmod.setMixMod)
         */
        setMixMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the ringmod frequency to <em>f</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.ringmod.setFrequency)
         */
        setFrequency(f: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the ringmod frequency. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.ringmod.setFrequencyMod)
         */
        setFrequencyMod(signal: PlaydateSoundSignal | null): void;
    }

    interface PlaydateSoundOnepolefilter {
        /**
         * <p>Sets the wet/dry mix for the effect. A level of 1 (full wet) replaces the input with the effect output; 0 leaves the effect out of the mix.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.onepolefilter.setMix)
         */
        setMix(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the mix level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.onepolefilter.setMixMod)
         */
        setMixMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the filter’s single parameter (cutoff frequency) to <em>p</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.onepolefilter.setParameter)
         */
        setParameter(p: number): void;
        /**
         * <p>Sets a modulator for the filter’s parameter. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.onepolefilter.setParameterMod)
         */
        setParameterMod(m: PlaydateSoundSignal | null): void;
    }

    interface PlaydateSoundTwopolefilter {
        /**
         * <p>Sets the wet/dry mix for the effect. A level of 1 (full wet) replaces the input with the effect output; 0 leaves the effect out of the mix.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setMix)
         */
        setMix(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the mix level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setMixMod)
         */
        setMixMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the center frequency (in Hz) of the filter to <em>f</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setFrequency)
         */
        setFrequency(f: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the filter frequency. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setFrequencyMod)
         */
        setFrequencyMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the resonance of the filter to <em>r</em>. Valid values are in the range 0-1. This parameter has no effect on shelf type filters.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setResonance)
         */
        setResonance(r: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the filter resonance. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setResonanceMod)
         */
        setResonanceMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the gain of the filter to <em>g</em>. Gain is only used in PEQ and shelf type filters.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setGain)
         */
        setGain(g: number): void;
        /**
         * <p>Sets the type of the filter to <em>type</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.twopolefilter.setType)
         */
        setType(type: PlaydateSoundTwoPoleFilterType): void;
    }

    interface PlaydateSoundOverdrive {
        /**
         * <p>Sets the wet/dry mix for the effect. A level of 1 (full wet) replaces the input with the effect output; 0 leaves the effect out of the mix.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.overdrive.setMix)
         */
        setMix(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the mix level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.overdrive.setMixMod)
         */
        setMixMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Sets the gain of the filter.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.overdrive.setGain)
         */
        setGain(level: number): void;
        /**
         * <p>Sets the level where the amplified input clips.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.overdrive.setLimit)
         */
        setLimit(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the limit level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.overdrive.setLimitMod)
         */
        setLimitMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Adds an offset to the upper and lower limits to create an asymmetric clipping.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.overdrive.setOffset)
         */
        setOffset(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the offset value. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.overdrive.setOffsetMod)
         */
        setOffsetMod(signal: PlaydateSoundSignal | null): void;
    }

    interface PlaydateSoundDelayline {
        /**
         * <p>Sets the wet/dry mix for the effect. A level of 1 (full wet) replaces the input with the effect output; 0 leaves the effect out of the mix, which is useful if you’re using taps for varying delays.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delayline.setMix)
         */
        setMix(level: number): void;
        /**
         * <p>Sets a <a href="https://sdk.play.date/2.5.0#C-sound.signal">signal</a> to modulate the mix level. Set to <em>nil</em> to clear the modulator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delayline.setMixMod)
         */
        setMixMod(signal: PlaydateSoundSignal | null): void;
        /**
         * <p>Returns a new <a href="https://sdk.play.date/2.5.0#C-sound.delaylinetap">playdate.sound.delaylinetap</a> on the delay line, at the given delay (which must be less than or equal to the delay line’s length).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delayline.addTap)
         */
        addTap(delay: number): void;
        /**
         * <p>Sets the feedback level of the delay line.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.delayline.setFeedback)
         */
        setFeedback(level: number): void;
    }

    interface PlaydateSoundSequence {
        /**
         * <p>Starts playing the sequence. <code>finishCallback</code> is an optional function to be called when the sequence finishes playing or is stopped. The sequence is passed to the callback as its single argument.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.play)
         */
        play(finishCallback: (sequence: PlaydateSoundSequence) => void): void;
        /**
         * <p>Stops playing the sequence.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.stop)
         */
        stop(): void;
        /**
         * <p>Returns true if the sequence is currently playing.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.isPlaying)
         */
        isPlaying(): boolean;
        /**
         * <p>Returns the length of the longest track in the sequence, in steps. See also <a href="https://sdk.play.date/2.5.0#m-sound.track.getLength">playdate.sound.track.getLength()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.getLength)
         */
        getLength(): number;
        /**
         * <p>Moves the play position for the sequence to step number <code>step</code>. If <code>play</code> is set, triggers the notes at that step.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.goToStep)
         */
        goToStep(step: number, play: boolean): void;
        /**
         * <p>Returns the step number the sequence is currently at.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.getCurrentStep)
         */
        getCurrentStep(): number;
        /**
         * <p>Sets the tempo of the sequence, in steps per second.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.setTempo)
         */
        setTempo(stepsPerSecond: number): void;
        /**
         * <p>Returns the tempo of the sequence, in steps per second.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.getTempo)
         */
        getTempo(): number;
        /**
         * <p>Sets the looping range of the sequence. If <em>loops</em> is 0 or unset, the loop repeats endlessly.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.setLoops)
         */
        setLoops(startStep: number, endStep: number, loopCount: number): void;
        /**
         * <p>Same as above, with startStep set to 0 and endStep set to <code>sequence:getLength()</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.setLoops-2)
         */
        setLoops(loopCount: number): void;
        /**
         * <p>Returns the number of tracks in the sequence.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.getTrackCount)
         */
        getTrackCount(): number;
        /**
         * <p>Adds the given <a href="https://sdk.play.date/2.5.0#C-sound.track">playdate.sound.track</a> to the sequence. If <code>track</code> omitted, the function creates and returns a new track.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.addTrack)
         */
        addTrack(track: PlaydateSoundTrack): void;
        /**
         * <p>Sets the given <a href="https://sdk.play.date/2.5.0#C-sound.track">playdate.sound.track</a> object at position <code>n</code> in the sequence.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.setTrackAtIndex)
         */
        setTrackAtIndex(n: number, track: PlaydateSoundTrack): void;
        /**
         * <p>Returns the <a href="https://sdk.play.date/2.5.0#C-sound.track">playdate.sound.track</a> object at position <code>n</code> in the sequence.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.getTrackAtIndex)
         */
        getTrackAtIndex(n: number): PlaydateSoundTrack;
        /**
         * <p>Sends an <a href="https://sdk.play.date/2.5.0#m-sound.instrument.allNotesOff">allNotesOff()</a> message to each track’s instrument.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.sequence.allNotesOff)
         */
        allNotesOff(): void;
    }

    interface PlaydateSoundTrack {
        /**
         * <p>Adds a single note event to the track, letting you specify <code>step</code>, <code>note</code>, <code>length</code>, and <code>velocity</code> directly. The second format allows you to pack them into a table, using the format returned by <a href="https://sdk.play.date/2.5.0#m-sound.track.getNotes">getNotes()</a>. The <code>note</code> argument can be a MIDI note number or a note name like "Db3". <code>length</code> is the length of the note in steps, not time—​that is, it follows the sequence’s tempo. The default velocity is 1.0.</p>
         * </div>
         * <div class="paragraph">
         * <p>See <a href="https://sdk.play.date/2.5.0#m-sound.track.setNotes">setNotes()</a> for the ability to add more than one note at a time.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.addNote2)
         */
        addNote(
            step: number,
            note: number | string,
            length: number,
            velocity: number = 1
        ): void;
        /**
         * <p>Adds a single note event to the track, letting you specify <code>step</code>, <code>note</code>, <code>length</code>, and <code>velocity</code> directly. The second format allows you to pack them into a table, using the format returned by <a href="https://sdk.play.date/2.5.0#m-sound.track.getNotes">getNotes()</a>. The <code>note</code> argument can be a MIDI note number or a note name like "Db3". <code>length</code> is the length of the note in steps, not time—​that is, it follows the sequence’s tempo. The default velocity is 1.0.</p>
         * </div>
         * <div class="paragraph">
         * <p>See <a href="https://sdk.play.date/2.5.0#m-sound.track.setNotes">setNotes()</a> for the ability to add more than one note at a time.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.addNote2)
         */
        addNote(table: {
            step: number;
            note: number | string;
            length: number;
            velocity: number;
        }): void;
        /**
         * <p>Set multiple notes at once, each array element should be a table containing values for the keys The tables contain values for keys <code>step</code>, <code>note</code>, <code>length</code>, and <code>velocity</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.setNotes)
         */
        setNotes(
            list: {
                step: number;
                note: number | string;
                length: number;
                velocity: number;
            }[]
        ): void;
        /**
         * <p>Returns an array of tables representing the note events in the track.</p>
         * </div>
         * <div class="paragraph">
         * <p>The tables contain values for keys <code>step</code>, <code>note</code>, <code>length</code>, and <code>velocity</code>. If <code>step</code> is given, the function returns only the notes at that step; if both <code>step</code> and <code>endstep</code> are set, it returns the notes between the two steps (including notes at endstep). n.b. The <code>note</code> field in the event tables is always a MIDI note number value, even if the note was added using the string notation.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.getNotes)
         */
        getNotes(
            step: number,
            endstep: number
        ): {
            step: number;
            note: number | string;
            length: number;
            velocity: number;
        }[];
        /**
         * <p>Removes the note event at <em>step</em> playing <em>note</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.removeNote)
         */
        removeNote(step: number, note: number): void;
        /**
         * <p>Clears all notes from the track.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.clearNotes)
         */
        clearNotes(): void;
        /**
         * <p>Returns the length, in steps, of the track—​that is, the step where the last note in the track ends.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.getLength)
         */
        getLength(): number;
        /**
         * <p>Returns the current number of notes active in the track.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.getNotesActive)
         */
        getNotesActive(): number;
        /**
         * <p>Returns the maximum number of notes simultaneously active in the track. (Known bug: this currently only works for midi files)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.getPolyphony)
         */
        getPolyphony(): number;
        /**
         * <p>Sets the <a href="https://sdk.play.date/2.5.0#C-sound.instrument">playdate.sound.instrument</a> that this track plays. If <code>inst</code> is a <a href="https://sdk.play.date/2.5.0#C-sound.synth">playdate.sound.synth</a>, the function creates an instrument for the synth.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.setInstrument)
         */
        setInstrument(inst: PlaydateSoundInstrument | PlaydateSoundSynth): void;
        /**
         * <p>Gets the <a href="https://sdk.play.date/2.5.0#C-sound.instrument">playdate.sound.instrument</a> that this track plays.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.getInstrument)
         */
        getInstrument(): PlaydateSoundInstrument;
        /**
         * <p>Mutes or unmutes the track.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.setMuted)
         */
        setMuted(flag: boolean): void;
        /**
         * <p>Adds a <a href="https://sdk.play.date/2.5.0#C-sound.controlsignal">playdate.sound.controlsignal</a> object to the track. Note that the signal must be assigned to a modulation input for it to have any audible effect. The input can be anywhere in the sound engine—​it’s not required to belong to the track in any way.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.addControlSignal)
         */
        addControlSignal(s: PlaydateSoundControlsignal): void;
        /**
         * <p>Returns an array of <a href="https://sdk.play.date/2.5.0#C-sound.controlsignal">playdate.sound.controlsignal</a> objects assigned to this track.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.track.getControlSignals)
         */
        getControlSignals(): PlaydateSoundControlsignal[];
    }

    interface PlaydateSoundInstrument {
        /**
         * <p>Adds the given <a href="https://sdk.play.date/2.5.0#C-sound.synth">playdate.sound.synth</a> to the instrument. If only the <em>note</em> argument is given, the voice is only used for that note, and is transposed to play at normal speed (i.e. rate=1.0 for samples, or C4 for synths). If <em>rangeend</em> is given, the voice is assigned to the range <em>note</em> to <em>rangeend</em>, inclusive, with the first note in the range transposed to rate=1.0/C4. The <code>note</code> and <code>rangeend</code> arguments can be MIDI note numbers or note names like "Db3". The final transpose argument transposes the note played, in half-tone units.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.addVoice)
         */
        addVoice(
            v: PlaydateSoundSynth,
            note: number | string,
            rangeend: number | string,
            transpose: number
        ): void;
        /**
         * <p>Transposes all voices in the instrument. <em>halfsteps</em> can be a fractional value.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.setTranspose)
         */
        setTranspose(halfsteps: number): void;
        /**
         * <p>Plays the given note on the instrument. A string like <code>Db3</code> can be used instead of a pitch/note number. Fractional values are allowed. <em>vel</em> defaults to 1.0, fully on. If <em>length</em> isn’t specified, the note stays on until <em>instrument.noteOff(note)</em> is called. <em>when</em> is the number of seconds in the future to start playing the note, default is immediately.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.playNote)
         */
        playNote(
            frequency: number | string,
            vel: number = 1.0,
            length: number,
            when: number
        ): void;
        /**
         * <p>Identical to <code>instrument:playNote()</code> but <em>note</em> is a MIDI note number: 60=C4, 61=C#4, etc. Fractional values are allowed.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.playMIDINote)
         */
        playMIDINote(
            note: number,
            vel: number = 1.0,
            length: number,
            when: number
        ): void;
        /**
         * <p>Stops the instrument voice playing note <em>note</em>. If <em>when</em> is given, the note is stopped <em>when</em> seconds in the future, otherwise it’s stopped immediately.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.noteOff)
         */
        noteOff(note: number, when: number): void;
        /**
         * <p>Sends a stop signal to all playing notes.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.allNotesOff)
         */
        allNotesOff(): void;
        /**
         * <p>Sets the instrument volume. If a single value is passed in, sets both left side and right side volume to the given value. If two values are given, volumes are set separately.</p>
         * </div>
         * <div class="paragraph">
         * <p>Volume values are between 0.0 and 1.0.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.setVolume)
         */
        setVolume(left: number, right: number): void;
        /**
         * <p>Returns the current volume for the synth, a single value for mono sources or a pair of values (left, right) for stereo sources.</p>
         * </div>
         * <div class="paragraph">
         * <p>Volume values are between 0.0 and 1.0.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.instrument.getVolume)
         */
        getVolume(): number | [number, number];
    }

    interface PlaydateSoundControlsignal {
        /**
         * <p><code>addEvent</code> is a simpler way of adding events one at a time than setting the entire <em>events</em> table. Arguments are either the values themselves in the given order, or a table containing values for <code>step</code>, <code>value</code>, and optionally <code>interpolate</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.controlsignal.addEvent2)
         */
        addEvent(step: number, value: number, interpolate: boolean): void;
        /**
         * <p><code>addEvent</code> is a simpler way of adding events one at a time than setting the entire <em>events</em> table. Arguments are either the values themselves in the given order, or a table containing values for <code>step</code>, <code>value</code>, and optionally <code>interpolate</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.controlsignal.addEvent2)
         */
        addEvent(event: {
            step: number;
            value: number;
            interpolate?: boolean;
        }): void;
        /**
         * <p>Clears all events from the control signal.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.controlsignal.clearEvents)
         */
        clearEvents(): void;
        /**
         * <p>Sets the midi controller number for the control signal, if that’s something you want to do. The value has no effect on playback.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.controlsignal.setControllerType)
         */
        setControllerType(number: number): void;
        /**
         * <p>Control signals in midi files are assigned a controller number, which describes the intent of the control. This function returns the controller number.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-sound.controlsignal.getControllerType)
         */
        getControllerType(): number;
        /**
         * <p>The signal’s event list is modified by getting and setting the <code>events</code> property of the object. This is an array of tables, each containing values for keys <code>step</code> and <code>value</code>, and optionally <code>interpolate</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-sound.controlsignal.events)
         */
        events: { step: number; value: number; interpolate?: boolean }[];
    }

    namespace string {
        /**
         * <p>Generates a random string of uppercase letters</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.UUID)
         *
         * @noSelf
         */
        export function UUID(length: number): string;

        /**
         * <p>Returns a string with the whitespace removed from the beginning and ending of <em>string</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.trimWhitespace)
         *
         * @noSelf
         */
        export function trimWhitespace(string: string): string;

        /**
         * <p>Returns a string with the whitespace removed from the beginning of <em>string</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.trimLeadingWhitespace)
         *
         * @noSelf
         */
        export function trimLeadingWhitespace(string: string): string;

        /**
         * <p>Returns a string with the whitespace removed from the ending of <em>string</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.trimTrailingWhitespace)
         *
         * @noSelf
         */
        export function trimTrailingWhitespace(string: string): string;
    }

    namespace timer {
        /**
         * <p>This should be called from the main playdate.update() loop to drive the timers.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.updateTimers)
         *
         * @noSelf
         */
        export function updateTimers(): void;

        function _new(
            duration: number,
            callback: (timer: PlaydateTimer) => void
        ): PlaydateTimer;
        /**
         * <p>Returns a new playdate.timer that will run for <em>duration</em> milliseconds. <em>callback</em> is a function closure that will be called when the timer is complete.</p>
         * </div>
         * <div class="paragraph">
         * <p>Accepts a variable number of arguments that will be passed to the callback function when it is called. If arguments are not provided, the timer itself will be passed to the callback instead.</p>
         * </div>
         * <div class="paragraph">
         * <p>By default, timers start upon instantiation. To modify the behavior of a timer, see <a href="https://sdk.play.date/2.5.0#C-commonTimerMethods">common timer methods</a> and <a href="https://sdk.play.date/2.5.0#C-commonTimerProperties">properties</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.new)
         *
         * @noSelf
         */
        function _new(
            duration: number,
            callback: (...args: unknown[]) => void,
            ...args: unknown[]
        ): PlaydateTimer;

        export { _new as new };

        export function performAfterDelay(
            delay: number,
            callback: (timer: PlaydateTimer) => void
        ): void;
        /**
         * <p>Performs the function <em>callback</em> after <em>delay</em> milliseconds. Accepts a variable number of arguments that will be passed to the callback function when it is called. If arguments are not provided, the timer itself will be passed to the callback instead.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.performAfterDelay)
         *
         * @noSelf
         */
        export function performAfterDelay(
            delay: number,
            callback: (...args: unknown[]) => void,
            ...args: unknown[]
        ): void;

        /**
         * <p>Returns a new playdate.timer that will run for <em>duration</em> milliseconds. If not specified, <em>startValue</em> and <em>endValue</em> will be 0, and a linear easing function will be used.</p>
         * </div>
         * <div class="paragraph">
         * <p>By default, timers start upon instantiation. To modify the behavior of a timer, see <a href="https://sdk.play.date/2.5.0#C-commonTimerMethods">common timer methods</a> and <a href="https://sdk.play.date/2.5.0#C-commonTimerProperties">properties</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.new2)
         *
         * @noSelf
         */
        function _new(
            duration: number,
            startValue: number = 0,
            endValue: number = 0,
            easingFunction: PlaydateEasingFunction
        ): PlaydateTimer;

        export { _new as new };

        export function keyRepeatTimer(
            callback: (timer: PlaydateTimer) => void
        ): void;
        /**
         * <p>Calls <code>keyRepeatTimerWithDelay()</code> below with standard values of <em>delayAfterInitialFiring</em> = 300 and <em>delayAfterSecondFiring</em> = 100.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.keyRepeatTimer)
         *
         * @noSelf
         */
        export function keyRepeatTimer(
            callback: (...args: unknown[]) => void,
            ...args: unknown[]
        ): void;

        export function keyRepeatTimerWithDelay(
            delayAfterInitialFiring: number,
            delayAfterSecondFiring: number,
            callback: (timer: PlaydateTimer) => void
        ): void;
        /**
         * <p>returns a timer that fires at key-repeat intervals. The function <em>callback</em> will be called immediately, then again after <em>delayAfterInitialFiring</em> milliseconds, then repeatedly at <em>delayAfterSecondFiring</em> millisecond intervals.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.keyRepeatTimerWithDelay)
         *
         * @noSelf
         */
        export function keyRepeatTimerWithDelay(
            delayAfterInitialFiring: number,
            delayAfterSecondFiring: number,
            callback: (...args: unknown[]) => void,
            ...args: unknown[]
        ): void;

        /**
         * <p>Returns an array listing all running timers.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Note the "." syntax rather than ":". This is a class method, not an instance method.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.allTimers)
         *
         * @noSelf
         */
        export function allTimers(): PlaydateTimer[];

        export function timerEndedCallback(...args: unknown[]): void;
        /**
         * <p>A Function of the form <em>function(timer)</em> or <em>function(...)</em> where "..." corresponds to the values in the table assigned to <em>timerEndedArgs</em>. Called when the timer has completed.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-timer.timerEndedCallback)
         *
         * @noSelf
         */
        export function timerEndedCallback(timer: PlaydateTimer): void;

        export function updateCallback(...args: unknown[]): void;
        /**
         * <p>A callback function that will be called on every frame (every time <em>timer.updateAll()</em> is called). If the timer was created with arguments, those will be passed as arguments to the function provided. Otherwise, the timer is passed as the single argument.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-timer.updateCallback)
         *
         * @noSelf
         */
        export function updateCallback(timer: PlaydateTimer): void;
    }

    interface PlaydateTimer {
        /**
         * <p>Pauses a timer. (There is no need to call :start() on a newly-instantiated timer: timers start automatically.)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-timer.pause)
         */
        pause(): void;
        /**
         * <p>Resumes a previously paused timer. There is no need to call :start() on a newly-instantiated timer: timers start automatically.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-timer.start)
         */
        start(): void;
        /**
         * <p>Removes this timer from the list of timers. This happens automatically when a non-repeating timer reaches its end, but you can use this method to dispose of timers manually.</p>
         * </div>
         * <div class="paragraph">
         * <p>Note that timers do not actually get removed until the next invocation of <a href="https://sdk.play.date/2.5.0#f-timer.updateTimers">playdate.timer.updateTimers()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-timer.remove)
         */
        remove(): void;
        /**
         * <p>Resets a timer to its initial values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-timer.reset)
         */
        reset(): void;
        /**
         * <p>Current value calculated from the start and end values, the time elapsed, and the easing function.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.value)
         */
        value: number;
        /**
         * <p>The function used to calculate <em>value</em>. The function should be of the form <em>function(t, b, c, d)</em>, where <em>t</em> is elapsed time, <em>b</em> is the beginning value, <em>c</em> is the change (or end value - start value), and <em>d</em> is the duration.  Many such functions are available in <a href="https://sdk.play.date/2.5.0#M-easingFunctions">playdate.easingFunctions</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.easingFunction)
         */
        easingFunction: (t: number, b: number, c: number, d: number) => number;
        /**
         * <p>For <a href="https://sdk.play.date/2.5.0#M-easingFunctions">easing functions</a> that take additional amplitude and period arguments (such as <em>inOutElastic</em>), set these to the desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.easingAmplitude)
         */
        easingAmplitude: number;
        /**
         * <p>For <a href="https://sdk.play.date/2.5.0#M-easingFunctions">easing functions</a> that take additional amplitude and period arguments (such as <em>inOutElastic</em>), set these to the desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.easingAmplitude)
         */
        easingPeriod: number;
        /**
         * <p>Set to provide an easing function to be used for the reverse portion of the timer. The function should be of the form <em>function(t, b, c, d)</em>, where <em>t</em> is elapsed time, <em>b</em> is the beginning value, <em>c</em> is the change (or end value - start value), and <em>d</em> is the duration.  Many such functions are available in <a href="https://sdk.play.date/2.5.0#M-easingFunctions">playdate.easingFunctions</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.reverseEasingFunction)
         */
        reverseEasingFunction: (
            t: number,
            b: number,
            c: number,
            d: number
        ) => number;
        /**
         * <p>Start value used when calculating <em>value</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.startValue)
         */
        startValue: number;
        /**
         * <p>End value used when calculating <em>value</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.endValue)
         */
        endValue: number;
        /**
         * <p>The number of milliseconds the timer has been running. Read-only.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.currentTime)
         */
        readonly currentTime: number;
        /**
         * <p>Number of milliseconds to wait before starting the timer.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.delay)
         */
        delay: number;
        /**
         * <p>If true, the timer is discarded once it is complete. Defaults to true.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.discardOnCompletion)
         */
        discardOnCompletion: boolean;
        /**
         * <p>The number of milliseconds for which the timer will run.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.duration)
         */
        duration: number;
        /**
         * <p>The number of milliseconds remaining in the timer. Read-only.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.timeLeft)
         */
        readonly timeLeft: number;
        /**
         * <p>If true, the timer will be paused. The update callback will not be called when the timer is paused. Can be set directly, or by using <code>playdate.timer:pause()</code> and <code>playdate.timer:start()</code>. Defaults to false.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.paused)
         */
        paused: boolean;
        /**
         * <p>If true, the timer starts over from the beginning when it completes. Defaults to false.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.repeats)
         */
        repeats: boolean;
        /**
         * <p>If true, the timer plays in reverse once it has completed. The time to complete both the forward and reverse will be <em>duration</em> x 2. Defaults to false.</p>
         * </div>
         * <div class="paragraph">
         * <p>Please note that <em>currentTime</em> will restart at 0 and count up to <em>duration</em> again when the reverse timer starts, but <em>value</em> will be calculated in reverse, from <em>endValue</em> to <em>startValue</em>. The same easing function (as opposed to the inverse of the easing function) will be used for the reverse timer unless an alternate is provided by setting <em>reverseEasingFunction</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.reverses)
         */
        reverses: boolean;
        /**
         * <p>For repeating timers, this function will be called each time the timer completes, before it starts again.</p>
         * </div>
         * <div class="paragraph">
         * <p>An array-style table of values that will be passed to the <em>timerEndedCallback</em> function.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-timer.timerEndedArgs)
         */
        timerEndedArgs: unknown[];
    }

    namespace frameTimer {
        /**
         * <p>This should be called from the main playdate.update() loop to drive the frame timers.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.updateTimers)
         *
         * @noSelf
         */
        export function updateTimers(): void;

        function _new(
            duration: number,
            callback: (timer: PlaydateFrameTimer) => void
        ): void;
        /**
         * <p>Returns a new playdate.frameTimer that will run for <em>duration</em> frames. <em>callback</em> is a function closure that will be called when the timer is complete.</p>
         * </div>
         * <div class="paragraph">
         * <p>Accepts a variable number of arguments that will be passed to the callback function when it is called. If arguments are not provided, the timer itself will be passed to the callback instead.</p>
         * </div>
         * <div class="paragraph">
         * <p>By default, frame timers start upon instantiation. To modify the behavior of a frame timer, see <a href="https://sdk.play.date/2.5.0#C-commonFrameTimerMethods">common frame timer methods</a> and <a href="https://sdk.play.date/2.5.0#C-commonFrameTimerProperties">properties</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.new)
         *
         * @noSelf
         */
        function _new(
            duration: number,
            callback: (...args: unknown[]) => void,
            ...args: unknown[]
        ): void;

        export { _new as new };

        export function performAfterDelay(
            delay: number,
            callback: (timer: PlaydateTimer) => void
        ): void;
        /**
         * <p>Performs the function <em>callback</em> after the <em>delay</em> number of frames. Accepts a variable number of arguments that will be passed to the callback function when it is called. If arguments are not provided, the timer itself will be passed to the callback instead.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.performAfterDelay)
         *
         * @noSelf
         */
        export function performAfterDelay(
            delay: number,
            callback: (...args: unknown[]) => void,
            ...args: unknown[]
        ): void;

        /**
         * <p>Returns a new playdate.frameTimer that will run for <em>duration</em> number of frames. If not specified, <em>startValue</em> and <em>endValue</em> will be 0, and a linear easing function will be used.</p>
         * </div>
         * <div class="paragraph">
         * <p>By default, frame timers start upon instantiation. To modify the behavior of a frame timer, see <a href="https://sdk.play.date/2.5.0#C-commonFrameTimerMethods">common frame timer methods</a> and <a href="https://sdk.play.date/2.5.0#C-commonFrameTimerProperties">properties</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.new-value)
         *
         * @noSelf
         */
        function _new(
            duration: number,
            startValue: number = 0,
            endValue: number = 0,
            easingFunction: PlaydateEasingFunction
        ): PlaydateFrameTimer;

        export { _new as new };

        /**
         * <p>Returns an array listing all running frameTimers.</p>
         * </div>
         * <div class="admonitionblock note">
         * <table>
         * <tbody><tr>
         * <td class="icon">
         * <div class="title">Note</div>
         * </td>
         * <td class="content">
         * Note the "." syntax rather than ":". This is a class method, not an instance method.
         * </td>
         * </tr>
         * </tbody></table>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.allTimers)
         *
         * @noSelf
         */
        export function allTimers(): PlaydateFrameTimer[];

        export function timerEndedCallback(...args: unknown[]): void;
        /**
         * <p>A Function of the form <em>function(timer)</em> or <em>function(...)</em> where "..." corresponds to the values in the table assigned to <em>timerEndedArgs</em>. Called when the timer has completed.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-frameTimer.timerEndedCallback)
         *
         * @noSelf
         */
        export function timerEndedCallback(timer: PlaydateFrameTimer): void;

        export function updateCallback(...args: unknown[]): void;
        /**
         * <p>A function to be called on every frame update. If the frame timer was created with arguments, those will be passed as arguments to the function provided. Otherwise, the timer is passed as the single argument.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#c-frameTimer.updateCallback)
         *
         * @noSelf
         */
        export function updateCallback(timer: PlaydateFrameTimer): void;
    }

    interface PlaydateFrameTimer {
        /**
         * <p>Pauses a timer.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-frameTimer.pause)
         */
        pause(): void;
        /**
         * <p>Resumes a timer. There is no need to call :start() on a newly-instantiated frame timer: frame timers start automatically.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-frameTimer.start)
         */
        start(): void;
        /**
         * <p>Removes this timer from the list of timers. This happens automatically when a non-repeating timer reaches it’s end, but you can use this method to dispose of timers manually.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-frameTimer.remove)
         */
        remove(): void;
        /**
         * <p>Resets a timer to its initial values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-frameTimer.reset)
         */
        reset(): void;
        /**
         * <p>Current value calculated from the start and end values, the current frame, and the easing function.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.value)
         */
        value: number;
        /**
         * <p>Start value used when calculating <em>value</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.startValue)
         */
        startValue: number;
        /**
         * <p>End value used when calculating <em>value</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.endValue)
         */
        endValue: number;
        /**
         * <p>The function used to calculate <em>value</em>. The function should be of the form <em>function(t, b, c, d)</em>, where <em>t</em> is elapsed time, <em>b</em> is the beginning value, <em>c</em> is the change (or <em>endValue - startValue</em>), and <em>d</em> is the duration.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.easingFunction)
         */
        easingFunction: (t: number, b: number, c: number, d: number) => number;
        /**
         * <p>For easing functions in <em>CoreLibs/easing</em> that take additional amplitude and period arguments (such as <em>inOutElastic</em>), set these to desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.easingAmplitude)
         */
        easingAmplitude: number;
        /**
         * <p>For easing functions in <em>CoreLibs/easing</em> that take additional amplitude and period arguments (such as <em>inOutElastic</em>), set these to desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.easingAmplitude)
         */
        easingPeriod: number;
        /**
         * <p>Set to provide an easing function to be used for the reverse portion of the timer. The function should be of the form <em>function(t, b, c, d)</em>, where <em>t</em> is elapsed time, <em>b</em> is the beginning value, <em>c</em> is the change (or <em>endValue - startValue</em>), and <em>d</em> is the duration.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.reverseEasingFunction)
         */
        reverseEasingFunction: (
            t: number,
            b: number,
            c: number,
            d: number
        ) => number;
        /**
         * <p>Number of frames to wait before starting the timer.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.delay)
         */
        delay: number;
        /**
         * <p>If true, the timer is discarded once it is complete. Defaults to true.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.discardOnCompletion)
         */
        discardOnCompletion: boolean;
        /**
         * <p>The number of frames for which the timer will run.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.duration)
         */
        duration: number;
        /**
         * <p>The current frame.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.frame)
         */
        frame: number;
        /**
         * <p>If true, the timer starts over from the beginning when it completes. Defaults to false.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.repeats)
         */
        repeats: boolean;
        /**
         * <p>If true, the timer plays in reverse once it has completed. The number of frames to complete both the forward and reverse will be <em>duration x 2</em>. Defaults to false.</p>
         * </div>
         * <div class="paragraph">
         * <p>Please note that the frame counter will restart at 0 and count up to <em>duration</em> again when the reverse timer starts, but <em>value</em> will be calculated in reverse, from <em>endValue</em> to <em>startValue</em>. The same easing function (as opposed to the inverse of the easing function) will be used for the reverse timer unless an alternate is provided by setting <em>reverseEasingFunction</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.reverses)
         */
        reverses: boolean;
        /**
         * <p>For repeating timers, this function will be called each time the timer completes, before it starts again.</p>
         * </div>
         * <div class="paragraph">
         * <p>An array-style table of values that will be passed to the <em>timerEndedCallback</em> function.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-frameTimer.timerEndedArgs)
         */
        timerEndedArgs: unknown[];
    }

    namespace ui {
        namespace gridview {
            /**
             * <p>Returns a new <a href="https://sdk.play.date/2.5.0#C-ui.gridview">playdate.ui.gridview</a> with cells sized <em>cellWidth</em>, <em>cellHeight</em>. (Sizes are in pixels.) If cells should span the entire width of the grid (as in a list view), pass zero (0) for <em>cellWidth</em>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-ui.gridview.new)
             *
             * @noSelf
             */
            function _new(
                cellWidth: number,
                cellHeight: number
            ): PlaydateUiGridview;

            export { _new as new };

            /**
             * <p>Returns the current height of the section headers.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getSectionHeaderHeight)
             *
             * @noSelf
             */
            export function getSectionHeaderHeight(): number;
        }

        namespace crankIndicator {}
    }

    interface PlaydateUiGridview {
        /**
         * <p>Override this method to draw the cells in the gridview. <em>selected</em> is a boolean, true if the cell being drawn is the currently-selected cell.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.drawCell)
         */
        drawCell(
            section: number,
            row: number,
            column: number,
            selected: boolean,
            x: number,
            y: number,
            width: number,
            height: number
        ): void;
        /**
         * <p>Override this method to draw section headers. This function will only be called if the header height has been set to a value greater than zero (0).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.drawSectionHeader)
         */
        drawSectionHeader(
            section: number,
            x: number,
            y: number,
            width: number,
            height: number
        ): void;
        /**
         * <p>Override this method to customize the drawing of horizontal dividers. This function will only be called if the horizontal divider height is greater than zero (0) and at least one divider has been added.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.drawHorizontalDivider)
         */
        drawHorizontalDivider(
            x: number,
            y: number,
            width: number,
            height: number
        ): void;
        /**
         * <p>Draws the gridview in the specified rect. Ideally this should be called on every <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a> to accommodate scrolling.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.drawInRect)
         */
        drawInRect(x: number, y: number, width: number, height: number): void;
        /**
         * <p>Sets the number of sections in the grid view. Each section contains at least one row, and row numbering starts at 1 in each section.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setNumberOfSections)
         */
        setNumberOfSections(num: number): void;
        /**
         * <p>Returns the number of sections in the grid view.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getNumberOfSections)
         */
        getNumberOfSections(): number;
        /**
         * <p>Sets the number of rows in <em>section</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setNumberOfRowsInSection)
         */
        setNumberOfRowsInSection(section: number, num: number): void;
        /**
         * <p>Returns the number of rows in <em>section</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getNumberOfRowsInSection)
         */
        getNumberOfRowsInSection(section: number): number;
        /**
         * <p>Sets the number of columns in the gridview. 1 by default.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setNumberOfColumns)
         */
        setNumberOfColumns(num: number): void;
        /**
         * <p>Returns the number of columns in the gridview. 1 by default.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getNumberOfColumns)
         */
        getNumberOfColumns(): number;
        /**
         * <p>Convenience method for list-style gridviews, or for setting the number of rows for multiple sections at a time. Pass in a list of numbers of rows for sections starting from section 1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setNumberOfRows)
         */
        setNumberOfRows(...numbers: number[]): void;
        /**
         * <p>Sets the size of the cells in the gridview. If cells should span the entire width of the grid (as in a list view), pass zero (0) for <em>cellWidth</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setCellSize)
         */
        setCellSize(cellWidth: number, cellHeight: number): void;
        /**
         * <p>Sets the amount of padding around cells.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setCellPadding)
         */
        setCellPadding(
            left: number,
            right: number,
            top: number,
            bottom: number
        ): void;
        /**
         * <p>Sets the amount of space the content is inset from the edges of the gridview. Useful if a background image is being used as a border.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setContentInset)
         */
        setContentInset(
            left: number,
            right: number,
            top: number,
            bottom: number
        ): void;
        /**
         * <p>Returns multiple values (x, y, width, height) representing the bounds of the cell, not including padding, relative to the top-right corner of the grid view.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the grid view is configured with zero width cells (see <a href="https://sdk.play.date/2.5.0#f-gridview.new">playdate.ui.gridview:new</a>), <em>gridWidth</em> is required, and should be the same value you would pass to <a href="https://sdk.play.date/2.5.0#m-gridview.drawInRect">playdate.ui.gridview:drawInRect</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getCellBounds)
         */
        getCellBounds(
            section: number,
            row: number,
            column: number,
            gridWidth: number
        ): [number, number, number, number];
        /**
         * <p>Sets the height of the section headers. 0 by default, which causes section headers not to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setSectionHeaderHeight)
         */
        setSectionHeaderHeight(height: number = 0): void;
        /**
         * <p>Sets the amount of padding around section headers.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setSectionHeaderPadding)
         */
        setSectionHeaderPadding(
            left: number,
            right: number,
            top: number,
            bottom: number
        ): void;
        /**
         * <p>Sets the height of the horizontal dividers. The default height is half the cell height specified when creating the grid view.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setHorizontalDividerHeight)
         */
        setHorizontalDividerHeight(height: number): void;
        /**
         * <p>Returns the height of the horizontal dividers.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getHorizontalDividerHeight)
         */
        getHorizontalDividerHeight(): number;
        /**
         * <p>Causes a horizontal divider to be drawn above the specified row. Drawing can be customized by overriding  <a href="https://sdk.play.date/2.5.0#m-gridview.drawHorizontalDivider">playdate.ui.gridview:drawHorizontalDivider</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.addHorizontalDividerAbove)
         */
        addHorizontalDividerAbove(section: number, row: number): void;
        /**
         * <p>Removes all horizontal dividers from the grid view.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.removeHorizontalDividers)
         */
        removeHorizontalDividers(): void;
        /**
         * <p>Controls the duration of scroll animations. 250ms by default.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setScrollDuration)
         */
        setScrollDuration(ms: number): void;
        /**
         * <p>'set' scrolls to the coordinate <em>x</em>, <em>y</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>animated</em> is true (or not provided) the new scroll position is animated to using <a href="https://sdk.play.date/2.5.0#v-gridview.scrollEasingFunction">playdate.ui.gridview.scrollEasingFunction</a> and the value set in <a href="https://sdk.play.date/2.5.0#m-gridview.setScrollDuration">playdate.ui.gridview:setScrollDuration()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setScrollPosition)
         */
        setScrollPosition(x: number, y: number, animated: boolean): void;
        /**
         * <p>Returns the current scroll location as a pair <em>x</em>, <em>y</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getScrollPosition)
         */
        getScrollPosition(): [number, number];
        /**
         * <p>Scrolls to the specified cell, just enough so the cell is visible.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.scrollToCell)
         */
        scrollToCell(
            section: number,
            row: number,
            column: number,
            animated: boolean
        ): void;
        /**
         * <p>Scrolls to the specified cell, so the cell is centered in the gridview, if possible.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.scrollCellToCenter)
         */
        scrollCellToCenter(
            section: number,
            row: number,
            column: number,
            animated: boolean
        ): void;
        /**
         * <p>Convenience function for list-style gridviews. Scrolls to the specified row in the list.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.scrollToRow)
         */
        scrollToRow(row: number, animated: boolean): void;
        /**
         * <p>Scrolls to the top of the gridview.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.scrollToTop)
         */
        scrollToTop(animated: boolean): void;
        /**
         * <p>Selects the cell at the given position.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setSelection)
         */
        setSelection(section: number, row: number, column: number): void;
        /**
         * <p>Returns the currently-selected cell as <em>section</em>, <em>row</em>, <em>column</em></p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getSelection)
         */
        getSelection(): [number, number, number];
        /**
         * <p>Convenience method for list-style gridviews. Selects the cell at <em>row</em> in section 1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.setSelectedRow)
         */
        setSelectedRow(row: number): void;
        /**
         * <p>Convenience method for list-style gridviews. Returns the selected cell at <em>row</em> in section 1.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getSelectedRow)
         */
        getSelectedRow(): number;
        /**
         * <p>Selects the cell directly below the currently-selected cell.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>wrapSelection</em> is true, the selection will wrap around to the opposite end of the grid. If <em>scrollToSelection</em> is true (or not provided), the newly-selected cell will be scrolled to. If <em>animate</em> is true (or not provided), the scroll will be animated.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.selectNextRow)
         */
        selectNextRow(
            wrapSelection: boolean,
            scrollToSelection: boolean = true,
            animate: boolean = true
        ): void;
        /**
         * <p>Identical to <code>selectNextRow()</code> but goes the other direction.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.selectPreviousRow)
         */
        selectPreviousRow(
            wrapSelection: boolean,
            scrollToSelection: boolean = true,
            animate: boolean = true
        ): void;
        /**
         * <p>Selects the cell directly to the right of the currently-selected cell.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the last column is currently selected and <em>wrapSelection</em> is true, the selection will wrap around to the opposite side of the grid. If a wrap occurs and the gridview’s <a href="https://sdk.play.date/2.5.0#v-gridview.changeRowOnColumnWrap"><code>changeRowOnColumnWrap</code></a> is <code>true</code> the row will also be advanced or moved back.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>scrollToSelection</em> is true (or not provided), the newly-selected cell will be scrolled to. If <em>animate</em> is true (or not provided), the scroll will be animated.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.selectNextColumn)
         */
        selectNextColumn(
            wrapSelection: boolean,
            scrollToSelection: boolean = true,
            animate: boolean = true
        ): void;
        /**
         * <p>Identical to <code>selectNextColumn()</code> but goes the other direction.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.selectPreviousColumn)
         */
        selectPreviousColumn(
            wrapSelection: boolean,
            scrollToSelection: boolean = true,
            animate: boolean = true
        ): void;
        /**
         * <p>This read-only variable returns true if the gridview needs to be redrawn. This can be used to help optimize drawing in your app. Keep in mind that a gridview cannot know all reasons it may need to be redrawn, such as changes in your drawing callback functions, coordinate or size changes, or overlapping drawing, so you may need to additionally redraw at other times.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.needsDisplay)
         */
        readonly needsDisplay: boolean;
        /**
         * <p>A background image that draws behind the gridview’s cells. This image can be either a <a href="https://sdk.play.date/2.5.0#C-graphics.image"><code>playdate.graphics.image</code></a> which will be tiled or a <a href="https://sdk.play.date/2.5.0#C-graphics.nineSlice"><code>playdate.nineSlice</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.backgroundImage)
         */
        backgroundImage: PlaydateGraphicsImage | PlaydateGraphicsNineSlice;
        /**
         * <p>Read-only. True if the gridview is currently performing a scroll animation.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.isScrolling)
         */
        readonly isScrolling: boolean;
        /**
         * <p>The easing function used when performing scroll animations. The function should be of the form function(t, b, c, d), where t is elapsed time, b is the beginning value, c is the change, or end value - start value, and d is the duration. Many such functions are available in <a href="https://sdk.play.date/2.5.0#M-easingFunctions"><code>playdate.easingFunctions</code></a>. <a href="https://sdk.play.date/2.5.0#f-easingFunctions.outCubic"><code>playdate.easingFunctions.outCubic</code></a> is the default.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.scrollEasingFunction)
         */
        scrollEasingFunction: (
            t: number,
            b: number,
            c: number,
            d: number
        ) => number;
        /**
         * <p>For <a href="https://sdk.play.date/2.5.0#M-easingFunctions">easing functions</a> that take additional amplitude and period arguments (such as <em>inOutElastic</em>), set these to the desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.easingAmplitude)
         */
        easingAmplitude: number;
        /**
         * <p>For <a href="https://sdk.play.date/2.5.0#M-easingFunctions">easing functions</a> that take additional amplitude and period arguments (such as <em>inOutElastic</em>), set these to the desired values.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.easingAmplitude)
         */
        easingPeriod: number;
        /**
         * <p>Controls the behavior of <a href="https://sdk.play.date/2.5.0#m-gridview.selectPreviousColumn">playdate.ui.gridview:selectPreviousColumn()</a> and <a href="https://sdk.play.date/2.5.0#m-gridview.selectNextColumn">playdate.ui.gridview:selectNextColumn()</a> if the current selection is at the first or last column, respectively. If set to true, the selection switch to a new row to allow the selection to change. If false, the call will have no effect on the selection. True by default.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.changeRowOnColumnWrap)
         */
        changeRowOnColumnWrap: boolean;
        /**
         * <p>If true, the gridview will attempt to center cells when scrolling. If false, the gridview will be scrolled just as much as necessary to make the cell visible.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.gridview.scrollCellsToCenter)
         */
        scrollCellsToCenter: boolean;
    }

    interface PlaydateUiCrankIndicator {
        /**
         * <p>Draws the next frame of the crank indicator animation, and is typically invoked in the <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> callback. <em>xOffset</em> and <em>yOffset</em> can be used to alter the position of the indicator by a specified number of pixels if desired. To stop drawing the crank indicator, simply stop calling <code>:draw()</code> in <code>playdate.update()</code>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Note that if sprites are being used, this call should usually happen after <a href="https://sdk.play.date/2.5.0#f-graphics.sprite.update">playdate.graphics.sprite.update()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.crankIndicator.draw)
         */
        draw(xOffset: number, yOffset: number): void;
        /**
         * <p>Resets the crank animation to the beginning of its sequence.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.crankIndicator.reset)
         */
        resetAnimation(): void;
        /**
         * <p>Returns <em>x</em>, <em>y</em>, <em>width</em>, <em>height</em> representing the bounds that the crank indicator draws within. If necessary, this rect could be passed into <a href="https://sdk.play.date/2.5.0#m-graphics.sprite.addDirtyRect">playdate.graphics.sprite.addDirtyRect()</a>, or used to manually draw over the indicator image drawn by <a href="https://sdk.play.date/2.5.0#m-crankIndicator.draw">playdate.ui.crankIndicator:draw()</a> when you want to stop showing the crank indicator.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-ui.crankIndicator.getBounds)
         */
        getBounds(): [number, number, number, number];
        /**
         * <p>Boolean property specifying which direction to animate the crank. Defaults to true.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#v-ui.crankIndicator.clockwise)
         */
        clockwise: boolean;
    }
}

namespace json {
    /**
     * <p>Takes the JSON encoded string and converts it to a Lua table.</p>
     * </div>
     * <div class="paragraph xref xref-c">
     * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-json.decode"><code>playdate-&gt;json-&gt;decode()</code></a> in the C API.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.decode)
     *
     * @noSelf
     */
    export function decode(string: string): AnyTable;

    /**
     * <p>Reads the given <a href="https://sdk.play.date/2.5.0#M-file">playdate.file.file</a> object or the file at the given <code>path</code> and converts it to a Lua table.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.decodeFile)
     *
     * @noSelf
     */
    export function decodeFile(file: PlaydateFileFile): AnyTable;

    /**
     * <p>Reads the given <a href="https://sdk.play.date/2.5.0#M-file">playdate.file.file</a> object or the file at the given <code>path</code> and converts it to a Lua table.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.decodeFile)
     *
     * @noSelf
     */
    export function decodeFile(path: string): AnyTable;

    /**
     * <p>Returns a string containing the JSON representation of the passed-in Lua table.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.encode)
     *
     * @noSelf
     */
    export function encode(table: AnyTable): string;

    /**
     * <p>Returns a string containing the JSON representation of a Lua table, with human-readable formatting.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.encodePretty)
     *
     * @noSelf
     */
    export function encodePretty(table: AnyTable): string;

    /**
     * <p>Encodes the Lua table <code>table</code> to JSON and writes it to the given <a href="https://sdk.play.date/2.5.0#M-file">playdate.file.file</a> object or the given <code>path</code>. If <code>pretty</code> is true, the output is formatted to make it human-readable. Otherwise, no additional whitespace is added.</p>
     * </div>
     * <div class="admonitionblock tip">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Tip</div>
     * </td>
     * <td class="content">
     * For a very simple way to serialize a table to a file, see <a href="https://sdk.play.date/2.5.0#M-datastore">playdate.datastore</a>.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.encodeToFile)
     *
     * @noSelf
     */
    export function encodeToFile(
        file: PlaydateFileFile,
        pretty: boolean,
        table: AnyTable
    ): void;

    /**
     * <p>Encodes the Lua table <code>table</code> to JSON and writes it to the given <a href="https://sdk.play.date/2.5.0#M-file">playdate.file.file</a> object or the given <code>path</code>. If <code>pretty</code> is true, the output is formatted to make it human-readable. Otherwise, no additional whitespace is added.</p>
     * </div>
     * <div class="admonitionblock tip">
     * <table>
     * <tbody><tr>
     * <td class="icon">
     * <div class="title">Tip</div>
     * </td>
     * <td class="content">
     * For a very simple way to serialize a table to a file, see <a href="https://sdk.play.date/2.5.0#M-datastore">playdate.datastore</a>.
     * </td>
     * </tr>
     * </tbody></table>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.encodeToFile)
     *
     * @noSelf
     */
    export function encodeToFile(
        path: string,
        pretty: boolean,
        table: AnyTable
    ): void;
}
