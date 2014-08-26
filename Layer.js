/** @jsx React.DOM */

"use strict";

var React = require('react');
var LayerMixin = require('./LayerMixin');

var Layer = React.createClass({
	mixins: [LayerMixin],

	propTypes: {
		layer: React.PropTypes.oneOfType([
			React.PropTypes.oneOf([null]),
			React.PropTypes.component
		])
	},

	render: function() {
		if (this.props.children == null) {
			return null;
		}

		// Extract out props used by this component.
		// TODO: swap out to use ES6-7 spread operator when possible
		// @see https://gist.github.com/sebmarkbage/a6e220b7097eb3c79ab7
		// var {container, layer, ...props} = this.props;
		// return <div {...props}>{this.props.children}</div>;
		return this.transferPropsTo(<div container={null} layer={null}>{this.props.children}</div>);
	},

	renderLayer: function() {
		return this.props.layer;
	}
});

module.exports = Layer;