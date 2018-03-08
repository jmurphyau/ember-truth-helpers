import { module, test } from 'qunit';
import truthConvert from 'ember-truth-helpers/utils/truth-convert';

module('truthConvert', function() {
  // Replace this with your real tests.
  test('bool: true', function(assert) { assert.equal(truthConvert(true), true); });
  test('bool: false', function(assert) { assert.equal(truthConvert(false), false); });

  test('int: -1', function(assert) { assert.equal(truthConvert(-1), true); });
  test('int: 0', function(assert) { assert.equal(truthConvert(0), false); });
  test('int: 1', function(assert) { assert.equal(truthConvert(1), true); });

  test('string: ""', function(assert) { assert.equal(truthConvert(""), false); });
  test('string: " "', function(assert) { assert.equal(truthConvert(" "), true); });
  test('string: "."', function(assert) { assert.equal(truthConvert("."), true); });

  test('null/undefined: null', function(assert) { assert.equal(truthConvert(null), false); });
  test('null/undefined: undefined', function(assert) { assert.equal(truthConvert(undefined), false); });

  test('array: []', function(assert) { assert.equal(truthConvert([]), false); });
  test('array: [""]', function(assert) { assert.equal(truthConvert([""]), true); });
  test('array: [0]', function(assert) { assert.equal(truthConvert([0]), true); });
  test('array: [false]', function(assert) { assert.equal(truthConvert([false]), true); });
  test('array: [true]', function(assert) { assert.equal(truthConvert([true]), true); });
});