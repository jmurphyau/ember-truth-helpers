import Ember from 'ember';
import { isEvenHelper } from 'ember-truth-helpers/helpers/is-even';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isEvenHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isEvenHelper);
}

export default forExport;
