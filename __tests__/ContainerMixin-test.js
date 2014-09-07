"use strict";

jest.dontMock('../ContainerMixin');

describe('ContainerMixin', function() {
  it('should create container on will mount', function() {
    var ContainerMixin = require('../ContainerMixin');
    var instance = Object.create(ContainerMixin);

    instance.componentWillMount();
    expect(instance.container).toBeDefined();
    expect(instance.container.setContainer).toBeDefined();
  });

  it('should throw if container not rendered', function() {
    var ContainerMixin = require('../ContainerMixin');
    var instance = Object.create(ContainerMixin);

    instance.componentWillMount();
    expect(instance.componentDidMount).toThrow();
  });

  it('should set container on did mount', function() {
    var ContainerMixin = require('../ContainerMixin');
    var instance = Object.create(ContainerMixin);

    instance.componentWillMount();
    var el = document.createElement('div');
    var getDOMNode = jest.genMockFn().mockReturnValue(el);
    instance.refs = {container: {getDOMNode: getDOMNode}};
    instance.componentDidMount();
    expect(instance.container.setContainer).toBeCalledWith(getDOMNode);
  });

  it('should release container on unmount', function() {
    var ContainerMixin = require('../ContainerMixin');
    var instance = Object.create(ContainerMixin);

    instance.componentWillMount();
    instance.refs = {container: {getDOMNode: jest.genMockFn()}};
    instance.componentDidMount();
    var container = instance.container;
    instance.componentWillUnmount();
    expect(container.releaseContainer).toBeCalledWith();
    expect(instance.container).toBeNull();
  });
});