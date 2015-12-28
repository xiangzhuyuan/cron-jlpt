//* Global VAR *//
var g_dic;
var g_={};
var g_dateList = [];//一ヶ月のニュースの日付
var g_articleContents = {};//一ヶ月のニュースの内容

var helpTxt = "";
	helpTxt +='<dl class="dict"><dt>';
	helpTxt += '<span><ruby>次<rt>つぎ</rt></ruby>のことばに<ruby>色<rt>いろ</rt></ruby>がつきます。</span>';
	helpTxt += '</dt>';
	helpTxt +='<dd><ruby>国<rt>くに</rt></ruby>や<ruby>県<rt>けん</rt></ruby>、<ruby>町<rt>まち</rt></ruby>、<ruby>場所<rt>ばしょ</rt></ruby>などの<ruby>名前<rt>なまえ</rt></ruby>　<span class="colorL"><ruby>青<rt>あお</rt></ruby></span><br /><ruby>人<rt>ひと</rt></ruby>の<ruby>名前<rt>なまえ</rt></ruby>　<span class="colorN"><ruby>紫<rt>むらさき</rt></ruby></span><br /><ruby>会社<rt>かいしゃ</rt></ruby>やグループなどの<ruby>名前<rt>なまえ</rt></ruby><span class="colorC"><ruby>　薄<rt>　うす</rt></ruby>い<ruby>青<rt>あお</rt></ruby></span></dd>';
	helpTxt += '</dl>';

//* onLoad Func *//
$(document).ready(function(){
	g_f.init();
	g_f.bindHelp(getBrowser.Touch);
	if(getBrowser.iPhone ==1 || getBrowser.iPod==1){
		$("#newsarticle p").css({"font-size":'25px'});
	}
});

var _social={
	hash :{"t":1,"f":1,"m":1,"n":1,"y":0,"g":0,"h":0}
}

//独自動画どうか
var g_isEasyMovie = false;


var g_f = {
	init :function(){}
	,makeHeader :function(){}
	,loadDic :function(){}
	,setVoicePlayer:function(){}
	,openDic:function(){}
	,bindDic:function(){}
	,bindHelp:function(){}

	//トップ
	,makeTopListhtml:function(){}
	,makeTopNewsListhtml:function(){}
	,showTopList:function(){}
	,showTopNewsList:function(){}
	,showTopArticleContents:function(){}
	,imageCheck:function(){}
	,controlTopNP:function(){}
	,Topcrrentday:function(){}

	//詳細
	,makeResultMainNewshtml:function(){}
	,makeResultNewsListhtml:function(){}
	,showResultMainNews:function(){}
	,showResultNewsList:function(){}
	,showResultArticleContents:function(){}
	,controlResultNP:function(){}
	,setArticlesBefore_After:function(){}

	//共通
	,jsonURL:{}
	,getJson:function(){}
	,moveNP:function(){}
	
	//アンケート
	,rec_data:function(){}
	,drawGraph:function(){}
	,miframe:function(){}
	,enq_close:function(){}
}

g_f.path='./';

g_f.jsonURL = {
	toplist: 'top-list.json',
	newslist: 'news-list.json'
}

var getUTCDateByServer = function () {
	var r;
	return (r = new XMLHttpRequest) ? (r.open ('HEAD', '#', false), r.send (null), new Date (r.getResponseHeader ('Date'))) : null;
}; 
var g_pageView = {
	top : 7,
	result : 1
}
var g_counter = {
	weekList: 1,
	heightLine : 1,
	heightLineCheck : 1
}

g_f.init = function(){

	g_f.makeHeader();

	//詳細
	$("#chColor").bind("click",function(){
		if($('#newswrap').attr('class') == "coloroff"){
			$('#newswrap').attr('class','coloron');
		}else{
			$('#newswrap').attr('class','coloroff');
		}
	});
		
	$("#aboutThisSite a").bind("click",function(){
		var newWin = window.open(
			g_f.path + "about.html",    //移動先
			"aboutWin",  //ターゲット名（aタグのtargetと同様）
			"width=480, height=600, scrollbars=yes"
		);
		if(getBrowser.Android){
			$("#nhk_audioplayer").hide();
		}
	});
}

