
// The length of an array or array-like object, or undefined for anything else.
function arrayLength(value) {
  if (Array.isArray(value)) {
    return value.length;
  }

  // `in` first: reading a missing key on an Ember proxy throws in development.
  if (typeof value !== 'object' || value === null || 'setInterval' in value || value instanceof String || !('length' in value)) {
    return undefined;
  }
  const {
    length
  } = value;
  if (typeof length !== 'number' || Number.isNaN(length) || Object.prototype.toString.call(value) === '[object FileList]') {
    return undefined;
  }
  return length;
}
function isArray(value) {
  return arrayLength(value) !== undefined;
}

export { arrayLength, isArray as default };
//# sourceMappingURL=is-array.js.map
