'use strict';

var is = require('is-predicate');
var matrix = require('./matrix');
var _ = require('lodash');

var api = exports;

exports.init = function init(height, width) {
  return matrix(height, width);
};

/* jshint unused: false */
var ALIVE = exports.ALIVE = 1;
var DEAD = exports.DEAD = 0;
var MIN = exports.MIN = 2;
var MAX = exports.MAX = 3;
var SPAWN = exports.SPAWN = 3;

exports.getNumAliveNeighbors = function getNumAliveNeighbors(matrix, y, x) {
  var size = api.getSize(matrix);
  var height = _.first(size);
  var width = _.last(size);
  var total = is.ternary(is.equal(matrix[y][x], ALIVE), -1, 0);

  for (var h = -1; is.lessEq(h, 1); h += 1) {
    for (var w = -1; is.lessEq(w, 1); w += 1) {
      // Add height so we don't get -1 as a potential value
      var row = matrix[(height + (y + h)) % height];

      // Add width so we don't get -1 as a potential value
      var cell = row[(width + (x + w)) % width];

      if (is.equal(cell, ALIVE)) total += 1;
    }
  }

  return total;
};

exports.getSize = function getSize(matrix) {
  var height = matrix.length;
  var width = _.first(matrix).length;
  return [height, width];
};

exports.isAlive = function isAlive(matrix, y, x) {
  return is.equal(matrix[y][x], ALIVE);
};

exports.tick = function tick(matrix) {
  var size = api.getSize(matrix);
  var height = _.first(size);
  var width = _.last(size);

  // create a new grid and upate each cell from original matrix
  var next = api.init(height, width);

  for (var h = 0; is.less(h, height); h += 1) {
    for (var w = 0; is.less(w, width); w += 1) {
      var numNeighbors = api.getNumAliveNeighbors(matrix, h, w, height, width);

      if (api.isAlive(matrix, h, w)) {
        if (is.greaterEq(numNeighbors, MIN) && is.lessEq(numNeighbors, MAX)) {
          next[h][w] = ALIVE;
        }
      } else {
        if (is.equal(numNeighbors, SPAWN)) next[h][w] = ALIVE;
      }
    }
  }

  return next;
};

// Modify in place
exports.randomize = function random(matrix) {
  var size = api.getSize(matrix);
  var height = _.first(size);
  var width = _.last(size);

  for (var h = 0; is.less(h, height); h += 1) {
    for (var w = 0; is.less(w, width); w += 1) {
      matrix[h][w] = _.random(1);
    }
  }
  return matrix;
};