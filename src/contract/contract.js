/**
 * Created by yuriy.horobey on 2015-04-21.
 */
function Contract() {
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
