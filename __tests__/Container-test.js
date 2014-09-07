/** @jsx React.DOM */

jest.dontMock('../Container');
jest.dontMock('../Portal');
jest.dontMock('../ContainerMixin');
jest.dontMock('../LayerMixin');
jest.dontMock('../modules/Container');
jest.dontMock('../modules/ReactLayer');

describe('Container', function() {
  it('will render children into container', function() {
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');
    var Portal = require('../Portal');
    var Container = require('../Container');

    var containerHolder = TestUtils.renderIntoDocument(
      <Container>
        <span>Container text!</span>
      </Container>
    );

    TestUtils.renderIntoDocument(
      <Portal container={containerHolder.container} id="test1">Hi over here</Portal>
    );
    var containerNode = containerHolder.getDOMNode();
    expect(containerNode.firstChild).not.toBeNull();
    expect(containerNode.children[1].firstChild.firstChild.id).toBe('test1');
    expect(containerNode.children[1].firstChild.firstChild.textContent).toBe('Hi over here');
  });
});