import Ember from 'ember';
import { gteHelper } from 'ember-truth-helpers/helpers/gte';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(gteHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(gteHelper);
}

export default forExport;
