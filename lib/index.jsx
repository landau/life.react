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
    requestAnimationFrame(function tick() {
      self.setState({
        matrix: life.tick(self.state.matrix)
      });
      requestAnimationFrame(self.tick);
    });
  },

  update: function update() {
    var matrix = this.state.matrix;
    var canvas = this.refs.canvas.getDOMNode();
    var cellSize = this.props.cellSize;

    var ctx = canvas.getContext('2d');
    matrix.forEach(function rowEach(row, y) {
      row.forEach(function cellEach(cell, x) {
        var yCoord = y * cellSize + 1;
        var xCoord = x * cellSize + 1;
        var size = cellSize - this.props.cellSpacing; // give some spacing

        ctx.fillStyle = is.ternary(
          is.equal(cell, life.ALIVE),
          this.props.aliveColor,
          this.props.deadColor
        );

        ctx.fillRect(xCoord, yCoord, size, size);
      }, this);
    }, this);
  },

  render: function render() {
    return (
      <canvas 
        height={this.props.height} width={this.props.width} 
        ref='canvas' 
      />
    );
  }
});

