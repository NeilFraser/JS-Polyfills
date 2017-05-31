# JS Polyfills

This collection of polyfills recreates much of the JavaScript 5.1 standard
library, such as parseInt, Array.prototype.pop and Math.abs.

Most developers will have no need for this library since every JavaScript
implementation already includes these functions.  However, if you are building
a new JavaScript interpreter, then this collection of over 50 polyfills will
reduce the number of native code functions you will need to write.

Limitations:

 * At this time there is no support for Date or RegExp.
 * JSON is not covered due to the existing
[JSON2](https://github.com/douglascrockford/JSON-js) and
[JSON3](https://bestiejs.github.io/json3/) polyfills.
 * Performance is pretty poor, particularly for String's substring and
 Array's shift/unshift.
 * Only JavaScript 5.1 is being targeted, plenty of existing polyfills are
 available for functionality introduced in higher versions.
