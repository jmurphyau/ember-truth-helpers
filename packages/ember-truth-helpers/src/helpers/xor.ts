import truthConvert from '../utils/truth-convert.ts';

export default function xor(left: unknown, right: unknown) {
  return truthConvert(left) !== truthConvert(right);
}
