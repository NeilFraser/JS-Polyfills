Object.defineProperty(Function.prototype, 'bind', {
  configurable: true,
  writable: true,
  value: function bind(oThis) {
    // Polyfill copied from:
    // developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    if (typeof this !== 'function') {
      throw TypeError('What is trying to be bound is not callable');
    }
    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };
    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();
    return fBound;
  }
});

Object.defineProperty(Function.prototype, 'call', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(thisArg, var_args) {
    if (typeof this !== 'function') {
      throw TypeError('this is not a function');
    }
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    return this.apply(thisArg, args);
  }
});
