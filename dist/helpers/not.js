import truthConvert from '../utils/truth-convert.js';

function not(...params) {
  return params.every(param => !truthConvert(param));
}

export { not as default };
//# sourceMappingURL=not.js.map
