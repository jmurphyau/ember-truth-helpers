import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  xorHelper
} from 'ember-truth-helpers/helpers/xor';

moduleForComponent('xor', 'helper:xor', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('xor', xorHelper);
    }
  }
});

test('boolean values', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{xor true true}}] [{{xor true false}}] [{{xor false true}}] [{{xor false false}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
});
