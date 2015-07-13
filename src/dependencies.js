/**
 * Created by yuriy.horobey on 2015-07-01.
 */

module.exports = {
    'service-locator': function () {
        //configured in the template
    },

    'browser/browser-location/browser-location': {
        registrar: function BrowserLocationRegistrar() {
            var browserLocation, addressBar, browserHistory, history;

            function BrowserLocationBuilder() {

                if (!browserHistory) {
                    browserHistory = $L.resolveId('BrowserHistory', true);
                    browserHistory = browserHistory && browserHistory();
                }
                if (!addressBar) {
                    addressBar = $L.resolveId('AddressBar');
                    addressBar = addressBar && addressBar();
                }
                if (!browserLocation) {
                    browserLocation = new BrowserLocation(addressBar, browserHistory);
                }

                return browserLocation;
            }

            $L.register('BrowserLocation', BrowserLocationBuilder);

        }
    },
    'browser/address-bar/address-bar':           {
        registrar: function AddressBarRegistrar() {
            var addressBar, window, location, urlParser, browserHistory;

            function AddressBarBuilder() {
                if (!window) {
                    window = $L.resolveId('global.window');
                }
                if (!location) {
                    location = $L.resolveId('global.location');
                }
                if (!urlParser) {
                    urlParser = $L.resolveId('UrlParser', true);
                    urlParser = urlParser && urlParser();
                }

                if (!browserHistory) {
                    browserHistory = $L.resolveId('BrowserHistory', true);
                    browserHistory = browserHistory && browserHistory();
                }
                history = history && history;
                if (!addressBar) {
                    addressBar = new AddressBar(window, location, urlParser, history);
                }
                return addressBar;
            }

            $L.register('AddressBar', AddressBarBuilder);

        }
    },
    'browser/browser-history/browser-history':   {
        registrar: function BrowserHistoryRegistrar() {

            var history;
            var browserHistory;

            function BrowserHistoryBuilder() {
                if (!history) {
                    history = $L.resolveId('global.history');
                }
                if (!browserHistory) {
                    browserHistory = new BrowserHistory(history);
                }
                return browserHistory;
            }

            $L.register('BrowserHistory', BrowserHistoryBuilder);
        }
    },
    'browser/url-parser/url-parser':             {
        registrar: function UrlParserRegistrar() {
            var urlParser = null;

            function UrlParserBuilder() {

                var urlParams = $L.resolveId('UrlParams', true);
                urlParams = urlParams && urlParams();
                if (!urlParser) {
                    urlParser = new UrlParser(urlParams);
                }
                return urlParser;
            }

            $L.register('UrlParser', UrlParserBuilder);
        }
    },
    'browser/url-params/url-params':             {
        registrar: function UrlParamsRegistrar() {
            var urlParams = null;

            function UrlParamsBuilder() {
                if (!urlParams) {
                    urlParams = new UrlParams();
                }
                return urlParams;
            }

            $L.register('UrlParams', UrlParamsBuilder);
        }
    },
    'promise/promise':                           {
        concat:    ['promise.contract'],
        registrar: function PromiseRegistrar() {

            function PromiseBuilder() {
                if (!Promise.prototype.contract) {
                    var contract = new ($L.resolveId('Contract'));
                    var validator = $L.resolveId('Validator');
                    Promise.prototype.contract = new PromiseContract(contract, validator);
                }
                return Promise;
            }

            $L.register('Promise', PromiseBuilder);
        }
    },
    'contract/contract':                         {
        registrar: function ContractRegistrar() {
            $L.register('Contract', Contract);
        }
    },
    'validator/validator':                       {
        registrar: function ValidatorRegistrar() {
            $L.register('Validator', new Validator);
        }
    }
}
