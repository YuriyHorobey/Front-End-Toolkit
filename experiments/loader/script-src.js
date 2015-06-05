(function () {
	return	function hi(q) {
		dbg(testGlobalVar, q+'--------------------------GV 21')
		testGlobalVar = 'loaded js'
	}
}())(1);

var x=1;
dbg(x);
