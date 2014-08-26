"use strict";

var React = require('react');
var LayerMixin = require('./LayerMixin');

var Layer = React.createClass({
	mixins: [LayerMixin],

	render: function() {
		return null;
	},

	renderLayer: function() {
		return this.props.children === null ?
			this.props.children : React.Children.only(this.props.children);
	}
});

module.exports = Layer;