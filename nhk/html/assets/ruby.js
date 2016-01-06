//rubyJS
$(document).ready(function(){
if((!getBrowser.IE && $("rt").css('display')=='inline') || getBrowser.Android || (!getIosVer && getBrowser.iOS)) delRuby();
});

function delRuby(){
	$("head").append('<link rel="stylesheet" type="text/css" href="'+g_f.path+'css/ruby.css" />');
	$('').replaceAll('rt');
	$('p ruby').each(function(){
		$(this).replaceWith($(this).html());
	});
	$('h2 ruby').each(function(){
		$(this).replaceWith($(this).html());
	});
}

var getBrowser=(function(){
	var ua=navigator.userAgent;
	var o={
		 Android : (ua.search( /(Android )(\d+\.\d+)/ ) > -1)
		,androidVer : parseFloat(RegExp.$2)
		,Kindle : (ua.search( /Silk/ ) > -1)
		,iPhone : ua.search( /iPhone/ ) > -1
		,iPod : ua.search( /iPod/ ) > -1
		,iPad : ua.search( /iPad/ ) > -1
		,iOS : false
		,Touch : false
		,IE : ua.search( /MSIE/ ) > -1
	};
	if(o.androidVer<2.1){o.Android=false;}
	if(o.iPhone||o.iPod||o.iPad)o.iOS=true;
	if(o.iOS||o.Android)o.Touch=true;
	return o;
})();

var getIosVer =(function(){
        var ua=navigator.userAgent;
        ua.match(/(iPhone|iPod|iPad).* OS ([0-9_]+)/g);
        var osVar=(RegExp.$2.replace(/_/g, '')+'00').slice(0,3);
        if(430 <= osVar)return true;
        else return false
})();
