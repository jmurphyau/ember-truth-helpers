import truthConvert from '../utils/truth-convert.js';
import Helper from '@ember/component/helper';

// We use class-based helper to ensure arguments are lazy-evaluated
// and helper short-circuits like native JavaScript `||` (logical OR).
class OrHelper extends Helper {
  compute(params) {
    for (let i = 0, len = params.length; i < len; i++) {
      if (truthConvert(params[i]) === true) {
        return params[i];
      }
    }
    return params[params.length - 1];
  }
}

export { OrHelper as default };
//# sourceMappingURL=or.js.map
