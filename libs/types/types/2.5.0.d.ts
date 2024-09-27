/// <reference types="lua-types/5.4" />
/** */
export const enum PlaydateColor {
    /** */
    Black = 0,
    /** */
    White = 1,
    /** */
    Clear = 2,
    /** */
    XOR = 4
}

/** */
export const enum PlaydateImageFlip {
    /** */
    Unflipped = 0,
    /** */
    FlippedX = 1,
    /** */
    FlippedY = 2,
    /** */
    FlippedXY = 4
}

/** */
export const enum PlaydatePolygonFill {
    /** */
    NonZero = 1,
    /** */
    EvenOdd = 2
}

/** */
export const enum PlaydateButton {
    /** */
    Left = 1,
    /** */
    Right = 2,
    /** */
    Up = 4,
    /** */
    Down = 8,
    /** */
    B = 16,
    /** */
    A = 32,
    /** */
    Menu = 64,
    /** */
    Lock = 124
}

/** */
export const enum PlaydateLanguage {
    /** */
    English = 1,
    /** */
    Japanese = 2
}

namespace playdate {
    /**
     * <p>Returns two values, the current API version of the Playdate runtime and the minimum API version supported by the runtime.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-apiVersion)
     */
    export function apiVersion();

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
     */
    export function update();

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
     */
    export function wait();

    /**
     * <p>Stops per-frame callbacks to <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a>. Useful in conjunction with <a href="https://sdk.play.date/2.5.0#f-display.flush">playdate.display.flush()</a> if your program only does things in response to button presses.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-stop)
     */
    export function stop();

    /**
     * <p>Resumes per-frame callbacks to <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-start)
     */
    export function start();

    /**
     * <p>Reinitializes the Playdate runtime and restarts the currently running game. The optional string <code>arg</code> passed in is available after restart in <a href="https://sdk.play.date/2.5.0#v-argv">playdate.argv</a> as if it had been passed in on the command line when launching the simulator.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-restart)
     */
    export function restart();

    /**
     * <p>Called when the player chooses to exit the game via the System Menu or Menu button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-gameWillTerminate)
     */
    export function gameWillTerminate();

    /**
     * <p>Called before the device goes to low-power sleep mode because of a low battery.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-deviceWillSleep)
     */
    export function deviceWillSleep();

    /**
     * <p>If your game is running on the Playdate when the device is locked, this function will be called. Implementing this function allows your game to take special action when the Playdate is locked, e.g., saving state.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-deviceWillLock)
     */
    export function deviceWillLock();

    /**
     * <p>If your game is running on the Playdate when the device is unlocked, this function will be called.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-deviceDidUnlock)
     */
    export function deviceDidUnlock();

    /**
     * <p>Called before the system pauses the game. (In the current version of Playdate OS, this only happens when the device’s Menu button is pushed.) Implementing these functions allows your game to take special action when it is paused, e.g., updating the <a href="https://sdk.play.date/2.5.0#f-setMenuImage">menu image</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-gameWillPause)
     */
    export function gameWillPause();

    /**
     * <p>Called before the system resumes the game.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-gameWillResume)
     */
    export function gameWillResume();

    /**
     * <p>Returns a <code>playdate.menu</code> object. Use this to add your custom menu items.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-menu.getSystemMenu)
     */
    export function getSystemMenu();

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
     */
    export function setMenuImage();

    /**
     * <p>Returns the current language of the system, which will be one of the constants <em>playdate.graphics.font.kLanguageEnglish</em> or
     * <em>playdate.graphics.font.kLanguageJapanese</em>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getSystemLanguage)
     */
    export function getSystemLanguage();

    /**
     * <p>Returns <em>true</em> if the user has checked the "Reduce Flashing" option in Playdate Settings; <em>false</em> otherwise. Games should read this value and, if <em>true</em>, avoid visuals that could be problematic for people with sensitivities to flashing lights or patterns.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getReduceFlashing)
     */
    export function getReduceFlashing();

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
     */
    export function getFlipped();

    /**
     * <p>The accelerometer is off by default, to save a bit of power. If you will be using the accelerometer in your game, you’ll first need to call <code>playdate.startAccelerometer()</code> then wait for the next update cycle before reading its values. If you won’t be using the accelerometer again for a while, calling <code>playdate.stopAccelerometer()</code> will put it back into a low-power idle state.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-startAccelerometer)
     */
    export function startAccelerometer();

    /**
     * <p>Puts the accelerometer into a low-power idle state. (Though, to be honest, the accelerometer draws so little power when it’s running you’d never notice the difference.)</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-stopAccelerometer)
     */
    export function stopAccelerometer();

    /**
     * <p>If the accelerometer has been turned on with <a href="https://sdk.play.date/2.5.0#f-startAccelerometer">playdate.startAccelerometer()</a>, returns the x, y, and z values from the accelerometer as a list. Positive x points right, positive y points to the bottom of the screen, and positive z points through the screen away from the viewer. For example, with the device held upright this function returns the values (0,1,0). With it flat on its back, it returns (0,0,1).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-readAccelerometer)
     */
    export function readAccelerometer();

    /**
     * <p>Returns true if the accelerometer is currently running.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-accelerometerIsRunning)
     */
    export function accelerometerIsRunning();

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
     */
    export function buttonIsPressed();

    /**
     * <p>Returns true for <em>just one update cycle</em> if <em>button</em> was pressed. <code>buttonJustPressed</code> will not return true again until the button is released and pressed again. This is useful for, say, a player "jump" action, so the jump action is taken only once and not on every single update.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>button</em> should be one of the constants listed in <a href="https://sdk.play.date/2.5.0#f-buttonIsPressed">playdate.buttonIsPressed()</a></p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-buttonJustPressed)
     */
    export function buttonJustPressed();

    /**
     * <p>Returns true for <em>just one update cycle</em> if <em>button</em> was released. <code>buttonJustReleased</code> will not return true again until the button is pressed and released again.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>button</em> should be one of the constants listed in <a href="https://sdk.play.date/2.5.0#f-buttonIsPressed">playdate.buttonIsPressed()</a></p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-buttonJustReleased)
     */
    export function buttonJustReleased();

    /**
     * <p>Returns the above data in one call, with multiple return values (<em>current</em>, <em>pressed</em>, <em>released</em>) containing bitmasks indicating which buttons are currently down, and which were pressed and released since the last update. For example, if the d-pad left button and the A button are both down, the <em>current</em> value will be (<em>playdate.kButtonA</em>|<em>playdate.kButtonLeft</em>).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getButtonState)
     */
    export function getButtonState();

    /**
     * <p>When set, button up/down events on the D pad and the A and B buttons are added to a list instead of simply polled at the beginning of a frame, allowing the code to handle multiple taps on a given button in a single frame. At the default 30 FPS, a queue size of 5 should be adequate. At lower frame rates/longer frame times, the queue size should be extended until all button presses are caught. Additionally, when the button queue is enabled the button callbacks listed below are passed the event time as an argument.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setButtonQueueSize)
     */
    export function setButtonQueueSize();

    /**
     * <p>Called immediately after the player presses the A Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-AButtonDown)
     */
    export function AButtonDown();

    /**
     * <p>Called after the A Button is held down for one second. This can be used for secondary actions (e.g., displaying a game world map, changing weapons).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-AButtonHeld)
     */
    export function AButtonHeld();

    /**
     * <p>Called immediately after the player releases the A Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-AButtonUp)
     */
    export function AButtonUp();

    /**
     * <p>Called immediately after the player presses the B Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-BButtonDown)
     */
    export function BButtonDown();

    /**
     * <p>Called after the B Button is held down for one second. This can be used for secondary actions (e.g., displaying a game world map, changing weapons).</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-BButtonHeld)
     */
    export function BButtonHeld();

    /**
     * <p>Called immediately after the player releases the B Button.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-BButtonUp)
     */
    export function BButtonUp();

    /**
     * <p>Called immediately after the player presses the down direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-downButtonDown)
     */
    export function downButtonDown();

    /**
     * <p>Called immediately after the player releases the down direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-downButtonUp)
     */
    export function downButtonUp();

