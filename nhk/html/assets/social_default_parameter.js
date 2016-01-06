var sysHash = function(){
	var sysHash = new Array();
	sysHash['t'] = '1';
	sysHash['f'] = '1';
	sysHash['m'] = '1';
	sysHash['g'] = '1';
	sysHash['h'] = '1';
	sysHash['q'] = '0';
	sysHash['n'] = '1';
	sysHash['v'] = '1';
	sysHash['p'] = 'top';
	sysHash['d'] = '';
	sysHash['dtitle'] = 'NHKオンライン';
	sysHash['ddesc'] = '　';
	sysHash['durl'] = location.href;
	this.hash = sysHash;
}

var pageHash = function(page){
	var margeHash = new Array();
	for (var i in page.hash) {
  		margeHash[i] = page.hash[i];
  	}
	this.hash = margeHash;
}