import Ember from 'ember';

export function isEmptyHelper(params) {
  return Ember.isEmpty(params[0]);
}