    /**
     * <p>Called immediately after the player presses the left direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-leftButtonDown)
     */
    export function leftButtonDown();

    /**
     * <p>Called immediately after the player releases the left direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-leftButtonUp)
     */
    export function leftButtonUp();

    /**
     * <p>Called immediately after the player presses the right direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-rightButtonDown)
     */
    export function rightButtonDown();

    /**
     * <p>Called immediately after the player releases the right direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-rightButtonUp)
     */
    export function rightButtonUp();

    /**
     * <p>Called immediately after the player presses the up direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-upButtonDown)
     */
    export function upButtonDown();

    /**
     * <p>Called immediately after the player releases the up direction on the d-pad.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-upButtonUp)
     */
    export function upButtonUp();

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
     */
    export function isCrankDocked();

    /**
     * <p>Returns the absolute position of the crank (in degrees). Zero is pointing straight up parallel to the device. Turning the crank clockwise (when looking at the right edge of an upright device) increases the angle, up to a maximum value 359.9999. The value then resets back to zero as the crank continues its rotation.</p>
     * </div>
     * <div class="listingblock">
     * <div class="content">
     * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">crankPosition</span> = playdate.getCrankPosition()</code></pre>
     * </div>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getCrankPosition)
     */
    export function getCrankPosition();

    /**
     * <p>Returns two values, <em>change</em> and <em>acceleratedChange</em>. <em>change</em> represents the angle change (in degrees) of the crank since the last time this function (or the <a href="https://sdk.play.date/2.5.0#c-cranked">playdate.cranked()</a> callback) was called. Negative values are anti-clockwise. <em>acceleratedChange</em> is change multiplied by a value that increases as the crank moves faster, similar to the way mouse acceleration works.</p>
     * </div>
     * <div class="listingblock">
     * <div class="content">
     * <pre class="CodeRay highlight"><code data-lang="lua"><span class="keyword">local</span> <span class="local-variable">change</span>, <span class="local-variable">acceleratedChange</span> = playdate.getCrankChange()</code></pre>
     * </div>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getCrankChange)
     */
    export function getCrankChange();

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
     */
    export function getCrankTicks();

    /**
     * <p>For playdate.cranked(), <em>change</em> is the angle change in degrees. <em>acceleratedChange</em> is <em>change</em> multiplied by a value that increases as the crank moves faster, similar to the way mouse acceleration works. Negative values are anti-clockwise.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-cranked)
     */
    export function cranked();

    /**
     * <p>This function, if defined, is called when the crank is docked.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-crankDocked)
     */
    export function crankDocked();

    /**
     * <p>This function, if defined, is called when the crank is undocked.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-crankUndocked)
     */
    export function crankUndocked();

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
     */
    export function setCrankSoundsDisabled();

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
     */
    export function setAutoLockDisabled();

    /**
     * <p>Returns the number of milliseconds the game has been <em>active</em> since launched.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getCurrentTimeMilliseconds)
     */
    export function getCurrentTimeMilliseconds();

    /**
     * <p>Resets the high-resolution timer.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-resetElapsedTime)
     */
    export function resetElapsedTime();

    /**
     * <p>Returns the number of seconds since <code>playdate.resetElapsedTime()</code> was called. The value is a floating-point number with microsecond accuracy.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getElapsedTime)
     */
    export function getElapsedTime();

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
     */
    export function getSecondsSinceEpoch();

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
     */
    export function getTime();

    /**
     * <p>Returns a table in the same format as <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>, but in GMT rather than local time.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getGMTTime)
     */
    export function getGMTTime();

    /**
     * <p>Returns the number of seconds and milliseconds between midnight (hour 0), January 1 2000 UTC and <em>time</em>, specified in local time, as a list: <em>(seconds, milliseconds)</em>.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>time</em> should be a table of the same format as the one returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-epochFromTime)
     */
    export function epochFromTime();

    /**
     * <p>Returns the number of seconds and milliseconds between midnight (hour 0), January 1 2000 UTC and <em>time</em>, specified in GMT time, as a list: <em>(seconds, milliseconds)</em>.</p>
     * </div>
     * <div class="paragraph">
     * <p><em>time</em> should be a table of the same format as the one returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-epochFromGMTTime)
     */
    export function epochFromGMTTime();

    /**
     * <p>Converts the epoch to a local date and time table, in the same format as the table returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-timeFromEpoch)
     */
    export function timeFromEpoch();

    /**
     * <p>Converts the epoch to a GMT date and time table, in the same format as the table returned by <a href="https://sdk.play.date/2.5.0#f-getTime">playdate.getTime()</a>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-GMTTimeFromEpoch)
     */
    export function GMTTimeFromEpoch();

    /**
     * <p>Returns true if the user has set the 24-Hour Time preference in the Settings program.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-shouldDisplay24HourTime)
     */
    export function shouldDisplay24HourTime();

    /**
     * <p><em>flag</em> determines whether or not the print() function adds a newline to the end of the printed text.  Default is <em>true</em>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setNewlinePrinted)
     */
    export function setNewlinePrinted();

    /**
     * <p>Calculates the current frames per second and draws that value at <em>x, y</em>.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-drawFPS)
     */
    export function drawFPS();

    /**
     * <p>Returns the <em>measured, actual</em> refresh rate in frames per second. This value may be different from the <em>specified</em> refresh rate (see <a href="https://sdk.play.date/2.5.0#f-display.getRefreshRate">playdate.display.getRefreshRate()</a>) by a little or a lot depending upon how much calculation is being done per frame.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getFPS)
     */
    export function getFPS();

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
     */
    export function getStats();

    /**
     * <p><code>setStatsInterval()</code> sets the length of time for each sample frame of runtime stats. Set <em>seconds</em> to zero to disable stats collection.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setStatsInterval)
     */
    export function setStatsInterval();

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
     */
    export function getPowerStatus();

    /**
     * <p>Returns a value from 0-100 denoting the current level of battery charge. 0 = empty; 100 = full.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getBatteryPercentage)
     */
    export function getBatteryPercentage();

    /**
     * <p>Returns the battery’s current voltage level.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-getBatteryVoltage)
     */
    export function getBatteryVoltage();

    /**
     * <p>Clears the simulator console.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-clearConsole)
     */
    export function clearConsole();

    /**
     * <p>Sets the color of the <a href="https://sdk.play.date/2.5.0#c-debugDraw">playdate.debugDraw()</a> overlay image. Values are in the range 0-1.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setDebugDrawColor)
     */
    export function setDebugDrawColor();

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
     */
    export function keyPressed();

    /**
     * <p>Lets you act on keyboard key releases when running in the Simulator ONLY. These can be useful for adding debugging functions that can be enabled via your keyboard.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-keyReleased)
     */
    export function keyReleased();

    /**
     * <p>Called immediately after <a href="https://sdk.play.date/2.5.0#c-update">playdate.update()</a>, any drawing performed during this callback is overlaid on the display in 50% transparent red (or another color selected with <a href="https://sdk.play.date/2.5.0#f-setDebugDrawColor">playdate.setDebugDrawColor()</a>).</p>
     * </div>
     * <div class="paragraph">
     * <p>White pixels are drawn in the <a href="https://sdk.play.date/2.5.0#f-setDebugDrawColor">debugDrawColor</a>. Black pixels are transparent.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-debugDraw)
     */
    export function debugDraw();

    /**
     * <p>If <em>flag</em> is false, automatic garbage collection is disabled and the game should manually collect garbage with Lua’s <code>collectgarbage()</code> function.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-setCollectsGarbage)
     */
    export function setCollectsGarbage();

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
     */
    export function setMinimumGCTime();

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
     */
    export function setGCScaling();

    /**
     * <p>Called when a <code>msg &lt;text&gt;</code> command is received on the serial port. The text following the command is passed to the function as the string <em>message</em>.</p>
     * </div>
     * <div class="paragraph">
     * <p>Running <code>!msg &lt;message&gt;</code> in the simulator Lua console sends the command to the device if one is connected, otherwise it sends it to the game running in the simulator.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#c-serialMessageReceived)
     */
    export function serialMessageReceived();
}

