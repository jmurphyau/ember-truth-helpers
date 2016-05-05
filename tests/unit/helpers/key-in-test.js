import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  keyIn
} from 'ember-truth-helpers/helpers/key-in';

moduleForComponent('key-in', 'helper:key-in', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('key-in', keyIn);
    }
  }
});

test('boolean values', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null
  });
  this.set('contextChild', fakeContextObject);
  this.render(
    Ember.HTMLBars.compile("[{{key-in 'valueA' contextChild}}] [{{key-in 'valueB' contextChild}}]")
  );

  assert.equal(this.$().text(), '[true] [false]', 'value should be "[true] [false]"');
});
