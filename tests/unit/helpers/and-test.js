import Ember from 'ember';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  andHelper
} from 'ember-truth-helpers/helpers/and';

module('AndHelper', {
  beforeEach: function() {
    registerHelper('and',andHelper);
  }
});

// Replace this with your real tests.
test('boolean values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{and true true}}] [{{and true false}}] [{{and false true}}] [{{and false false}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [false] [false] [false]', 'value should be "[true] [false] [false] [false]"');
});

test('integer values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{and 1 1}}] [{{and 1 0}}] [{{and 0 1}}] [{{and 0 0}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[1] [0] [0] [0]', 'value should be "[1] [0] [0] [0]"');
});

test('string values', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile('[{{and " " " "}}] [{{and " " ""}}] [{{and "" " "}}] [{{and "" ""}}]'),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[ ] [] [] []', 'value should be "[ ] [] [] []"');
});