namespace playdate {
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
         */
        export function push();

        /**
         * <p>Pops the last input handler off of the stack.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-inputHandlers.pop)
         */
        export function pop();
    }
}

namespace playdate {
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
         */
        export function setRefreshRate();

        /**
         * <p>Returns the specified refresh rate in frames per second. See also <a href="https://sdk.play.date/2.5.0#f-getFPS">playdate.getFPS()</a> for <em>measured, actual</em> frame rate.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getRefreshRate)
         */
        export function getRefreshRate();

        /**
         * <p>Sends the contents of the frame buffer to the display immediately. Useful if you have called <a href="https://sdk.play.date/2.5.0#f-stop">playdate.stop()</a> to disable update callbacks in, say, the case where your app updates the display only in reaction to button presses.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.flush)
         */
        export function flush();

        /**
         * <p>Returns the height the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.getHeight"><code>playdate-&gt;display-&gt;getHeight()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getHeight)
         */
        export function getHeight();

        /**
         * <p>Returns the width the Playdate display, taking the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.getWidth"><code>playdate-&gt;display-&gt;getWidth()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getWidth)
         */
        export function getWidth();

        /**
         * <p>Returns the values <em>(width, height)</em> describing the Playdate display size. Takes the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getSize)
         */
        export function getSize();

        /**
         * <p>Returns the values <em>(x, y, width, height)</em> describing the Playdate display size. Takes the current display scale into account; e.g., if the scale is 2, the values returned will be based off of a 200 x 120-pixel screen rather than the native 400 x 240. (See <a href="https://sdk.play.date/2.5.0#f-display.setScale">playdate.display.setScale()</a>.)</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getRect)
         */
        export function getRect();

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
         */
        export function setScale();

        /**
         * <p>Gets the display scale factor. Valid values for <em>scale</em> are 1, 2, 4, and 8.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getScale)
         */
        export function getScale();

        /**
         * <p>If the argument passed to <code>setInverted()</code> is true, the frame buffer will be drawn inverted (everything onscreen that was black will now be white, etc.)</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setInverted"><code>playdate-&gt;display-&gt;setInverted()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setInverted)
         */
        export function setInverted();

        /**
         * <p>Returns the current value of the display invert flag.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getInverted)
         */
        export function getInverted();

        /**
         * <p>Adds a mosaic effect to the display. Valid <em>x</em> and <em>y</em> values are between 0 and 3, inclusive.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-display.setMosaic"><code>playdate-&gt;display-&gt;setMosaic()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.setMosaic)
         */
        export function setMosaic();

        /**
         * <p>Returns the current mosaic effect settings as multiple values (<em>x</em>, <em>y</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getMosaic)
         */
        export function getMosaic();

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
         */
        export function setOffset();

        /**
         * <p><code>getOffset()</code> returns the current display offset as multiple values (<em>x</em>, <em>y</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-display.getOffset)
         */
        export function getOffset();

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
         */
        export function setFlipped();

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
         */
        export function loadImage();
    }
}

namespace playdate {
}

namespace playdate {
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
         */
        export function linear();

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
         */
        export function inQuad();

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
         */
        export function outQuad();

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
         */
        export function inOutQuad();

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
         */
        export function outInQuad();

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
         */
        export function inCubic();

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
         */
        export function outCubic();

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
         */
        export function inOutCubic();

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
         */
        export function outInCubic();

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
         */
        export function inQuart();

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
         */
        export function outQuart();

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
         */
        export function inOutQuart();

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
         */
        export function outInQuart();

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
         */
        export function inQuint();

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
         */
        export function outQuint();

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
         */
        export function inOutQuint();

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
         */
        export function outInQuint();

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
         */
        export function inSine();

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
         */
        export function outSine();

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
         */
        export function inOutSine();

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
         */
        export function outInSine();

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
         */
        export function inExpo();

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
         */
        export function outExpo();

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
         */
        export function inOutExpo();

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
         */
        export function outInExpo();

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
         */
        export function inCirc();

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
         */
        export function outCirc();

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
         */
        export function inOutCirc();

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
         */
        export function outInCirc();

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
         */
        export function inElastic();

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
         */
        export function outElastic();

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
         */
        export function inOutElastic();

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
         */
        export function outInElastic();

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
         */
        export function inBack();

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
         */
        export function outBack();

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
         */
        export function inOutBack();

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
         */
        export function outInBack();

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
         */
        export function outBounce();

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
         */
        export function inBounce();

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
         */
        export function inOutBounce();

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
         */
        export function outInBounce();
    }
}

namespace playdate {
    namespace datastore {
        /**
         * <p>Encodes the given table into the named file. (The <code>.json</code> extension should be omitted from the file name.) The default file name is "data". If <em>pretty-print</em> is true, the JSON will be nicely formatted.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.write)
         */
        export function write();

        /**
         * <p>Returns a table instantiated with the data in the JSON-encoded file you specify. (The <code>.json</code> extension should be omitted.)  The default file name is "data". If no file is found, this function returns nil.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.read)
         */
        export function read();

        /**
         * <p>Deletes the specified datastore file. The default file name is "data". Returns <code>false</code> if the datastore file could not be deleted.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-datastore.delete)
         */
        function _delete();

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
         */
        export function writeImage();

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
         */
        export function readImage();
    }
}

namespace playdate {
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
         */
        export function open();

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
         */
        export function listFiles();

        /**
         * <p>Returns true if a file exists at the given path. Unlike the <a href="https://sdk.play.date/2.5.0#f-graphics.image.new-path">image</a> or <a href="https://sdk.play.date/2.5.0#f-sound.sample.new-path">sound</a> loading functions, this function requires <em>path</em> to include the file extension since it cannot be inferred from context. Additionally, note that asset files are compiled into a format easier for Playdate to use and will have a different extension: <code>.wav</code> and <code>.aiff</code> audio files are compiled to <code>.pda</code> format, and <code>.gif</code> and <code>.png</code> files become `.pdi`s.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.exists)
         */
        export function exists();

        /**
         * <p>Returns true if a directory exists at the given path.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.isdir)
         */
        export function isdir();

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
         */
        export function mkdir();

        /**
         * <p>Deletes the file at the given path. Returns true if successful, else false.</p>
         * </div>
         * <div class="paragraph">
         * <p>If <em>recursive</em> is <code>true</code>, this function will delete the directory at <em>path</em> and its contents, otherwise the directory must be empty to be deleted.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.delete)
         */
        function _delete();

        export { _delete as delete };

        /**
         * <p>Returns the size of the file at the given path.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.getSize)
         */
        export function getSize();

        /**
         * <p>Returns the type of the file at the given path.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.getType)
         */
        export function getType();

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
         */
        export function modtime();

        /**
         * <p>Renames the file at <em>path</em>, if it exists, to the value of newPath. This can result in the file being moved to a new directory, but directories will not be created. Returns true if the operation was successful.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-file.rename"><code>playdate-&gt;file-&gt;rename()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.rename)
         */
        export function rename();

        /**
         * <p>Loads the compiled <em>.pdz</em> file at the given location and returns the contents as a function. The .pdz extension on <em>path</em> is optional.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>env</em>, if specified, is a table to use as the function’s global namespace instead of <em>_G</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-file.load)
         */
        export function load();

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
         */
        export function run();
    }
}

namespace playdate {
    namespace geometry {
        /**
         * <p>Returns the square of the distance from point <em>(x1, y1)</em> to point <em>(x2, y2)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Compared to <a href="https://sdk.play.date/2.5.0#m-geometry.point.squaredDistanceToPoint">geometry.point:squaredDistanceToPoint()</a>, this version will be slightly faster.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-geometry.squaredDistanceToPoint)
         */
        export function squaredDistanceToPoint();

        /**
         * <p>Returns the the distance from point <em>(x1, y1)</em> to point <em>(x2, y2)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Compared to <a href="https://sdk.play.date/2.5.0#m-geometry.point.distanceToPoint">geometry.point:distanceToPoint()</a>, this version will be slightly faster.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-geometry.distanceToPoint)
         */
        export function distanceToPoint();
    }
}

