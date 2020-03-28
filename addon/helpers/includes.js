import { helper } from '@ember/component/helper';

export function includes([haystack, pin]) {
  if (!haystack || haystack.constructor.name !== 'Array') {
    return false;
  }

  return haystack.includes(pin);
}

export default helper(includes);
