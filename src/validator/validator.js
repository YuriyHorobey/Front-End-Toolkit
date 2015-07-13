/**
 * Created by yuriy.horobey on 2015-04-21.
 */
function Validator() {

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

    function isType(val, type) {
        type = type.trim();
        var ret = typeOf(val) === type;
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
        var ret = isType(val, 'Function');
        return ret;
    }

    function isArray(val) {
        var ret = isType(val, 'Array');
        return ret;
    }

//specials :)
    function isPromise(val) {
        var ret = isType(val, 'Object');
        ret = ret && val.hasOwnProperty('resolve') && isFunction(val.resolve);
        ret = ret && val.hasOwnProperty('fulfill') && isFunction(val.fulfill);
        ret = ret && val.hasOwnProperty('reject') && isFunction(val.reject);
        return ret;
    }

//private

}