namespace playdate {
    namespace geometry {
        namespace affineTransform {
            /**
             * <p>Returns a new playdate.geometry.affineTransform. Use new() instead to get a new copy of the identity transform.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.affineTransform.new)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns a new playdate.geometry.affineTransform that is the identity transform.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.affineTransform.new-1)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace geometry {
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
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace geometry {
        namespace lineSegment {
            /**
             * <p>Returns a new playdate.geometry.lineSegment.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.lineSegment.new)
             */
            function _new();

            export { _new as new };

            /**
             * <p>For use in inner loops where speed is the priority.</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns true if there is an intersection between the line segments defined by <em>(x1, y1)</em>, <em>(x2, y2)</em> and <em>(x3, y3)</em>, <em>(x4, y4)</em>.
             * If there is an intersection, <em>x, y</em> values representing the intersection point are also returned.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-geometry.lineSegment.fast_intersection)
             */
            export function fast_intersection();
        }
    }
}

namespace playdate {
    namespace geometry {
        namespace point {
            /**
             * <p>Returns a new playdate.geometry.point.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.point.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace geometry {
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
             */
            function _new();

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
             */
            function _new();

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
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace geometry {
        namespace rect {
            /**
             * <p>Returns a new playdate.geometry.rect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.rect.new)
             */
            function _new();

            export { _new as new };

            /**
             * <p>For use in inner loops where speed is the priority. About 3x faster than <a href="https://sdk.play.date/2.5.0#m-geometry.rect.intersection">intersection</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns multiple values (<em>x, y, width, height</em>) representing the overlapping portion of the two rects defined by <em>x1, y1, w1, h1</em> and <em>x2, y2, w2, h2</em>. If there is no intersection, (0, 0, 0, 0) is returned.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.rect.fast_intersection)
             */
            export function fast_intersection();

            /**
             * <p>For use in inner loops where speed is the priority. About 3x faster than <a href="https://sdk.play.date/2.5.0#m-geometry.rect.union">union</a>.</p>
             * </div>
             * <div class="paragraph">
             * <p>Returns multiple values (<em>x, y, width, height</em>) representing the smallest possible rect that contains the two rects defined by <em>x1, y1, w1, h1</em> and <em>x2, y2, w2, h2</em>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.rect.fast_union)
             */
            export function fast_union();
        }
    }
}

namespace playdate {
    namespace geometry {
        namespace size {
            /**
             * <p>Returns a new playdate.geometry.size.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.size.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace geometry {
        namespace vector2D {
            /**
             * <p>Returns a new playdate.geometry.vector2D.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.vector2D.new)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns a new playdate.geometry.vector2D. Angles should be specified in degrees. Zero degrees represents the top of the circle.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-geometry.vector2D.newPolar)
             */
            export function newPolar();
        }
    }
}

namespace playdate {
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
         */
        export function pushContext();

        /**
         * <p>Pops a graphics context off the context stack and restores its state.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.popContext"><code>playdate-&gt;graphics-&gt;popContext()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.popContext)
         */
        export function popContext();

        /**
         * <p>Clears the entire display, setting the color to either the given <em>color</em> argument, or the current background color set in <a href="https://sdk.play.date/2.5.0#f-graphics.setBackgroundColor">setBackgroundColor(color)</a> if no argument is given.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.clear"><code>playdate-&gt;graphics-&gt;clear()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.clear)
         */
        export function clear();

        /**
         * <p>Returns the pair (<em>width</em>, <em>height</em>) for the image at <em>path</em> without actually loading the image.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.image.imageSizeAtPath)
         */
        export function imageSizeAtPath();

        /**
         * <p>Returns true if the non-alpha-masked portions of <em>image1</em> and <em>image2</em> overlap if they were drawn at positions (<em>x1</em>, <em>y1</em>) and (<em>x2</em>, <em>y2</em>) and flipped according to <em>flip1</em> and <em>flip2</em>, which should each be one of the values listed in <a href="https://sdk.play.date/2.5.0#m-graphics.imgDraw"><code>playdate.graphics.image:draw()</code></a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.checkAlphaCollision)
         */
        export function checkAlphaCollision();

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
         */
        export function setColor();

        /**
         * <p>Gets the current drawing color for primitives.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getColor)
         */
        export function getColor();

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
         */
        export function setBackgroundColor();

        /**
         * <p>Gets the color used for drawing the background, if necessary, before <a href="https://sdk.play.date/2.5.0#C-graphics.sprite">playdate.graphics.sprite</a>s are drawn on top.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getBackgroundColor)
         */
        export function getBackgroundColor();

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
         */
        export function setPattern();

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
         */
        export function setDitherPattern();

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
         */
        export function drawLine();

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
         */
        export function drawLine();

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
         */
        export function setLineCapStyle();

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
         */
        export function drawPixel();

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
         */
        export function drawRect();

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
         */
        export function drawRect();

        /**
         * <p>Draws the filled rectangle <em>r</em> or the rect at (<em>x</em>, <em>y</em>) of the given width and height.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillRect"><code>playdate-&gt;graphics-&gt;fillRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRect)
         */
        export function fillRect();

        /**
         * <p>Draws the filled rectangle <em>r</em> or the rect at (<em>x</em>, <em>y</em>) of the given width and height.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillRect"><code>playdate-&gt;graphics-&gt;fillRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRect)
         */
        export function fillRect();

        /**
         * <p>Draws a rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawRoundRect)
         */
        export function drawRoundRect();

        /**
         * <p>Draws a rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawRoundRect)
         */
        export function drawRoundRect();

        /**
         * <p>Draws a filled rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRoundRect)
         */
        export function fillRoundRect();

        /**
         * <p>Draws a filled rectangle with rounded corners in the rect <em>r</em> or the rect with origin (<em>x</em>, <em>y</em>) and size (<em>w</em>, <em>h</em>).</p>
         * </div>
         * <div class="paragraph">
         * <p><em>radius</em> defines the radius of the corners.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillRoundRect)
         */
        export function fillRoundRect();

        /**
         * <p>Draws an arc using the current color.</p>
         * </div>
         * <div class="paragraph">
         * <p>Angles are specified in degrees, not radians.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawArc)
         */
        export function drawArc();

        /**
         * <p>Draws an arc using the current color.</p>
         * </div>
         * <div class="paragraph">
         * <p>Angles are specified in degrees, not radians.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawArc)
         */
        export function drawArc();

        /**
         * <p>Draws a circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleAtPoint)
         */
        export function drawCircleAtPoint();

        /**
         * <p>Draws a circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleAtPoint)
         */
        export function drawCircleAtPoint();

        /**
         * <p>Draws a circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleInRect)
         */
        export function drawCircleInRect();

        /**
         * <p>Draws a circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawCircleInRect)
         */
        export function drawCircleInRect();

        /**
         * <p>Draws a filled circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleAtPoint)
         */
        export function fillCircleAtPoint();

        /**
         * <p>Draws a filled circle at the point <em>(x, y)</em> (or <em>p</em>) with radius <em>radius</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleAtPoint)
         */
        export function fillCircleAtPoint();

        /**
         * <p>Draws a filled circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleInRect)
         */
        export function fillCircleInRect();

        /**
         * <p>Draws a filled circle in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>If the rect is not a square, the circle will be drawn centered in the rect.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillCircleInRect)
         */
        export function fillCircleInRect();

        /**
         * <p>Draws an ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawEllipseInRect)
         */
        export function drawEllipseInRect();

        /**
         * <p>Draws an ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawEllipseInRect)
         */
        export function drawEllipseInRect();

        /**
         * <p>Draws a filled ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillEllipseInRect)
         */
        export function fillEllipseInRect();

