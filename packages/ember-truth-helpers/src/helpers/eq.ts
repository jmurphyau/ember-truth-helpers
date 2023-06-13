import { helper } from '@ember/component/helper';

export interface EqSignature {
  Args: {
    Positional: [unknown, unknown];
  };
  Return: boolean;
}

export default helper<EqSignature>((params) => {
  return params[0] === params[1];
});
