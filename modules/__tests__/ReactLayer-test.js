"use strict";

jest.dontMock('../ReactLayer');
jest.mock('react');

describe('ReactLayer', function() {
  it('should create', function() {
    var ReactLayer = require('../ReactLayer');
    var layer = new ReactLayer();
    expect(layer).toBeDefined();

    layer = new ReactLayer(document.createElement('div'));
    expect(layer).toBeDefined();
  });

  it('should render on set container with descriptor', function() {
    var ReactLayer = require('../ReactLayer');
    var React = require('react');
    var layer = new ReactLayer();

    var fakeDescriptor = {};
    layer.render(fakeDescriptor);
    expect(React.renderComponent).not.toBeCalled();

    var el = document.createElement('div');
    layer.setContainer(el);
    expect(React.renderComponent).toBeCalledWith(fakeDescriptor, el);
  });

  it('should render with container', function() {
    var ReactLayer = require('../ReactLayer');
    var React = require('react');

    var el = document.createElement('div');
    var layer = new ReactLayer(el);

    var fakeDescriptor = {};
    layer.render(fakeDescriptor);
    expect(React.renderComponent).toBeCalledWith(fakeDescriptor, el);
  });

  it('should release container', function() {
    var ReactLayer = require('../ReactLayer');
    var React = require('react');

    var el = document.createElement('div');
    var layer = new ReactLayer(el);

    expect(layer.releaseContainer()).toBe(el);
    expect(React.unmountComponentAtNode).not.toBeCalled();
  });

  it('should unmount container when release if rendered', function() {
    var ReactLayer = require('../ReactLayer');
    var React = require('react');

    var el = document.createElement('div');
    var layer = new ReactLayer(el);

    var fakeDescriptor = {};
    layer.render(fakeDescriptor);

    expect(layer.releaseContainer()).toBe(el);
    expect(React.unmountComponentAtNode).toBeCalledWith(el);
  });
});