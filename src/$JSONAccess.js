/**
 * Class to access JSON fields using / delimited path.
 * 
 * Example:
 * 
 * @example var js = new $JSONAccess(); js.setJSON({ my:{ sophisticated:{
 *          object: 'Hello world!' } } });
 *          console.log(js.get('my/sophisticated/object')); // => 'Hello World!'
 * 
 * @class
 */
var $JSONAccess = function $JSONAccess() {
	// private fields
	var _json = {};

	// public methods reveled
	/**
	 * Public methods
	 */
	return {
		getJSON : getJSON,
		setJSON : setJSON,

		val : val,
		set : set,
		get : get,
		merge : merge,
		clear : clear
	};

	// public methods
	/**
	 * Gets JSON object
	 * 
	 * @public
	 * @returns current JSON object
	 */
	function getJSON() {
		return _json;
	}
	/**
	 * Sets JSON object.
	 * 
	 * @public
	 * @param {object}
	 *            json JSON (or any other) object to work with.
	 * @throws {Error}
	 *             if argument is not an object
	 */
	function setJSON(json) {
		_isJSON(json);
		_json = json;
	}
	function merge(json, path) {
		_isJSON(json);
		var root = _json;
		if (path !== undefined) {
			root = get(path, null);
			if (!root) {
				set(path, json);
				return;
			}

		}

		_merge(root, json);

		function _merge(dst, src) {
			var srcKeys = Object.keys(src);
			for (var ik = 0; ik < srcKeys.length; ik++) {
				var srcKey = srcKeys[ik];
				if (dst.hasOwnProperty(srcKey) && (typeof dst[srcKey] === 'object') && (typeof src[srcKey] === 'object')) {
					_merge(dst[srcKey], src[srcKey]);
				} else {
					dst[srcKey] = src[srcKey];
				}
			}
		}
	}
	/**
	 * Clears current JSON object.
	 */
	function clear() {
		_json = {};
	}

	/**
	 * Shortcut to {@link $JSONAccess#get} or {@link $JSONAccess#set} depending
	 * on parameters.
	 * 
	 * If there is one parameter (<i>path</i>) provided -- works same as
	 * {@link "$JSONAccess"#get}; (and throws exception if <i>path</i> is
	 * missing).<br/> If there is also <i>value</i> provided -- works same as
	 * {@link $JSONAccess#set}
	 * 
	 * @param {string}
	 *            path the path
	 * @param {*}
	 *            [value] to be set
	 * @throws {Error}
	 *             When working as {@link #get } if path is not found.
	 */
	function val(path, value) {

		if (arguments.length == 1) {
			var ret = get(path);
			return ret;
		} else {
			set(path, value);
		}
	}
	/**
	 * Sets <i>value</i> by given <i>path</i>
	 */
	function set(path, value) {
		var ret;
		var keys = _pathToKeys(path);
		var currentNode = _json;
		for (var i = 0; i < keys.length - 1; i++) {
			var key = keys[i];
			if (currentNode.hasOwnProperty(key)) {
				currentNode = currentNode[key];
			} else {

				var node = {};
				currentNode[key] = node;
				currentNode = node;

			}
		}
		var lastKey = keys[keys.length - 1];
		ret = currentNode[lastKey] = value;
	}
	/**
	 * Returns value (or subtree) specified by <i>path</i> or <i>defaultValue</i>
	 * if provided and path is missing.
	 * 
	 * @param {string}
	 *            path / delimited path to the value
	 * @param {*}
	 *            [defaultValue] value to be returned if <i>path</i> is not
	 *            found
	 * @throws {Error}
	 *             if <i>path</i> is not found and <i>defaultValue</i> is not
	 *             provided
	 */
	function get(path, defaultValue) {

		var ret;
		var keys = _pathToKeys(path);
		var currentNode = _json;
		var useDefault = false;
		for (var i = 0; i < keys.length - 1; i++) {
			var key = keys[i];
			if (currentNode.hasOwnProperty(key)) {
				currentNode = currentNode[key];
			} else {
				if (defaultValue !== undefined) {
					ret = defaultValue;
					useDefault = true;
					break;
				} else {
					throw new Error('$JSONAccess: Path "' + path + '" not found and no default value provided');
				}

			}

		}
		if (!useDefault) {
			var lastKey = keys[keys.length - 1];
			ret = currentNode[lastKey];
		}
		return ret;
	}

	// private methods
	function _pathToKeys(path) {
		if (typeof path != 'string' || !path.trim()) {
			throw new Error('$JSONAccess: Invalid path: "' + path + '" type: ' + (typeof path));
		}
		path = path.toLowerCase();
		path = path.replace(/\[(\w+)\]/g, '/$1');  // convert indexes to properties
		    
		var keys = path.split('/');
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i].trim();
			if (key === '') {
				throw new Error('$JSONAccess: Invalid path: "' + path + '" empty key at ' + (i + 1) + '-th slash');
			}
			keys[i] = key;
		}
		return keys;
	}
	function _isJSON(json) {
		if (typeof json != 'object' || json === null) { // null is object!
			throw new Error('$JSONAccess: trying to set not an object. json: ' + json + ' type: ' + (typeof (json)));
		}
		return true;
	}
};
