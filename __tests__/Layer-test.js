/** @jsx React.DOM */

jest.dontMock('../Layer');
jest.dontMock('../LayerMixin');
jest.dontMock('../modules/Container');
jest.dontMock('../modules/ReactLayer');

describe('Layer', function() {
  it('will render `props.layer` into container', function() {
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');
    var Layer = require('../Layer');

    var container = document.createElement('div');
    var layerHolder = TestUtils.renderIntoDocument(
      <Layer container={container} layer={<div id="test1" />}>hi!</Layer>
    );
    expect(container.firstChild).not.toBeNull();
    expect(container.firstChild.firstChild.id).toBe('test1');

    React.unmountComponentAtNode(layerHolder.getDOMNode().parentNode);
    expect(container.firstChild).toBeNull();
  });

  it('will not render `props.layer === null` layer', function() {
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');
    var Layer = require('../Layer');

    var container = document.createElement('div');
    var layerHolder = TestUtils.renderIntoDocument(
      <Layer container={container} layer={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('will render children', function() {
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');
    var Layer = require('../Layer');

    var layerHolder = TestUtils.renderIntoDocument(
      <Layer layer={null}>
        <span className="findme" />
      </Layer>
    );
    expect(TestUtils.findRenderedDOMComponentWithClass(layerHolder, 'findme')).toBeDefined();
  });
});