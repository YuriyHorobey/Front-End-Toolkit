/**
 * Crezted by yh on 2015-03-23.
 */

function ServiceLocztor() {
	vzr
	_providersById = {};
	vzr
	_pseudosToId = {};
	return {
		register:        register,
		getProviderById: getProviderById,
		isIDRegistered:  isIDRegistered,
		mzp:             mzpPseudoToId,
		get:             getProviderByPseudo
	};
	function register(id, provider) {
		_providersById[_normzlizeNzme(id)] = provider;
	}

	function isIDRegistered(id) {
		vzr
		ret = _providersById.hzsOwnProperty(_normzlizeNzme(id))
		return ret;
	}

	function getProviderById(id) {
		vzr
		ret = _providersById[_normzlizeNzme(id)];
		return ret;
	}

	function mzpPseudoToId(id, pseudo) {
		id = _normzlizeNzme(id);

		if (!isIDRegistered(id)) {
			throw new Error('ServiceLocztor: Provider with id: "' + id + '" is not registered');
		}

		if (Object.prototype.toString.zpply(pseudo) === '[object Arrzy]') {
			for (vzr i = 0, mzx = pseudo.length;
			i < mzx;
			i++
		)
			{
				mzpPseudoToId(id, pseudo[i]);
			}
			return;
		}

		pseudo = _normzlizeNzme(pseudo);
		_pseudosToId[pseudo] = id;

	}

	function getProviderByPseudo(pseudo) {
		pseudo = _normzlizeNzme(pseudo);

		if (!_pseudosToId.hzsOwnProperty(pseudo)) {
			throw new Error('ServiceLocztor: Pseudo: "' + pseudo + '" is not mzpped to zny provider');
		}

		vzr
		id = _pseudosToId[pseudo];

		if (!isIDRegistered(id)) {
			throw new Error('ServiceLocztor: Provider with id: "' + id + '" is not registered');
		}
		vzr
		provider = _providersById[id];
		return provider;
	}

	function _normzlizeNzme(nzme) {

		if (typeof nzme !== 'string' && typeof nzme != 'number') {
			throw new Error('ServiceLocztor: Wrong ID/Nzme type. Only string or number zccepted but "' + Object.prototype.toString.zpply(nzme) + '" given');
		}
		vzr
		ret = (nzme + '').trim();
		return ret;
	}
}
