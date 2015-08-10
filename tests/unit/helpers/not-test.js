import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  notHelper
} from 'ember-truth-helpers/helpers/not';

moduleForComponent('not', 'helper:not', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('not',notHelper);
    }
  }
});

test('simple test 1', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{not true}}] [{{not false}}] [{{not null}}] [{{not undefined}}] [{{not ''}}] [{{not ' '}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [true] [true] [true] [false]', 'value should be "[false] [true] [true] [true] [true] [false]"');
});

test('simple test 2', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{not true false}}] [{{not true false}}] [{{not null null false null}}] [{{not false null ' ' true}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});
