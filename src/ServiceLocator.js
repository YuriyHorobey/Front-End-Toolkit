/**
 * Created by yh on 2015-03-23.
 */

function ServiceLocator() {
    var _providersById = {};
    var _pseudosToId = {};
    return {
        register: register,
        getProviderById: getProviderById,
        isIDRegistered: isIDRegistered,
        map: mapPseudoToId,
        get: getProviderByPseudo
    };
    function register(id, provider) {
        _providersById[_normalizeName(id)] = provider;
    }

    function isIDRegistered(id) {
        var ret = _providersById.hasOwnProperty(_normalizeName(id))
        return ret;
    }

    function getProviderById(id) {
        var ret = _providersById[_normalizeName(id)];
        return ret;
    }

    function mapPseudoToId(id, pseudo) {
        id = _normalizeName(id);

        if (!isIDRegistered(id)) {
            throw new Error('ServiceLocator: Provider with id: "' + id + '" is not registered');
        }

        if (Object.prototype.toString.apply(pseudo) === '[object Array]') {
            for (var i = 0, max = pseudo.length; i < max; i++) {
                console.log(pseudo[i], 2)
                mapPseudoToId(id, pseudo[i]);
            }
            return;
        }

        pseudo = _normalizeName(pseudo);
        _pseudosToId[pseudo] = id;

    }

    function getProviderByPseudo(pseudo) {
        pseudo = _normalizeName(pseudo);

        if (!_pseudosToId.hasOwnProperty(pseudo)) {
            throw new Error('ServiceLocator: Pseudo: "' + pseudo + '" is not mapped to any provider');
        }

        var id = _pseudosToId[pseudo];

        if (!isIDRegistered(id)) {
            throw new Error('ServiceLocator: Provider with id: "' + id + '" is not registered');
        }
        var provider = _providersById[id];
        return provider;
    }

    function _normalizeName(name) {

        if (typeof name !== 'string' && typeof name != 'number') {
            throw new Error('ServiceLocator: Wrong ID/Name type. Only string or number accepted but "' + Object.prototype.toString.apply(name) + '" given');
        }
        var ret = (name + '').trim();
        return ret;
    }
}
