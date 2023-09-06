import truthConvert from '../utils/truth-convert.ts';

export default function not(...params: unknown[]) {
  return params.every((param) => !truthConvert(param));
}
