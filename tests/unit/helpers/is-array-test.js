import Ember from 'ember';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isArrayHelper
} from 'ember-truth-helpers/helpers/is-array';

module('IsArrayHelper', {
  beforeEach: function() {
    registerHelper('is-array',isArrayHelper);
  }
});

test('simple test 1', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });

  var view = Ember.View.create({
    context: {
      contextChild: fakeContextObject
    },
    template: Ember.HTMLBars.compile("[{{is-array contextChild.valueA}}] [{{is-array contextChild.valueB}}] [{{is-array contextChild.valueA contextChild.valueB}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [false]', 'value should be "[false] [false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueA', []);
  assert.equal(view.$().text(), '[true] [false] [false]', 'value should be "[true] [false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueB', []);
  assert.equal(view.$().text(), '[true] [true] [true]', 'value should be "[true] [true] [true]"');
});
