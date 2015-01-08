import Ember from 'ember';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  orHelper
} from 'ember-truth-helpers/helpers/or';

module('OrHelper');

test('simple test 1', function() {
  registerHelper('or',orHelper);

  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{or true 1 ' ' null undefined}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  equal(view.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 2', function() {
  registerHelper('or',orHelper);

  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{or null undefined true 1 ' '}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  equal(view.$().text(), '[true]', 'value should be "[true]"');
});


test('simple test 3', function() {
  registerHelper('or',orHelper);
  
  var view = Ember.View.create({
    template: Ember.HTMLBars.compile("[{{or false}}] [{{or true}}] [{{or 1}}] [{{or ''}}] [{{or false ''}}] [{{or true ''}}] [{{or '' true}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  equal(view.$().text(), '[false] [true] [1] [] [] [true] [true]', 'value should be "[false] [true] [1] [] [] [true] [true]"');
});

test('simple test 4', function() {
  registerHelper('or',orHelper);
  
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });
  
  var view = Ember.View.create({
    context: {
      contextChild: fakeContextObject
    },
    template: Ember.HTMLBars.compile("[{{or contextChild.valueA}}] [{{or contextChild.valueB}}] [{{or contextChild.valueB contextChild.valueA}}] [{{or contextChild.valueA contextChild.valueB}}]"),
  });

  Ember.run(view, 'appendTo', '#ember-testing');

  equal(view.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');
  
  Ember.run(fakeContextObject, 'set', 'valueA', undefined);
  equal(view.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');
  
  Ember.run(fakeContextObject, 'set', 'valueA', '');
  equal(view.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');
  
  Ember.run(fakeContextObject, 'set', 'valueA', ' ');
  equal(view.$().text(), '[ ] [] [ ] [ ]', 'value should be "[ ] [] [ ] [ ]"');
  
  Ember.run(fakeContextObject, 'set', 'valueB', 'yellow');
  equal(view.$().text(), '[ ] [yellow] [yellow] [ ]', 'value should be "[ ] [yellow] [yellow] [ ]"');
  
});


