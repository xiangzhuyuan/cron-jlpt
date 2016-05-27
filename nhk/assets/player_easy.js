_stdobj=window["_std.js"];

(function(){
	if(document.addEventListener){ // opera,safari,mozilla向け
		document.addEventListener("DOMContentLoaded", load, false);
	} else if(_stdobj._ie){ // IE向け
		try {
			document.documentElement.doScroll("left");
		} catch(error){
			setTimeout(arguments.callee, 0);
			return;
		}
		load();
	} else { // その他
		window.onload = load;
	}
})();

function load(){
}

function showVideoTop(_this){
	movieID = _this.id;
	movieTitle = _this.title;

	if(_stdobj.$("player_"+movieID)){
		var divObj = _stdobj.$("player_"+movieID);
		_stdobj.rmchild(_stdobj.$("player_"+movieID));
	} else {
		var divObj = _stdobj.$_('div');
		divObj.id = "player_"+movieID;
		_stdobj.setObjSty(divObj,
					'p=absolute',
					'x=' + (_stdobj._scX() + _stdobj._winW() / 2 - 425/2),
					'y=' + (_stdobj._scY() + _stdobj._winH() / 2 - 324/2),
					'z=10',
					'w=425',
					'h=324');
		divObj.style.background = "url(img/newsplayer_bg.png) no-repeat scroll 0% 0% transparent";
		divObj.style.borderRadius = "5px";
	}
	_stdobj._().appendChild(divObj);
	_stdobj.popObj(divObj);

	var pObj = _stdobj.$_('p');
	_stdobj.setObjSty(pObj,
				'h=30',
				'fgc=#FFFFFF',
				'c=move');
	pObj.style.padding = "18px 0 0 30px";
	pObj.style.fontSize = "15px";
	pObj.style.fontWeight = "bold";
	pObj.style.lineHeight = "30px";
	pObj.innerHTML = movieTitle;
	divObj.appendChild(pObj);
	pObj.onmouseover = function(){
		_stdobj.dragInit(null,null,dp);
		function dp(dob){
			if(dob.ob){
				if(parseInt(dob.ob.style.top) < 0 ){ dob.ob.style.top = "0"; }
				dob.ob.style.cursor="default";
				dob.ob = null;
				dob = null;
				_stdobj._().onselectstart=createLFC(function(){return true;});
			}
		}
	}
	pObj.onmousedown = function(){
		_stdobj.dragStart(this.parentNode);
		_stdobj._().onselectstart=function(){return false;};
		return false;
	}

	var btnObj = _stdobj.$_('div');
	_stdobj.setObjSty(btnObj,
				'p=absolute',
				'x=379',
				'y=24',
				'w=18',
				'h=18',
				'c=pointer');
	btnObj.style.background = "url('img/mclose.png') no-repeat scroll 0% 0% transparent";
	divObj.appendChild(btnObj);
	btnObj.onclick = function(){
		_stdobj.delObj(divObj);
	}

	var swfdiv = _stdobj.$_('div');
	swfdiv.style.padding = "4px 0 0 20px";
	divObj.appendChild(swfdiv);

	var swfObj = _stdobj.$_('div');
	swfObj.id="swf";
	swfdiv.appendChild(swfObj);
	swfobject.embedSWF('swf/news_player4.swf?fms=rtmp://flv.nhk.or.jp/ondemand/flv/news/&movie='+movieID, "swf", "384", "253", "9.0.0", "#ffffff", null, {wmode:"transparent",allowFullScreen:"true"});
}

function showVideo(_this){
	movieID = _this.id;
	movieTitle = document.getElementsByTagName("title")[0].innerHTML.split("|")[1];

	if(_stdobj.$("player_"+movieID)){
		var divObj = _stdobj.$("player_"+movieID);
		_stdobj.rmchild(_stdobj.$("player_"+movieID));
	} else {
		var divObj = _stdobj.$_('div');
		divObj.id = "player_"+movieID;
		_stdobj.setObjSty(divObj,
					'p=absolute',
					'x=' + (_stdobj._scX() + _stdobj._winW() / 2 - 425/2),
					'y=' + (_stdobj._scY() + _stdobj._winH() / 2 - 324/2),
					'z=10',
					'w=425',
					'h=324');
		divObj.style.background = "url('../img/newsplayer_bg.png') no-repeat scroll 0% 0% transparent";
		divObj.style.borderRadius = "5px";
	}
	_stdobj._().appendChild(divObj);
	_stdobj.popObj(divObj);

	var pObj = _stdobj.$_('p');
	_stdobj.setObjSty(pObj,
				'h=30',
				'fgc=#FFFFFF',
				'c=move');
	pObj.style.padding = "18px 0 0 30px";
	pObj.style.fontSize = "15px";
	pObj.style.fontWeight = "bold";
	pObj.style.lineHeight = "30px";
	pObj.innerHTML = movieTitle;
	divObj.appendChild(pObj);
	pObj.onmouseover = function(){
		_stdobj.dragInit(null,null,dp);
		function dp(dob){
			if(dob.ob){
				if(parseInt(dob.ob.style.top) < 0 ){ dob.ob.style.top = "0"; }
				dob.ob.style.cursor="default";
				dob.ob = null;
				dob = null;
				_stdobj._().onselectstart=createLFC(function(){return true;});
			}
		}
	}
	pObj.onmousedown = function(){
		_stdobj.dragStart(this.parentNode);
		_stdobj._().onselectstart=function(){return false;};
		return false;
	}

	var btnObj = _stdobj.$_('div');
	_stdobj.setObjSty(btnObj,
				'p=absolute',
				'x=379',
				'y=24',
				'w=18',
				'h=18',
				'c=pointer');
	btnObj.style.background = "url('../img/mclose.png') no-repeat scroll 0% 0% transparent";
	divObj.appendChild(btnObj);
	btnObj.onclick = function(){
		_stdobj.delObj(divObj);
	}

	var swfdiv = _stdobj.$_('div');
	swfdiv.style.padding = "4px 0 0 20px";
	divObj.appendChild(swfdiv);

	var swfObj = _stdobj.$_('div');
	swfObj.id="swf";
	swfdiv.appendChild(swfObj);
	swfobject.embedSWF('../swf/news_player4.swf?fms=rtmp://flv.nhk.or.jp/ondemand/flv/news/&movie='+movieID, "swf", "384", "253", "9.0.0", "#ffffff", null, {wmode:"transparent",allowFullScreen:"true"});
}


function EASY_BNR_07_click(){
	if(_stdobj.$('EASY_BNR_07_01').style.display && _stdobj.$('EASY_BNR_07_01').style.display!="none"){
		_stdobj.$('EASY_BNR_07_01').style.display="none";
		_stdobj.$('EASY_BNR_07_02').style.display="none";
	} else {
		_stdobj.$('EASY_BNR_07_01').style.display="block";
		_stdobj.$('EASY_BNR_07_02').style.display="block";
	}
}
function EASY_BNR_07_over(){
	var hasTapEvent = ('ontouchstart' in window);
	if(!hasTapEvent){
		_stdobj.$('EASY_BNR_07_01').style.display="block";
		_stdobj.$('EASY_BNR_07_02').style.display="block";
	}
}
function EASY_BNR_07_out(){
	var hasTapEvent = ('ontouchstart' in window);
	if(!hasTapEvent){
		if(_stdobj.$('EASY_BNR_07_01').style.display && _stdobj.$('EASY_BNR_07_01').style.display!="none"){
			_stdobj.$('EASY_BNR_07_01').style.display="none";
			_stdobj.$('EASY_BNR_07_02').style.display="none";
		}
	}
}
