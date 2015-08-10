import Ember from 'ember';
import { notHelper } from 'ember-truth-helpers/helpers/not';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(notHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(notHelper);
}

export default forExport;
