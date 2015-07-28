import Ember from 'ember';
import { module, test } from 'qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  ltHelper
} from 'ember-truth-helpers/helpers/lt';

module('LtHelper', {
  beforeEach: function() {
    registerHelper('lt', ltHelper);
  }
});

// Replace this with your real tests.
test('boolean values', function(assert) {
  var view = Ember.Component.create({
    layout: Ember.HTMLBars.compile("[{{lt true true}}] [{{lt true false}}] [{{lt false true}}] [{{lt false false}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('integer values', function(assert) {
  var view = Ember.Component.create({
    layout: Ember.HTMLBars.compile("[{{lt 1 1}}] [{{lt 1 0}}] [{{lt 0 1}}] [{{lt 0 0}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('decimal values', function(assert) {
  var view = Ember.Component.create({
    layout: Ember.HTMLBars.compile("[{{lt 19.2 19.2}}] [{{lt 19.2 3.55}}] [{{lt 3.55 19.2}}] [{{lt 3.55 3.55}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('integers in strings 1', function(assert) {
  var view = Ember.Component.create({
    layout: Ember.HTMLBars.compile("[{{lt '1' '1' forceNumber=true}}] [{{lt '1' '0' forceNumber=true}}] [{{lt '0' '1' forceNumber=true}}] [{{lt '0' '0' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('integers in strings 2', function(assert) {
  var view = Ember.Component.create({
    layout: Ember.HTMLBars.compile("[{{lt '102' '102' forceNumber=true}}] [{{lt '102' '98' forceNumber=true}}] [{{lt '98' '102' forceNumber=true}}] [{{lt '98' '98' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});

test('decimals in strings', function(assert) {
  var view = Ember.Component.create({
    layout: Ember.HTMLBars.compile("[{{lt '19.2' '19.2' forceNumber=true}}] [{{lt '19.2' '3.55' forceNumber=true}}] [{{lt '3.55' '19.2' forceNumber=true}}] [{{lt '3.55' '3.55' forceNumber=true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});
