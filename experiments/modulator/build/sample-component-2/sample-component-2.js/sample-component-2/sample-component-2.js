;(function ($L) {
    /**
 * Created by yuriy.horobey on 2015-06-23.
 */

function SampleComponent2() {
    return {
        test: function () {
            dbg('component2 reporting!');
        }
    }
};
    (function () {
        function SampleComponent2Builder(a, b, c) {
            var ret = new SampleComponent2(a, b, c);
            return ret;
        }

        $L.register('sample-component-2', SampleComponent2Builder);
        $L.map('sample2', 'sample-component-2')
    })();
})($L);
