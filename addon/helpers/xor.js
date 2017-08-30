import Ember from 'ember';
import truthConvert from '../utils/truth-convert';

export function xor(params) {
  return truthConvert(params[0]) !== truthConvert(params[1]);
}

export default Ember.Helper.helper(xor);