        /**
         * <p>Draws a filled ellipse in the rect <em>r</em> or the rect with origin <em>(x, y)</em> and size <em>(width, height)</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>startAngle</em> and <em>endAngle</em>, if provided, should be in degrees (not radians), and will cause only the segment of the ellipse between <em>startAngle</em> and <em>endAngle</em> to be drawn.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillEllipseInRect)
         */
        export function fillEllipseInRect();

        /**
         * <p>Draw the <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">playdate.geometry.polygon</a> <em>p</em>. Only draws a line between the first and last vertex if the polygon is <a href="https://sdk.play.date/2.5.0#m-geometry.polygon.close">closed</a>.</p>
         * </div>
         * <div class="paragraph">
         * <p>Line width is specified by <a href="https://sdk.play.date/2.5.0#f-graphics.setLineWidth">setLineWidth()</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawPolygon)
         */
        export function drawPolygon();

        /**
         * <p>Fills the polygon specified by a list of x,y coordinates. An edge between the last vertex and the first is assumed.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillPolygon"><code>playdate-&gt;graphics-&gt;fillPolygon()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillPolygon)
         */
        export function fillPolygon();

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
         */
        export function setPolygonFillRule();

        /**
         * <p>Draws a triangle with vertices (<em>x1</em>, <em>y1</em>), (<em>x2</em>, <em>y2</em>), and (<em>x3</em>, <em>y3</em>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.drawTriangle)
         */
        export function drawTriangle();

        /**
         * <p>Draws a filled triangle with vertices (<em>x1</em>, <em>y1</em>), (<em>x2</em>, <em>y2</em>), and (<em>x3</em>, <em>y3</em>).</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.fillTriangle"><code>playdate-&gt;graphics-&gt;fillTriangle()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.fillTriangle)
         */
        export function fillTriangle();

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
         */
        export function perlin();

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
         */
        export function perlinArray();

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
         */
        export function generateQRCode();

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
         */
        export function drawSineWave();

        /**
         * <p><code>setClipRect()</code> sets the clipping rectangle for all subsequent graphics drawing, including bitmaps. The argument can either be separate dimensions or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> object. The clip rect is automatically cleared at the beginning of the <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> callback. The function uses world coordinates; that is, the given rectangle will be translated by the current drawing offset. To use screen coordinates instead, use <a href="https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect"><code>setScreenClipRect()</code></a></p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setClipRect"><code>playdate-&gt;graphics-&gt;setClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setClipRect)
         */
        export function setClipRect();

        /**
         * <p><code>setClipRect()</code> sets the clipping rectangle for all subsequent graphics drawing, including bitmaps. The argument can either be separate dimensions or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> object. The clip rect is automatically cleared at the beginning of the <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> callback. The function uses world coordinates; that is, the given rectangle will be translated by the current drawing offset. To use screen coordinates instead, use <a href="https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect"><code>setScreenClipRect()</code></a></p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setClipRect"><code>playdate-&gt;graphics-&gt;setClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setClipRect)
         */
        export function setClipRect();

        /**
         * <p><code>setClipRect()</code> sets the clipping rectangle for all subsequent graphics drawing, including bitmaps. The argument can either be separate dimensions or a <a href="https://sdk.play.date/2.5.0#C-geometry.rect">playdate.geometry.rect</a> object. The clip rect is automatically cleared at the beginning of the <a href="https://sdk.play.date/2.5.0#c-update"><code>playdate.update()</code></a> callback. The function uses world coordinates; that is, the given rectangle will be translated by the current drawing offset. To use screen coordinates instead, use <a href="https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect"><code>setScreenClipRect()</code></a></p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setClipRect-rect)
         */
        export function setClipRect();

        /**
         * <p><code>getClipRect()</code> returns multiple values (<em>x</em>, <em>y</em>, <em>width</em>, <em>height</em>) giving the current clipping rectangle.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getClipRect)
         */
        export function getClipRect();

        /**
         * <p>Sets the clip rectangle as above, but uses screen coordinates instead of world coordinates—​that is, it ignores the current drawing offset.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setScreenClipRect"><code>playdate-&gt;graphics-&gt;setScreenClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect)
         */
        export function setScreenClipRect();

        /**
         * <p>Sets the clip rectangle as above, but uses screen coordinates instead of world coordinates—​that is, it ignores the current drawing offset.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setScreenClipRect"><code>playdate-&gt;graphics-&gt;setScreenClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setScreenClipRect)
         */
        export function setScreenClipRect();

        /**
         * <p>Returns the clip rect as in <code>getClipRect()</code>, but using screen coordinates instead of world coordinates.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getScreenClipRect)
         */
        export function getScreenClipRect();

        /**
         * <p>Clears the current clipping rectangle, set with <a href="https://sdk.play.date/2.5.0#f-graphics.setClipRect"><code>setClipRect()</code></a>.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.clearClipRect"><code>playdate-&gt;graphics-&gt;clearClipRect()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.clearClipRect)
         */
        export function clearClipRect();

        /**
         * <p>Sets the current <a href="https://en.wikipedia.org/wiki/Stencil_buffer">stencil</a> to the given image. If <em>tile</em> is set, the the stencil will be tiled; in this case, the image width must be a multiple of 32 pixels.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-graphics.setStencilImage"><code>playdate-&gt;graphics-&gt;setStencilImage()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setStencilImage)
         */
        export function setStencilImage();

        /**
         * <p>Sets a pattern to use for stenciled drawing, as an alternative to creating an image, drawing a pattern into the image, then using that in <code>setStencilImage()</code>. <code>pattern</code> should be a table of the form <code>{ row1, row2, row3, row4, row5, row6, row7, row8 }</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setStencilPattern)
         */
        export function setStencilPattern();

        /**
         * <p>Sets the stencil to a dither pattern specified by <em>level</em> and optional <em>ditherType</em> (defaults to <code>playdate.graphics.image.kDitherTypeBayer8x8</code>).</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setStencilPattern-dither)
         */
        export function setStencilPattern();

        /**
         * <p>Clears the <a href="https://en.wikipedia.org/wiki/Stencil_buffer">stencil buffer</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.clearStencil)
         */
        export function clearStencil();

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
         */
        export function clearStencilImage();

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
         */
        export function setImageDrawMode();

        /**
         * <p>Gets the current drawing mode for images.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getImageDrawMode)
         */
        export function getImageDrawMode();

        /**
         * <p>Sets the width of the line for <a href="https://sdk.play.date/2.5.0#f-graphics.drawLine">drawLine</a>, <a href="https://sdk.play.date/2.5.0#f-graphics.drawRect">drawRect</a>, <a href="https://sdk.play.date/2.5.0#f-graphics.drawPolygon">drawPolygon</a>, and <a href="https://sdk.play.date/2.5.0#f-graphics.drawArc">drawArc</a> when a <a href="https://sdk.play.date/2.5.0#C-geometry.arc">playdate.geometry.arc</a> is passed as the argument. This value is saved and restored when pushing and popping the <a href="https://sdk.play.date/2.5.0#f-graphics.pushContext">graphics context</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setLineWidth)
         */
        export function setLineWidth();

        /**
         * <p>Gets the current line width.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getLineWidth)
         */
        export function getLineWidth();

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
         */
        export function setStrokeLocation();

        /**
         * <p>Gets the current stroke position.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getStrokeLocation)
         */
        export function getStrokeLocation();

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
         */
        export function lockFocus();

        /**
         * <p>After calling <code>unlockFocus()</code>, drawing is routed to the frame buffer.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.unlockFocus)
         */
        export function unlockFocus();

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
         */
        export function setDrawOffset();

        /**
         * <p><code>getDrawOffset()</code> returns multiple values (<em>x</em>, <em>y</em>) giving the current draw offset.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getDrawOffset)
         */
        export function getDrawOffset();

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
         */
        export function getDisplayImage();

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
         */
        export function getWorkingImage();

        /**
         * <p>Sets the sprite’s stencil to the given pattern, tiled across the screen.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setStencilPattern)
         */
        export function setStencilPattern();

        /**
         * <p>Sets the sprite’s stencil to the given pattern, tiled across the screen. <code>pattern</code> should be a table of the form <code>{ row1, row2, row3, row4, row5, row6, row7, row8 }</code>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.setStencilPattern_p)
         */
        export function setStencilPattern();

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
         */
        export function setFont();

