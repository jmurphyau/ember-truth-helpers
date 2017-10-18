import { helper } from '@ember/component/helper';
import { isArray as emberIsArray } from '@ember/array';

export function isArray(params) {
  for (let i=0, len=params.length; i<len; i++) {
    if (emberIsArray(params[i]) === false) {
      return false;
    }
  }
  return true;
}

export default helper(isArray);
