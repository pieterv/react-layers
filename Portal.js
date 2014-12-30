/** @jsx React.DOM */

"use strict";

var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
var LayerMixin = require('./LayerMixin');

var Portal = React.createClass({
  mixins: [LayerMixin],

  render: function() {
    return null;
  },

  renderLayer: function() {
    // Extract out props used by this component.
    // TODO: swap out to use ES6-7 spread operator when possible
    // @see https://gist.github.com/sebmarkbage/a6e220b7097eb3c79ab7
    // var {container, ...props} = this.props;
    // return <div {...props}>{this.props.children}</div>;
    return cloneWithProps(React.DOM.div({container: null}, this.props.children), this.props);
  }
});

module.exports = Portal;