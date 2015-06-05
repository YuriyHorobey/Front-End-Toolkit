var DEBUG = true;
function dbg(data, lbl) {
	if (!DEBUG || !window.console) {
		return;
	}
	if (lbl == undefined) {
		lbl = 'DBG'
	}
	lbl += ': ';
	if (data instanceof Object) {
		console.log(lbl);
		console.dir(data);
	} else {
		console.log(lbl + data);
	}
}