import Ember from 'ember';
import { isEmptyHelper } from 'ember-truth-helpers/helpers/is-empty';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(isEmptyHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(isEmptyHelper);
}

export default forExport;
