function lte(left, right, options) {
  if (options?.forceNumber) {
    if (typeof left !== 'number') {
      left = Number(left);
    }
    if (typeof right !== 'number') {
      right = Number(right);
    }
  }
  return left <= right;
}

export { lte as default };
//# sourceMappingURL=lte.js.map
