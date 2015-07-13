;
(function ($L) {
    /**
 * Created by yuriy.horobey on 2015-04-21.
 */
function Contract(sl) {
	var _contracts = {};
	return {
		exists:   contractExists,
		describe: describe,
		pre:      pre,
		post:     post
	};
	//public
	function describe(contractName, descriptor) {
		checkContractName(contractName);
		checkDescriptor(contractName, descriptor);
		if (contractExists(contractName)) {
			throw new Error('Contract: Contract: "' + contractName + '" already described.');
		}
		var cn = normalizeContractName(contractName);
		_contracts[cn] = descriptor;
		return this;
	}

	function pre(contractName) {
		var contract = getContract(contractName);
		if (!contract.hasOwnProperty('pre')) {
			throw new Error('Contract: Unable to check preconditions for contract: "' + contractName + '". Missing "pre" node');
		}
		var args = Array.prototype.slice.call(arguments, 1);
		var ret = contract.pre.apply(null, args);
		return ret;
	}

	function post(contractName) {
		var contract = getContract(contractName);
		if (!contract.hasOwnProperty('post')) {
			throw new Error('Contract: Unable to check postconditions for contract: "' + contractName + '". Missing "post" node');
		}
		var args = Array.prototype.slice.call(arguments, 1);
		var ret = contract.pre.apply(null, args);
		return ret;
	}

	//private

	/**
	 * Checks if contract name is valid.
	 * Throws exception if not.
	 * @returns void
	 */
	function checkContractName(contractName) {
		if (!contractName || (typeof contractName !== 'string') || contractName.trim() === '') {
			throw new Error('Contract: Contract name: "' + contractName + '" is invalid.');
		}
	}

	function normalizeContractName(contractName) {
		return contractName.trim().toLowerCase();
	}

	/**
	 * Checks if descriptor object is valid.
	 * Throws exception if not.
	 * Valid descriptor is object with fields 'pre' and 'post'. At least one must be present.
	 * If any of the fields is present is must be a function.
	 * @param contractName just to provide more informative exception message
	 * @param descriptor to be checked
	 * @returns void
	 */
	function checkDescriptor(contractName, descriptor) {
		if (typeof descriptor !== 'object') {
			throw new Error('Contract: Invalid descriptor for contract: "' + contractName + '". It is not an object');
		}
		if (!descriptor.hasOwnProperty('pre') && !descriptor.hasOwnProperty('post')) {
			throw new Error('Contract: Invalid descriptor for contract: "' + contractName + '". Mising both "pre" and "post" nodes');
		}
		if (
			(descriptor.hasOwnProperty('pre') && (typeof descriptor.pre !== 'function') ) ||
			(descriptor.hasOwnProperty('post') && (typeof descriptor.post !== 'function'))
		) {
			throw new Error('Contract: Invalid descriptor for contract: "' + contractName + '". Either "pre" or "post" nodes are not functions');
		}
	}

	function contractExists(contractName) {
		checkContractName(contractName);
		var cn = normalizeContractName(contractName);
		var ret = _contracts.hasOwnProperty(cn);
		return ret;
	}

	function getContract(contractName) {
		checkContractName(contractName);
		var cn = normalizeContractName(contractName);
		if (!contractExists(cn)) {
			throw new Error('Contract:Unknown contract: "' + contractName + '".');
		}
		var ret = _contracts[cn];
		return ret;

	}
}
;
    (function ContractRegistrar() {
            $L.register('Contract', Contract);
        })();
})($L);

