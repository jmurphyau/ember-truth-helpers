import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';
import {
  isEmpty as isEmptyHelper
} from 'ember-truth-helpers/helpers/is-empty';

moduleForComponent('is-empty', 'helper:is-empty', {
  integration: true,
  beforeEach: function() {
    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (!Ember.Helper) {
      registerHelper('is-empty', isEmptyHelper);
    }
  }
});

test('it works with array operations', function(assert) {
  let contextChild = Ember.Object.create({
    someArray: null
  });
  this.set('contextChild', contextChild);

  this.render(
    Ember.HTMLBars.compile("{{is-empty contextChild.someArray}}")
  );

  assert.equal(this.$().text(), 'true', 'value is "true" when the passed in value is null');

  Ember.run(contextChild, 'set', 'someArray', []);
  assert.equal(this.$().text(), 'true', 'value is "true" for an empty array');

  let someObject = Ember.Object.create({ foo: 'bar' });
  Ember.run(contextChild, 'set', 'someArray', [someObject]);
  assert.equal(this.$().text(), 'false', 'value is "false" for a non-empty array');

  Ember.run(contextChild, 'set', 'someArray', []);
  assert.equal(this.$().text(), 'true', 'value is "true" for an empty array');
});

test('it works with string operations', function(assert) {
  let contextChild = Ember.Object.create({
    someString: ''
  });
  this.set('contextChild', contextChild);

  this.render(
    Ember.HTMLBars.compile("{{is-empty contextChild.someString}}")
  );

  assert.equal(this.$().text(), 'true', 'value is "true" for an empty string');

  Ember.run(contextChild, 'set', 'someString', ' ');
  assert.equal(this.$().text(), 'false', 'value is "false" for a string with a single space');
});

test('it works with booleans', function(assert) {
  let contextChild = Ember.Object.create({
    /* someValue is intentionally undefined */
  });
  this.set('contextChild', contextChild);

  this.render(
    Ember.HTMLBars.compile("{{is-empty contextChild.someValue}}")
  );

  assert.equal(this.$().text(), 'true', 'value is "true" for an uninitialized variable');

  Ember.run(contextChild, 'set', 'someValue', true);
  assert.equal(this.$().text(), 'false', 'value is "false" when checking if "false" is empty');

  Ember.run(contextChild, 'set', 'someValue', false);
  assert.equal(this.$().text(), 'false', 'value is "false" when checking if "true" is empty');
});
