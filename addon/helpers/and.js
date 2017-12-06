import { helper } from '@ember/component/helper';
import truthConvert from '../utils/truth-convert';

export function and(params) {
  for (let i=0, len=params.length; i<len; i++) {
    if (truthConvert(params[i]) === false) {
      return false;
    }
  }
  return true;
}

export default helper(and);
