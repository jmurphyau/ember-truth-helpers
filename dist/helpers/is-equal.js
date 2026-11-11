
function hasIsEqual(value) {
  return Boolean(value) && typeof value.isEqual === 'function';
}
function isEqual(a, b) {
  if (hasIsEqual(a)) {
    return a.isEqual(b);
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  return a === b;
}

export { isEqual as default };
//# sourceMappingURL=is-equal.js.map
