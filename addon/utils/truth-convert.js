import { isArray } from '@ember/array';

export default function truthConvert(result) {
  const truthy = result && result.isTruthy;
  if (typeof truthy === 'boolean') {
    return truthy;
  }

  if (isArray(result)) {
    return result.length !== 0;
  } else {
    return !!result;
  }
}
