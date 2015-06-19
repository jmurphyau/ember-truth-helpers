import Ember from 'ember';
import { module, test } from 'qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  notEqualHelper
} from 'ember-truth-helpers/helpers/not-equal';

module('NotEqualHelper', {
  beforeEach: function() {
    registerHelper('not-eq', notEqualHelper);
  }
});

test('simple test 1', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{not-eq true true}}] [{{not-eq true false}}] [{{not-eq false true}}] [{{not-eq false false}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
});

test('simple test 2', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });

  var view = Ember.View.create({
    context: {
      contextChild: fakeContextObject
    },
    template: Ember.HTMLBars.compile("[{{not-eq contextChild.valueA contextChild.valueB}}] [{{not-eq contextChild.valueB contextChild.valueA}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(view.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  Ember.run(fakeContextObject, 'set', 'valueB', undefined);
  assert.equal(view.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueA', 'yellow');
  Ember.run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(view.$().text(), '[false] [false]', 'value should be "[false] [false]"');

});
