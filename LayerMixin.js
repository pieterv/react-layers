"use strict";

var React = require('react');
var CustomPropTypes = require('./modules/CustomPropTypes');

var LayerMixin = {
  propTypes: {
    container: CustomPropTypes.mountable.isRequired
  },

  getDefaultProps: function() {
    return {
      container: {
        // Provide `getDOMNode` fn mocking a React component API. The `document.body`
        // reference needs to be contained within this function so that it is not accessed
        // in environments where it would not be defined, e.g. nodejs. Equally this is needed
        // before the body is defined where `document.body === null`, this ensures
        // `document.body` is only accessed after componentDidMount.
        getDOMNode: function getDOMNode() {
          return document.body;
        }
      }
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
    this._updateLayer();
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.container !== prevProps.container) {
      this._destroyLayer();
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

    if (!React.isValidComponent(layer)) {
      throw new Error(
        (this.constructor.displayName || 'ReactCompositeComponent') +
          '.renderLayer(): A valid ReactComponent must be returned. You may have ' +
          'returned undefined, an array or some other invalid object.'
      );
    }

    // Render the layer but first create a DOM element on
    // the container for it to render into.
    if (!this._layerTarget) {
      this._layerTarget = document.createElement('div');
      this._getContainerDOMNode()
        .appendChild(this._layerTarget);
    }

    this._layerInstance = React.renderComponent(layer, this._layerTarget);
  },

  /**
   * Destroy layer
   *
   * Unmount component and remove container element from the DOM.
   *
   * @private
   */
  _destroyLayer: function() {
    if (!this._layerTarget) {
      // Nothing to do here.
      return;
    }

    if (this._layerInstance) {
      React.unmountComponentAtNode(this._layerTarget);
      this._layerInstance = null;
    }

    this._layerTarget.parentNode
      .removeChild(this._layerTarget);
    this._layerTarget = null;
  },

  /**
   * Get the containers DOM node
   *
   * Use a loose type check as the propType checks should more robustly cover this.
   *
   * @returns {DOMElement}
   * @private
   */
  _getContainerDOMNode: function() {
    return this.props.container.getDOMNode ?
      this.props.container.getDOMNode() : this.props.container;
  }
};

module.exports = LayerMixin;