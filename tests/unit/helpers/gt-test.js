import Ember from 'ember';
import { module, test } from 'qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  gtHelper
} from 'ember-truth-helpers/helpers/gt';

module('GtHelper', {
  beforeEach: function() {
    registerHelper('gt', gtHelper);
  }
});

// Replace this with your real tests.
test('boolean values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gt true true}}] [{{gt true false}}] [{{gt false true}}] [{{gt false false}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('integer values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gt 1 1}}] [{{gt 1 0}}] [{{gt 0 1}}] [{{gt 0 0}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('decimal values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gt 19.2 19.2}}] [{{gt 19.2 3.55}}] [{{gt 3.55 19.2}}] [{{gt 3.55 3.55}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('integers in strings 1', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gt '1' '1' forceNumber=true}}] [{{gt '1' '0' forceNumber=true}}] [{{gt '0' '1' forceNumber=true}}] [{{gt '0' '0' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('integers in strings 2', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gt '102' '102' forceNumber=true}}] [{{gt '102' '98' forceNumber=true}}] [{{gt '98' '102' forceNumber=true}}] [{{gt '98' '98' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

test('decimals in strings', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{gt '19.2' '19.2' forceNumber=true}}] [{{gt '19.2' '3.55' forceNumber=true}}] [{{gt '3.55' '19.2' forceNumber=true}}] [{{gt '3.55' '3.55' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [false] [false]', 'value should be "[false] [true] [false] [false]"');
});

// test('string values', function(assert) {
//   var view = Ember.View.create({
//     template: Ember.HTMLBars.compile('[{{and " " " "}}] [{{and " " ""}}] [{{and "" " "}}] [{{and "" ""}}]'),
//   });
//
//   Ember.run(view, 'appendTo', '#ember-testing');
//
//   assert.equal(view.$().text(), '[ ] [] [] []', 'value should be "[ ] [] [] []"');
// });
