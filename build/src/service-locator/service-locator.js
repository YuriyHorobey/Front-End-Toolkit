;
(function () {
    /**
 * Created by yh on 2015-03-23.
 */

function ServiceLocator() {
    var _providersById = {};
    var _pseudosToId = {};
    return {
        register:       register,
        isIDRegistered: isIDRegistered,
        map:            mapPseudoToId,
        resolveId:      resolveId,
        resolvePseudo:  resolvePseudo
    };

    /**
     * Register provider by id.
     *
     * @param id of the provider
     * @param provider anything you think is providing a service.
     */
    function register(id, provider) {
        _providersById[_normalizeName(id)] = provider;
    }

    /**
     * Checks if there is provider registered under given id.
     *
     * @param id
     * @returns {boolean}
     */
    function isIDRegistered(id) {
        var ret = _providersById.hasOwnProperty(_normalizeName(id))
        return ret;
    }

    /**
     * Maps pseudo to id.
     *
     * @param pseudo
     * @param id
     */
    function mapPseudoToId(pseudo, id) {
        id = _normalizeName(id);

        if (!isIDRegistered(id)) {
            throw new Error('ServiceLocator: Provider with id: "' + id + '" is not registered');
        }

        if (Object.prototype.toString.apply(pseudo) === '[object Array]') {
            for (var i = 0, max = pseudo.length; i < max; i++) {
                mapPseudoToId(pseudo[i], id);
            }
            return;
        }

        pseudo = _normalizeName(pseudo);
        _pseudosToId[pseudo] = id;

    }

    /**
     * Resolves provider by id.
     *
     * @param id of the provider
     * @param orNull if id can not be resolved return null instead of throwing exception
     * @returns {*}  provider or null
     */
    function resolveId(id, orNull) {
        var ret = null;
        if (!isIDRegistered(id)) {
            if (!orNull) {
                throw new Error('ServiceLocator: unable to resolve Id:"' + id + '"');
            }
        } else {
            ret = _providersById[_normalizeName(id)];
        }
        return ret;
    }

    /**
     * Resolves pseudo.
     *
     * @param pseudo
     * @param orNull if pseudo can not be resolved return null instead of throwing exception
     * @returns {*} provider or null
     */
    function resolvePseudo(pseudo, orNull) {
        pseudo = _normalizeName(pseudo);
        var ret = null;
        if (!_pseudosToId.hasOwnProperty(pseudo)) {
            if (!orNull) {
                throw new Error('ServiceLocator: Pseudo: "' + pseudo + '" is not mapped to any provider');
            }
        } else {

            var id = _pseudosToId[pseudo];

            var ret = _providersById[id];
        }
        return ret;
    }

    /**
     * Checks if name (id or pseudo is valid) and returns it truncated.
     * @param name
     * @returns {string}
     * @private
     */
    function _normalizeName(name) {

        if (typeof name !== 'string' && typeof name != 'number') {
            throw new Error('ServiceLocator: Wrong ID/Name type. Only string or number accepted but "' + Object.prototype.toString.apply(name) + '" given');
        }
        var ret = (name + '').trim();
        return ret;
    }
}
;
    window['$L'] = new ServiceLocator();
})();
