(function ($WT) {
    var $Parser = function () {
        var $ = $WT.provide('$');
        return {
            parse: parse
        };

        function parse(src, viewObject) {
            // src here:
            // 1. document
            // 2. string with html
            // 3. jQ object
            if (typeof src === 'string') {
                _parse($(src), viewObject);
            } else if (src instanceof Node && (src.nodeType == Node.ELEMENT_NODE || src.nodeType == Node.DOCUMENT_NODE)) {
                _parse($(src), viewObject);
            } else if (typeof src === 'object' && typeof src.find == 'function') {
                _parse(src, viewObject);
            } else {
                throw new Error('$Parser: unknown source');
            }
            return this;
        }


        function _parse($src, viewObject) {
            if (typeof viewObject !== 'object') {
                throw new Error('$Parser: no view object given');
            }
            if (!viewObject.$markers || typeof viewObject.$markers !== 'object') {
                viewObject.$markers = {};
            }
            function addMarkerToView(name, $el, idx) {
                var preventDefault = false;
                if (viewObject.$takeMarker && typeof viewObject.$takeMarker === 'function') {
                    var tmRes = viewObject.$takeMarker(name, $el, idx);

                    preventDefault = tmRes == undefined ? false : tmRes;
                }
                if (!preventDefault) {
                    viewObject.$markers[name] = $el;
                }

            }

            var rootDataMarker = $src.attr('data-marker');
            if (rootDataMarker != undefined) {
                addMarkerToView(rootDataMarker, $src, '$root');
            }
            $src.find('[data-marker]').each(function (idx, el) {
                var $el = $(el);
                var name = $el.attr('data-marker');
                addMarkerToView(name, $el, idx);
            });
        }
    };
    return $Parser;
})($ServiceProvider);
