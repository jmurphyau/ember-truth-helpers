import Ember from 'ember';
import { weakEqualHelper } from 'ember-truth-helpers/helpers/weak-equal';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(weakEqualHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(weakEqualHelper);
}

export default forExport;
