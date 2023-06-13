import { helper } from '@ember/component/helper';

export interface NotEqSignature {
  Args: {
    Positional: [unknown, unknown];
  };
  Return: boolean;
}

export default helper<NotEqSignature>((params) => {
  return params[0] !== params[1];
});
