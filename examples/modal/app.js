/** @jsx React.DOM */

var React = require('react');
var ReactLayerMixin = require('../../').LayerMixin;

var ModalSection = React.createClass({
	mixins: [ReactLayerMixin],

	getInitialState: function() {
		return {
			isModalActive: false
		};
	},

	render: function() {
		return (
			<div>
				<button onClick={this.handleOpenModal}>Click me!</button>
			</div>
			);
	},

	renderLayer: function() {
		if (!this.state.isModalActive) {
			return null;
		}

		var layerStyle = {
			position: 'fixed',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
			backgroundColor: '#fff',
			textAlign: 'center',
			border: '1px solid red'
		};

		return (
			<div style={layerStyle}>
				<h1>Hi there!</h1>
				<button onClick={this.handleCloseModal}>Close me!</button>
			</div>
			);
	},

	handleOpenModal: function() {
		this.setState({isModalActive: true});
	},

	handleCloseModal: function() {
		this.setState({isModalActive: false});
	}
});

React.renderComponent(<ModalSection />, document.getElementById('example'));