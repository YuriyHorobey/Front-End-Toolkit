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
