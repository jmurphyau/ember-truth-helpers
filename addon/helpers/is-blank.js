import Ember from 'ember';

export function isBlankHelper(params) {
  return Ember.isBlank(params[0]);
}
