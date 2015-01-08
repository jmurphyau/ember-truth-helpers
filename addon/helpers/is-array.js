import Ember from 'ember';

export function isArrayHelper(params) {
  for (var i=0, len=params.length; i<len; i++) {
    if (Ember.isArray(params[i]) === false) {
      return false;
    }
  }
  return true;
}