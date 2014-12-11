describe('$JSONAccess', function() {
	var jsa;
	var json_all = {};
	var json_1 = {};
	var json_2 = {};
	beforeEach(function() {
		jsa = new $JSONAccess();
		json_all = {
			my : {
				path : {
					one : 1,
					two : [ 1, 2, 3 ],
					empty : {}
				},
				hello : "Hello World"
			},
			yours : {
				path : {
					one : 11,
					two : [ 4, 5, 6 ]
				},
				bye : "Good bye cruel World"
			},
			arr : [ {
				nothing : 'here'
			}, {
				some : [ {
					indexed : 'property'
				}, 1, 2, 3 ]
			} ]
		};
		json_1 = {
			my : {
				path : {
					two : [ 1, 2, 3 ],
					empty : {}
				},
				hello : "Hello World"
			},
			yours : {
				path : {
					one : 11,
					two : [ 45, 55, 65 ]
				}
			}
		};
		json_2 = {
			my : {
				path : {
					one : 1,
					empty : {},

				}
			},
			yours : {
				path : {
					one : 11,
					two : [ 4, 5, 6 ]
				},
				bye : "Good bye cruel World"
			},
			arr : [ {
				nothing : 'here'
			}, {
				some : [ {
					indexed : 'property'
				}, 1, 2, 3 ]
			} ]
		};
	});
	// setting, getting merging JSON
	it('should set and get JSON', function() {
		jsa.setJSON(json_all);
		expect(jsa.getJSON()).toEqual(json_all);
		jsa.setJSON(json_1);
		expect(jsa.getJSON()).toEqual(json_1);
		jsa.setJSON(json_2);
		expect(jsa.getJSON()).toEqual(json_2);

	});
	it('should throw an Error when trying to set JSON but argument is not an object', function() {
		expect(function() {
			jsa.setJSON(1);
		}).toThrow();
		expect(function() {
			jsa.setJSON('');
		}).toThrow();
		expect(function() {
			jsa.setJSON(function() {
			});
		}).toThrow();
		expect(function() {
			jsa.setJSON();
		}).toThrow();
		expect(function() {
			jsa.setJSON(NaN);
		}).toThrow();
		expect(function() {
			jsa.setJSON(null);
		}).toThrow();

	});
	it('should clear JSON', function() {
		jsa.setJSON(json_all);
		jsa.clear();
		expect(jsa.getJSON()).toEqual({});
	});

	it('should merge JSON at given non existing path', function() {
		var json = {
			hi : {
				there1 : 1,
				there2 : 2
			},
			by : 3
		};
		jsa.setJSON(json_1);
		jsa.merge(json, 'somenew/path');
		json_1['somenew'] = {}
		json_1.somenew.path = json;
		expect(jsa.getJSON()).toEqual(json_1);
	});

	it('should merge JSON as root', function() {
		jsa.setJSON(json_1);
		jsa.merge(json_2);
		expect(jsa.getJSON()).toEqual(json_all);
	});

	it('should merge JSON at given existing path', function() {
		jsa.setJSON(json_1);
		jsa.merge({
			one : 1,
			two : 'new Val',

			empty : {
				merged : 2
			}
		}, 'my/path');
		expect(jsa.getJSON()).toEqual({
			my : {
				path : {
					one : 1,
					two : 'new Val',

					empty : {
						merged : 2
					}
				},
				hello : "Hello World"
			},
			yours : {
				path : {
					one : 11,
					two : [ 45, 55, 65 ]
				}
			}
		});
	});

	// path
	it('should throw exceptions on invalid path', function() {

		expect(function() {
			jsa.get(1);
		}).toThrow();
		expect(function() {
			jsa.get();
		}).toThrow();

		expect(function() {
			jsa.get(null);
		}).toThrow();

		expect(function() {
			jsa.get({});
		}).toThrow();

		expect(function() {
			jsa.get('');
		}).toThrow();

		expect(function() {
			jsa.get('         ');
		}).toThrow();

		expect(function() {
			jsa.get('/');
		}).toThrow();

		expect(function() {
			jsa.get('//my');
		}).toThrow();

		expect(function() {
			jsa.get('/my');
		}).toThrow();

		expect(function() {
			jsa.get('my//path');
		}).toThrow();
		expect(function() {
			jsa.get('my/   /path');
		}).toThrow();
		expect(function() {
			jsa.get('my     //path');
		}).toThrow();
		expect(function() {
			jsa.get('my//           path');
		}).toThrow();
	});

	// getting/setting
	it('should get values in case insensitive mode regardles of leading trailing spaces', function() {
		jsa.setJSON(json_all);

		expect(jsa.get('my / Path')).toBe(json_all.my.path);
		expect(jsa.get('  mY / Path/ ONE')).toBe(json_all.my.path.one);
		expect(jsa.get('  Yours / Path/ TWO')).toBe(json_all.yours.path.two);

	});
	it('should get values with val()', function() {
		jsa.setJSON(json_all);

		expect(jsa.val('my / Path')).toBe(json_all.my.path);
		expect(jsa.val('  mY / Path/ ONE')).toBe(json_all.my.path.one);
		expect(jsa.val('  Yours / Path/ TWO')).toBe(json_all.yours.path.two);
	});
	it('should get  default value if path is missing', function() {
		var defValue = 'my real default value';
		jsa.setJSON(json_all);
		expect(jsa.get('some/path/to/missing/value', defValue)).toBe(defValue);

	});
	it('should get value from indexed array', function() {
		jsa.setJSON(json_all);
		expect(jsa.get('my/path/two[1]')).toBe(json_all.my.path.two[1]);
		expect(jsa.get('yours/path/two[1]')).toBe(json_all.yours.path.two[1]);
		expect(jsa.get('arr[1]/some[0]/indexed')).toBe(json_all.arr[1].some[0].indexed);

	});
	it('should throw exception if value is missing and no default one provided', function() {

		expect(function() {
			jsa.get('some/path/to/missing/value');
		}).toThrow();
	});
	it('should throw exception when using val() if value is missing and no default one provided', function() {

		expect(function() {
			jsa.val('some/path/to/missing/value');
		}).toThrow();
	});
	it('should set values insensitive mode regardles of leading trailing spaces keeping other pathes intact', function() {
		var val = 12345;
		var key1 = 'anOther_kEy1 ';
		var key2 = 'anOther_kEy2 ';
		jsa.setJSON(json_all);
		jsa.set('  mY / Path/ ' + key1 + ' /' + key2, val);
		json_all.my.path.one[key1.toLowerCase() + '/' + key2.toLowerCase()] = val;
		expect(jsa.getJSON()).toEqual(json_all);
	});

	it('should set values with val()', function() {
		var val = 12345;
		var key1 = 'anOther_kEy1 ';
		var key2 = 'anOther_kEy2 ';
		jsa.setJSON(json_all);
		jsa.val('  mY / Path/ ' + key1 + ' /' + key2, val);
		json_all.my.path.one[key1.toLowerCase() + '/' + key2.toLowerCase()] = val;
		expect(jsa.getJSON()).toEqual(json_all);
	});

});