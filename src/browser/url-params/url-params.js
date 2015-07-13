/**
 * Created by yuriy.horobey on 2015-07-01.
 */
function UrlParams() {
    var REGEX = /\s*\??([^#]+)(#*.*)?\s*/;
    var _params = {};
    return {
        parse:   parse,
        combine: combine,
        get:     get,
        set:     set,
        remove:  remove
    }
    function parse(paramsString) {

        _params = {};

        var res = REGEX.exec(paramsString);
        if (!res && !res[1]) {
            return;
        }

        var extracted = res[1].split('&');
        for (var i = 0; i < extracted.length; i++) {
            var entry = extracted[i].split('=');

            var key = entry[0];
            var value = entry[1];
            set(key, value);
        }


    }

    function combine() {
    }

    function get(name, def) {
        name = _normalizeURIComponent(name);
        var ret;
        if (_params.hasOwnProperty(name)) {
            ret = _params[name];
        } else {
            if (def === undefined) {
                throw new Error('UrlParams: missing parameter "' + name + '" and no default value given');
            } else {
                ret = def;
            }
        }
        return ret;
    }

    function set(name, value) {
        var decName = _normalizeURIComponent(name);
        var decVal = _normalizeURIComponent(value);
        _params[decName] = decVal;
    }

    function remove(name) {
        var decName = _normalizeURIComponent(name);
        delete _params[decName];
    }

    function _normalizeURIComponent(comp) {
        var ret = comp + '';
        ret = decodeURIComponent(ret);
        return ret;
    }
}