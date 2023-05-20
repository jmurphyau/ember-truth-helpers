import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export interface IsEmptySignature {
  Args: {
    Positional: [object];
  };
  Return: boolean;
}

export default helper<IsEmptySignature>(([obj]) => {
  return isEmpty(obj);
});
