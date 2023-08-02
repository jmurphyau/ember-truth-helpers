import { helper } from '@ember/component/helper';
import truthConvert from '../utils/truth-convert.ts';

export interface XorSignature {
  Args: {
    Positional: [unknown, unknown];
  };
  Return: boolean;
}

export default helper<XorSignature>((params) => {
  return truthConvert(params[0]) !== truthConvert(params[1]);
});
