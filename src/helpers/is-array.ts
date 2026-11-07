import isArrayLike from '../utils/is-array.ts';

export default function isArray(...params: unknown[]) {
  return params.every(isArrayLike);
}
