import Ember from 'ember';
import { xorHelper } from 'ember-truth-helpers/helpers/xor';

var forExport = null;

if (Ember.Helper) {
  forExport = Ember.Helper.helper(xorHelper);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(xorHelper);
}

export default forExport;
