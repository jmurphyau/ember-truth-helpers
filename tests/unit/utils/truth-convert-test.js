import { module, test } from 'qunit';
import truthConvert from 'ember-truth-helpers/utils/truth-convert';

module('truthConvert', function () {
  // Replace this with your real tests.
  test('bool: true', function (assert) {
    assert.true(truthConvert(true));
  });
  test('bool: false', function (assert) {
    assert.false(truthConvert(false));
  });

  test('int: -1', function (assert) {
    assert.true(truthConvert(-1));
  });
  test('int: 0', function (assert) {
    assert.false(truthConvert(0));
  });
  test('int: 1', function (assert) {
    assert.true(truthConvert(1));
  });

  test('string: ""', function (assert) {
    assert.false(truthConvert(''));
  });
  test('string: " "', function (assert) {
    assert.true(truthConvert(' '));
  });
  test('string: "."', function (assert) {
    assert.true(truthConvert('.'));
  });

  test('null/undefined: null', function (assert) {
    assert.false(truthConvert(null));
  });
  test('null/undefined: undefined', function (assert) {
    assert.false(truthConvert(undefined));
  });

  test('array: []', function (assert) {
    assert.false(truthConvert([]));
  });
  test('array: [""]', function (assert) {
    assert.true(truthConvert(['']));
  });
  test('array: [0]', function (assert) {
    assert.true(truthConvert([0]));
  });
  test('array: [false]', function (assert) {
    assert.true(truthConvert([false]));
  });
  test('array: [true]', function (assert) {
    assert.true(truthConvert([true]));
  });
});
