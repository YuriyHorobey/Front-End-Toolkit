describe(
		'$Config',
		function() {
			var cfg;
			beforeEach(function() {
				cfg = new $Config();
			});
			it('should set and get values', function() {
				var val_1 = 1;
				var val_2 = 2;

				cfg.set('some/value_1', val_1);
				cfg.set('some/value_2', val_2);

				expect(cfg.get('some/value_1')).toBe(val_1);
				expect(cfg.get('some/value_2')).toBe(val_2);

			});
			it('should get value or default value if value is missing',
					function() {
						var val_1 = 1;
						var defValue = 'some default value';

						cfg.set('some/value_1', val_1);

						expect(cfg.get('some/value_1')).toBe(val_1);
						expect(cfg.get('some/path/to/missing/value', defValue))
								.toBe(defValue);

					});
			it(
					'should throw exception if value is missing and no default one provided',
					function() {

						expect(function() {
							cfg.get('some/path/to/missing/value');
						}).toThrow();
					});
		});