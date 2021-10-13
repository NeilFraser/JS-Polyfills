
Object.defineProperty(Array, 'isArray', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(obj) {
    // Note that instanceof might not work in cases where multiple iframes
    // create multiple global environments with different Array objects.
    // In such cases, duck typing would be required.
    // http://web.mit.edu/jwalden/www/isArray.html
    return obj instanceof Array;
  }
});

Object.defineProperty(Array.prototype, 'pop', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function() {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (!len || len < 0) {
      o.length = 0;
      return undefined;
    }
    len--;
    var x = o[len];
    delete o[len];  // Needed for non-arrays.
    o.length = len;
    return x;
  }
});

Object.defineProperty(Array.prototype, 'push', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(var_args) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    for (var i = 0; i < arguments.length; i++) {
      o[len] = arguments[i];
      len++;
    }
    o.length = len;
    return len;
  }
});

Object.defineProperty(Array.prototype, 'shift', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function() {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (!len || len < 0) {
      o.length = 0;
      return undefined;
    }
    var value = o[0];
    for (var i = 0; i < len - 1; i++) {
      if ((i + 1) in o) {
        o[i] = o[i + 1];
      } else {
        delete o[i];
      }
    }
    delete o[i];  // Needed for non-arrays.
    o.length = len - 1;
    return value;
  }
});

Object.defineProperty(Array.prototype, 'unshift', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(var_args) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (!len || len < 0) {
      len = 0;
    }
    for (var i = len - 1; i >= 0; i--) {
      if (i in o) {
        o[i + arguments.length] = o[i];
      } else {
        delete o[i + arguments.length];
      }
    }
    for (var i = 0; i < arguments.length; i++) {
      o[i] = arguments[i];
    }
    return o.length = len + arguments.length;
  }
});

Object.defineProperty(Array.prototype, 'reverse', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function() {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (!len || len < 2) {
      return o;  // Not an array, or too short to reverse.
    }
    for (var i = 0; i < len / 2 - 0.5; i++) {
      var x = o[i];
      var hasX = i in o;
      if ((len - i - 1) in o) {
        o[i] = o[len - i - 1];
      } else {
        delete o[i];
      }
      if (hasX) {
        o[len - i - 1] = x;
      } else {
        delete o[len - i - 1];
      }
    }
    return o;
  }
});

Object.defineProperty(Array.prototype, 'indexOf', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(searchElement, fromIndex) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    var n = fromIndex | 0;
    if (!len || n >= len) {
      return -1;
    }
    var i = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (i < len) {
      if (i in o && o[i] === searchElement) {
        return i;
      }
      i++;
    }
    return -1;
  }
});

Object.defineProperty(Array.prototype, 'lastIndexOf', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(searchElement, fromIndex) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (!len) {
      return -1;
    }
    var n = len - 1;
    if (arguments.length > 1) {
      n = fromIndex | 0;
      if (n) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    var i = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
    while (i >= 0) {
      if (i in o && o[i] === searchElement) {
        return i;
      }
      i--;
    }
    return -1;
  }
});

Object.defineProperty(Array.prototype, 'slice', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(start, end) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    // Handle negative value for "start"
    start |= 0;
    start = (start >= 0) ? start : Math.max(0, len + start);
    // Handle negative value for "end"
    if (typeof end !== 'undefined') {
      if (end !== Infinity) {
        end |= 0;
      }
      if (end < 0) {
        end = len + end;
      } else {
        end = Math.min(end, len);
      }
    } else {
      end = len;
    }
    var size = end - start;
    var cloned = new Array(size);
    for (var i = 0; i < size; i++) {
      if ((start + i) in o) {
        cloned[i] = o[start + i];
      }
    }
    return cloned;
  }
});

Object.defineProperty(Array.prototype, 'splice', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(start, deleteCount, var_args) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    start |= 0;
    if (start < 0) {
      start = Math.max(len + start, 0);
    } else {
      start = Math.min(start, len);
    }
    if (arguments.length < 1) {
      deleteCount = len - start;
    } else {
      deleteCount |= 0;
      deleteCount = Math.max(0, Math.min(deleteCount, len - start));
    }
    var removed = [];
    // Remove specified elements.
    for (var i = start; i < start + deleteCount; i++) {
      if (i in o) {
        removed.push(o[i]);
      } else {
        removed.length++;
      }
      if ((i + deleteCount) in o) {
        o[i] = o[i + deleteCount];
      } else {
        delete o[i];
      }
    }
    // Move other element to fill the gap.
    for (var i = start + deleteCount; i < len - deleteCount; i++) {
      if ((i + deleteCount) in o) {
        o[i] = o[i + deleteCount];
      } else {
        delete o[i];
      }
    }
    // Delete superfluous properties.
    for (var i = len - deleteCount; i < len; i++) {
      delete o[i];
    }
    len -= deleteCount;
    // Insert specified items.
    var arl = arguments.length - 2;
    for (var i = len - 1; i >= start; i--) {
      if (i in o) {
        o[i + arl] = o[i];
      } else {
        delete o[i + arl];
      }
    }
    len += arl;
    for (var i = 2; i < arguments.length; i++) {
      o[start + i - 2] = arguments[i];
    }
    o.length = len;
    return removed;
  }
});

