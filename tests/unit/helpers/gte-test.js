import Ember from 'ember';
import { module, test } from 'qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  gteHelper
} from 'ember-truth-helpers/helpers/gte';

module('GteHelper', {
  beforeEach: function() {
    registerHelper('gte', gteHelper);
  }
});

// Replace this with your real tests.
test('boolean values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gte true true}}] [{{gte true false}}] [{{gte false true}}] [{{gte false false}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [true] [false] [true]', 'value should be "[false] [true] [false] [true]"');
});

test('integer values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gte 1 1}}] [{{gte 1 0}}] [{{gte 0 1}}] [{{gte 0 0}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('decimal values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gte 19.2 19.2}}] [{{gte 19.2 3.55}}] [{{gte 3.55 19.2}}] [{{gte 3.55 3.55}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('integers in strings 1', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gte '1' '1' forceNumber=true}}] [{{gte '1' '0' forceNumber=true}}] [{{gte '0' '1' forceNumber=true}}] [{{gte '0' '0' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('integers in strings 2', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gte '102' '102' forceNumber=true}}] [{{gte '102' '98' forceNumber=true}}] [{{gte '98' '102' forceNumber=true}}] [{{gte '98' '98' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('decimals in strings', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gte '19.2' '19.2' forceNumber=true}}] [{{gte '19.2' '3.55' forceNumber=true}}] [{{gte '3.55' '19.2' forceNumber=true}}] [{{gte '3.55' '3.55' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});
