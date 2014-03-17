'use strict';

var assert = require('assert');
var matrix = require('../lib/matrix');

describe('Array.matrix', function() {
  it('should create an 2d array', function() {
    var mat = matrix(2, 3);

    assert(Array.isArray(mat), 'matrix should be an array');
    assert.equal(mat.length, 2);
    mat.forEach(function(row) {
      assert(Array.isArray(row), 'matrix should be an array');
      assert.equal(row.length, 3);

      row.forEach(function(val) {
        assert.equal(val, 0, 'default val should be 0');
      });
    });
  });

  it('should set to initial value', function() {
    var mat = matrix(2, 3, 1);

    mat.forEach(function(row) {
      row.forEach(function(val) {
        assert.equal(val, 1, 'init val should be 1');
      });
    });
  });
});
