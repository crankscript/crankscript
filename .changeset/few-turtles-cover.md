---
"@crankscript/types": major
---

Add types for version 2.7.6

BREAKING: enums for Playdate constants are being dropped because
they cause more issues than they solve. Simply use the native constants.

Before:

`playdate.graphics.clear(PlaydateColor.Black);`

After:

`playdate.graphics.clear(playdate.graphics.kColorBlack);`

This is valid starting from version 2.7.6.