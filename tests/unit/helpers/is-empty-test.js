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
  let someArray = Ember.A([]);
  this.set('someArray', someArray);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someArray}}")
  );

  assert.equal(this.$().text(), 'true', 'value is "true" for an empty array');

  // add an object to the array
  let someObject = Ember.Object.create({ foo: 'bar' });
  someArray.push(someObject);
  this.set('someArray', someArray);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someArray}}")
  );

  assert.equal(this.$().text(), 'false', 'value is "false" for a non-empty array');

  // remove the object from the array
  someArray.removeObject(someObject);
  this.set('someArray', someArray);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someArray}}")
  );

  assert.equal(this.$().text(), 'true', 'value is "true" for an empty array');
});

test('it works with string operations', function(assert) {
  let someString = '';
  this.set('someString', someString);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someString}}")
  );

  assert.equal(this.$().text(), 'true', 'value is "true" for an empty string');

  someString = ' ';
  this.set('someString', someString);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someString}}")
  );

  assert.equal(this.$().text(), 'false', 'value is "false" for a string with a single space');
});

test('it works with booleans', function(assert) {
  let someValue;
  this.set('someValue', someValue);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someValue}}")
  );

  assert.equal(this.$().text(), 'true', 'value is "true" for an uninitialized variable');

  someValue = false;
  this.set('someValue', someValue);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someValue}}")
  );

  assert.equal(this.$().text(), 'false', 'value is "false" when checking if "false" is empty');

  someValue = true;
  this.set('someValue', someValue);

  this.render(
    Ember.HTMLBars.compile("{{is-empty someValue}}")
  );

  assert.equal(this.$().text(), 'false', 'value is "false" when checking if "true" is empty');
});
