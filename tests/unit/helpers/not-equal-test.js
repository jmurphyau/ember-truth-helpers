import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  notEqualHelper
} from 'ember-truth-helpers/helpers/not-equal';

moduleForComponent('not-eq', 'helper:not-eq', {
  integration: true,
  beforeEach: function() {
    if (!this.registry || !this.registry.has('helper:not-eq')) {
      registerHelper('not-eq', notEqualHelper);
    }
  }
});

test('simple test 1', function(assert) {
  this.render(
    Ember.HTMLBars.compile("[{{not-eq true true}}] [{{not-eq true false}}] [{{not-eq false true}}] [{{not-eq false false}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
});

test('simple test 2', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });

  this.set('contextChild', fakeContextObject);

  this.render(
    Ember.HTMLBars.compile("[{{not-eq contextChild.valueA contextChild.valueB}}] [{{not-eq contextChild.valueB contextChild.valueA}}]")
  );

  assert.equal(this.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  Ember.run(fakeContextObject, 'set', 'valueB', undefined);
  assert.equal(this.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueA', 'yellow');
  Ember.run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(this.$().text(), '[false] [false]', 'value should be "[false] [false]"');

});
