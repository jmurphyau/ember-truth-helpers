import Ember from 'ember';

export function isArray(params) {
  for (var i=0, len=params.length; i<len; i++) {
    if (Ember.isArray(params[i]) === false) {
      return false;
    }
  }
  return true;
}

export default Ember.Helper.helper(isArray);
