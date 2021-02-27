'use strict';

var difference = require('../../lib/difference');
var expect = require('chai').expect;
var { it, describe } = require('mocha');

describe('difference', function() {
  it('finds the difference between 2 arrays', function() {
    var a = ['foo', 'bar', 'baz'];
    var b = ['bar', 'baz', 'qux'];
    var expectedResult = ['foo'];
    var result = difference(a, b);

    expect(result).to.eql(expectedResult);
  });

  it('finds the difference between 2 arrays', function() {
    var a = ['foo', 'bar', 'baz'];
    var b = ['bar', 'baz', 'qux'];
    var expectedResult = ['qux'];
    var result = difference(b, a);

    expect(result).to.eql(expectedResult);
  });
});
