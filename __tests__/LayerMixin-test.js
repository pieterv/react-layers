/** @jsx React.DOM */

jest.dontMock('../LayerMixin');

describe('LayerMixin', function() {
	var LayerHolder;

	beforeEach(function() {
		var React = require('react');
		var LayerMixin = require('../LayerMixin');

		LayerHolder = React.createClass({
			mixins: [LayerMixin],

			render: function() {
				return <div />;
			},

			renderLayer: function() {
				return this.props.layer;
			}
		});
	});

	it('will mount to container default (document.body)', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');

		var container = document.body;
		var layerHolder = TestUtils.renderIntoDocument(
			<LayerHolder layer={<div id="test1" />} />
		);
		var layerElement = container.querySelector('#test1');
		expect(layerElement).not.toBeNull();
		expect(layerElement.parentNode.parentNode).toBe(container);

		// Clean up after using `document.body`
		React.unmountComponentAtNode(layerHolder.getDOMNode().parentNode);
	});

	it('will mount to container DOM element', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');

		var container = document.createElement('div');
		var layerHolder = TestUtils.renderIntoDocument(
			<LayerHolder container={container} layer={<div id="test1" />} />
		);
		var layerElement = container.querySelector('#test1');
		expect(layerElement).not.toBeNull();
		expect(layerElement.parentNode.parentNode).toBe(container);
	});

	it('will mount to container react component', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');

		var Holder = React.createClass({
			render: function() {
				return (
					<div>
						<LayerHolder container={this} layer={<div id="test1" />} />
					</div>
					);
			}
		});

		var layerHolder = TestUtils.renderIntoDocument(
			<Holder />
		);

		var container = layerHolder.getDOMNode();
		var layerElement = container.querySelector('#test1');
		expect(layerElement).not.toBeNull();
		expect(layerElement.parentNode.parentNode).toBe(container);
	});

	it('will not mount to container with layer null', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');

		var container = document.createElement('div');
		var layerHolder = TestUtils.renderIntoDocument(
			<LayerHolder container={container} layer={null} />
		);
		expect(container.firstChild).toBeNull();
	});

	it('will unmount layer when not rendered', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');

		var didMountSpy = jasmine.createSpy('didMount');
		var willUnmountSpy = jasmine.createSpy('willUnmount');
		var Layer = React.createClass({
			render: function() { return <div />; },

			componentDidMount: didMountSpy,
			componentWillUnmount: willUnmountSpy
		});

		var container = document.createElement('div');
		var holderContainer = document.createElement('div');
		React.renderComponent(
			<LayerHolder container={container} layer={<Layer />} />,
			holderContainer
		);
		expect(didMountSpy).toHaveBeenCalled();
		expect(willUnmountSpy).not.toHaveBeenCalled();

		React.renderComponent(
			<LayerHolder container={container} layer={null} />,
			holderContainer
		);
		expect(willUnmountSpy).toHaveBeenCalled();
		expect(container.firstChild).toBeNull();
	});

	it('will unmount layer when parent is unmounted', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');

		var didMountSpy = jasmine.createSpy('didMount');
		var willUnmountSpy = jasmine.createSpy('willUnmount');
		var Layer = React.createClass({
			render: function() { return <div />; },

			componentDidMount: didMountSpy,
			componentWillUnmount: willUnmountSpy
		});

		var container = document.createElement('div');
		var holderContainer = document.createElement('div');
		React.renderComponent(
			<LayerHolder container={container} layer={<Layer />} />,
			holderContainer
		);
		expect(didMountSpy).toHaveBeenCalled();
		expect(willUnmountSpy).not.toHaveBeenCalled();

		React.unmountComponentAtNode(holderContainer);
		expect(willUnmountSpy).toHaveBeenCalled();
		expect(container.firstChild).toBeNull();
	});

	it('will remount when container is changed', function() {
		var React = require('react');
		var TestUtils = require('react/lib/ReactTestUtils');

		var didMountSpy = jasmine.createSpy('didMount');
		var willUnmountSpy = jasmine.createSpy('willUnmount');
		var Layer = React.createClass({
			render: function() { return <div />; },

			componentDidMount: didMountSpy,
			componentWillUnmount: willUnmountSpy
		});

		var container = document.createElement('div');
		var holderContainer = document.createElement('div');
		React.renderComponent(
			<LayerHolder container={container} layer={<Layer />} />,
			holderContainer
		);
		expect(didMountSpy).toHaveBeenCalled();
		expect(willUnmountSpy).not.toHaveBeenCalled();

		var newContainer = document.createElement('div');
		React.renderComponent(
			<LayerHolder container={newContainer} layer={<Layer />} />,
			holderContainer
		);
		expect(willUnmountSpy).toHaveBeenCalled();
		expect(didMountSpy.calls.length).toEqual(2);
		expect(container.firstChild).toBeNull();
		expect(newContainer.firstChild).not.toBeNull();
	});

	describe('Errors', function() {
		it('will throw when render returns not a valid component or null', function() {
			var React = require('react');
			var TestUtils = require('react/lib/ReactTestUtils');

			function render(layer) {
				TestUtils.renderIntoDocument(
					<LayerHolder container={document.createElement('div')} layer={layer} />
				);
			}

			var errorMessage = (
				'LayerHolder.renderLayer(): A valid ReactComponent must be returned. You may have ' +
					'returned undefined, an array or some other invalid object.'
				);

			expect(render.bind(null, 'a string')).toThrow(errorMessage);
			expect(render.bind(null, undefined)).toThrow(errorMessage);
			expect(render.bind(null, {})).toThrow(errorMessage);
			expect(render.bind(null, [])).toThrow(errorMessage);
			expect(render.bind(null, null)).not.toThrow();
			expect(render.bind(null, <div />)).not.toThrow();
		});

		it('will throw when layerRender is not defined', function() {
			var React = require('react');
			var TestUtils = require('react/lib/ReactTestUtils');
			var LayerMixin = require('../LayerMixin');

			var BadLayerHolder = React.createClass({
				mixins: [LayerMixin],

				render: function() {
					return <div />;
				}
			});

			function render() {
				TestUtils.renderIntoDocument(
					<BadLayerHolder />
				);
			}

			var errorMessage = (
				'createClass(...): Class specification of BadLayerHolder using LayerMixin must ' +
					'implement a `renderLayer` method.'
				);

			expect(render).toThrow(errorMessage);
		});
	});
});