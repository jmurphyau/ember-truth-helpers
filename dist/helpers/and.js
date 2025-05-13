import Helper from '@ember/component/helper';
import truthConvert from '../utils/truth-convert.js';

// We use class-based helper to ensure arguments are lazy-evaluated
// and helper short-circuits like native JavaScript `&&` (logical AND).
class AndHelper extends Helper {
  compute(params) {
    for (let i = 0, len = params.length; i < len; i++) {
      if (truthConvert(params[i]) === false) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
}

export { AndHelper as default };
//# sourceMappingURL=and.js.map