g_f.isVideoTag = function(){
	return (getBrowser.iPhone || getBrowser.iPad || getBrowser.iPod || getBrowser.androidVer >= 4.1 || getBrowser.Kindle);
}
g_f.serverDate = new Date();
g_f.makeHeader = function(){
	 var url = "/news/json/koyomi.json";
	
	if(location.host.indexOf("nhk.or.jp") == -1){
	 url = g_f.path + "get_data.php?http://www3.nhk.or.jp/news/json/koyomi.json"
	}
	
	var _rum = new Date().getTime();
	$.ajax({url: url+"?date="+_rum,dataType:"text",success: function(jData, status, xhr){
	var w=["日","月","火","水","木","金","土"];
	var d = new Date(xhr.getResponseHeader("Date"));
	g_f.serverDate = d;
	var yy=d.getYear();
	if(yy<2000){yy+=1900}
	var hs=yy-1988;
	var mm=d.getMonth()+1;
	var dd=d.getDate();
	var dcls="";
		switch(d.getDay()){
			case 0:
			dcls="sun";
			break;
			case 6:
			dcls="sat";
			break
		}
	var _h=yy+"年（平成"+hs+"年）"+mm+"月"+dd+'日［<span class="'+dcls+'">'+w[d.getDay()]+"曜日</span>］";
	$("#pageTime").append(_h);
	
	
	var _data;
	try{_data=eval("("+jData+")")}catch(e){}
	var _t = "";
	if(_data&&_data[yy]&&_data[yy][mm]&&_data[yy][mm][dd]&&_data[yy][mm][dd].length>0){
		var tmpo=_data[yy][mm][dd];
		for(var i=0;i<tmpo.length;i++){
			_t+=tmpo[i].txt;
		}
		$("#pageTime").append('<p><span class="sekki">'+_t+'</span></p>');
		}	
	}
	});
}

g_f.setVideoPlayer = function(width, height, json, TAcheckflg){
	var ht='',
		dir = './',
	    ap = 'autoplay';
	
	//動画の表示設定
	var m_id  = (json.has_news_web_movie && json.news_web_movie_uri)? json.news_web_movie_uri: null;
	var m_id2 = (json.has_news_easy_movie && json.news_easy_movie_uri)? json.news_easy_movie_uri: null;

	//静止画の表示設定
	var _poster = (json.has_news_web_image && json.news_web_image_uri)? json.news_web_image_uri: null;
		_poster = (json.has_news_easy_image && json.news_easy_image_uri)? json.news_easy_image_uri: _poster;

	if(TAcheckflg == 1){//1ならトップページ、2なら詳細ページ
		 dir = json.news_id + '/';
		 ap = '';
	}
	//独自動画
	if(m_id2){
		ht+='<video src="'+ dir + m_id2 +'" width="'+ width +'" height="'+ height +'" controls '+ ap +' poster="'+ dir + _poster + '"></video>';
		g_isEasyMovie = true;
	}
	//ストリーミング
	else if(m_id){
		ht+='<video src="https://nhkmovs-i.akamaihd.net/i/news/'+ m_id +'/master.m3u8" width="'+width+'" height="'+height+'"  controls '+ ap +' poster="'+_poster+'"></video>';
	}
	if(TAcheckflg !=1 && ht == '' && _poster){//詳細ページのサムネイルのみ対応
		ht+= '<img alt="記事タイトル" src="'+ _poster +'">';
	}
	return ht;
}

g_f.loadDic = function(dic){
//辞書ファイルの読み込み
	var _rum = new Date().getTime();
	$.ajax({url: dic + ".out.dic?date="+_rum,dataType:"text",success: function(jdata, status, xhr){
		g_dic = $.parseJSON(jdata);
		g_f.bindDic(getBrowser.Touch);
	}});
}

function hideDic(){
		$('#dicBox').hide();
		$('#dicBox').css('left',"0px");
		$('#dicBox').css('top',"-500px");
	}