Object.defineProperty(Array.prototype, 'concat', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(var_args) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var cloned = [];
    for (var i = -1; i < arguments.length; i++) {
      var value = (i === -1) ? o : arguments[i];
      if (Array.isArray(value)) {
        for (var j = 0, l = value.length; j < l; j++) {
          if (j in value) {
            cloned.push(value[j]);
          } else {
            cloned.length++;
          }
        }
      } else {
        cloned.push(value);
      }
    }
    return cloned;
  }
});

Object.defineProperty(Array.prototype, 'join', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(opt_separator) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var separator = typeof opt_separator === 'undefined' ?
        ',' : ('' + opt_separator);
    var str = '';
    for (var i = 0; i < o.length; i++) {
      if (i && separator) {
        str += separator;
      }
      str += (o[i] === null || o[i] === undefined) ? '' : o[i];
    }
    return str;
  }
});

Object.defineProperty(Array.prototype, 'every', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(callbackfn, thisArg) {
    // Polyfill copied from:
    // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    if (this === null || typeof callbackfn !== 'function') throw TypeError();
    var t, k;
    var o = Object(this);
    var len = o.length >>> 0;
    if (arguments.length > 1) t = thisArg;
    k = 0;
    while (k < len) {
      if (k in o && !callbackfn.call(t, o[k], k, o)) return false;
      k++;
    }
    return true;
  }
});

Object.defineProperty(Array.prototype, 'filter', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(fun, var_args) {
    // Polyfill copied from:
    // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    if (this === void 0 || this === null || typeof fun !== 'function') throw TypeError();
    var o = Object(this);
    var len = o.length >>> 0;
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in o) {
        var val = o[i];
        if (fun.call(thisArg, val, i, o)) res.push(val);
      }
    }
    return res;
  }
});

Object.defineProperty(Array.prototype, 'forEach', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(callback, thisArg) {
    // Polyfill copied from:
    // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    if (this === null || typeof callback !== 'function') throw TypeError();
    var t, k;
    var o = Object(this);
    var len = o.length >>> 0;
    if (arguments.length > 1) t = thisArg;
    k = 0;
    while (k < len) {
      if (k in o) callback.call(t, o[k], k, o);
      k++;
    }
  }
});

Object.defineProperty(Array.prototype, 'map', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(callback, thisArg) {
    // Polyfill copied from:
    // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    if (this === null || typeof callback !== 'function') throw TypeError();
    var t, a, k;
    var o = Object(this);
    var len = o.length >>> 0;
    if (arguments.length > 1) t = thisArg;
    a = new Array(len);
    k = 0;
    while (k < len) {
      if (k in o) a[k] = callback.call(t, o[k], k, o);
      k++;
    }
    return a;
  }
});

Object.defineProperty(Array.prototype, 'reduce', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(callback /*, initialValue*/) {
    // Polyfill copied from:
    // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    if (this === null || typeof callback !== 'function') throw TypeError();
    var o = Object(this), len = o.length >>> 0, k = 0, value;
    if (arguments.length === 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in o)) k++;
      if (k >= len) {
        throw TypeError('Reduce of empty array with no initial value');
      }
      value = o[k++];
    }
    for (; k < len; k++) {
      if (k in o) value = callback(value, o[k], k, o);
    }
    return value;
  }
});

Object.defineProperty(Array.prototype, 'reduceRight', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(callback /*, initialValue*/) {
    // Polyfill copied from:
    // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
    if (null === this || 'undefined' === typeof this || 'function' !== typeof callback) throw TypeError();
    var o = Object(this), len = o.length >>> 0, k = len - 1, value;
    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      while (k >= 0 && !(k in o)) k--;
      if (k < 0) {
        throw TypeError('Reduce of empty array with no initial value');
      }
      value = o[k--];
    }
    for (; k >= 0; k--) {
      if (k in o) value = callback(value, o[k], k, o);
    }
    return value;
  }
});

Object.defineProperty(Array.prototype, 'some', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(fun/*, thisArg*/) {
    // Polyfill copied from:
    // developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    if (this === null || typeof fun !== 'function') throw TypeError();
    var o = Object(this);
    var len = o.length >>> 0;
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in o && fun.call(thisArg, o[i], i, o)) {
        return true;
      }
    }
    return false;
  }
});

Object.defineProperty(Array.prototype, 'sort', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(opt_comp) {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    if (typeof opt_comp !== 'function') {
      opt_comp = undefined;
    }
    // TODO: Switch to any algorithm other than bubble sort.
    for (var i = 0; i < this.length; i++) {
      var changes = 0;
      for (var j = 0; j < this.length - i - 1; j++) {
        if (opt_comp ? (opt_comp(this[j], this[j + 1]) > 0) :
            (String(this[j]) > String(this[j + 1]))) {
          var swap = this[j];
          var hasSwap = j in this;
          if ((j + 1) in this) {
            this[j] = this[j + 1];
          } else {
            delete this[j];
          }
          if (hasSwap) {
            this[j + 1] = swap;
          } else {
            delete this[j + 1];
          }
          changes++;
        }
      }
      if (!changes) break;
    }
    return this;
  }
});

Object.defineProperty(Array.prototype, 'toLocaleString', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function() {
    if (!this) {
      throw TypeError('"this" is null or undefined');
    }
    var o = Object(this);
    var out = [];
    for (var i = 0; i < o.length; i++) {
      out[i] = (o[i] === null || o[i] === undefined) ? '' : o[i].toLocaleString();
    }
    return out.join(',');
  }
});
