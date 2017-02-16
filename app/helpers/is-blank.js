import Ember from 'ember';
import { isBlankHelper } from 'ember-truth-helpers/helpers/is-blank';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isBlankHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isBlankHelper);
}

export default forExport;
