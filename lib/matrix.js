'use strict';
var is = require('is-predicate');

module.exports = function matrix(m, n, init) {
  init = init || 0;
  var mat = [];

  for (var i = 0; is.less(i, m); i += 1) {
    var a = [];
    for (var j = 0; is.less(j, n); j += 1) {
      a[j] = init;
    }
    mat[i] = a;
  }
  return mat;
};
