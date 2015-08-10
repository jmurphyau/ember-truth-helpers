import Ember from 'ember';
import { notEqualHelper } from 'ember-truth-helpers/helpers/not-equal';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(notEqualHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(notEqualHelper);
}

export default forExport;
