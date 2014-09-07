/** @jsx React.DOM */
"use strict";

var React = require('react');
var Container = require('./modules/Container');

var ContainerMixin = {
  componentWillMount: function() {
    this.container = new Container();
  },

  componentDidMount: function() {
    if (!this.refs || !this.refs.container) {
      throw new Error(
        'No container element found, check `' +
          (this.constructor.displayName || 'ReactCompositeComponent') + '.render()` ' +
          'to make sure `this.renderContainer()` is being called.'
      );
    }
    this.container.setContainer(this.refs.container.getDOMNode());
  },

  componentWillUnmount: function() {
    this.container.releaseContainer();
    this.container = null;
  },

  renderContainer: function() {
    return <div ref="container" />;
  }
};

module.exports = ContainerMixin;