/**
 * Created by yuriy.horobey on 2015-06-25.
 */
describe('UrlParser', function () {
    var urlParser;
    var urlParamsMock = {
        parse:   function () {
        },
        combine: function () {
        }
    };
    var data = [
        {
            //full
            url:              'http://user:pass@host:999/some/path.html?param1=val1&param2=val2#somehash?x=y&z=1',
            parsed:           {
                hash:     "somehash?x=y&z=1",
                host:     "host:999",
                hostname: "host",
                href:     "http://user:pass@host:999/some/path.html?param1=val1&param2=val2#somehash?x=y&z=1",
                pass:     "pass",
                pathname: "some/path.html",
                port:     "999",
                protocol: "http",
                search:   "param1=val1&param2=val2",
                user:     "user"
            },
            parsedWithParams: {
                hash:     "somehash?x=y&z=1",
                host:     "host:999",
                hostname: "host",
                href:     "http://user:pass@host:999/some/path.html?param1=val1&param2=val2#somehash?x=y&z=1",
                pass:     "pass",
                pathname: "some/path.html",
                port:     "999",
                protocol: "http",
                search:   "param1=val1&param2=val2",
                params:   {param1: 'val1', param2: 'val2'},
                user:     "user"
            }
        }
    ];
    beforeEach(function () {
        urlParser = new UrlParser(null);
        urlParserWithParams = new UrlParser(urlParamsMock);
    });
    it('should parse URL into json without parsed params if UrlParams dependency is missing', function () {
        var entry;
        for (var i = 0; i < data.length; i++) {
            entry = data[i];
            expect(urlParser.parse(entry.url)).toEqual(entry.parsed);
        }
    });
    it('should parse URL into json with parsed params if UrlParams dependency is present', function () {
    });
    it('should combine valid URL from json', function () {
    });

    //it('should', function(){});
});
