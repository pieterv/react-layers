/** @jsx React.DOM */

var React = require('react');
var ReactLayer = require('../../').Layer;

var NestedLayer = React.createClass({
	getInitialState: function() {
		return {
			hasLayer: false
		};
	},

	render: function() {
		var layerStyle = {
			position: 'absolute',
			top: 10,
			right: 10,
			bottom: 10,
			left: 10,
			backgroundColor: '#fff',
			textAlign: 'center',
			border: '1px solid red'
		};

		return (
			<div style={layerStyle}>
				<h1>Hi there!</h1>

				<button onClick={this.handleShowLayer}>Create layer!</button>

				<ReactLayer container={this}>
					{this.state.hasLayer ? <NestedLayer /> : null}
				</ReactLayer>
			</div>
			);
	},

	handleShowLayer: function() {
		this.setState({hasLayer: true});
	}
});

React.renderComponent(<NestedLayer />, document.getElementById('example'));