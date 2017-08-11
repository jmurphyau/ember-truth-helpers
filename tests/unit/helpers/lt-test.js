import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  ltHelper
} from 'ember-truth-helpers/helpers/lt';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lt', 'helper:lt', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('lt', ltHelper);
    }
  }
});

// Replace this with your real tests.
test('boolean values', function(assert) {
  this.render(
    hbs("[{{lt true true}}] [{{lt true false}}] [{{lt false true}}] [{{lt false false}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('integer values', function(assert) {
  this.render(
    hbs("[{{lt 1 1}}] [{{lt 1 0}}] [{{lt 0 1}}] [{{lt 0 0}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('decimal values', function(assert) {
  this.render(
    hbs("[{{lt 19.2 19.2}}] [{{lt 19.2 3.55}}] [{{lt 3.55 19.2}}] [{{lt 3.55 3.55}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('integers in strings 1', function(assert) {
  this.render(
    hbs("[{{lt '1' '1' forceNumber=true}}] [{{lt '1' '0' forceNumber=true}}] [{{lt '0' '1' forceNumber=true}}] [{{lt '0' '0' forceNumber=true}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('integers in strings 2', function(assert) {
  this.render(
    hbs("[{{lt '102' '102' forceNumber=true}}] [{{lt '102' '98' forceNumber=true}}] [{{lt '98' '102' forceNumber=true}}] [{{lt '98' '98' forceNumber=true}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('decimals in strings', function(assert) {
  this.render(
    hbs("[{{lt '19.2' '19.2' forceNumber=true}}] [{{lt '19.2' '3.55' forceNumber=true}}] [{{lt '3.55' '19.2' forceNumber=true}}] [{{lt '3.55' '3.55' forceNumber=true}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});
