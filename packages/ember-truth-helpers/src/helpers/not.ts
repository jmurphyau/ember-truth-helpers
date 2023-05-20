import { helper } from '@ember/component/helper';
import truthConvert from '../utils/truth-convert';
import type { MaybeTruth } from '../utils/truth-convert';

export interface NotSignature {
  Args: {
    Positional: MaybeTruth[];
  };
  Return: boolean;
}

export default helper<NotSignature>((params) => {
  return params.every((param) => !truthConvert(param));
});
