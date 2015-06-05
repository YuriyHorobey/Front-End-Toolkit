/**
 * Created by yuriy.horobey on 2015-04-21.
 */
describe('Contract', function () {
	var $C,
		validName = 'Valid contract name',
		invalidNames = [null, new Object, true, false, 1, function () {
		}, undefined],
		invalidDescriptors = [{}, {
			pre: '', post: function () {
			}
		}, {
			pre:     function () {
			}, post: ''
		}, 1, '', true, false, null, undefined],
		fullDescriptor = {
			pre:  function () {
				return 'pre';
			},
			post: function (ret) {
				return ret;
			}
		},
		preDescriptor = {
			pre: function () {
				return 'pre';
			}
		},
		postDescriptor = {
			post: function (ret) {
				return ret;
			}
		},
		validDescriptors = [
			fullDescriptor, preDescriptor, postDescriptor
		];

	beforeEach(function () {
		$C = new Contract;
	});
	it('should describe contract accepting valid contract name and valid descriptor without exceptions', function () {

		for (var i = 0; i < validDescriptors.length; i++) {
			expect(function () {
				$C.describe(validName + i, validDescriptors[i]);
			}).not.toThrow();
		}
	});

	it('should throw exception if contract name or descriptor are invalid', function () {
		for (var n = 0; n < invalidNames.length; n++) {
			var invalidName = invalidNames[n];
			for (var d = 0; d < invalidDescriptors.length; d++) {
				var invalidDescriptor = invalidDescriptors[d];
				expect(function () {
					$C.describe(invalidName, invalidDescriptor);
				}).toThrow();

				expect(function () {

					$C.describe(validName + n, invalidDescriptor);
				}).toThrow();
			}
		}

	});

	it('should throw exception if contract already described', function () {
		$C.describe(validName, fullDescriptor);
		expect(function () {
			$C.describe(validName, fullDescriptor);
		}).toThrow();
	});


	it('should check pre and post conditions', function () {
		$C.describe(validName, fullDescriptor);
		var ret;

		//pre
		spyOn(fullDescriptor, 'pre').and.callThrough();

		expect(function () {
			ret = $C.pre(validName, 1, 2, 3);
		}).not.toThrow();
		expect(fullDescriptor.pre).toHaveBeenCalledWith(1, 2, 3);
		expect(ret).toBe('pre');

		//post

		spyOn(fullDescriptor, 'post').and.callThrough();

		expect(function () {
			ret = $C.pre(validName, 4, 5, 6);
		}).not.toThrow();
		expect(fullDescriptor.pre).toHaveBeenCalledWith(4, 5, 6);
		expect(ret).toBe('pre');
	});

	it('should throw exception when trying to check preconditions, but "pre" node is missing', function () {
		$C.describe(validName, postDescriptor);
		expect(function () {
			$C.pre(validName)
		}).toThrow();
	});

	it('should throw exception when trying to check postconditions, but "post" node is missing', function () {
		$C.describe(validName, preDescriptor);
		expect(function () {
			$C.post(validName)
		}).toThrow();
	});

	it('should throw exception when trying to check pre or post-conditions on nonexistent contract', function () {
		expect(function () {
			$C.pre('unknown name')
		}).toThrow();
		expect(function () {
			$C.post('unknown name')
		}).toThrow();
	});
//it('', function(){});
});
