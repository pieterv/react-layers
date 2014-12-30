"use strict";

var React = require('react');

/**
 * React Layer
 *
 * Handles the rendering and un-mounting of layers.
 *
 * @param {HTMLElement} container
 * @constructor
 */
function ReactLayer(container) {
  if (container) {
    this.setContainer(container);
  }
}

/**
 * Render into layer
 *
 * @param {ReactDescriptor} nextDescriptor
 */
ReactLayer.prototype.render = function(nextDescriptor) {
  this.__nextDescriptor = nextDescriptor;
  if (this.__container) {
    React.render(nextDescriptor, this.__container);
  }
};

/**
 * Set layer container
 *
 * Will render into layer if a render is queued.
 *
 * @param {HTMLElement} container
 */
ReactLayer.prototype.setContainer = function(container) {
  this.__container = container;
  if (this.__nextDescriptor) {
    this.render(this.__nextDescriptor);
  }
};

/**
 * Will unmount React component and return container element
 *
 * @returns {HTMLElement|null}
 */
ReactLayer.prototype.releaseContainer = function() {
  var container = this.__container;
  if (!container) {
    return null;
  }

  if (this.__nextDescriptor) {
    React.unmountComponentAtNode(container);
    this.__nextDescriptor = null;
  }

  this.__container = null;
  return container;
};

module.exports = ReactLayer;