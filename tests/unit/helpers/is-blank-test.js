import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isBlankHelper
} from 'ember-truth-helpers/helpers/is-blank';

moduleForComponent('is-blank', 'helper:is-blank', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('is-blank', isBlankHelper);
    }
  }
});

test('simple test 1', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{is-blank '    '}}] [{{is-blank 'not blank'}}]")
  );

  assert.equal(this.$().text(), '[true] [false]', 'value should be "[true] [false]"');
});
