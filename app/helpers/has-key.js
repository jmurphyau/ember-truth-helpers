import Ember from 'ember';
export { hasKey } from 'ember-truth-helpers/helpers/has-key';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(hasKey);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(hasKey);
}

export default forExport;
