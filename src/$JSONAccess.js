var $JSONAcccess = function() {
	// private fields
	var _db = {};

	// public methods reveled
	return {
		val : val,
		set : set,
		get : get,
		merge : merge,
		clear : clear
	};

	// public methods
	function val(arg1, arg2) {

		if (arguments.length == 1) {
			var ret = get(arg1);
			return ret;
		} else {
			set(arg1, arg2);
		}
	}
	function set(path, value) {
		var node = _findOrCreateNode(path, true);
		node['$val'] = value;
	}
	function get(path, defaultValue) {
		var node = _findOrCreateNode(path);
		var ret;
		if (node) {
			ret = node['$val'];
		} else {
			if (defaultValue != undefined) {
				ret = defaultValue;
			} else {
				throw new Error('$JSONAccess: Path "' + path + '" not found and no default value provided');
			}
		}
		return ret;
	}
	function merge(db, path) {
		var db = _findOrCreateNode(path, true);

	}
	function clear() {
		_db = {};
	}
	// private methods

	function _findOrCreateNode(path, doCreate) {
		if (typeof path != 'string' || !path.trim()) {
			throw new Error('$JSONAccess: Invalid path: "' + path + '" type: ' + (typeof path));
		}
		path = path.toLowerCase().trim();
		var keys = path.split('/');
		var currentNode = _db;
		var found = true;
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (currentNode.hasOwnProperty(key)) {
				currentNode = currentNode[key];
			} else {
				if (doCreate) {
					var node = {
						$val : null
					};
					currentNode[key] = node;
					currentNode = node;
				} else {
					found = false;
					break;
				}
			}
		}
		var ret = found ? currentNode : null;
		return ret;
	}
};