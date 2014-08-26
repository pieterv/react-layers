/** @jsx React.DOM */

jest.dontMock('../modules/CustomPropTypes');

describe('CustomPropTypes', function() {
	describe('Mountable', function() {
		var validate, validateRequired;

		beforeEach(function() {
			var CustomPropTypes = require('../modules/CustomPropTypes');

			validate = function validate(prop) {
				return CustomPropTypes.mountable({p: prop}, 'p', 'Component');
			};
			validateRequired = function validateRequired(prop) {
				return CustomPropTypes.mountable.isRequired({p: prop}, 'p', 'Component');
			};
		});

		it('Should return error with non mountable values', function() {
			expect(validateRequired()).toEqual(jasmine.any(Error));
			expect(validateRequired(null)).toEqual(jasmine.any(Error));
			expect(validate({})).toEqual(jasmine.any(Error));
		});

		it('Should return undefined with mountable values', function() {
			var TestUtils = require('react/lib/ReactTestUtils');
			var React = require('react');

			expect(validate()).toBeUndefined();
			expect(validate(null)).toBeUndefined();
			expect(validate(document.createElement('div'))).toBeUndefined();
			expect(validate(document.body)).toBeUndefined();
			expect(validate(TestUtils.renderIntoDocument(<div />))).toBeUndefined();
		});
	});
});