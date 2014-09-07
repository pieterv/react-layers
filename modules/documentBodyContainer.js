"use strict";

var Container = require('./Container');

/**
 * Create singleton
 *
 * @type {Container}
 */
var documentBodyContainer = new Container();

// Setup DOM ready
if (typeof document !== 'undefined') {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onDOMReady);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'interactive') {
        onDOMReady();
      }
    });
  }
}

function onDOMReady() {
  // The `document.body` reference needs to be contained within this
  // function so that it is not accessed in environments where it
  // would not be defined, e.g. nodejs. This provider will only be
  // accessed after componentDidMount.
  documentBodyContainer.setContainer(document.body);
}

module.exports = documentBodyContainer;