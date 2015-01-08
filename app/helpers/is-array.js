import Ember from 'ember';
import isArrayHelper from 'ember-truth-helpers/helpers/is-array';

export { isArrayHelper };

export default Ember.HTMLBars.makeBoundHelper(isArrayHelper);
