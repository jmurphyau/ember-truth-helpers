import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  gtHelper
} from 'ember-truth-helpers/helpers/gt';

moduleForComponent('gt', 'helper:gt', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('gt', gtHelper);
    }
  }
});

test('boolean values', function(assert) {
  this.render(
    hbs`[{{gt true true}}] [{{gt true false}}] [{{gt false true}}] [{{gt false false}}]`
  );

  assert.equal(this.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('integer values', function(assert) {
  this.render(
    hbs`[{{gt 1 1}}] [{{gt 1 0}}] [{{gt 0 1}}] [{{gt 0 0}}]`
  );

  assert.equal(this.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('decimal values', function(assert) {
  this.render(
    hbs`[{{gt 19.2 19.2}}] [{{gt 19.2 3.55}}] [{{gt 3.55 19.2}}] [{{gt 3.55 3.55}}]`
  );

  assert.equal(this.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('integers in strings 1', function(assert) {
  this.render(
    hbs`[{{gt '1' '1' forceNumber=true}}] [{{gt '1' '0' forceNumber=true}}] [{{gt '0' '1' forceNumber=true}}] [{{gt '0' '0' forceNumber=true}}]`
  );

  assert.equal(this.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('integers in strings 2', function(assert) {
  this.render(
    hbs`[{{gt '102' '102' forceNumber=true}}] [{{gt '102' '98' forceNumber=true}}] [{{gt '98' '102' forceNumber=true}}] [{{gt '98' '98' forceNumber=true}}]`
  );

  assert.equal(this.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('decimals in strings', function(assert) {
  this.render(
    hbs`[{{gt '19.2' '19.2' forceNumber=true}}] [{{gt '19.2' '3.55' forceNumber=true}}] [{{gt '3.55' '19.2' forceNumber=true}}] [{{gt '3.55' '3.55' forceNumber=true}}]`
  );

  assert.equal(this.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});
