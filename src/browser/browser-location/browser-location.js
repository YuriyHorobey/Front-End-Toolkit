/**
 * Created by yuriy.horobey on 2015-07-01.
 */
function BrowserLocation(addressBar, browserHistory) {
    if (typeof addressBar !== 'object') {
        throw new Error('BrowserLocation: AddressBar dependency not satisfied.');
    }
    var _export = {
        onhashchanged:     _noop,
        onhostchanged:     _noop,
        onhostnamechanged: _noop,
        onhrefchanged:     _noop,

        onpasschanged:     _noop,
        onpathnamechanged: _noop,
        onportchanged:     _noop,
        onprotocolchanged: _noop,
        onsearchchanged:   _noop,
        onuserchanged:     _noop
    };
    function _noop() {
    }

    addressBar.onhashchanged = function () {
        _export.onhashchanged.apply(null, arguments);
    };
    addressBar.onhostchanged = function () {
        _export.onhostchanged.apply(null, arguments);
    };
    addressBar.onhostnamechanged = function () {
        _export.onhostnamechanged.apply(null, arguments)
    };
    addressBar.onhrefchanged = function onHrefChangedCallback() {
        _export.onhrefchanged.apply(null, arguments);
    };

    addressBar.onpasschanged = function () {
        _export.onpasschanged.apply(null, arguments);
    };
    addressBar.onpathnamechanged = function () {
        _export.onpathnamechanged.apply(null, arguments);
    };
    addressBar.onportchanged = function () {
        _export.onportchanged.apply(null, arguments);
    };
    addressBar.onprotocolchanged = function () {
        _export.onprotocolchanged.apply(null, arguments);
    };
    addressBar.onsearchchanged = function () {
        _export.onsearchchanged.apply(null, arguments);
    };
    addressBar.onuserchanged = function () {
        _export.onuserchanged.apply(null, arguments);
    };
    if (browserHistory) {
        browserHistory.onstatechanged = function onHistoryStateChangedCallback() {
            addressBar.check();
        };
    }



    return _export;

}
