import { isArray as isArray$1 } from '@ember/array';

function isArray(...params) {
  return params.every(isArray$1);
}

export { isArray as default };
//# sourceMappingURL=is-array.js.map
