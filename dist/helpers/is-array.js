
import isArray$1 from '../utils/is-array.js';

function isArray(...params) {
  return params.every(isArray$1);
}

export { isArray as default };
//# sourceMappingURL=is-array.js.map
