"use strict";

jest.dontMock('../Container');

describe('Container', function() {
  it('should create', function() {
    var Container = require('../Container');
    var container1 = new Container();
    expect(container1).toBeDefined();

    container1 = new Container(document.createElement('div'));
    expect(container1).toBeDefined();
  });

  it('should set container', function() {
    var Container = require('../Container');
    var ReactLayer = require('../ReactLayer');
    var container1 = new Container();

    var layer = new ReactLayer();
    container1.addLayer(layer);
    expect(layer.setContainer).not.toBeCalled();
    var el = document.createElement('div');
    container1.setContainer(el);
    expect(layer.setContainer).toBeCalledWith(el.firstChild);
  });

  it('should add layers', function() {
    var Container = require('../Container');
    var ReactLayer = require('../ReactLayer');
    var el = document.createElement('div');
    var container1 = new Container(el);

    var layer = new ReactLayer();
    container1.addLayer(layer);
    expect(layer.setContainer).toBeCalledWith(el.firstChild);
  });

  it('should remove layers', function() {
    var Container = require('../Container');
    var ReactLayer = require('../ReactLayer');
    var el = document.createElement('div');
    var container1 = new Container(el);

    var layer = new ReactLayer();
    layer.setContainer.mockImpl(function(layerEl) {
      layer.releaseContainer.mockReturnValue(layerEl);
    });
    container1.addLayer(layer);
    container1.removeLayer(layer);
    expect(layer.releaseContainer).toBeCalled();
    expect(el.firstChild).toBeNull();
  });

  it('should remove layers on release container', function() {
    var Container = require('../Container');
    var ReactLayer = require('../ReactLayer');
    var el = document.createElement('div');
    var container1 = new Container(el);

    var layer = new ReactLayer();
    layer.setContainer.mockImpl(function(layerEl) {
      layer.releaseContainer.mockReturnValue(layerEl);
    });

    container1.addLayer(layer);
    var returnVal = container1.releaseContainer();
    expect(layer.releaseContainer).toBeCalled();
    expect(returnVal).toBe(el);
    expect(el.firstChild).toBeNull();
  });
});