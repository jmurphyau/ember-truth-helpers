import Ember from 'ember';
import { lteHelper } from 'ember-truth-helpers/helpers/lte';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(lteHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(lteHelper);
}

export default forExport;
