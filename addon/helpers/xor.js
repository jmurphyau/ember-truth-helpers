import truthConvert from '../utils/truth-convert';

export function xorHelper(params) {
  return truthConvert(params[0]) !== truthConvert(params[1]);
}
