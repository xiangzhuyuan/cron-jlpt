/**
 * 詳細ページJS
 */
var g_newsId = null;
var g_newsData = null;
var g_isVoice = null;
	
g_f.path = '../';

document.write('<script type="text/javascript" src="' + g_f.path + 'scripts/ruby.js" charset="UTF-8"></script>');

$(function(){


	if($('body').attr('id').match(/(k\d{14})/)){
		g_newsId = RegExp.$1;
	}

	//辞書ファイルの読み込み
	if(getBrowser.Android == 0){g_f.loadDic(g_newsId);}
	
	g_f.getJson(g_f.path + g_f.jsonURL.toplist, g_f.makeResultMainNewshtml);

	g_f.getJson(g_f.path + g_f.jsonURL.newslist, function(json){
		g_newsData = searchCurrentInfo(json);//当該記事のJSONデータを取得

		//20150813 news_idがURLと違う場合、URLに合わせる mt_add START //
		if(!location.pathname.match(g_newsData.news_id)){
			g_newsData.news_easy_voice_uri = location.pathname.split("/")[3] + ".mp3";
		}
		//20150813 news_idがURLと違う場合、URLに合わせる mt_add END //

		g_isVoice = (g_newsData.has_news_easy_voice && g_newsData.news_easy_voice_uri)? g_newsData.news_easy_voice_uri : null;
		g_isEasyMovie = (g_newsData.has_news_easy_movie && g_newsData.news_easy_movie_uri) ? true : false;
		g_f.setVoicePlayer();
		g_f.makeResultNewsListhtml(json);
		g_f.setArticlesBefore_After(json);
	});

	//詳細
	$('.majorNews ul li a').click(function(){
		$('.majorNews ul li').removeClass('here');
		$(this).parent('li').addClass('here');
	});

});

g_f.setVoicePlayer = function(){

	if( g_f.isVideoTag() ){
		$(".playBT").hide();

		//音声の表示判定
		if(g_isVoice){
			var _u = g_isVoice;
			$('#sound').html('<div id="audio"><audio src="'+ _u + '" controls id="audioPlayer"></div>');
		}
		if($('#mainimg').length){
			var ht = g_f.setVideoPlayer(384, 216, g_newsData, 2);

			$('#mainimg').html(ht);
		}
	}
	else{
		if(g_isVoice){
			$('#sound').html(mySWF());
		}
	}

	//var m_id  = (g_newsData.has_news_web_movie && g_newsData.news_web_movie_uri)? g_newsData.news_web_movie_uri: null;
	var m_id  = (!g_newsData.has_news_web_image && !g_newsData.has_news_easy_image)? null : g_newsData.news_web_movie_uri;

	//20150813 news_idがURLと違う場合、映像無しとみなす（news-list.jsonに存在しないため） mt_add START //
	if(!location.pathname.match(g_newsData.news_id)){
		m_id = null;
	}
	//20150813 news_idがURLと違う場合、映像無しとみなす（news-list.jsonに存在しないため） mt_add END //

	if(m_id==null){
		document.getElementById("regularnews").style.display = "none";
		document.getElementById("mainimg").style.display = "none";
	} else {
		if(location.hostname.match(/nhk\.or\.jp/)){
			$(function(){
				$.ajax({
				url : g_newsData.news_web_url,
				cache : false,
				type : "get",
				success : function(data, status, xhr){
					if (xhr.status === 200 || xhr.status === 304) {
						if(data.match(/id="news_textbody"/)){
							if(data.match(/img id="news_image"/)){
							} else {
								document.getElementById("mainimg").style.display = "none";
							}
						} else {
							document.getElementById("regularnews").style.display = "none";
							document.getElementById("mainimg").style.display = "none";
						}
					} else {
						document.getElementById("regularnews").style.display = "none";
						document.getElementById("mainimg").style.display = "none";
					}
				},
				error : function(){
					document.getElementById("regularnews").style.display = "none";
					document.getElementById("mainimg").style.display = "none";
				}
				});
			});
		}
	}
}

function searchCurrentInfo(json){
	if( !(json && json[0]) ){return null;}
	var num = 0,
		item = null,
		js  = null,
		_key=null;
		
	for(var i in json[0]){
		item = json[0][i];
		for( var k in item){
			if(num==0){
				num = item[k];
			}
			if(item[k].news_id == g_newsId){
				_key = i;
				js = item[k];
				break;
			}
		}
	}
	if(js == null){
		js = num;
	}
	return js;
}


//FLASHが呼びます
function voiceURL(){
	var _u = null;
	if(g_isVoice){
		_u = g_isVoice;
	}
	return _u;
}

