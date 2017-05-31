
Object.defineProperty(Math, 'abs', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(x) {
    x -= 0;
    return x > 0 ? x : (x < 0 ? -x : (x === 0 ? 0 : NaN));
  }
});

Object.defineProperty(Math, 'ceil', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(x) {
    x -= 0;
    if (!isFinite(x)) {
      return x;  // +/- Infinity and NaN.
    }
    var trunc = x | 0;
    if (!trunc && (x < 0 || (!x && (1 / x == -Infinity)))) {
      trunc = -0;  // -0 is different than 0.
    }
    return (trunc < x && x > 0) ? trunc + 1 : trunc;
  }
});

Object.defineProperty(Math, 'exp', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(x) {
    return Math.pow(Math.E, x);
  }
});

Object.defineProperty(Math, 'floor', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(x) {
    x -= 0;
    if (!isFinite(x)) {
      return x;  // +/- Infinity and NaN.
    }
    var trunc = x | 0;
    if (trunc == x) {
      return x;  // -0 is different than 0.
    }
    return (trunc > x && x < 0) ? trunc - 1 : trunc;
  }
});

Object.defineProperty(Math, 'max', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(var_args) {
    var max = -Infinity;
    for (var i = 0; i < arguments.length; i++) {
      var n = arguments[i] - 0;
      if (isNaN(n)) {
        return NaN;
      }
      if (n > max) {
        max = n;
      } else if (!n && !max && (1 / n == Infinity)) {
        max = 0;  // 0 is bigger than -0.
      }
    }
    return max;
  }
});

Object.defineProperty(Math, 'min', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(var_args) {
    var min = Infinity;
    for (var i = 0; i < arguments.length; i++) {
      var n = arguments[i] - 0;
      if (isNaN(n)) {
        return NaN;
      }
      if (n < min) {
        min = n;
      } else if (!n && !min && (1 / n == -Infinity)) {
        min = -0;  // -0 is smaller than 0.
      }
    }
    return min;
  }
});

Object.defineProperty(Math, 'round', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(x) {
    x -= 0;
    if (!isFinite(x)) {
      return x;  // +/- Infinity and NaN.
    }
    if (x > 0) {  // Positive numbers round .5 numbers up.
      return (x + 0.5) | 0;
    }
    if (!x) {  // Preserve -0 vs 0.
      return x;
    }
    if (x >= -0.5) {  // Rounding up to 0 results in -0.
      return -0;
    }
    var trunc = (x - 0.5) | 0;
    if (trunc + 0.5 == x) {
      // Negative numbers round .5 numbers towards 0.
      trunc++;
    }
    return trunc;
  }
});
