/** @jsx React.DOM */

"use strict";

var React = require('react');
var LayerMixin = require('./LayerMixin');

var Layer = React.createClass({
  mixins: [LayerMixin],

  propTypes: {
    layer: React.PropTypes.component
  },

  render: function() {
    // Extract out props used by this component.
    // TODO: swap out to use ES6-7 spread operator when possible
    // @see https://gist.github.com/sebmarkbage/a6e220b7097eb3c79ab7
    // var {container, layer, ...props} = this.props;
    // return <div {...props}>{this.props.children}</div>;
    return this.transferPropsTo(React.DOM.div({container: null, layer: null}, this.props.children));
  },

  renderLayer: function() {
    return this.props.layer ?
      this.props.layer : null;
  }
});

module.exports = Layer;