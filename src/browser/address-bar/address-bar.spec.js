/**
 * Created by yuriy.horobey on 2015-06-09.
 */
describe('AddressBar', function () {
    var window;
    var location;
    var adressBar;
    beforeEach(function () {
        window = {onload: null, onpopstate: null, onhashchange: null};
        location = {href: ''};
        adressBar = new AddressBar(window, location);
    });
    it('should return parsed URL', function () {
    });

    /*
     it('should ', function () {
     });
     */
})
