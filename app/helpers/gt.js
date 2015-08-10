import Ember from 'ember';
import { gtHelper } from 'ember-truth-helpers/helpers/gt';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(gtHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(gtHelper);
}

export default forExport;
