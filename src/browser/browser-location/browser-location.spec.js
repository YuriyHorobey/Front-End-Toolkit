/**
 * Created by yuriy.horobey on 2015-07-01.
 */
describe('BrowserLocation', function () {
    var addressBarMock;
    var browserHistoryMock;
    var collbackReceiverMock;


    beforeEach(function () {
        addressBarMock = {
            onhashchanged:     null,
            onhostchanged:     null,
            onhostnamechanged: null,
            onhrefchanged:     null,

            onpasschanged:     null,
            onpathnamechanged: null,
            onportchanged:     null,
            onprotocolchanged: null,
            onsearchchanged:   null,
            onuserchanged:     null,

            check: function () {
            }
        };
        browserHistoryMock = {
            onstatechanged: null
        };
        collbackReceiverMock = {
            onhashchanged:     function () {
            },
            onhostchanged:     function () {
            },
            onhostnamechanged: function () {
            },
            onhrefchanged:     function () {
            },

            onpasschanged:     function () {
            },
            onpathnamechanged: function () {
            },
            onportchanged:     function () {
            },
            onprotocolchanged: function () {
            },
            onsearchchanged:   function () {
            },
            onuserchanged:     function () {
            }
        };
    });
    it('should throw exception if no AddressBar dependency satisfied', function () {
        expect(function () {
            new BrowserLocation();
        }).toThrow();
    });
    it('should assign callbacks to AddressBar and BrowserHistory (if later is given)', function () {
        var bl = new BrowserLocation(addressBarMock);


        expect(typeof addressBarMock.onhashchanged).toBe('function');
        expect(typeof addressBarMock.onhostchanged).toBe('function');
        expect(typeof addressBarMock.onhostnamechanged).toBe('function');
        expect(typeof addressBarMock.onhrefchanged).toBe('function');
        expect(typeof addressBarMock.onpasschanged).toBe('function');
        expect(typeof addressBarMock.onpathnamechanged).toBe('function');
        expect(typeof addressBarMock.onportchanged).toBe('function');
        expect(typeof addressBarMock.onprotocolchanged).toBe('function');
        expect(typeof addressBarMock.onsearchchanged).toBe('function');
        expect(typeof addressBarMock.onuserchanged).toBe('function');

    });
    it('should react on every AddressBar event calling a callback', function () {


        spyOn(collbackReceiverMock, 'onhashchanged');
        spyOn(collbackReceiverMock, 'onhostchanged');
        spyOn(collbackReceiverMock, 'onhostnamechanged');
        spyOn(collbackReceiverMock, 'onhrefchanged');
        spyOn(collbackReceiverMock, 'onpasschanged');
        spyOn(collbackReceiverMock, 'onpathnamechanged');
        spyOn(collbackReceiverMock, 'onportchanged');
        spyOn(collbackReceiverMock, 'onprotocolchanged');
        spyOn(collbackReceiverMock, 'onsearchchanged');
        spyOn(collbackReceiverMock, 'onuserchanged');

        var bl = new BrowserLocation(addressBarMock);

        bl.onhashchanged = collbackReceiverMock.onhashchanged;
        bl.onhostchanged = collbackReceiverMock.onhostchanged;
        bl.onhostnamechanged = collbackReceiverMock.onhostnamechanged;
        bl.onhrefchanged = collbackReceiverMock.onhrefchanged;
        bl.onpasschanged = collbackReceiverMock.onpasschanged;
        bl.onpathnamechanged = collbackReceiverMock.onpathnamechanged;
        bl.onportchanged = collbackReceiverMock.onportchanged;
        bl.onprotocolchanged = collbackReceiverMock.onprotocolchanged;
        bl.onsearchchanged = collbackReceiverMock.onsearchchanged;
        bl.onuserchanged = collbackReceiverMock.onuserchanged;


        addressBarMock.onhashchanged(1, 2, 3);
        addressBarMock.onhostchanged(1, 2, 3);
        addressBarMock.onhostnamechanged(1, 2, 3);
        addressBarMock.onhrefchanged(1, 2, 3);
        addressBarMock.onpasschanged(1, 2, 3);
        addressBarMock.onpathnamechanged(1, 2, 3);
        addressBarMock.onportchanged(1, 2, 3);
        addressBarMock.onprotocolchanged(1, 2, 3);
        addressBarMock.onsearchchanged(1, 2, 3);
        addressBarMock.onuserchanged(1, 2, 3);


        expect(collbackReceiverMock.onhashchanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onhostchanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onhostnamechanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onhrefchanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onpasschanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onpathnamechanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onportchanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onprotocolchanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onsearchchanged).toHaveBeenCalledWith(1, 2, 3);
        expect(collbackReceiverMock.onuserchanged).toHaveBeenCalledWith(1, 2, 3);
    });

    it('should force AddressBar upon receiving BrowserHistory\'s event "onstatechanged"', function () {
        var bl = new BrowserLocation(addressBarMock, browserHistoryMock);
        spyOn(addressBarMock, 'check');
        browserHistoryMock.onstatechanged();
        expect(addressBarMock.check).toHaveBeenCalled();
    });
    /*
     it('should', function(){

     });
     */
});