        /**
         * <p>Returns the current font, a <a href="https://sdk.play.date/2.5.0#C-graphics.font">playdate.graphics.font</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getFont)
         */
        export function getFont();

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
         */
        export function setFontFamily();

        /**
         * <p>Sets the global font tracking (spacing between letters) in pixels. This value is added to the font’s own tracking value as specified in its .fnt file.</p>
         * </div>
         * <div class="paragraph">
         * <p>See <a href="https://sdk.play.date/2.5.0#m-graphics.font.setTracking">playdate.graphics.font:setTracking</a> to adjust tracking on a specific font.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.setFontTracking)
         */
        export function setFontTracking();

        /**
         * <p>Gets the global font tracking (spacing between letters) in pixels.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getFontTracking)
         */
        export function getFontTracking();

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
         */
        export function getSystemFont();

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
         */
        export function drawText();

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
         */
        export function drawLocalizedText();

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
         */
        export function getLocalizedText();

        /**
         * <p>Returns multiple values <em>(width, height)</em> giving the dimensions required to draw the text <em>str</em> using <a href="https://sdk.play.date/2.5.0#f-graphics.drawText">drawText()</a>. Newline characters (<code>\n</code>) are respected.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>fontFamily</em> should be a table of fonts using keys as specified in <a href="https://sdk.play.date/2.5.0#f-graphics.setFontFamily">setFontFamily(fontFamily)</a>. If provided, fonts from <em>fontFamily</em> will be used for calculating the size of <em>str</em> instead of the currently set font.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-graphics.getTextSize)
         */
        export function getTextSize();

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
         */
        export function drawTextAligned();

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
         */
        export function drawTextInRect();

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
         */
        export function drawTextInRect();

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
         */
        export function drawLocalizedTextAligned();

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
         */
        export function drawLocalizedTextInRect();

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
         */
        export function drawLocalizedTextInRect();

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
         */
        export function getTextSizeForMaxWidth();

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
         */
        export function imageWithText();
    }
}

namespace playdate {
    namespace graphics {
        namespace image {
            /**
             * <p>Creates a new blank image of the given width and height. The image can be drawn on using <a href="https://sdk.play.date/2.5.0#f-graphics.pushContext">playdate.graphics.pushContext()</a> or <a href="https://sdk.play.date/2.5.0#f-graphics.lockFocus">playdate.graphics.lockFocus()</a>. The optional <em>bgcolor</em> argument is one of the color constants as used in <a href="https://sdk.play.date/2.5.0#f-graphics.setColor">playdate.graphics.setColor()</a>, defaulting to <em>kColorClear</em>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.image.new)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.image">playdate.graphics.image</a> object from the data at <em>path</em>. If there is no file at <em>path</em>, the function returns nil and a second value describing the error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.image.new-path)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace graphics {
        namespace nineSlice {
            /**
             * <p>Returns a new 9 slice image from the image at imagePath with the stretchable region defined by other parameters. The arguments represent the origin and dimensions of the innermost ("center") slice.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.nineSlice.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace graphics {
        namespace animation {
        }
    }
}

namespace playdate {
    namespace graphics {
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
                 */
                function _new();

                export { _new as new };
            }
        }
    }
}

namespace playdate {
    namespace graphics {
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
             */
            function _new();

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
             */
            function _new();

            export { _new as new };

            /**
             * <p>Creates a new Animator that will animate along the provided <a href="https://sdk.play.date/2.5.0#C-geometry.arc">playdate.geometry.arc</a></p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.animator.new3)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Creates a new Animator that will animate along the provided <a href="https://sdk.play.date/2.5.0#C-geometry.polygon">playdate.geometry.polygon</a></p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.animator.new4)
             */
            function _new();

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
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace graphics {
        namespace animation {
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
                 */
                function _new();

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
                 */
                export function updateAll();

                /**
                 * <p>Stops all blinkers.</p>
                 *
                 * [Read more](https://sdk.play.date/2.5.0#f-graphics.animation.blinker.stopAll)
                 */
                export function stopAll();
            }
        }
    }
}

namespace playdate {
    namespace graphics {
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
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns an empty image table for loading images into via <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.load">imagetable:load()</a> or setting already-loaded images into with <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.setImage">imagetable:setImage()</a>. If set, <em>cellsWide</em> is used to locate images by x,y position. The optional <em>cellSize</em> argument gives the allocation size for the images, if <a href="https://sdk.play.date/2.5.0#m-graphics.imagetable.load">load()</a> will be used. (This is a weird technical detail, so ask us if you need guidance here.)</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.imagetable.new-alloc)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace graphics {
        namespace tilemap {
            /**
             * <p>Creates a new tilemap object.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.tilemap.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace graphics {
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
             */
            function _new();

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
             */
            export function spriteWithText();

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
             */
            export function update();

            /**
             * <p>Adds the given sprite to the display list, so that it is drawn in the current scene. Note that this is called with a period <code>.</code> instead of a colon <code>:</code>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.addSprite)
             */
            export function addSprite();

            /**
             * <p>Removes the given sprite from the display list. As with <code>add()</code>/<code>addSprite()</code>, note that this is called with a period <code>.</code> instead of a colon <code>:</code>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.removeSprite)
             */
            export function removeSprite();

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
             */
            export function setBackgroundDrawingCallback();

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
             */
            export function redrawBackground();

            /**
             * <p>Sets the clip rect for sprites in the given z-index range.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.setClipRectsInRange)
             */
            export function setClipRectsInRange();

            /**
             * <p>Sets the clip rect for sprites in the given z-index range.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.setClipRectsInRange)
             */
            export function setClipRectsInRange();

            /**
             * <p>Clears sprite clip rects in the given z-index range.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.clearClipRectsInRange)
             */
            export function clearClipRectsInRange();

            /**
             * <p>If set to true, causes all sprites to draw each frame, whether or not they have been marked dirty. This may speed up the performance of your game if the system’s dirty rect tracking is taking up too much time - for example if there are many sprites moving around on screen at once.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.setAlwaysRedraw)
             */
            export function setAlwaysRedraw();

            /**
             * <p>Return’s the sprites "always redraw" flag.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.getAlwaysRedraw)
             */
            export function getAlwaysRedraw();

            /**
             * <p>Marks the given rectangle (in screen coordinates) as needing a redraw. playdate.graphics drawing functions now call this automatically, adding their drawn areas to the sprite’s dirty list, so there’s likely no need to call this manually any more. This behavior may change in the future, though.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.addDirtyRect)
             */
            export function addDirtyRect();

            /**
             * <p>Returns an array of all sprites in the display list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.getAllSprites)
             */
            export function getAllSprites();

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
             */
            export function performOnAllSprites();

            /**
             * <p>Returns the number of sprites in the display list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.spriteCount)
             */
            export function spriteCount();

            /**
             * <p>Removes all sprites from the global sprite list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.removeAll)
             */
            export function removeAll();

            /**
             * <p>Removes all sprites in <code>spriteArray</code> from the global sprite list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-graphics.sprite.removeSprites)
             */
            export function removeSprites();

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
             */
            export function allOverlappingSprites();

            /**
             * <p>Returns all sprites with collision rects containing the point.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAtPoint)
             */
            export function querySpritesAtPoint();

            /**
             * <p>Returns all sprites with collision rects containing the point.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAtPoint)
             */
            export function querySpritesAtPoint();

            /**
             * <p>Returns all sprites with collision rects overlapping the rect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesInRect)
             */
            export function querySpritesInRect();

            /**
             * <p>Returns all sprites with collision rects overlapping the rect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesInRect)
             */
            export function querySpritesInRect();

            /**
             * <p>Returns all sprites with collision rects intersecting the line segment.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAlongLine)
             */
            export function querySpritesAlongLine();

            /**
             * <p>Returns all sprites with collision rects intersecting the line segment.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.sprite.querySpritesAlongLine)
             */
            export function querySpritesAlongLine();

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
             */
            export function querySpriteInfoAlongLine();

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
             */
            export function querySpriteInfoAlongLine();

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
             */
            export function addEmptyCollisionSprite();

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
             */
            export function addEmptyCollisionSprite();

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
             */
            export function addWallSprites();
        }
    }
}

