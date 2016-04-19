import Ember from 'ember';
export { keyIn } from 'ember-truth-helpers/helpers/key-in';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(keyIn);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(keyIn);
}

export default forExport;
