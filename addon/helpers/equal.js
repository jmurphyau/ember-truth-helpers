import { helper } from '@ember/component/helper';

export function equal([first, ...rest]) {
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] !== first) {
      return false;
    }
  }

  return true;
}

export default helper(equal);
