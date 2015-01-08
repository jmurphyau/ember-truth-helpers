import Ember from 'ember';
import equalHelper from 'ember-truth-helpers/helpers/equal';

export { equalHelper };

export default Ember.HTMLBars.makeBoundHelper(equalHelper);
