import truthConvert from '../utils/truth-convert.ts';
import Helper from '@ember/component/helper';

interface OrSignature<T extends unknown[]> {
  Args: {
    Positional: T;
  };
  Return: T[number];
}

export default class OrHelper<T extends unknown[]> extends Helper<
  OrSignature<T>
> {
  public compute(params: T): T[number] {
    for (let i = 0, len = params.length; i < len; i++) {
      if (truthConvert(params[i]) === true) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
}
