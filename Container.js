/** @jsx React.DOM */
"use strict";

var React = require('react');
var ContainerMixin = require('./ContainerMixin');

var Container = React.createClass({
  mixins: [ContainerMixin],

  render: function() {
    // TODO: swap out to use ES6-7 spread operator when possible
    // @see https://gist.github.com/sebmarkbage/a6e220b7097eb3c79ab7
    // return <div {...this.props}>{this.props.children}{this.renderContainer()}</div>;
    return this.transferPropsTo(React.DOM.div(null, this.props.children, this.renderContainer()));
  }
});

module.exports = Container;