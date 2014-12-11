var $T = function() {

};
(function() {
	var scripts = document.getElementsByTagName("script");
	$T.prototype._$src = scripts[scripts.length - 1].src;
	console.log($T.prototype._$src);
})();