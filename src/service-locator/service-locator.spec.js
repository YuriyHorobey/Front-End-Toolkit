describe('ServiceLocator', function () {
    var SL;
    beforeEach(function () {
        SL = new ServiceLocator();
    });

    it('Should register/retrieve anything (function, object and primitives) by ID', function () {
        var testFunction = function () {
        };

        var testObject = {field: 'value'}

        var testArray1 = [1, 2, 3];
        var testArray2 = [];

        var testNumber1 = 0;
        var testNumber2 = Number.MAX_VALUE;
        var testNumber3 = Number.MIN_VALUE;
        var testNumber4 = 108;

        var testString1 = "";
        var testString2 = "0";
        var testString3 = "Hi";

        var testBoolean1 = true;
        var testBoolean2 = false;

        var testNull = null;

        SL.register('testObject', testObject);

        SL.register('testArray1', testArray1);
        SL.register('testArray2', testArray2);

        SL.register('testNumber1', testNumber1);
        SL.register('testNumber2', testNumber2);
        SL.register('testNumber3', testNumber3);
        SL.register('testNumber4', testNumber4);

        SL.register('testString1', testString1);
        SL.register('testString2', testString2);
        SL.register('testString3', testString3);

        SL.register('testBoolean1', testBoolean1);
        SL.register('testBoolean2', testBoolean2);

        SL.register('testNull', testNull);

        var provider;

        provider = SL.resolveId('testObject');
        expect(provider).toBe(testObject);

        provider = SL.resolveId('testArray1');
        expect(provider).toBe(testArray1);
        provider = SL.resolveId('testArray2');
        expect(provider).toBe(testArray2);

        provider = SL.resolveId('testNumber1');
        expect(provider).toBe(testNumber1);
        provider = SL.resolveId('testNumber2');
        expect(provider).toBe(testNumber2);
        provider = SL.resolveId('testNumber3');
        expect(provider).toBe(testNumber3);
        provider = SL.resolveId('testNumber4');
        expect(provider).toBe(testNumber4);

        provider = SL.resolveId('testString1');
        expect(provider).toBe(testString1);
        provider = SL.resolveId('testString2');
        expect(provider).toBe(testString2);
        provider = SL.resolveId('testString3');
        expect(provider).toBe(testString3);

        provider = SL.resolveId('testBoolean1');
        expect(provider).toBe(testBoolean1);
        provider = SL.resolveId('testBoolean2');
        expect(provider).toBe(testBoolean2);

        provider = SL.resolveId('testNull');
        expect(provider).toBe(testNull);

    });

    it('Should throw exception if trying to register with ID which is neither string or number', function () {
        expect(function () {
            SL.register('valid ID')
        }).not.toThrow();
        expect(function () {
            SL.register(111)
        }).not.toThrow();

        expect(function () {
            SL.register({})
        }).toThrow();
        expect(function () {
            SL.register(null)
        }).toThrow();

        expect(function () {
            SL.register(function () {
            })
        }).toThrow();

        expect(function () {
            SL.register([])
        }).toThrow();
        expect(function () {
            SL.register([1, 2, 3])
        }).toThrow();

        expect(function () {
            SL.register(true)
        }).toThrow();
        expect(function () {
            SL.register(false)
        }).toThrow();

        expect(function () {
            SL.register()
        }).toThrow();

    });

    it('Should check if ID is registered', function () {
        var someID = 'Hi there!'
        SL.register(someID);
        expect(SL.isIDRegistered(someID)).toBe(true);
        expect(SL.isIDRegistered('non existing ID')).toBe(false);
    });

    it('Should throw exception if trying to map to unknown Id', function () {
        expect(function () {
            SL.map('some bogus psudo', 'some bogus id');
        }).toThrow();
    });


    it('Should throw exception if trying resolve unknown Id', function () {
        expect(function () {
            SL.resolveId('some bogus id');
        }).toThrow();
    });

    it('Should return null instead of throwing exception if trying resolve unknown Id in quiet mode', function () {
        expect(function () {
            var res = SL.resolveId('some bogus id', true);
            expect(res).toBe(null)
        }).not.toThrow();
    });

    it('Should throw exception if trying resolve unknown pseudo', function () {
        expect(function () {
            SL.resolvePseudo('some bogus psudo');
        }).toThrow();
    });
    it('Should  return null instead of throwing exception if trying resolve unknown pseudo', function () {
        expect(function () {
            var res = SL.resolvePseudo('some bogus psudo', true);
        }).not.toThrow();
    });

    it('Should assign pseudos to registered Provider, throwing exception if provider is not registered', function () {

        var id1 = 'id1';
        var id2 = 'id2';

        var testValue1 = 1;
        var testValue2 = 2;

        var pseudo1 = 'pseudo1';
        var pseudo2 = 'pseudo2';

        SL.register(id1, testValue1);
        SL.register(id2, testValue2);

        SL.map(pseudo1, id1);
        SL.map(pseudo2, id2);


        expect(SL.resolvePseudo(pseudo1)).toBe(testValue1);
        expect(SL.resolvePseudo(pseudo2)).toBe(testValue2);


    });

    it('Should assign multiple pseudos to registered Provider, throwing exception if provider is not registered', function () {
        var id1 = 'id1';

        var testValue1 = 1;

        var pseudo1 = 'pseudo1';
        var pseudo2 = 'pseudo2';

        var pseudo = [pseudo1, pseudo2];


        SL.register(id1, testValue1);


        SL.map(pseudo, id1);

        expect(SL.resolvePseudo(pseudo1)).toBe(testValue1);
        expect(SL.resolvePseudo(pseudo2)).toBe(testValue1);

    });
    /*'it' template
     //
     it('Should', function () {

     });
     */
});