"use strict";

var Container = require('./Container');

var ANONYMOUS = '<<anonymous>>';

/**
 * Checks whether a prop provides a DOM element
 *
 * The element can be provided in two forms:
 * - Directly passed
 * - Or passed an object which has a `getDOMNode` method which will return the required DOM element
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */
exports.mountable = createMountableChecker();

function createMountableChecker() {
  function validate(props, propName, componentName) {
    if (typeof props[propName] === 'object') {
      if (props[propName].nodeType === 1) {
        return; // Valid
      }

      if (props[propName] instanceof Container) {
        return; // Valid
      }

      if (typeof props[propName].getDOMNode === 'function') {
        // Will still actually work but is deprecated
        return new Error(
          'Prop `' + propName + '` supplied to `' + componentName + '` was passed a React component, ' +
            'this is a deprecated behaviour and will be removed. Please use the `ContainerMixin` or ' +
            '`Container` component and pass `this.container` instead.'
        );
      }
    }

    return new Error(
      'Invalid prop `' + propName + '` supplied to `' + componentName + '`, ' +
        'expected a HTMLElement or Container instance.'
    );
  }

  return createChainableTypeChecker(validate);
}

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(
          'Required prop `' + propName + '` was not specified in ' +
            '`' + componentName + '`.'
        );
      }
    } else {
      return validate(props, propName, componentName, location);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}