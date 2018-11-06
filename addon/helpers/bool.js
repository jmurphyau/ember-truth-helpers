import { helper } from '@ember/component/helper';

export function bool(params) {
  return Boolean(params[0]);
}

export default helper(bool);
