import Ember from 'ember';
const { isEqual: emberIsEqual } = Ember;

export function isEqual([a, b]) {
  return emberIsEqual(a, b);
}

export default Ember.Helper.helper(isEqual);
