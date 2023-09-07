import truthConvert, {
  MaybeTruthy,
  TruthConvert,
} from '../utils/truth-convert.ts';
import Helper from '@ember/component/helper';

type FirstTruthy<T> = T extends [infer Item]
  ? Item
  : T extends [infer Head, ...infer Tail]
  ? TruthConvert<Head> extends true
    ? Head
    : TruthConvert<Head> extends false
    ? FirstTruthy<Tail>
    : Head | FirstTruthy<Tail>
  : undefined;

interface OrSignature<T extends MaybeTruthy[]> {
  Args: {
    Positional: T;
  };
  Return: FirstTruthy<T>;
}

// We use class-based helper to ensure arguments are lazy-evaluated
// and helper short-circuits like native JavaScript `||` (logical OR).
export default class OrHelper<T extends MaybeTruthy[]> extends Helper<
  OrSignature<T>
> {
  public compute(params: T): FirstTruthy<T>;
  public compute(params: T) {
    for (let i = 0, len = params.length; i < len; i++) {
      if (truthConvert(params[i]) === true) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
}
