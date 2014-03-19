/** @jsx React.DOM */
'use strict';

var React = require('react');
var life = require('./life');
var _ = require('lodash');
var is = require('is-predicate');

module.exports = React.createClass({
  propTypes: {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    cellSize: React.PropTypes.number,
    cellSpacing: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      width: 600,
      height: 400,
      cellSize: 5,
      cellSpacing: 1,
      deadColor: '#f0f0f0',
      aliveColor: '#369'
    };
  },

  getInitialState: function getInitialState() {
    return {
      matrix: life.init(1, 1)
    };
  },

  componentDidMount: function componentDidMount() {
    this.setState({
      matrix: life.randomize(life.init(this.props.height, this.props.width))
    });

    this.tick();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.update();
  },

  tick: function tick() {
    var self = this;
    setTimeout(function requestAnim() {
      self.setState({
        matrix: life.tick(self.state.matrix),
        old: self.state.matrix
      });
      self.tick();
    }, 1e3 / this.props.fps);
  },

  update: function update() {
    var matrix = this.state.matrix;
    var canvas = this.refs.canvas.getDOMNode();
    var cellSize = this.props.cellSize;

    var ctx = canvas.getContext('2d');

    var l = matrix.length;
    for (var y = 0; y < l; y += 1) {

      var rowL = matrix[y].length;
      for (var x = 0; x < rowL; x += 1) {

        var cell = matrix[y][x];

        // if val has not changed don't bother
        if (this.state.old && this.state.old[y][x] === cell) continue;

        var yCoord = (y * cellSize) + 1;
        var xCoord = (x * cellSize) + 1;
        var size = cellSize - this.props.cellSpacing;

        ctx.fillStyle = is.ternary(
          is.equal(cell, life.ALIVE),
          this.props.aliveColor,
          this.props.deadColor
        );

        ctx.fillRect(xCoord, yCoord, size, size);
      }
    }
  },

  render: function render() {
    return (
      <canvas 
        height={this.props.height * (this.props.cellSize + this.props.cellSpacing)} 
        width={this.props.width * (this.props.cellSize + this.props.cellSpacing)} 
        ref='canvas' 
      />
    );
  }
});

