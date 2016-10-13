import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isEvenHelper
} from 'ember-truth-helpers/helpers/is-even';

moduleForComponent('is-even', 'helper:is-even', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('is-even', isEvenHelper);
    }
  }
});

test('works with numbers', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{is-even 2}}] [{{is-even 1}}]")
  );

  assert.equal(this.$().text(), '[true] [false]', 'value should be "[true] [false]"');
});
