import Ember from 'ember';
const { isEqual } = Ember;

export function equalHelper([a, b]) {
  return isEqual(a, b) || isEqual(b, a);
}
