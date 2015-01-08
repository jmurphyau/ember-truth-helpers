import Ember from 'ember';

export default function truthConvert(result) {
  var truthy = result && Ember.get(result, 'isTruthy');
  if (typeof truthy === 'boolean') { return truthy; }

  if (Ember.isArray(result)) {
    return Ember.get(result, 'length') !== 0;
  } else {
    return !!result;
  }
}