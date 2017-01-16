'use strict';

function init(){
	parallax = new Parallax(document.getElementById('wrapper-hoops'));
}

function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(init);
