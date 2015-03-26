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

        provider = SL.getProviderById('testObject');
        expect(provider).toBe(testObject);

        provider = SL.getProviderById('testArray1');
        expect(provider).toBe(testArray1);
        provider = SL.getProviderById('testArray2');
        expect(provider).toBe(testArray2);

        provider = SL.getProviderById('testNumber1');
        expect(provider).toBe(testNumber1);
        provider = SL.getProviderById('testNumber2');
        expect(provider).toBe(testNumber2);
        provider = SL.getProviderById('testNumber3');
        expect(provider).toBe(testNumber3);
        provider = SL.getProviderById('testNumber4');
        expect(provider).toBe(testNumber4);

        provider = SL.getProviderById('testString1');
        expect(provider).toBe(testString1);
        provider = SL.getProviderById('testString2');
        expect(provider).toBe(testString2);
        provider = SL.getProviderById('testString3');
        expect(provider).toBe(testString3);

        provider = SL.getProviderById('testBoolean1');
        expect(provider).toBe(testBoolean1);
        provider = SL.getProviderById('testBoolean2');
        expect(provider).toBe(testBoolean2);

        provider = SL.getProviderById('testNull');
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

    it('Should assign pseudos to registered Provider, throwing exception if provider is not registered', function () {

        var id1 = 'id1';
        var id2 = 'id2';

        var testValue1 = 1;
        var testValue2 = 2;

        var pseudo1 = 'pseudo1';
        var pseudo2 = 'pseudo2';

        SL.register(id1, testValue1);
        SL.register(id2, testValue2);

        SL.map(id1,pseudo1);
        SL.map(id2,pseudo2);


        expect(SL.get(pseudo1)).toBe(testValue1);
        expect(SL.get(pseudo2)).toBe(testValue2);


    });

    it('Should assign multiple pseudos to registered Provider, throwing exception if provider is not registered', function () {
        var id1 = 'id1';
        var id2 = 'id2';

        var testValue1 = 1;
        var testValue2 = 2;

        var pseudo1 = 'pseudo1';
        var pseudo2 = 'pseudo2';
        var pseudo = [pseudo1,pseudo2];


        SL.register(id1, testValue1);
        SL.register(id2, testValue2);

        SL.map(id1,pseudo);

        expect(SL.get(pseudo1)).toBe(testValue1);
        expect(SL.get(pseudo2)).toBe(testValue2);

    });
    /*'it' template
     //
     it('Should', function () {

     });
     */
});