namespace playdate {
    namespace graphics {
        namespace font {
            /**
             * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.font">playdate.graphics.font</a> object from the data at <em>path</em>. If there is no file at <em>path</em>, the function returns nil.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.font.new)
             */
            function _new();

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
             */
            export function newFamily();
        }
    }
}

namespace playdate {
    namespace graphics {
        namespace video {
            /**
             * <p>Returns a <a href="https://sdk.play.date/2.5.0#C-graphics.video">playdate.graphics.video</a> object from the pdv file at <em>path</em>. If the file at <em>path</em> can’t be opened, the function returns nil.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-graphics.video.new)
             */
            function _new();

            export { _new as new };
        }
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
     */
    export function decode();

    /**
     * <p>Reads the given <a href="https://sdk.play.date/2.5.0#M-file">playdate.file.file</a> object or the file at the given <code>path</code> and converts it to a Lua table.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.decodeFile)
     */
    export function decodeFile();

    /**
     * <p>Reads the given <a href="https://sdk.play.date/2.5.0#M-file">playdate.file.file</a> object or the file at the given <code>path</code> and converts it to a Lua table.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.decodeFile)
     */
    export function decodeFile();

    /**
     * <p>Returns a string containing the JSON representation of the passed-in Lua table.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.encode)
     */
    export function encode();

    /**
     * <p>Returns a string containing the JSON representation of a Lua table, with human-readable formatting.</p>
     *
     * [Read more](https://sdk.play.date/2.5.0#f-json.encodePretty)
     */
    export function encodePretty();

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
     */
    export function encodeToFile();

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
     */
    export function encodeToFile();
}

namespace playdate {
    namespace keyboard {
        /**
         * <p>Opens the keyboard, taking over input focus.</p>
         * </div>
         * <div class="paragraph">
         * <p><em>text</em>, if provided, will be used to set the initial text value of the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.show)
         */
        export function show();

        /**
         * <p>Hides the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#m-keyboard.hide)
         */
        export function hide();

        /**
         * <p><em>behavior</em> should be one of the constants <em>playdate.keyboard.kCapitalizationNormal</em>, <em>playdate.keyboard.kCapitalizationWords</em>, or <em>playdate.keyboard.kCapitalizationSentences</em>.</p>
         * </div>
         * <div class="paragraph">
         * <p>In the case of <em>playdate.keyboard.kCapitalizationWords</em>, the keyboard selection will automatically move to the upper case column after a space is entered. For <em>playdate.keyboard.kCapitalizationSentences</em> the selection will automatically move to the upper case column after a period and a space have been entered.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.setCapitalizationBehavior)
         */
        export function setCapitalizationBehavior();

        /**
         * <p>Returns the current x location of the left edge of the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.left)
         */
        export function left();

        /**
         * <p>Returns the pixel width of the keyboard.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.width)
         */
        export function width();

        /**
         * <p>Returns true if the keyboard is currently being shown.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-keyboard.isVisible)
         */
        export function isVisible();
    }
}

namespace playdate {
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
         */
        export function lerp();
    }
}

namespace playdate {
    namespace pathfinder {
    }
}

namespace playdate {
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
             */
            function _new();

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
             */
            export function new2DGrid();
        }
    }
}

namespace playdate {
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
         */
        export function writeToFile();

        /**
         * <p>Quits the Playdate Simulator app.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-simulator.exit)
         */
        export function exit();

        /**
         * <p>Returns the contents of the URL <em>url</em> as a string.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-simulator.getURL)
         */
        export function getURL();
    }
}

namespace playdate {
    namespace sound {
        /**
         * <p>Returns the sample rate of the audio system (44100). The sample rate is determined by the hardware, and is not currently mutable.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.getSampleRate)
         */
        export function getSampleRate();

        /**
         * <p>Returns a list of all sources currently playing.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.playingSources)
         */
        export function playingSources();

        /**
         * <p>Adds the given <a href="https://sdk.play.date/2.5.0#C-sound.effect">playdate.sound.effect</a> to the default sound channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.addEffect)
         */
        export function addEffect();

        /**
         * <p>Removes the given effect from the default sound channel.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.removeEffect)
         */
        export function removeEffect();

        /**
         * <p>Returns a pair of booleans (headphone, mic) indicating whether headphones are plugged in, and if so whether they have a microphone attached. If <em>changeCallback</em> is a function, it will be called every time the headphone state changes, until it is cleared by calling <code>playdate.sound.getHeadphoneState(nil)</code>. If a change callback is set, the audio does <strong>not</strong> automatically switch from speaker to headphones when headphones are plugged in (and vice versa), so the callback should use <code>playdate.sound.setOutputsActive()</code> to change the output if needed. The callback is passed two booleans, matching the return values from <code>getHeadphoneState()</code>: the first <code>true</code> if headphones are connect, and the second <code>true</code> if the headphones have a microphone.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-sound.getHeadphoneState"><code>playdate-&gt;sound-&gt;getHeadphoneState()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.getHeadphoneState)
         */
        export function getHeadphoneState();

        /**
         * <p>Forces sound to be played on the headphones or on the speaker, regardless of whether headphones are plugged in or not. (With the caveat that it is not actually possible to play on the headphones if they’re not plugged in.) This function has no effect in the Simulator.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-sound.setOutputsActive"><code>playdate-&gt;sound-&gt;setOutputsActive()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.setOutputsActive)
         */
        export function setOutputsActive();

        /**
         * <p>Returns the current time, in seconds, as measured by the audio device. The audio device uses its own time base in order to provide accurate timing.</p>
         * </div>
         * <div class="paragraph xref xref-c">
         * <p>Equivalent to <a href="./Inside%20Playdate%20with%20C.html#f-sound.getCurrentTime"><code>playdate-&gt;sound-&gt;getCurrentTime()</code></a> in the C API.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.getCurrentTime)
         */
        export function getCurrentTime();

        /**
         * <p>Resets the audio output device time counter.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-sound.resetTime)
         */
        export function resetTime();
    }
}

