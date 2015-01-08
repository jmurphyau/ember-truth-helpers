import truthConvert from 'ember-truth-helpers/utils/truth-convert';

module('truthConvert');

// Replace this with your real tests.
test('bool: true', function() { equal(truthConvert(true), true); });
test('bool: false', function() { equal(truthConvert(false), false); });

test('int: -1', function() { equal(truthConvert(-1), true); });
test('int: 0', function() { equal(truthConvert(0), false); });
test('int: 1', function() { equal(truthConvert(1), true); });

test('string: ""', function() { equal(truthConvert(""), false); });
test('string: " "', function() { equal(truthConvert(" "), true); });
test('string: "."', function() { equal(truthConvert("."), true); });

test('null/undefined: null', function() { equal(truthConvert(null), false); });
test('null/undefined: undefined', function() { equal(truthConvert(undefined), false); });

test('array: []', function() { equal(truthConvert([]), false); });
test('array: [""]', function() { equal(truthConvert([""]), true); });
test('array: [0]', function() { equal(truthConvert([0]), true); });
test('array: [false]', function() { equal(truthConvert([false]), true); });
test('array: [true]', function() { equal(truthConvert([true]), true); });