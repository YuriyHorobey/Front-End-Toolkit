/**
 * Created by yuriy.horobey on 2015-04-21.
 */
describe('Validator', function () {
	var $V,
		types = {
			Boolean:   [true, false],
			Null:      [null],
			Undefined: [undefined],
			Number:    [Number.MIN_VALUE, -10.3, -1, 0, 1, 10.3, Number.MAX_VALUE],
			String:    ["a", 'b', '', ' '],
			Object:    [{}, new Object()],
			Function:  [],
			Array:     []
		};
	beforeEach(function () {
		$V = new Validator();
	});
//primitive types validation
	it('should validate type Boolean', function () {
		var ret;
		for (var type in types) {
			for (var i = 0; i < types[type].length; i++) {
				var val = types[type][i];
				var expected = type === 'Boolean';
				ret = $V.isBoolean(val);
				expect(ret).toBe(expected);
			}
		}

	});
	it('should validate type Null', function () {
		var ret;
		for (var type in types) {
			for (var i = 0; i < types[type].length; i++) {
				var val = types[type][i];
				var expected = type === 'String';
				ret = $V.isNull(val);
				expect(ret).toBe(expected);
			}
		}

	});
	it('should validate type Number', function () {
		var ret;
		for (var type in types) {
			for (var i = 0; i < types[type].length; i++) {
				var val = types[type][i];
				var expected = type === 'Number';
				ret = $V.isNumber(val);
				expect(ret).toBe(expected);
			}
		}

	});
	it('should validate type String', function () {
		var ret;
		for (var type in types) {
			for (var i = 0; i < types[type].length; i++) {
				var val = types[type][i];
				var expected = type === 'String';
				ret = $V.isString(val);
				expect(ret).toBe(expected);
			}
		}

	});
	it('should validate type Object', function () {
		var ret;
		for (var type in types) {
			for (var i = 0; i < types[type].length; i++) {
				var val = types[type][i];
				var expected = type === 'Object';
				ret = $V.isObject(val);
				expect(ret).toBe(expected);
			}
		}

	});
	it('should validate for not null and not undefined', function () {

	});
//    it('should ', function(){});
});