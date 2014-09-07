"use strict";

/**
 * Container
 *
 * @param {HTMLElement?} container
 * @constructor
 */
function Container(container) {
  this.__layers = [];
  if (container) {
    this.setContainer(container);
  }
}

/**
 * Set the container element
 *
 * Will remove all existing layers and add them to the new container.
 *
 * @param {HTMLElement?} container
 */
Container.prototype.setContainer = function(container) {
  var layers = this.__layers.slice();
  if (this.__container != null) {
    layers.forEach(this.removeLayer, this);
  } else if (layers.length) {
    this.__layers = [];
  }

  this.__container = container;
  layers.forEach(this.addLayer, this);
};

/**
 * Release container
 *
 * Remove all mounted layers and return the container element.
 *
 * @returns {HTMLElement|null}
 */
Container.prototype.releaseContainer = function() {
  var container = this.__container;
  this.setContainer(null);
  return container;
};

/**
 * Add a layer to this container
 *
 * Will mount the layer if a container is set.
 *
 * @param {ReactLayer} layer
 */
Container.prototype.addLayer = function(layer) {
  this.__layers.push(layer);

  if (this.__container) {
    var layerContainer = document.createElement('div');
    this.__container.appendChild(layerContainer);

    layer.setContainer(layerContainer);
  }
};

/**
 * Remove a layer from the container
 *
 * @param {ReactLayer} layer
 */
Container.prototype.removeLayer = function(layer) {
  var layerIndex = this.__layers.indexOf(layer);

  if (layerIndex === -1) {
    throw new Error('Layer does not belong to this container');
  }

  var layerContainer = layer.releaseContainer();
  this.__layers.splice(layerIndex, 1);

  if (this.__container) {
    this.__container.removeChild(layerContainer);
  }
};

module.exports = Container;