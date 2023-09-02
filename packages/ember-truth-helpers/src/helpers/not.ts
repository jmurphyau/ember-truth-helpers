import truthConvert from '../utils/truth-convert.ts';
import type { MaybeTruth } from '../utils/truth-convert.ts';

export default function not(...params: MaybeTruth[]) {
  return params.every((param) => !truthConvert(param));
}
