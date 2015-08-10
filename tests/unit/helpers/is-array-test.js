import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isArrayHelper
} from 'ember-truth-helpers/helpers/is-array';

moduleForComponent('is-array', 'helper:is-array', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('is-array',isArrayHelper);
    }
  }
});

test('simple test 1', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null,
    valueB: null
  });
  this.set('contextChild', fakeContextObject);

  this.render(
    Ember.HTMLBars.compile("[{{is-array contextChild.valueA}}] [{{is-array contextChild.valueB}}] [{{is-array contextChild.valueA contextChild.valueB}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [false]', 'value should be "[false] [false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueA', []);
  assert.equal(this.$().text(), '[true] [false] [false]', 'value should be "[true] [false] [false]"');

  Ember.run(fakeContextObject, 'set', 'valueB', []);
  assert.equal(this.$().text(), '[true] [true] [true]', 'value should be "[true] [true] [true]"');
});