namespace playdate {
    namespace sound {
        namespace sampleplayer {
            /**
             * <p>Returns a new playdate.sound.sampleplayer object, with the sound data loaded in memory. If the sample can’t be loaded, the function returns nil and a second value containing the error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sampleplayer.new)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns a new playdate.sound.sampleplayer object for playing the given <a href="https://sdk.play.date/2.5.0#C-sound.sample">sample</a>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sampleplayer.new-1)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace fileplayer {
            /**
             * <p>Returns a fileplayer object, which can stream samples from disk. The file to play is set with the <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.load">playdate.sound.fileplayer:load()</a> function.</p>
             * </div>
             * <div class="paragraph">
             * <p>If given, <em>buffersize</em> specifies the size in seconds of the fileplayer’s data buffer. A shorter value reduces the latency of a <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setOffset">playdate.sound.fileplayer:setOffset()</a> call, but increases the chance of a buffer underrun.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.fileplayer.new-empty)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns a fileplayer object for streaming samples from the file at <em>path</em>. Note that the file isn’t loaded until <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.play">playdate.sound.fileplayer:play()</a> or <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setBufferSize">playdate.sound.fileplayer:setBufferSize()</a> is called, in order to reduce initialization overhead.</p>
             * </div>
             * <div class="paragraph">
             * <p>If given, <em>buffersize</em> specifies the size in seconds of the fileplayer’s data buffer. A shorter value reduces the latency of a <a href="https://sdk.play.date/2.5.0#m-sound.fileplayer.setOffset">playdate.sound.fileplayer:setOffset()</a> call, but increases the chance of a buffer underrun.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.fileplayer.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace sample {
            /**
             * <p>Returns a new playdate.sound.sample object, with the sound data loaded in memory. If the sample can’t be loaded, the function returns nil and a second value containing the error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sample.new-path)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns a new playdate.sound.sample object, with a buffer size of <em>seconds</em> in the given format. If <em>format</em> is not specified, it defaults to <a href="https://sdk.play.date/2.5.0#m-sound.sample.getFormat">playdate.sound.kFormat16bitStereo</a>. When used with playdate.sound.sample:load(), this allows you to swap in a different sample without re-allocating the buffer, which could lead to memory fragmentation.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sample.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace channel {
            /**
             * <p>Returns a new channel object and adds it to the global list.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.channel.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace synth {
            /**
             * <p>Returns a new synth object to play a waveform or wavetable. See <a href="https://sdk.play.date/2.5.0#m-sound.synth.setWaveform">playdate.sound.synth:setWaveform</a> for <code>waveform</code> values.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.synth.new_w)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns a new synth object to play a <a href="https://sdk.play.date/2.5.0#C-sound.sample">Sample</a>. An optional sustain region (measured in samples) defines a loop to play while the note is on. Sample data must be uncompressed PCM, not ADPCM.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.synth.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace lfo {
            /**
             * <p>Returns a new LFO object, which can be used to modulate sounds. See <a href="https://sdk.play.date/2.5.0#m-sound.lfo.setType">playdate.sound.lfo:setType()</a> for LFO types.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.lfo.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace envelope {
            /**
             * <p>Creates a new envelope with the given (optional) parameters.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.envelope.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace bitcrusher {
            /**
             * <p>Creates a new bitcrusher filter.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.bitcrusher.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace ringmod {
            /**
             * <p>Creates a new ring modulator filter.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.ringmod.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace onepolefilter {
            /**
             * <p>Returns a new one pole filter.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.onepolefilter.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
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
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace overdrive {
            /**
             * <p>Creates a new overdrive effect.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.overdrive.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace delayline {
            /**
             * <p>Creates a new delay line effect, with the given length (in seconds).</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.delayline.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace sequence {
            /**
             * <p>Creates a new sound sequence. If <code>midi_path</code> is given, it attempts to load data from the midi file into the sequence.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.sequence.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace track {
            /**
             * <p>Creates a new <code>playdate.sound.track</code> object.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.track.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace instrument {
            /**
             * <p>Creates a new <code>playdate.sound.instrument</code> object. If <code>synth</code> is given, adds it as a voice for the instrument.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.instrument.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
        namespace controlsignal {
            /**
             * <p>Creates a new control signal object, for automating effect parameters, channel pan and level, etc.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.controlsignal.new)
             */
            function _new();

            export { _new as new };
        }
    }
}

namespace playdate {
    namespace sound {
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
             */
            export function recordToSample();

            /**
             * <p>Stops a sample recording started with recordToSample, if it hasn’t already reached the end of the buffer. The recording’s completion callback is called immediately.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.stopRecording)
             */
            export function stopRecording();

            /**
             * <p>Starts monitoring the microphone input level. The optional <em>source</em> argument of "headset" or "device" causes the mic input to record from the given source. If no source is given, it uses the headset detection circuit to determine which source to use. The function returns the pair <code>true</code> and a string indicating which source it’s recording from on success, or <code>false</code> on error.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.startListening)
             */
            export function startListening();

            /**
             * <p>Stops monitoring the microphone input level.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.stopListening)
             */
            export function stopListening();

            /**
             * <p>Returns the current microphone input level, a value from 0.0 (quietest) to 1.0 (loudest).</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.getLevel)
             */
            export function getLevel();

            /**
             * <p>Returns the current microphone input source, either "headset" or "device".</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-sound.micinput.getSource)
             */
            export function getSource();
        }
    }
}

namespace playdate {
    namespace string {
        /**
         * <p>Generates a random string of uppercase letters</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.UUID)
         */
        export function UUID();

        /**
         * <p>Returns a string with the whitespace removed from the beginning and ending of <em>string</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.trimWhitespace)
         */
        export function trimWhitespace();

        /**
         * <p>Returns a string with the whitespace removed from the beginning of <em>string</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.trimLeadingWhitespace)
         */
        export function trimLeadingWhitespace();

        /**
         * <p>Returns a string with the whitespace removed from the ending of <em>string</em>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-string.trimTrailingWhitespace)
         */
        export function trimTrailingWhitespace();
    }
}

namespace playdate {
    namespace timer {
        /**
         * <p>This should be called from the main playdate.update() loop to drive the timers.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.updateTimers)
         */
        export function updateTimers();

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
         */
        function _new();

        export { _new as new };

        /**
         * <p>Performs the function <em>callback</em> after <em>delay</em> milliseconds. Accepts a variable number of arguments that will be passed to the callback function when it is called. If arguments are not provided, the timer itself will be passed to the callback instead.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.performAfterDelay)
         */
        export function performAfterDelay();

        /**
         * <p>Returns a new playdate.timer that will run for <em>duration</em> milliseconds. If not specified, <em>startValue</em> and <em>endValue</em> will be 0, and a linear easing function will be used.</p>
         * </div>
         * <div class="paragraph">
         * <p>By default, timers start upon instantiation. To modify the behavior of a timer, see <a href="https://sdk.play.date/2.5.0#C-commonTimerMethods">common timer methods</a> and <a href="https://sdk.play.date/2.5.0#C-commonTimerProperties">properties</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.new2)
         */
        function _new();

        export { _new as new };

        /**
         * <p>Calls <code>keyRepeatTimerWithDelay()</code> below with standard values of <em>delayAfterInitialFiring</em> = 300 and <em>delayAfterSecondFiring</em> = 100.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.keyRepeatTimer)
         */
        export function keyRepeatTimer();

        /**
         * <p>returns a timer that fires at key-repeat intervals. The function <em>callback</em> will be called immediately, then again after <em>delayAfterInitialFiring</em> milliseconds, then repeatedly at <em>delayAfterSecondFiring</em> millisecond intervals.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-timer.keyRepeatTimerWithDelay)
         */
        export function keyRepeatTimerWithDelay();

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
         */
        export function allTimers();
    }
}

namespace playdate {
    namespace frameTimer {
        /**
         * <p>This should be called from the main playdate.update() loop to drive the frame timers.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.updateTimers)
         */
        export function updateTimers();

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
         */
        function _new();

        export { _new as new };

        /**
         * <p>Performs the function <em>callback</em> after the <em>delay</em> number of frames. Accepts a variable number of arguments that will be passed to the callback function when it is called. If arguments are not provided, the timer itself will be passed to the callback instead.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.performAfterDelay)
         */
        export function performAfterDelay();

        /**
         * <p>Returns a new playdate.frameTimer that will run for <em>duration</em> number of frames. If not specified, <em>startValue</em> and <em>endValue</em> will be 0, and a linear easing function will be used.</p>
         * </div>
         * <div class="paragraph">
         * <p>By default, frame timers start upon instantiation. To modify the behavior of a frame timer, see <a href="https://sdk.play.date/2.5.0#C-commonFrameTimerMethods">common frame timer methods</a> and <a href="https://sdk.play.date/2.5.0#C-commonFrameTimerProperties">properties</a>.</p>
         *
         * [Read more](https://sdk.play.date/2.5.0#f-frameTimer.new-value)
         */
        function _new();

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
         */
        export function allTimers();
    }
}

namespace playdate {
    namespace ui {
    }
}

namespace playdate {
    namespace ui {
        namespace gridview {
            /**
             * <p>Returns a new <a href="https://sdk.play.date/2.5.0#C-ui.gridview">playdate.ui.gridview</a> with cells sized <em>cellWidth</em>, <em>cellHeight</em>. (Sizes are in pixels.) If cells should span the entire width of the grid (as in a list view), pass zero (0) for <em>cellWidth</em>.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#f-ui.gridview.new)
             */
            function _new();

            export { _new as new };

            /**
             * <p>Returns the current height of the section headers.</p>
             *
             * [Read more](https://sdk.play.date/2.5.0#m-ui.gridview.getSectionHeaderHeight)
             */
            export function getSectionHeaderHeight();
        }
    }
}
