/** @jsx React.DOM */

var React = require('react');
var ReactLayers = require('../../');
var ReactLayer = ReactLayers.Layer;
var ReactContainerMixin = ReactLayers.ContainerMixin;

var NestedLayer = React.createClass({
  mixins: [ReactContainerMixin],

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
        <h1>Dynamic container</h1>

        <button onClick={this.handleShowLayer}>Create layer!</button>

        <ReactLayer container={this.container} layer={this.state.hasLayer ? <NestedLayer /> : null} />

        {this.renderContainer()}
      </div>
      );
  },

  handleShowLayer: function() {
    this.setState({hasLayer: true});
  }
});

React.renderComponent(<NestedLayer />, document.getElementById('example'));