g_f.openDic = function(_id){
	if(g_dic.reikai.entries[_id.split("-")[1]].length > 0){
		var _dData = g_dic.reikai.entries[_id.split("-")[1]];
		var _h = "";
		_h +='<dl class="dict"><dt>';
		$.each(_dData[0].hyouki,function(){
			_h += '<span>' + this + '</span>';
		});
		_h += '</dt>';
		var _count = 1;
		$.each(_dData,function(){
			_h +='<dd>' +'<em>'+ _count+'）</em>'+ this.def +'</dd>';
			_count++;
		});
		_h += '</dl>';
		}
		return _h;
}

g_f.bindDic = function(_touch){
	if(_touch){
			$('.dicWin').bind('touchstart',function(_e) {
			    _e.preventDefault();
				$('#dicContent').empty();
				$('#dicContent').html(g_f.openDic($(this).attr('id')));
			    var _posX = event.touches[0].pageX; // X 座標の位置
			    var _posY = event.touches[0].pageY; // Y 座標の位置
				var _height = $('#dicBox').height();
				_posY -= (_height+30);	
				if((_height+30) > event.changedTouches[0].clientY) _posY += _height+50;
			    $('#dicBox').css('left',_posX);
				$('#dicBox').css('top',_posY);
				$('#dicBox').show();   
			});
			$('#dicBox').bind('touchstart', function(_e) {
				_e.preventDefault();
			    hideDic(); 
			});	
		}else{
			$('.dicWin').mouseover(function(_e){
				$('#dicContent').empty();
				$('#dicContent').html(g_f.openDic($(this).attr('id')));
				var _posX = _e.pageX;
				var _posY = _e.pageY;
				var _height = $('#dicBox').height();
				_posY -= (_height+30);	
				if((_height+30) > _e.clientY) _posY += _height+50;
				$('#dicBox').css('left',_posX);
				$('#dicBox').css('top',_posY);
				$('#dicBox').show();
			});
			$('.dicWin').mouseout(function(_e){
				hideDic();
			});
		}
}


g_f.bindHelp = function(_touch){
	if(_touch){
			$("#help").bind("touchstart",function(_e){
				_e.preventDefault();
				$('#dicContent').empty();
				$('#dicContent').html(helpTxt);
				var _posX = event.changedTouches[0].pageX;
				var _posY = event.changedTouches[0].pageY;
				var _height = $('#dicBox').height();
				_posY -= (_height+30);	
				if((_height+30) > event.changedTouches[0].clientY) _posY += _height+50;
				$('#dicBox').css('left',_posX-280);
				$('#dicBox').css('top',_posY);
				$('#dicBox').show();
			});
			$("#dicBox").bind("touchend",function(_e){ 
				_e.preventDefault();
				hideDic();
			});	
		}else{
			$("#help").bind("mouseover",function(_e){
				$('#dicContent').empty();
				$('#dicContent').html(helpTxt);
				var _posX = _e.pageX;
				var _posY = _e.pageY;
				var _height = $('#dicBox').height();
				_posY -= (_height+30);	
				if((_height+30) > _e.clientY) _posY += _height+50;
				$('#dicBox').css('left',_posX-300);
				$('#dicBox').css('top',_posY);
				$('#dicBox').show();	
			});
			$("#help").bind("mouseout",function(){ hideDic();});
		}
}

g_f.getJson = function(url, cb){
	$.ajax({
		url:url,
		type: 'GET',
		cache : false,
		dataType : 'json',
		success:function(data){
			cb(data)
		},
		complete:function(XMLHttpRequest, status){
		}
	});
};


//library cookF
var cookF={
	set:function(key, val, opt){
		var t='';
		t+= key+'=';
		t+= encodeURIComponent(val)+';';
		if(opt.expires){t+='expires='+this.getGMT(opt.expires)+';';}
		if(opt.domain){t+='domain='+opt.domain+';';}
		if(opt.path){t+='path='+opt.path+';';}else{t+='path=/;';}
		if(opt.secure){t+='secure';}
		document.cookie=t;
	},
	get:function(key){
		var t=document.cookie.split(';');
		var u='';
		for(var i=0;i<t.length;i++){
			u=t[i].split('=');
			if(this.trim(u[0])==key){
				return decodeURIComponent(this.trim(u[1]));
			}
		}
		return '';
	},
	del:function(key){
		this.set(key, '', {expires:-365});
	},
	getGMT:function(d){
		var exp=new Date();
		exp.setTime(exp.getTime()+1000*60*60*24*d);
		return exp.toGMTString();
	},
	trim:function(s){
		return s.replace(/^\s+|\s+$/g, '');
	}
}

