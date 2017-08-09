import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  lteHelper
} from 'ember-truth-helpers/helpers/lte';

moduleForComponent('lte', 'helper:lte', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('lte', lteHelper);
    }
  }
});

// Replace this with your real tests.
test('boolean values', function(assert) {
  this.render(
    hbs`[{{lte true true}}] [{{lte true false}}] [{{lte false true}}] [{{lte false false}}]`
  );

  assert.equal(this.$().text(), '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
});

test('integer values', function(assert) {
  this.render(
    hbs`[{{lte 1 1}}] [{{lte 1 0}}] [{{lte 0 1}}] [{{lte 0 0}}]`
  );

  assert.equal(this.$().text(), '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
});

test('decimal values', function(assert) {
  this.render(
    hbs`[{{lte 19.2 19.2}}] [{{lte 19.2 3.55}}] [{{lte 3.55 19.2}}] [{{lte 3.55 3.55}}]`
  );

  assert.equal(this.$().text(), '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
});

test('integers in strings 1', function(assert) {
  this.render(
    hbs`[{{lte '1' '1' forceNumber=true}}] [{{lte '1' '0' forceNumber=true}}] [{{lte '0' '1' forceNumber=true}}] [{{lte '0' '0' forceNumber=true}}]`
  );

  assert.equal(this.$().text(), '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
});

test('integers in strings 2', function(assert) {
  this.render(
    hbs`[{{lte '102' '102' forceNumber=true}}] [{{lte '102' '98' forceNumber=true}}] [{{lte '98' '102' forceNumber=true}}] [{{lte '98' '98' forceNumber=true}}]`
  );

  assert.equal(this.$().text(), '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
});

test('decimals in strings', function(assert) {
  this.render(
    hbs`[{{lte '19.2' '19.2' forceNumber=true}}] [{{lte '19.2' '3.55' forceNumber=true}}] [{{lte '3.55' '19.2' forceNumber=true}}] [{{lte '3.55' '3.55' forceNumber=true}}]`
  );

  assert.equal(this.$().text(), '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
});
