import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isEqual as isEqualHelper
} from 'ember-truth-helpers/helpers/is-equal';

moduleForComponent('is-equal', 'helper:is-equal', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('is-equal', isEqualHelper);
    }
  }
});

test('uses isEqual', function(assert) {
  this.set('complex', {
    isEqual(value) {
      return 12 === value;
    }
  });

  this.render(
    hbs`[{{is-equal complex 12}}] [{{is-equal complex 13}}] [{{is-equal 13 complex}}] [{{is-equal 12 complex}}]`
  );

  assert.equal(this.$().text(), '[true] [false] [false] [false]', 'value should be "[true] [false] [false] [false]"');
});