var MonthKanaAry = new Array();
  MonthKanaAry[0] = "";
  MonthKanaAry[1] = "いちがつ";
  MonthKanaAry[2] = "にがつ";
  MonthKanaAry[3] = "さんがつ";
  MonthKanaAry[4] = "しがつ";
  MonthKanaAry[5] = "ごがつ";
  MonthKanaAry[6] = "ろくがつ";
  MonthKanaAry[7] = "しちがつ";
  MonthKanaAry[8] = "はちがつ";
  MonthKanaAry[9] = "くがつ";
  MonthKanaAry[10] = "じゅうがつ";
  MonthKanaAry[11] = "じゅういちがつ";
  MonthKanaAry[12] = "じゅうにがつ";

            
var DayKanaAry = new Array();
   DayKanaAry[0] = "";
   DayKanaAry[1] = "いちにち";
   DayKanaAry[2] = "ふつか";
   DayKanaAry[3] = "みっか";
   DayKanaAry[4] = "よっか";
   DayKanaAry[5] = "いつか";
   DayKanaAry[6] = "むいか";
   DayKanaAry[7] = "なのか";
   DayKanaAry[8] = "ようか";
   DayKanaAry[9] = "ここのか";
   DayKanaAry[10] = "とおか";
   DayKanaAry[11] = "じゅういちにち";
   DayKanaAry[12] = "じゅうににち";
   DayKanaAry[13] = "じゅうさんにち";
   DayKanaAry[14] = "じゅうよっか";
   DayKanaAry[15] = "じゅうごにち";
   DayKanaAry[16] = "じゅうろくにち";
   DayKanaAry[17] = "じゅうしちにち";
   DayKanaAry[18] = "じゅうはちにち";
   DayKanaAry[19] = "じゅうくにち";
   DayKanaAry[20] = "はつか";
   DayKanaAry[21] = "にじゅういちにち";
   DayKanaAry[22] = "にじゅうににち";
   DayKanaAry[23] = "にじゅうさんにち";
   DayKanaAry[24] = "にじゅうよっか";
   DayKanaAry[25] = "にじゅうごにち";
   DayKanaAry[26] = "にじゅうろくにち";
   DayKanaAry[27] = "にじゅうしちにち";
   DayKanaAry[28] = "にじゅうはちにち";
   DayKanaAry[29] = "にじゅうくにち";
   DayKanaAry[30] = "さんじゅうにち";
   DayKanaAry[31] = "さんじゅういちにち";

