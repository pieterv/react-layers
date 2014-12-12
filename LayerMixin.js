"use strict";

var React = require('react');
var CustomPropTypes = require('./modules/CustomPropTypes');
var Container = require('./modules/Container');
var documentBodyContainer = require('./modules/documentBodyContainer');
var ReactLayer = require('./modules/ReactLayer');

function createContainer(container) {
  if (container.nodeType === 1) {
    return new Container(container);
  }

  // Handle extracting node from a React component
  // NOTE: this is deprecated behaviour and will be removed in 1.0
  if (container.getDOMNode) {
    return new Container(container.getDOMNode());
  }

  return container;
}

var LayerMixin = {
  propTypes: {
    container: CustomPropTypes.mountable.isRequired
  },

  getDefaultProps: function() {
    return {
      container: documentBodyContainer
    };
  },

  componentWillMount: function() {
    if (typeof this.renderLayer !== 'function') {
      throw new Error(
        'createClass(...): Class specification of ' +
          (this.constructor.displayName || 'ReactCompositeComponent') + ' ' +
          'using LayerMixin must implement a `renderLayer` method.'
      );
    }
  },

  componentDidMount: function() {
    this.__container = createContainer(this.props.container);
    this._updateLayer();
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.container !== prevProps.container) {
      this._destroyLayer();
      this.__container = createContainer(this.props.container);
    }

    this._updateLayer();
  },

  componentWillUnmount: function() {
    this._destroyLayer();
  },

  /**
   * Render layer
   *
   * To be implemented within your `React.createClass({})`
   */
  // renderLayer() { return <MyLayer />; },

  /**
   * Update layer
   *
   * @private
   */
  _updateLayer: function() {
    var layer = this.renderLayer();

    if (layer === null) {
      // No layer so just remove any existing components if they exist.
      this._destroyLayer();
      return;
    }

    if (!React.isValidElement(layer)) {
      throw new Error(
        (this.constructor.displayName || 'ReactCompositeComponent') +
          '.renderLayer(): A valid ReactComponent must be returned. You may have ' +
          'returned undefined, an array or some other invalid object.'
      );
    }

    if (!this.__layer) {
      this.__layer = new ReactLayer();
      this.__container.addLayer(this.__layer);
    }

    this.__layer.render(layer);
  },

  /**
   * Destroy layer
   *
   * Unmount component and remove container element from the DOM.
   *
   * @private
   */
  _destroyLayer: function() {
    if (!this.__layer) {
      return;
    }

    this.__container.removeLayer(this.__layer);
    this.__layer = null;
  }
};

module.exports = LayerMixin;