;
(function ($L) {
    /**
 * Created by yuriy.horobey on 2015-07-06.
 */
function Promise(successHandler, failureHandler, anywayHandler) {
    var STATES = {PENDING: 'pending', FULFILLED: 'fulfilled', REJECTED: 'rejected'};
    var _successHandler = successHandler;
    var _failureHandler = failureHandler;
    var _anywayHandler = anywayHandler;
    var _promiseChain = [];
    var _currentState = STATES.PENDING;
    var _promiseResult;

    var _rejectReason;

    return {
        then:      then,
        onSuccess: onSuccess,
        onFailure: onFailure,
        anyway:    anyway,
        fulfill:   fulfill,
        reject:    reject
    }
    function then(successHandler, failureHandler) {
        var _nextInChainPromise = new Promise(successHandler, failureHandler, null);
        _promiseChain.push(_nextInChainPromise);
        if (_currentState != STATES.PENDING) {
            _processQueue();
        }
        return _nextInChainPromise;
    }

    function onSuccess(successHandler) {
        var _nextInChainPromise = new Promise(successHandler, null, null);
        _promiseChain.push(_nextInChainPromise);
        return _nextInChainPromise;
    }

    function onFailure(failureHandler) {
        var _nextInChainPromise = new Promise(null, failureHandler, null);
        _promiseChain.push(_nextInChainPromise);
        return _nextInChainPromise;
    }

    function anyway(anywayHandler) {
        var _nextInChainPromise = new Promise(null, null, anywayHandler);
        _promiseChain.push(_nextInChainPromise);
        return _nextInChainPromise;
    }


    function fulfill(value) {
        if (_currentState != STATES.PENDING) {
            throw new Error('Promise: unable to resolve(): current state is: ' + _currentState);
        }
        _currentState = STATES.FULFILLED;
        _promiseResult = value;

        _processQueue();
    }

    function reject(reason) {
        if (_currentState != STATES.PENDING) {
            throw new Error('Promise: unable to reject(): current state is: ' + _currentState);
        }

        _currentState = STATES.REJECTED;
        _rejectReason = reason;
        _processQueue();
    }

    function _processQueue() {
        if (_currentState == STATES.FULFILLED) {
            try {
                if (_successHandler) {

                    var res = _successHandler.call(null, _promiseResult);
                    if (res !== undefined) {
                        _promiseResult = res;
                    }

                }
                if (_anywayHandler) {
                    _anywayHandler.call(null)
                }
            } catch (e) {
                _currentState = STATES.REJECTED;
                _rejectReason = e;
            }
        } else {
            if (_currentState == STATES.REJECTED) {

                if (_failureHandler) {
                    _failureHandler.call(null, _rejectReason)
                }
                if (_anywayHandler) {
                    _anywayHandler.call(null);
                }
            }
        }
        while (_promiseChain.length > 0) {

            var currentPromise = _promiseChain.shift();
            if (_currentState == STATES.FULFILLED) {
                currentPromise.fulfill(_promiseResult);
            } else {
                if (_currentState == STATES.REJECTED) {
                    currentPromise.reject(_rejectReason);
                }
            }
        }
    }

    function _isFunction(subject) {
        var test = Object.prototype.toString.call(subject);
        var ret = test == 'object Function';
        return ret;
    }

    function _isPromise(subject) {
        var test = Object.prototype.toString.call(subject);
        var ret = test == 'object Object';
        ret = ret && subject.hasOwnProperty('resolve') && _isFunction(subject.resolve);
        ret = ret && subject.hasOwnProperty('fulfill') && _isFunction(subject.fulfill);
        ret = ret && subject.hasOwnProperty('reject') && _isFunction(subject.reject);
        return ret;
    }
}
/**
 * Created by yuriy.horobey on 2015-07-10.
 */

function PromiseContract(contract, validator) {
    contract
        .describe('then',
        {
            pre:  function (success, failure) {
                if (success && !validator.isFunction(success)) {
                    throw new Error('PromiseContract: success handler is given to then() but it is not a function');
                }
                if (failure && !validator.isFunction(failure)) {
                    throw new Error('PromiseContract: failure handler is given to then() but it is not a function');
                }
            },
            post: function (retVal) {
                var ret = validator.isPromise(retVal);
                if (!ret) {
                    throw new Error('PromiseContract: then() failed to return a promise!');
                }
            }
        })
        .describe('onSuccess', {
            pre:  function (success) {
                if (success && !validator.isFunction(success)) {
                    throw new Error('PromiseContract: success handler is given to onSuccess() but it is not a function');
                }
            },
            post: function (retVal) {
                var ret = validator.isPromise(retVal);
                if (!ret) {
                    throw new Error('PromiseContract: onSuccess() failed to return a promise!');
                }
            }
        })
        .describe('onFailure', {
            pre:  function (failure) {
                if (failure && !validator.isFunction(failure)) {
                    throw new Error('PromiseContract: failure handler is given to onFailure() but it is not a function');
                }
            },
            post: function (retVal) {
                var ret = validator.isPromise(retVal);
                if (!ret) {
                    throw new Error('PromiseContract: onFailure() failed to return a promise!');
                }
            }
        })
        .describe('fulfill', {
            pre: function (value) {
                if (value === undefined) {
                    throw new Error('PromiseContract: fulfill() is not given mandatory argument "value"');
                }
            }
        })
        .describe('reject', {
            pre: function (reason) {
                if (reason === undefined) {
                    throw new Error('PromiseContract: reject() is not given mandatory argument "reason"');
                }
            }
        })
        .describe('resolve', {
            pre: function (promise) {
                if (promise === undefined) {
                    throw new Error('PromiseContract: resolve() is not given mandatory argument "promise"');
                }
                if (!validator.isPromise(promise)) {
                    throw new Error('PromiseContract: resolve() is given argument "promise" which is not of type Promise');
                }

            }
        });
    return contract;
}
;
    (function PromiseRegistrar() {

            function PromiseBuilder() {
                if (!Promise.prototype.contract) {
                    var contract = new ($L.resolveId('Contract'));
                    var validator = $L.resolveId('Validator');
                    Promise.prototype.contract = new PromiseContract(contract, validator);
                }
                return Promise;
            }

            $L.register('Promise', PromiseBuilder);
        })();
})($L);

;
(function ($L) {
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
;
    (function ValidatorRegistrar() {
            $L.register('Validator', new Validator);
        })();
})($L);

