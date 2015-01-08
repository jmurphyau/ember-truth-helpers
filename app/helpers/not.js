import Ember from 'ember';
import notHelper from 'ember-truth-helpers/helpers/not';

export { notHelper };

export default Ember.HTMLBars.makeBoundHelper(notHelper);
