import truthConvert from '../utils/truth-convert.ts';
import type { MaybeTruth } from '../utils/truth-convert.ts';

export default function or<T extends MaybeTruth[]>(...params: [...T]) {
  for (let i = 0, len = params.length; i < len; i++) {
    if (truthConvert(params[i]) === true) {
      return params[i] as FirstNonFalsy<T>;
    }
  }
  return params[params.length - 1] as Last<T>;
}

type FirstNonFalsy<T extends any[]> = T extends [infer K]
  ? K
  : T extends [infer A, ...infer R]
  ? Truthy<A> extends true
    ? A
    : FirstNonFalsy<R>
  : never;

type Last<T extends any[]> = T extends [infer K]
  ? K
  : T extends [...infer Q, infer L]
  ? L
  : never;

type Truthy<T> = T extends Falsy ? false : true;

type Falsy = false | 0 | '' | null | undefined | { isTruthy: false } | [];
