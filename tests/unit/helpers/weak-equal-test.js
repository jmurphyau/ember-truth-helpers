import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  weakEqualHelper
} from 'ember-truth-helpers/helpers/weak-equal';

moduleForComponent('weq', 'helper:weq', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('weq',weakEqualHelper);
    }
  }
});

test('simple test 1', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{weq true true}}] [{{weq true false}}] [{{weq false true}}] [{{weq false false}}] [{{weq 1 1}}] [{{weq 1 '1'}}]")
  );

  assert.equal(this.$().text(), '[true] [false] [false] [true]', 'value should be "[true] [false] [false] [true] [true] [true]"');
});

test('simple test 2', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });

  this.set('contextChild', fakeContextObject);

  this.render(
    Ember.HTMLBars.compile("[{{weq contextChild.valueA contextChild.valueB}}] [{{weq contextChild.valueB contextChild.valueA}}]")
  );

  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  Ember.run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  Ember.run(fakeContextObject, 'set', 'valueB', undefined);
  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  Ember.run(fakeContextObject, 'set', 'valueA', 'yellow');
  Ember.run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

});
