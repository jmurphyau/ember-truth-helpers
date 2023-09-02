import Helper from '@ember/component/helper';
import truthConvert from '../utils/truth-convert.ts';

interface AndSignature<T extends unknown[]> {
  Args: {
    Positional: T;
  };
  Return: NonNullable<T[number]>;
}

// We use class-based helper to ensure arguments are lazy-evaluated
// and helper short-circuits like native JavaScript `&&` (logical AND).
export default class AndHelper<T extends unknown[]> extends Helper<
  AndSignature<T>
> {
  public compute(params: T): NonNullable<T[number]> {
    for (let i = 0, len = params.length; i < len; i++) {
      if (truthConvert(params[i]) === false) {
        return params[i] as NonNullable<T[number]>;
      }
    }
    return params[params.length - 1] as NonNullable<T[number]>;
  }
}
