/**
 * Created by yuriy.horobey on 2015-06-25.
 */
function UrlParser(urlParams) {
    //0:full url 1: protocol, 3: user:pass, 4: host:port 5:path, 7:query, 9:hash
    const URL_REGEXP = /^([^/]+):\/\/(([^@]+)@)?([^/]+)\/?([^?#]+)?(\?([^#]*))?(#(.*))?/;
    return {parse: parse, combine: combine}
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
            var params = urlParams.parse(ret.search);
            ret.params = params;
        }
        return ret;
    }

    function combine() {
        return '';
    }


}
