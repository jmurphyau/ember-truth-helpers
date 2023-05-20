import { helper } from '@ember/component/helper';
import { isArray } from '@ember/array';
import type EmberArray from '@ember/array';

export interface IsArraySignature {
  Args: {
    Positional: unknown[] | EmberArray<unknown>;
  };
  Return: boolean;
}

export default helper<IsArraySignature>((params) => {
  return params.every(isArray);
});
