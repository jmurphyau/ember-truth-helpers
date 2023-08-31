import Helper from '@ember/component/helper';
import truthConvert from '../utils/truth-convert.ts';

interface AndSignature<T extends unknown[]> {
  Args: {
    Positional: T;
  };
  Return: T[number];
}

export default class AndHelper<T extends unknown[]> extends Helper<
  AndSignature<T>
> {
  public compute(params: T): T[number] {
    for (let i = 0, len = params.length; i < len; i++) {
      if (truthConvert(params[i]) === false) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
}
