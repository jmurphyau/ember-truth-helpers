import { helper } from '@ember/component/helper';

export function notEqualHelper(params) {
  return params[0] !== params[1];
}

export default helper(notEqualHelper);
