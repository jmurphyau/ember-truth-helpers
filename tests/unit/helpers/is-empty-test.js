import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isEmptyHelper
} from 'ember-truth-helpers/helpers/is-empty';

moduleForComponent('is-empty', 'helper:is-empty', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('is-empty',isEmptyHelper);
    }
  }
});

test('simple test 1', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{is-empty 'not_empty'}}] [{{is-empty ''}}]")
  );

  assert.equal(this.$().text(), '[false] [true]', 'value should be "[false] [true]"');
});