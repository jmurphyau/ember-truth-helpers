import truthConvert, { type MaybeTruthy } from '../utils/truth-convert.ts';

export default function not(...params: MaybeTruthy[]) {
  return params.every((param) => !truthConvert(param));
}
