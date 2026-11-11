
// Like `get()`: an Ember proxy answers through `unknownProperty`, and a plain read throws in development.
function read(object, key) {
  if (key in object) {
    return object[key];
  }
  const {
    unknownProperty
  } = object;
  return typeof unknownProperty === 'function' ? unknownProperty.call(object, key) : undefined;
}
function isEmpty(value) {
  if (value === null || value === undefined) {
    return true;
  }
  const object = Object(value);
  const size = read(object, 'size');
  if (typeof size === 'number') {
    return !size;
  }
  if (typeof value !== 'function') {
    const length = read(object, 'length');
    if (typeof length === 'number') {
      return !length;
    }
  }
  return false;
}

export { isEmpty as default };
//# sourceMappingURL=is-empty.js.map
