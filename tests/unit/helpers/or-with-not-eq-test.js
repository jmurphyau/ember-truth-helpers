import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  orHelper
} from 'ember-truth-helpers/helpers/or';
import {
  notEqHelper
} from 'ember-truth-helpers/helpers/not-equal';


moduleForComponent('or', 'helper:or', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('or',orHelper);
      registerHelper('not-eq',notEqHelper);
    }
  }
});

test('simple test 1', function(assert) {
  this.render(
    hbs`[{{or (not-eq true false) (not-eq true false)}}]`
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 2', function(assert) {
  this.render(
    hbs`[{{or (not-eq true true) (not-eq false false)}}]`
  );

  assert.equal(this.$().text(), '[false]', 'value should be "[true]"');
});

test('simple test 3', function(assert) {
  this.render(
    hbs`[{{or (not-eq true true) (not-eq true false)}}]`
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 4', function(assert) {
  this.render(
    hbs`[{{or (not-eq true false) (not-eq false false)}}]`
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 5', function(assert) {
  this.render(
    hbs`[{{#if (or (not-eq true false) (not-eq false false))}}true{{else}}false{{/if}}]`
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});
