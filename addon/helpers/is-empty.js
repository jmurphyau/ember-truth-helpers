import Ember from 'ember';
const { isEmpty: emberIsEmpty } = Ember;

export function isEmpty(params) {
  console.debug('params', params);
  let firstParam = params[0];
  return emberIsEmpty(firstParam);
}

export default Ember.Helper.helper(isEmpty);
