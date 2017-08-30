import Ember from 'ember';
import truthConvert from '../utils/truth-convert';

export function and(params) {
  for (var i=0, len=params.length; i<len; i++) {
    if (truthConvert(params[i]) === false) {
      return params[i];
    }
  }
  return params[params.length-1];
}

export default Ember.Helper.helper(and);
