
import { arrayLength } from './is-array.js';

// We check here in the order of the following function to maintain parity
// Note that this will not handle EmberArray correctly.
// We don't use Falsy since we want to be able to more definitively determine
// truthy results.

// We also have to do individual overloads for each specific type so that we
// don't lose specificity.

function truthConvert(result) {
  if (typeof result === 'object' && result && 'isTruthy' in result && typeof result.isTruthy === 'boolean') {
    return result.isTruthy;
  }
  const length = arrayLength(result);
  return length === undefined ? !!result : length !== 0;
}

export { truthConvert as default };
//# sourceMappingURL=truth-convert.js.map
