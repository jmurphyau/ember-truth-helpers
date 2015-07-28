import Ember from 'ember';
import { module, test } from 'qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  equalHelper
} from 'ember-truth-helpers/helpers/equal';

module('EqualHelper', {
  beforeEach: function() {
    registerHelper('eq',equalHelper);
  }
});

test('simple test 1', function(assert) {
  var view = Ember.Component.create({
    layout: Ember.HTMLBars.compile("[{{eq true true}}] [{{eq true false}}] [{{eq false true}}] [{{eq false false}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [false] [false] [true]', 'value should be "[true] [false] [false] [true]"');
});

test('simple test 2', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });

  var view = Ember.Component.create({
    contextChild: fakeContextObject,
    layout: Ember.HTMLBars.compile("[{{eq contextChild.valueA contextChild.valueB}}] [{{eq contextChild.valueB contextChild.valueA}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  Ember.run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(view.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueB', undefined);
  assert.equal(view.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  Ember.run(fakeContextObject, 'set', 'valueA', 'yellow');
  Ember.run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(view.$().text(), '[true] [true]', 'value should be "[true] [true]"');

});
