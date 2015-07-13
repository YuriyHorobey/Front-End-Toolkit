/**
 * Created by yuriy.horobey on 2015-07-06.
 */
describe('Promise: ', function () {
    var promise;
    var callbacks;
    beforeEach(function () {
        promise = new Promise();
        callbacks = {
            success1: function () {
            },
            success2: function () {
            },
            fail1:    function () {
            },
            fail2:    function () {
            }
        };
    });
    it('should return Promise on then() method', function () {
        var p2 = promise.then(callbacks.success1, callbacks.fail1);
        expect(p2).toEqual(promise);
    });
    /*
     it('should', function(){

     });
     */
});