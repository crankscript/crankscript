# @crankscript/types

## 2.0.0

### Major Changes

- [#77](https://github.com/crankscript/crankscript/pull/77) [`a9c82c2`](https://github.com/crankscript/crankscript/commit/a9c82c258c2a97ee578d1f52a57ffb46cecb5a3b) Thanks [@alberteddu](https://github.com/alberteddu)! - Add types for version 2.7.6

  BREAKING: enums for Playdate constants are being dropped because
  they cause more issues than they solve. Simply use the native constants.

  Before:

  `playdate.graphics.clear(PlaydateColor.Black);`

  After:

  `playdate.graphics.clear(playdate.graphics.kColorBlack);`

  This is valid starting from version 2.7.6.

### Patch Changes

- [#77](https://github.com/crankscript/crankscript/pull/77) [`a9c82c2`](https://github.com/crankscript/crankscript/commit/a9c82c258c2a97ee578d1f52a57ffb46cecb5a3b) Thanks [@alberteddu](https://github.com/alberteddu)! - Fixed an issue where callbacks would be transpiled with an implicit `self` argument

- Updated dependencies [[`a9c82c2`](https://github.com/crankscript/crankscript/commit/a9c82c258c2a97ee578d1f52a57ffb46cecb5a3b)]:
  - @crankscript/core@0.3.1

## 1.1.0

### Minor Changes

- [`111f7f8`](https://github.com/crankscript/crankscript/commit/111f7f89dda1976bf12411ed56e62e849453abe3) Thanks [@alberteddu](https://github.com/alberteddu)! - add types for 2.7.5 and fix 2.7.4

## 1.0.0

### Minor Changes

- [#66](https://github.com/crankscript/crankscript/pull/66) [`d25e342`](https://github.com/crankscript/crankscript/commit/d25e3427ea07c4a6c4f76931f89f2a5a2e2c7a4f) Thanks [@alberteddu](https://github.com/alberteddu)! - update types to Playdate SDK 2.7.4

### Patch Changes

- Updated dependencies [[`d25e342`](https://github.com/crankscript/crankscript/commit/d25e3427ea07c4a6c4f76931f89f2a5a2e2c7a4f)]:
  - @crankscript/core@0.3.0