function mySWF(){
	var _rum = new Date().getTime();
		swf = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="436" height="48" id="nhk_audioplayer" align="middle">'
			+ '<param name="allowScriptAccess" value="always" />'
			+ '<param name="wmode" value="transparent" />'
			+ '<param name="movie" value="'+ g_f.path + 'swf/audioplayer.swf?'+_rum+'" />'
			+ '<param name="quality" value="high" />'
			+ '<param name="allowFullScreen" value="true" />'
			+ '<param name="bgcolor" value="#ffffff" />'
			+ '<embed src="' + g_f.path + 'swf/audioplayer.swf?'+_rum+'" quality="high" allowFullScreen="true" bgcolor="#ffffff" width="436" height="48" name="nhk_audioplayer" align="middle" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
			+ '</object>';
		return swf;
}



g_f.makeResultMainNewshtml = function(json){
	/*
		詳細ページの主なニュース
	*/
	var $items = json;
	var html='';
	var resultTophtml='';
	var item='';
	for(var i in $items){
		item=$items[i];
		var priorityNumber = parseInt(item.top_priority_number,10);
		if(item.top_display_flag){
			if(location.href.match(item.news_id)){
				html+='<li class="here" id="'+ item.news_id +'">';
			}else{
				html+='<li id="'+ item.news_id +'">';
			}
			item.title_with_ruby = tagDelete(item.title_with_ruby);
			html+='<span><a href="'+ rtNewsLink( item.news_id ) +'">'+ item.title_with_ruby +'</a></span></li>';
		}
	}

	$('.majorNews ul').html(html);
}

//1ヵ月ニュースの初期表示
//当該ニュースの日付に属するニュースをデフォルト表示
g_f.makeResultNewsListhtml = function(json){
	var article_html = '';
	var list_html = ''
	var tgtJs = json[0];
	var jj = 0;
	var cnt = 0;	//ニュースの日数をカウント
	var num = 0;	//該当ニュースの位置
	var crrentDay = '';
	var newsId = '';
	var arrayFirst = 0;//newsIdが一致しない場合の変数（必ずオブジェクトの先頭の日付が入る）
	
	//ニュースIDの取得
	if($('body').attr('id').match(/(k\d{14})/)){
		newsId = RegExp.$1;
	}

	//ニュースデータの作成
	for(var i in tgtJs){
		cnt++;
		list_html = i;

		for( var j in tgtJs[i]){
			if(arrayFirst == 0){
				arrayFirst = i;
			}
			//該当記事のある日付を初期表示
			if(newsId == tgtJs[i][j].news_id){
				crrentDay = i;
				num = cnt;
				g_counter.weekList = cnt;//開始位置設定
			}

			if(jj % 2){
				article_html += '<li class="even">';
			}else{
				article_html += '<li>';
			}
			tgtJs[i][j].title_with_ruby = tagDelete(tgtJs[i][j].title_with_ruby);
			article_html += '<a href="'+ rtNewsLink( tgtJs[i][j].news_id ) +'">'+ tgtJs[i][j].title_with_ruby +'</a></li>';
			jj++;
		}

		g_articleContents[i]=article_html;
		g_dateList.push(list_html);
		article_html='';

		jj=0;
	}
	//次前ボタンをOFF
	if(num <= 1){
		$('.date .next').html('<span>次（つぎ）の日（ひ）</span>');
		if((crrentDay == '' || arrayFirst == crrentDay) && cnt <=1){//1件のみで、一致、不一致の場合前へボタンをけす
			$('.date .prev').html('<span>前（まえ）の日（ひ）</span>');
		}
	}
	if(num == cnt){
		$('.date .prev').html('<span>前（まえ）の日（ひ）</span>');
	}
	if(crrentDay == ''){
		crrentDay = arrayFirst;
	}
	g_f.showResultNewsList();
	g_f.showResultArticleContents(crrentDay);
}

//1ヵ月ニュースの選択日を表示
g_f.showResultNewsList = function(){
	var html = '';
	var i = 0;
	i = (g_counter.weekList-1) * g_pageView.result;
	for(i; i < g_counter.weekList * g_pageView.result; i++){
		if(typeof g_dateList[i] !== 'undefined'){
			html += DateIF.reformat('M月D日（a）', g_dateList[i]);
		}
	}
	$('div.date h3').html(html);
}

g_f.showResultArticleContents = function(current){
	$('div.unit ul').html(g_articleContents[current])
}

//次前ページ切り換え
g_f.moveNP = function(property){
	if(property.id == 'prev'){
		g_counter.weekList++;
	}
	else if(property.id == 'next'){
		g_counter.weekList--;
	}
	else{
		return false;
	}

	g_f.showResultNewsList();
	var current = DateIF.reformat('YYYY-MM-DD', g_dateList[(g_counter.weekList -1) * g_pageView.result]);
	g_f.controlResultNP();
	g_f.showResultArticleContents(current);
}

