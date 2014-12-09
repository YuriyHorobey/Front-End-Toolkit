describe(
		'$JSONAcccess',
		function() {
			var jsa;
			beforeEach(function() {
				jsa = new $JSONAcccess();
			});
			it('should set and get values', function() {
				var val_1 = 1;
				var val_2 = 2;

				jsa.set('some/value_1', val_1);
				jsa.set('some/value_2', val_2);

				expect(jsa.get('some/value_1')).toBe(val_1);
				expect(jsa.get('some/value_2')).toBe(val_2);

			});
			it('should get value or default value if value is missing',
					function() {
						var val_1 = 1;
						var defValue = 'some default value';

						jsa.set('some/value_1', val_1);

						expect(jsa.get('some/value_1')).toBe(val_1);
						expect(jsa.get('some/path/to/missing/value', defValue))
								.toBe(defValue);

					});
			it(
					'should throw exception if value is missing and no default one provided',
					function() {

						expect(function() {
							jsa.get('some/path/to/missing/value');
						}).toThrow();
					});
		});