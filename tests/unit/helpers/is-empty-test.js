import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isEmpty as isEmptyHelper
} from 'ember-truth-helpers/helpers/is-empty';

moduleForComponent('is-empty', 'helper:is-empty', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('is-empty', isEmptyHelper);
    }
  }
});

test('uses isEmpty', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{is-empty []}}] [{{is-empty ''}}] [{{is-empty false}}] [{{is-empty 12}}]")
  );

  assert.equal(this.$().text(), '[true] [true] [false] [false]', 'value should be "[true] [true] [false] [false]"');
});
