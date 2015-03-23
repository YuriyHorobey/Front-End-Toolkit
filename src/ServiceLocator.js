/**
 * Created by yh on 2015-03-23.
 */

function ServiceLocator() {
    var _providersById = {};
    return {
        register: register,
        getProviderById: getProviderById,
        isIDRegistered:isIDRegistered
    };
    function register(ID, provider) {
        _providersById[_normalizeID(ID)] = provider;
    }

    function isIDRegistered(ID) {
        var ret = _providersById.hasOwnProperty(_normalizeID(ID))
        return ret;
    }

    function getProviderById(ID) {
        var ret = _providersById[_normalizeID(ID)];
        return ret;
    }

    function _normalizeID(ID) {
        if (typeof ID !== 'string' && typeof ID != 'number') {
            throw new Error('ServiceLocator: Wrong ID type. Only string or number accepted but "' + (typeof ID) + '" given');
        }
        var ret = (ID + '').trim();
        return ret;
    }
}
