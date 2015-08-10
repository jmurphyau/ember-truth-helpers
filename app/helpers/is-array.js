import Ember from 'ember';
import { isArrayHelper } from 'ember-truth-helpers/helpers/is-array';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isArrayHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isArrayHelper);
}

export default forExport;
