/**
 * Created by yuriy.horobey on 2015-06-25.
 */
function UrlParser(urlParams) {
    //0:full url 1: protocol, 3: user:pass, 4: host:port 5:path, 7:query, 9:hash
    const URL_REGEXP = /^([^/]+):\/\/(([^@]+)@)?([^/]+)\/?([^?#]+)?(\?([^#]*))?(#(.*))?/;
    return {
        parse:   parse,
        combine: combine
    }
    /**
     * Takes url and returns it parsed.
     *
     * Structure of  return:
     * {
        hash:     "somehash?x=y&z=1",
        host:     "host:999",
        hostname: "host",
        href:     "http://user:pass@host:999/some/path.html?param1=val1&param2=val2#somehash?x=y&z=1",
     params:   UrlParser, //if given as dependency
     pass: "pass",
     pathname: "some/path.html",
     port:     "999",
     protocol: "http",
     search:   "param1=val1&param2=val2",
     user:     "user"
     }
     *
     * @param url
     * @returns {{}}
     */
    function parse(url) {
        var parts = URL_REGEXP.exec(url);
        var ret = {};
        if (parts) {
            ret.href = parts[0] || '';
            ret.protocol = parts[1] || '';

            var userPass = (parts[3] || '').trim().split(':');
            ret.user = userPass[0] || '';
            ret.pass = userPass[1] || '';

            var hostPort = (parts[4] || '').trim().split(':');
            ret.host = parts[4] || '';
            ret.hostname = hostPort[0] || '';
            ret.port = hostPort[1] || '';

            ret.pathname = parts[5] || '';

            ret.search = parts[7] || '';

            ret.hash = parts[9] || '';
        }
        if (urlParams) {
            urlParams.parse(ret.search);
            ret.params = urlParams;
        }
        return ret;
    }

    function combine() {
        return '';
    }


}
