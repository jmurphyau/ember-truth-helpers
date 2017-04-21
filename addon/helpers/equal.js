import Ember from 'ember';

export function equalHelper(params) {
  Ember.Logger.warn(areParamsSameType(params));

  return params[0] === params[1];
}

function areParamsSameType(params) {
  const types = [];

  params.forEach(param => {
    const type = Ember.typeOf(param);
    if (!types.includes(type) && ![null, undefined].includes(type)) {
      types.push(type);
    }
  });

  if (types.get('length') > 1) {
    return `Strong equal of parameters with different types (${types.join(', ')}).`;
  }
}
