import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  orHelper
} from 'ember-truth-helpers/helpers/or';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('or', 'helper:or', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('or',orHelper);
    }
  }
});

test('simple test 1', function(assert) {
  this.render(
    hbs("[{{or true 1 ' ' null undefined}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 2', function(assert) {
  this.render(
    hbs("[{{or null undefined true 1 ' '}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});


test('simple test 3', function(assert) {
  this.render(
    hbs("[{{or false}}] [{{or true}}] [{{or 1}}] [{{or ''}}] [{{or false ''}}] [{{or true ''}}] [{{or '' true}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [1] [] [] [true] [true]', 'value should be "[false] [true] [1] [] [] [true] [true]"');
});

test('simple test 4', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });

  this.set('contextChild', fakeContextObject);

  this.render(
    hbs("[{{or contextChild.valueA}}] [{{or contextChild.valueB}}] [{{or contextChild.valueB contextChild.valueA}}] [{{or contextChild.valueA contextChild.valueB}}]")
  );

  assert.equal(this.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');

  Ember.run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(this.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');

  Ember.run(fakeContextObject, 'set', 'valueA', '');
  assert.equal(this.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');

  Ember.run(fakeContextObject, 'set', 'valueA', ' ');
  assert.equal(this.$().text(), '[ ] [] [ ] [ ]', 'value should be "[ ] [] [ ] [ ]"');

  Ember.run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(this.$().text(), '[ ] [yellow] [yellow] [ ]', 'value should be "[ ] [yellow] [yellow] [ ]"');

});