;
(function ($L) {
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
;
    (function AddressBarRegistrar() {
            var addressBar, window, location, urlParser, browserHistory;

            function AddressBarBuilder() {
                if (!window) {
                    window = $L.resolveId('global.window');
                }
                if (!location) {
                    location = $L.resolveId('global.location');
                }
                if (!urlParser) {
                    urlParser = $L.resolveId('UrlParser', true);
                    urlParser = urlParser && urlParser();
                }

                if (!browserHistory) {
                    browserHistory = $L.resolveId('BrowserHistory', true);
                    browserHistory = browserHistory && browserHistory();
                }
                history = history && history;
                if (!addressBar) {
                    addressBar = new AddressBar(window, location, urlParser, history);
                }
                return addressBar;
            }

            $L.register('AddressBar', AddressBarBuilder);

        })();
})($L);

;
(function ($L) {
    /**
 * Created by yuriy.horobey on 2015-07-01.
 */

function BrowserHistory(history) {
    var _export = {
        //  Loads a previous URL from the History list.
        back:           back,

        //Loads the next URL from the History list.
        forward:        forward,

        //Loads a URL from the History list.
        go:             go,

        //Pushes the given data with the given title, and the given URL, if provided, onto the session history .
        pushState:      pushState,

        //Updates the current entry in the session history to have the given data, title, and, if provided, URL.
        replaceState:   replaceState,

        //callback for pushState() and replaceState()
        onstatechanged: function () {
        }
    }
    return _export;
    function back(steps) {
        steps = -_normalizeSteps(steps);
        go(steps);
    }


    function forward(steps) {
        steps = _normalizeSteps(steps);
        go(steps);
    }


    function go(steps) {
        var intSteps = Number(steps);
        if (!isNaN(intSteps)) {
            steps = intSteps;
        }
        history.go(steps);
    }


    function pushState(statedata, title, url) {
        history.pushState(statedata, title, url);
        _export.onstatechanged(statedata, title, url, 'push');
    }


    function replaceState(statedata, title, url) {
        history.replaceState(statedata, title, url);
        _export.onstatechanged(statedata, title, url, 'replace');
    }

    function _normalizeSteps(steps) {
        steps = Number(steps);
        steps = steps || 1;
        steps = Math.abs(steps);
        return steps;
    }
}
;
    (function BrowserHistoryRegistrar() {

            var history;
            var browserHistory;

            function BrowserHistoryBuilder() {
                if (!history) {
                    history = $L.resolveId('global.history');
                }
                if (!browserHistory) {
                    browserHistory = new BrowserHistory(history);
                }
                return browserHistory;
            }

            $L.register('BrowserHistory', BrowserHistoryBuilder);
        })();
})($L);

;
(function ($L) {
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
;
    (function BrowserLocationRegistrar() {
            var browserLocation, addressBar, browserHistory, history;

            function BrowserLocationBuilder() {

                if (!browserHistory) {
                    browserHistory = $L.resolveId('BrowserHistory', true);
                    browserHistory = browserHistory && browserHistory();
                }
                if (!addressBar) {
                    addressBar = $L.resolveId('AddressBar');
                    addressBar = addressBar && addressBar();
                }
                if (!browserLocation) {
                    browserLocation = new BrowserLocation(addressBar, browserHistory);
                }

                return browserLocation;
            }

            $L.register('BrowserLocation', BrowserLocationBuilder);

        })();
})($L);

;
(function ($L) {
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
};
    (function UrlParamsRegistrar() {
            var urlParams = null;

            function UrlParamsBuilder() {
                if (!urlParams) {
                    urlParams = new UrlParams();
                }
                return urlParams;
            }

            $L.register('UrlParams', UrlParamsBuilder);
        })();
})($L);

;
(function ($L) {
    /**
 * Created by yuriy.horobey on 2015-06-25.
 */
function UrlParser(urlParams) {
    //0:full url 1: protocol, 3: user:pass, 4: host:port 5:path, 7:query, 9:hash
    const URL_REGEXP = /^([^/]+):\/\/(([^@]+)@)?([^/]+)\/?([^?#]+)?(\?([^#]*))?(#(.*))?/;
    return {
        parse:   parse,
        combine: combine
    }
    /**
     * Takes url and returns it parsed.
     *
     * Structure of  return:
     * {
        hash:     "somehash?x=y&z=1",
        host:     "host:999",
        hostname: "host",
        href:     "http://user:pass@host:999/some/path.html?param1=val1&param2=val2#somehash?x=y&z=1",
     params:   UrlParser, //if given as dependency
     pass: "pass",
     pathname: "some/path.html",
     port:     "999",
     protocol: "http",
     search:   "param1=val1&param2=val2",
     user:     "user"
     }
     *
     * @param url
     * @returns {{}}
     */
    function parse(url) {
        var parts = URL_REGEXP.exec(url);
        var ret = {};
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
        if (urlParams) {
            urlParams.parse(ret.search);
            ret.params = urlParams;
        }
        return ret;
    }

    function combine() {
        return '';
    }


}
;
    (function UrlParserRegistrar() {
            var urlParser = null;

            function UrlParserBuilder() {

                var urlParams = $L.resolveId('UrlParams', true);
                urlParams = urlParams && urlParams();
                if (!urlParser) {
                    urlParser = new UrlParser(urlParams);
                }
                return urlParser;
            }

            $L.register('UrlParser', UrlParserBuilder);
        })();
})($L);
