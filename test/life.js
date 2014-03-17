/* jshint unused: false */
'use strict';

var life = require('../lib/life');
var _ = require('lodash');
var should = require('chai').should();

var test = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

var expct = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

describe('life', function() {
  describe('#init', function() {
    it('should return a new matrix', function() {
      var m = life.init(10, 5);

      m.should.be.instanceof.Array;
      m.forEach(function(row) {
        row.should.be.instanceof.Array;
      });
    });
  });

  describe('#size', function() {
    it('should return an array of size 2', function() {
      var m = life.init(3, 2);
      var size = life.getSize(m);
      var height = _.first(size);
      var width = _.last(size);
      size.length.should.equal(2);
      height.should.equal(3);
      width.should.equal(2);
    });
  });

  describe('#isAlive', function() {
    it('should return if alive or not', function() {
      var truthy = [[1]];
      var falsey = [[0]];
      life.isAlive(truthy, 0, 0).should.be.true;
      life.isAlive(falsey, 0, 0).should.be.false;
    });
  });

  describe('#getNumAliveNeighbors', function() {
    it('should return number of alive neighbors', function() {
      life.getNumAliveNeighbors(test, 1, 1).should.equal(2);
      life.getNumAliveNeighbors(test, 0, 0).should.equal(0);
      life.getNumAliveNeighbors(test, 0, 2).should.equal(1);
      life.getNumAliveNeighbors(test, 3, 3).should.equal(2);
    });
  });

  describe('#tick', function() {
    it('should update the map based on life\'s rules', function() {
      // This shape should reverse after being run on itself
      var usage = life.tick(test);
      usage.should.deep.equal(expct);
      life.tick(usage).should.deep.equal(test);
    });
  });

  describe('#random', function() {
    it('should be filled with random numbers', function() {
      var copy = _.cloneDeep(test);
      var usage = life.randomize(copy);
      usage.should.not.deep.equal(test);
    });
  });
});
