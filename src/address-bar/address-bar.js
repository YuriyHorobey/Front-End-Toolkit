/**
 * Created by yuriy.horobey on 2015-06-09.
 */
function AddressBar(window, location) {
    //0:full url 1: protocol, 3: user:pass, 4: host:port 5:path, 7:query, 9:hash
    var URL_REGEXP = /^([^/]+):\/\/(([^@]+)@)?([^/]+)\/?([^?#]+)?(\?([^#]*))?(#(.*))?/;
    var _oldHref = '';
    var _oldLocation = new Location();
    var _Obj = this;

    //init

    _addEventListeners();


    var _export = {
        getLocation: getLocation,
        parse:       parse
    };
    return _export;

    //public
    function parse(url) {
        var parts = URL_REGEXP.exec(url);
        var ret = new Location();
        if (parts) {
            ret.href = parts[0] || '';
            ret.protocol = parts[1] || '';

            var userPass = (parts[3] || '').trim().split(':');
            ret.user = userPass[0] || '';
            ret.pass = userPass[1] || '';

            var hostPort = (parts[4] || '').trim().split(':');
            ret.host = parts[4] || '';
            ret.hostname = hostPort[0] || '';
            ret.port = hostPort[1] || '';

            ret.pathname = parts[5] || '';

            ret.search = parts[7] || '';

            ret.hash = parts[9] || '';
        }
        return ret;
    }

    function getLocation() {
        var ret = new Location(_oldLocation);
        return ret;
    }

    //private
    function _addEventListeners() {
        if (window.addEventListener) {
            window.addEventListener('load', _urlChangedCallback);
            window.addEventListener('popstate', _urlChangedCallback);
            window.addEventListener('hashchange', _urlChangedCallback);

        } else {
            if (window.attachEvent) {
                window.attachEvent('load', _urlChangedCallback);
                window.attachEvent('popstate', _urlChangedCallback);
                window.attachEvent('hashchange', _urlChangedCallback);
            } else {
                window.onload = _urlChangedCallback;
                window.onpopstate = _urlChangedCallback;
                window.onhashchange = _urlChangedCallback;
            }
        }
    }

    function _urlChangedCallback() {
        if (_oldHref == location.href) {
            return;
        }
        var newLocation = parse(location.href);
        var changes = {};
        for (var entry in newLocation) {
            if (newLocation[entry] != _oldLocation[entry]) {


                changes[entry] = {
                    "old": _oldLocation[entry],
                    "new": newLocation[entry]
                }


            }
        }
        for (var entry in changes) {
            var callbackName = "on" + entry + "changed";
            if (_export[callbackName] && (_export[callbackName] instanceof Function)) {
                _export[callbackName].call(null, changes);
            }
        }
        _oldLocation = newLocation;
        _oldHref = location.href;
    }



}
