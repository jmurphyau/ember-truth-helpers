import { helper } from '@ember/component/helper';

export function lt([left, right], hash) {
  if (hash.forceNumber) {
    if (typeof left !== 'number') { left = Number(left); }
    if (typeof right !== 'number') { right = Number(right); }
  }
  return left < right;
}

export default helper(lt);