//1ヵ月のニュース次前　ボタン表示
g_f.controlResultNP = function(){
	var max = Math.ceil(g_dateList.length / g_pageView.result);
	var min = 1;
	var prevhtml = '<a id="prev" href="javascript:void(0);" onclick="g_f.moveNP(this); return false;"><span>前（まえ）の日（ひ）</span></a>';
	var nexthtml = '<a id="next" href="javascript:void(0);" onclick="g_f.moveNP(this); return false;"><span>次（つぎ）の日（ひ）</span></a>';
	
	//次前ボタンをOFF
	if(g_counter.weekList == min){
		$('.date .next').html('<span>次（つぎ）の日（ひ）</span>');
		$('.date .prev').html(prevhtml);
	}
	else if(g_counter.weekList == max){
		$('.date .prev').html('<span>前（まえ）の日（ひ）</span>');
		$('.date .next').html(nexthtml);
	}
	//次前ボタンをON
	else{
		$('.date .prev').html(prevhtml);
		$('.date .next').html(nexthtml);
	}
}


//次、前記事表示
g_f.setArticlesBefore_After = function(json){
	$('div.pagemove').html('');

	if( !(json && json[0]) ){return false;}

	var _data = json[0],
		endF  = false,
		endF2 = false,
		_kiji = {pre:['',''],nex:['','']},//[0]url,[1]link
		jSortAr = [],
		enable  = false,
		_val    = null,
		makeLink = function(link){
			return '/easy/' + link + '/' + link + '.html';
		};

	//キー(日付)配列をソート
	$.each(_data, function(i,val){
		if(i){
			jSortAr[jSortAr.length] = i.split('-').join('');//ソート可能な数値に変更
		}
	});
	jSortAr.sort(function(a, b) {return b - a});

	//次前記事の検索
	$.each(jSortAr, function(i, val){
		//キーを作成 yyyy-mm-dd
		_val = val.substring(0,4) + '-' + val.substring(4,6) + '-' + val.substring(6,8);

		//日付内の記事での検索
		$.each(_data[_val],function(){
			var obj   = this,
				link  = obj.news_id ?obj.news_id: '',
				title = obj.title_with_ruby ?tagDelete(obj.title_with_ruby): '';
			if(obj.news_display_flag){
				if(g_newsId == link){enable = true;}//当該記事の有無。有れば表示
				_kiji.nex[0] = link;
				_kiji.nex[1] = title;

				//当該記事を発見
				if(g_newsId.search(link) > -1){
					endF = true;
					return true;
				}

				if(endF){
					endF2 = true;
					return false;
				}
				_kiji.pre[0] = link
				_kiji.pre[1] = title;
			}
		});
		if(endF2){
			return false;
		}
		_kiji.nex[0]='';
		_kiji.nex[1]='';
	});

	//記事がない場合は、ボタン非表示
	if(_kiji.pre[0] == '' && _kiji.nex[0] == ''){return;}

	//リンクの作成
	if(enable){
		var ht='';
			ht += '<div class="pagemove"><div>';
			if(_kiji.pre[0]!=''){
				ht += '<p class="prev"><a href="'+ rtNewsLink(_kiji.pre[0]) +'"><span class="heightLine-pagemove" style="height: 49px;">'+_kiji.pre[1]+'</span></a></p>';
			}
			if(_kiji.nex[0]!=''){
				ht += '<p class="next"><a href="'+ rtNewsLink(_kiji.nex[0]) +'"><span class="heightLine-pagemove" style="height: 49px;">'+_kiji.nex[1]+'</span></a></p>';
			}
			ht += '</div>';
			ht += '<div class="pagemoveBG"><img alt=" " src="' + g_f.path + 'img/bg_pagemove.png"></div>';
			ht += '</div>';
		
		$('div.pagemove').html(ht);
	}
}

//子供WINから呼ばれます
/*
var movieID ='';
function showVideo(_this){
	movieID = _this.id;
	var _q = "id="+movieID+"&";
		_q += "title="+encodeURIComponent(document.getElementsByTagName("title")[0].innerHTML.split("|")[1])+"&";
		_q += "EasyMovie="+ g_isEasyMovie;//独自動画判定

var newWin = window.open(
					g_f.path + "movieplayer.html?"+_q, //移動先
					"movie", //ターゲット名（aタグのtargetと同様）
					"width=445, height=340"
					);
	if(getBrowser.Android){
		$("#nhk_audioplayer").hide();
	}
};
*/
