/**
 * Created by yuriy.horobey on 2015-04-21.
 */
function Validator() {
	var TYPES = {
		ARRAY:  '[object Array]',
		NUMBER: '[object Number]'
	}
	var _ts = Object.prototype.toString;
	return {
		typeOf:      typeOf,
		isBoolean:   isBoolean,
		isNull:      isNull,
		isUndefined: isUndefined,
		isNumber:    isNumber,
		isString:    isString,

		isObject: isObject,

		isFunction: isFunction,
		isArray:    isArray
	}

	function typeOf(val) {
		//var ret = Object.prototype.toString.call(val).match(/\s([a-zA-Z]+)/)[1];
		var ret = Object.prototype.toString.call(val);
		ret = ret.substring(ret.indexOf(' ') + 1, ret.length - 1)
		return ret;
	}

	function isBoolean(val) {
	}

	function isNull(val) {
	}

	function isUndefined(val) {
	}

	function isNumber(val) {
	}

	function isString(val) {
	}

	function isObject(val) {
	}

	function isFunction(val) {
	}

	function isArray(val) {
		var ret = _ts(val) === TYPES.ARRAY;
	}

//private

}
