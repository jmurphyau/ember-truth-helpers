import truthConvert from '../utils/truth-convert.js';

function xor(left, right) {
  return truthConvert(left) !== truthConvert(right);
}

export { xor as default };
//# sourceMappingURL=xor.js.map
