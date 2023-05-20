import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export interface IsEmptySignature {
  Args: {
    Positional: [unknown];
  };
  Return: boolean;
}

export default helper<IsEmptySignature>(([obj]) => {
  return isEmpty(obj);
});
