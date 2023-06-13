import { helper } from '@ember/component/helper';
import { isEqual } from '@ember/utils';

export interface IsEqualSignature {
  Args: {
    Positional: [unknown, unknown];
  };
  Return: boolean;
}

export default helper<IsEqualSignature>(([a, b]) => {
  return isEqual(a, b);
});
