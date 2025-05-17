import Helper from '@ember/component/helper';
import truthConvert, {
  type MaybeTruthy,
  type TruthConvert,
} from '../utils/truth-convert.ts';

type FirstFalsy<T> = T extends [infer Item]
  ? Item
  : T extends [infer Head, ...infer Tail]
  ? TruthConvert<Head> extends false
    ? Head
    : TruthConvert<Head> extends true
    ? FirstFalsy<Tail>
    : Head | FirstFalsy<Tail>
  : undefined;

interface AndSignature<T extends MaybeTruthy[]> {
  Args: {
    Positional: T;
  };
  Return: FirstFalsy<T>;
}

// We use class-based helper to ensure arguments are lazy-evaluated
// and helper short-circuits like native JavaScript `&&` (logical AND).
export default class AndHelper<const T extends MaybeTruthy[]> extends Helper<
  AndSignature<T>
> {
  public compute(params: T): FirstFalsy<T>;
  public compute(params: T) {
    for (let i = 0, len = params.length; i < len; i++) {
      if (truthConvert(params[i]) === false) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
}
