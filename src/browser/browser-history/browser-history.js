/**
 * Created by yuriy.horobey on 2015-07-01.
 */

function BrowserHistory(history) {
    var _export = {
        //  Loads a previous URL from the History list.
        back:           back,

        //Loads the next URL from the History list.
        forward:        forward,

        //Loads a URL from the History list.
        go:             go,

        //Pushes the given data with the given title, and the given URL, if provided, onto the session history .
        pushState:      pushState,

        //Updates the current entry in the session history to have the given data, title, and, if provided, URL.
        replaceState:   replaceState,

        //callback for pushState() and replaceState()
        onstatechanged: function () {
        }
    }
    return _export;
    function back(steps) {
        steps = -_normalizeSteps(steps);
        go(steps);
    }


    function forward(steps) {
        steps = _normalizeSteps(steps);
        go(steps);
    }


    function go(steps) {
        var intSteps = Number(steps);
        if (!isNaN(intSteps)) {
            steps = intSteps;
        }
        history.go(steps);
    }


    function pushState(statedata, title, url) {
        history.pushState(statedata, title, url);
        _export.onstatechanged(statedata, title, url, 'push');
    }


    function replaceState(statedata, title, url) {
        history.replaceState(statedata, title, url);
        _export.onstatechanged(statedata, title, url, 'replace');
    }

    function _normalizeSteps(steps) {
        steps = Number(steps);
        steps = steps || 1;
        steps = Math.abs(steps);
        return steps;
    }
}
