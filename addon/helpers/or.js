import truthConvert from '../utils/truth-convert';

export function orHelper(params) {
  for (var i=0, len=params.length; i<len; i++) {
    if (truthConvert(params[i]) === true) {
      return params[i];
    }
  }
  return params[params.length-1];
}
