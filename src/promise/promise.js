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
