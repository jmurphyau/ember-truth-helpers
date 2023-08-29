import truthConvert from '../utils/truth-convert.ts';
import type { MaybeTruth } from '../utils/truth-convert.ts';

export default function and<T extends MaybeTruth[]>(...params: [...T]) {
  for (let i = 0, len = params.length; i < len; i++) {
    if (truthConvert(params[i]) === false) {
      return params[i] as boolean;
    }
  }
  return params[params.length - 1] as boolean;
}
