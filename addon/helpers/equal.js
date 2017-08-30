import Ember from 'ember';

export function equal(params) {
  return params[0] === params[1];
}

export default Ember.Helper.helper(equal);
