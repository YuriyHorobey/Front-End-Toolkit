/**
 * Created by yuriy.horobey on 2015-06-09.
 */
function AddressBar(window, location, urlParser, history) {

    var _oldHref = null;
    var _oldParsedUrl = {}
    //init
    _addEventListeners();


    var _export = {
        getLocation: getLocation,
        check:       check

    };
    return _export;


    //public

    function check() {
        return _urlChangedCallback();
    }

    function getLocation() {

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

    /**
     * Callback for any url change.
     * @private
     */
    function _urlChangedCallback() {
        if (_oldHref == location.href) {
            return;
        }
        _oldHref = location.href
        var parsedUrl = {href: location.href};
        if (urlParser) {
            parsedUrl = urlParser.parse(location.href);
        }
        //var newLocation = parse(location.href);
        var changes = {};
        for (var entry in parsedUrl) {
            if (parsedUrl[entry] != _oldParsedUrl[entry]) {


                changes[entry] = {
                    "old": _oldParsedUrl[entry],
                    "new": parsedUrl[entry]
                }


            }
        }
        for (var entry in changes) {
            var callbackName = "on" + entry + "changed";
            if (_export[callbackName] && (_export[callbackName] instanceof Function)) {
                _export[callbackName].call(null, changes);
            }
        }
        _oldParsedUrl = parsedUrl;

    }


}
