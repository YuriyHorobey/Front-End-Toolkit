function $ServiceProvider() {
	var _services;
	return {
		provides : provides,
		provide : provide
	};

	function provides(serviceName, serviceCode, isSingleton) {
		var serviceDescriptor = new ServiceDescriptor(serviceName, serviceCode, isSingleton);
		_services.set(serviceName, serviceDescriptor);
		return serviceDescriptor;
	}

	function provide(serviceName, throwError) {
		var serviceCode = _services.get(serviceName, null);
		if (serviceCode === null && throwError) {
			throw new Error('$ServiceProvider: service "' + serviceName + '" not found');
		}
		return serviceCode;
	}
	// inner class
	function ServiceDescriptor(serviceCode, isSingleton) {
		var _serviceCode;
		var _isSingleton;
		var _serviceObject;
		var _initArguments;
		return {
			by : by,
			asSigleton : asSigleton,
			initializedWith : initializedWith,
			get : get
		};

		function by(serviceCode) {
			
			return this;
		}
		function asSigleton(isSingleton) {
			if(isSingleton === undefined){
				isSingleton=true;
			}
			_isSingleton = Boolean(isSingleton);
			return this;
		}
		function initializedWith() {
			_initArguments = arguments;
			return this;
		}
		function get() {
			var service;
			if (_isSingleton) {
				if (!_serviceObject) {
					_serviceObject = _createService();
				}
				service = _serviceObject;
			} else {
				service = _createService();
			}
			return service;

		}
		function _createService() {
		    function F() {
		        return serviceCode.apply(this, _initArguments);
		    }
		    F.prototype = serviceCode.prototype;
		    return new F();
		}
	}
}