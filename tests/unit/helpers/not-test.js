import Ember from 'ember';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  notHelper
} from 'ember-truth-helpers/helpers/not';

module('NotHelper', {
  beforeEach: function() {
    registerHelper('not',notHelper);
  }
});

test('simple test 1', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{not true}}] [{{not false}}] [{{not null}}] [{{not undefined}}] [{{not ''}}] [{{not ' '}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [true] [true] [true] [true] [false]', 'value should be "[false] [true] [true] [true] [true] [false]"');
});

test('simple test 2', function(assert) {
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{not true false}}] [{{not true false}}] [{{not null null false null}}] [{{not false null ' ' true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  assert.equal(view.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});
