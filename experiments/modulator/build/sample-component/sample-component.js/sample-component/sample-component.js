;(function ($L) {
    /**
 * Created by yuriy.horobey on 2015-06-23.
 */
function SampleComponent(comp2) {
    return {
        test: test
    }
    function test() {
        dbg(comp2, 'comp2');
        comp2.test();
    }
};
    (function () {
        function SampleComponentBuilder(a, b, c) {
            var sample2 = $L.resolvePseudo('sample2')(1, 2, 3);
            var ret = new SampleComponent(sample2);
            return ret;
        }

        $L.register('sample-component', SampleComponentBuilder);
        $L.map('comp', 'sample-component')
    })();
})($L);
