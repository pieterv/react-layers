/** @jsx React.DOM */

jest.dontMock('../Portal');
jest.dontMock('../LayerMixin');

describe('Portal', function() {
	it('will render children into container', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');
		var Portal = require('../Portal');

		var container = document.createElement('div');
		var portalHolder = TestUtils.renderIntoDocument(
			<Portal container={container} id="test1">Hi over here</Portal>
		);
		expect(container.firstChild).not.toBeNull();
		expect(container.firstChild.firstChild.id).toBe('test1');
		expect(container.firstChild.firstChild.textContent).toBe('Hi over here');
	});

	it('will not render a `null` layer', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');
		var Portal = require('../Portal');

		var container = document.createElement('div');
		TestUtils.renderIntoDocument(
			<Portal container={container}></Portal>
		);
		expect(container.firstChild).toBeNull();

		TestUtils.renderIntoDocument(
			<Portal container={container} />
		);
		expect(container.firstChild).toBeNull();

		TestUtils.renderIntoDocument(
			<Portal container={container}>{null}</Portal>
		);
		expect(container.firstChild).toBeNull();
	});
});