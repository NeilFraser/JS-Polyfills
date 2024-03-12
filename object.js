
Object.defineProperty(Object, 'keys', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(obj) {
    if (typeof obj !== 'function' && (typeof obj !== 'object' || !obj)) {
      throw TypeError('Object.keys called on non-object');
    }
    var keys = [];
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        keys.push(prop);
      }
    }
    return keys;
  }
});

Object.defineProperty(Object, 'defineProperties', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(obj, props) {
    if (typeof obj !== 'function' && (typeof obj !== 'object' || !obj)) {
      throw TypeError('Object.defineProperties called on non-object');
    }
    if (props === undefined || props === null) {
      throw TypeError('Cannot convert undefined or null to object');
    }
    props = Object(props);
    var keys = Object.keys(props);
    for (var i = 0; i < keys.length; i++) {
      Object.defineProperty(obj, keys[i], props[keys[i]]);
    }
    return obj;
  }
});

Object.defineProperty(Object.prototype, 'isPrototypeOf', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(obj) {
    var child = Object.getPrototypeOf(obj);
    while (child) {
      if (child == this) {
        return true;
      }
      child = Object.getPrototypeOf(child);
    }
    return false;
  }
});

Object.defineProperty(Object.prototype, 'toLocaleString', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function() {
    return this.toString();
  }
});