//date I/F
var DateIF={
	yobi:'日 月 火 水 木 金 土'.split(' '),
	yobiE:'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
	tukiE:'January February March April May June July August September October November December'.split(' '),
	parse:function(str){
		var ret=false;
		if(!str)return false;
		if(str.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/)){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10), parseInt(RegExp.$4,10), parseInt(RegExp.$5,10) );
		}
		else if(str.match(/(\d{4})(\d{2})(\d{2})/)){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10) );
		}
		else if(str.match( /(\d{4})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})/ )){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10), parseInt(RegExp.$4,10), parseInt(RegExp.$5,10), parseInt(RegExp.$6,10) );
		}
		else if(str.match( /(\d{4})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})\D(\d{1,2})/ )){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10), parseInt(RegExp.$4,10), parseInt(RegExp.$5,10) );
		}
		else if(str.match( /(\d{4})\D(\d{1,2})\D(\d{1,2})/ )){
			ret = new Date( parseInt(RegExp.$1,10), parseInt(RegExp.$2,10)-1, parseInt(RegExp.$3,10) );
		}
		return ret;
	},
	format:function(fmt, d){
		var t={};
		t.Y = fmt.match(/Y+/);
		if(t.Y)fmt = fmt.replace( /Y+/g, d.getFullYear().toString().slice(4-t.Y[0].length) );
		t.M = fmt.match(/M+/);
		if(t.M)fmt = fmt.replace( /M+/g, this.zeroPad(d.getMonth()+1, t.M[0].length) );
		t.D = fmt.match(/D+/);
		if(t.D)fmt = fmt.replace( /D+/g, this.zeroPad(d.getDate(), t.D[0].length) );
		fmt = fmt.replace( /a+/g, this.yobi[d.getDay()] );
		var hh=d.getHours();
		var hf=((hh-12)>=0)?1:0;
		fmt = fmt.replace( /A+/g, Array('AM','PM')[hf] );
		fmt = fmt.replace( /G+/g, Array('午前','午後')[hf] );
		t.h = fmt.match(/h+/);
		if(t.h)fmt = fmt.replace( /h+/g, this.zeroPad(hh, t.h[0].length) );
		t.n = fmt.match(/n+/);
		if(t.n)fmt = fmt.replace( /n+/g, this.zeroPad( Array(hh,hh-12)[hf], t.n[0].length) );
		t.m = fmt.match(/m+/);
		if(t.m)fmt = fmt.replace( /m+/g, this.zeroPad(d.getMinutes(), t.m[0].length) );
		t.s = fmt.match(/s+/);
		if(t.s)fmt = fmt.replace( /s+/g, this.zeroPad(d.getSeconds(), t.s[0].length) );

		fmt = fmt.replace( /K+/g, this.tukiE[d.getMonth()] );
		fmt = fmt.replace( /k+/g, this.tukiE[d.getMonth()].substring(0,3) );
		fmt = fmt.replace( /X+/g, this.yobiE[d.getDay()] );
		fmt = fmt.replace( /x+/g, this.yobiE[d.getDay()].substring(0,3) );
		return fmt;
	},
	reformat:function(fmt,dstr){
		var dt=this.parse(dstr);
		if(dt){
			return this.format(fmt, dt);
		}
		else return false;
	},
	getFirstDay:function(d){
		return this.parse( this.format('YYYY/MM/01',d) );
	},
	getLastDay:function(d){
		var s=this.format('M',d);
		for(var i=29;i<33;i++){
			if(s!=this.format('M',this.parse(this.format('YYYY/MM/'+i,d)))){
				return i-1;
			}
		}
	},
	zeroPad:function(s,l){
		s=s.toString();
		while(s.length<l){
			s='0'+s;
		}
		return s;
	},
	addDate:function(d, add){
		var ad={Y:0,M:0,D:0,h:0,m:0,s:0};
		for(var i in add){
			ad[i]=add[i];
		}
		return (new Date(d.getFullYear()+ad.Y, d.getMonth()+ad.M, d.getDate()+ad.D, d.getHours()+ad.h, d.getMinutes()+ad.m, d.getSeconds()+ad.s));
	},
	setDate:function(d, set){
		var se={Y:d.getFullYear(),M:d.getMonth(),D:d.getDate(),h:d.getHours(),m:d.getMinutes(),s:d.getSeconds()};
		for(var i in set){
			if(i=='M'){se[i]=set[i]+1;}
			else se[i]=set[i];
		}
		return new Date(se.Y, se.M, se.D, se.h, se.d, se.s);
	},
	timeDelete:function(d){
		return this.parse(this.format('YYYY/MM/DD',d));
	},
	diffDate:function(d1,d2){
		return (this.timeDelete(d1)-this.timeDelete(d2))/86400000;
	}
};

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

function rtNewsLink(newsID){
	return g_f.path + newsID+'/'+newsID+'.html';
}
function rtDeleteDicTag(ht){
//<a href='javascript:void(0)' class='dicWin' id='id-xxxx'></a>を削除
	var rt = ht.replace(/<a href=\'javascript:void\(0\)\' class=\'dicWin\' id=\'id-.*?\'>/g,'');
		rt = rt.replace(/<\/a>/g,'');
	return rt;

}

function showSound(){
	if(getBrowser.Android){
		$("#nhk_audioplayer").show();
	}
}

function tagDelete(item){
	return item.replace(/<span class=.+?>|<\/span>|/g, '');
}
