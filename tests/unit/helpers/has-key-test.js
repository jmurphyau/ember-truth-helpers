import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  hasKey
} from 'ember-truth-helpers/helpers/has-key';

moduleForComponent('has-key', 'helper:has-key', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('has-key', hasKey);
    }
  }
});

test('boolean values', function(assert) {
  var fakeContextObject = Ember.Object.create({
    valueA: null
  });
  this.set('contextChild', fakeContextObject);
  this.render(
    Ember.HTMLBars.compile("[{{has-key contextChild 'valueA'}}] [{{has-key contextChild 'valueB'}}]")
  );

  assert.equal(this.$().text(), '[true] [false]', 'value should be "[true] [false]"');
});
