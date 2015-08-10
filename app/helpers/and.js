import Ember from 'ember';
import { andHelper } from 'ember-truth-helpers/helpers/and';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(andHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(andHelper);
}

export default forExport;
