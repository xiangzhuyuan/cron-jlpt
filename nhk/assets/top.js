/**
 * TOPページJS
 */
document.write('<script type="text/javascript" src="scripts/ruby.js" charset="UTF-8"></script>');
 
$(function(){
	$('.weeklist span.next').empty();
	g_f.getJson(g_f.jsonURL.toplist, g_f.makeTopListhtml);
	g_f.getJson(g_f.jsonURL.newslist, g_f.makeTopNewsListhtml);
});

//主要ニュースの表示
g_f.makeTopListhtml = function(json){
	var $items=json;
	var htmlTop='';
	var htmlSummary='';
	var flg=0;
	var item=null;
	var priorityNumber=null;
	var nid = '';

	for(var i in $items){
		item=$items[i];
		nid  = item.news_id;
		priorityNumber = parseInt(item.top_priority_number,10);
		if(item.top_display_flag){
			if(priorityNumber != 99){
				item.title_with_ruby= tagDelete(item.title_with_ruby);
				if(priorityNumber == 1){
					htmlSummary='<div id="newstitle"><h2><a href="'+ rtNewsLink(nid) +'">'+ item.title_with_ruby +'</a></h2>'
							   +'<p class="newsDate">['+ DateIF.reformat('M月D日 hh時mm分', item.news_prearranged_time) +']</div>'
							   +'<div id="topnewsbody">';
					htmlSummary+=g_f.imageCheck(item, flg);
					htmlSummary+='<p class="txt">'+ rtDeleteDicTag( item.outline_with_ruby ) +'</p>'
							    +'<p class="readmore"><a href="'+ rtNewsLink(nid) +'">このニュースを読む</a></p></div></div>';
					flg=1;
				}
				else{
					htmlTop+=g_f.imageCheck(item, flg);
					htmlTop+='<h3><a href="'+ rtNewsLink(nid) +'">'+ item.title_with_ruby +'</a></h3>'
							+'<p class="newsDate">['+ DateIF.reformat('M月D日 hh時mm分', item.news_prearranged_time) +']</p></div></li>';
				}
			}
		}
	}

	g_f.showTopList(htmlSummary, htmlTop);
}

//1ヶ月のニュースを表示
//当日の日付があったら前日をデフォルト表示
g_f.makeTopNewsListhtml = function(json){
	var article_html = '';
	var list_html = ''
	var tgtJs = json[0];
	var jj=0;
	var crrentDay = DateIF.format('YYYY-MM-DD', g_f.serverDate);//現在日
	var nestDay;
	var flg=0;

	for(var i in tgtJs){
		if(flg == 0){
			if(crrentDay == i){
				flg=1;
			}else{
				nestDay =i
				flg=2;
			}
		}else if(flg == 1){
			nestDay =i
			flg=2;
		}
		list_html = '<li><a id="'+ i +'" href="javascript:void(0)" onclick="g_f.Topcrrentday(this); g_f.showTopArticleContents(this); return false;">'+ DateIF.reformat('M月D日（a）',i) +'</a></li>';
		
		for( var j in tgtJs[i]){
			if(jj % 2){
				article_html += '<li class="even">';
			}
			else{
				article_html += '<li>';
			}
			tgtJs[i][j].title_with_ruby = tagDelete(tgtJs[i][j].title_with_ruby);
			article_html += '<span class="newstitle"><a href="' + rtNewsLink( tgtJs[i][j].news_id ) + '">'+ tgtJs[i][j].title_with_ruby +'</a></span>'
						 + '<span class="date">['+ DateIF.reformat('M月D日 hh時mm分',tgtJs[i][j].news_prearranged_time) +']</span>';

			if(tgtJs[i][j].has_news_easy_voice){
				article_html += '<span class="sound">音声</span>';
			}

			if(tgtJs[i][j].has_news_web_movie || tgtJs[i][j].has_news_easy_movie){
				article_html += '<span class="movie">動画</span>';
			}

			article_html += '</li>';
			jj++;
		}

		g_articleContents[i]=article_html;
		g_dateList.push(list_html);
		article_html='';

		jj=0;
	}
	if(!nestDay) nestDay=crrentDay;//JSONに当日の記事がない場合nestDayに当日を入れる
	if(g_dateList.length < 8){$('.weeklist span.prev').empty();}
	g_f.showTopNewsList();
	g_f.Topcrrentday(nestDay);
	g_f.showTopArticleContents(nestDay);
}

/*
	htmlshow
*/
g_f.showTopList = function(Summary, Top){
	$('#topnews').html(Summary);
	$('#topnewslist ul').html(Top);

	//add Class for last li
	var len = $('#topnewslist ul li').length-1;
	if(len % 2){
		$('#topnewslist ul li').eq(len).addClass('lastline');
		$('#topnewslist ul li').eq(len-1).addClass('lastline');
	}else{
		$('#topnewslist ul li').eq(len).addClass('lastline');
	}
	//showList
	$('#main div.loading').remove();
	$('#topnews,#topnewslist').show();
}

//1ヵ月ニュースの日付を表示
g_f.showTopNewsList = function(){
	var html = '';
	var i = (g_counter.weekList-1) * g_pageView.top;

	for(i; i < g_counter.weekList * g_pageView.top; i++){
		if(typeof g_dateList[i] !== 'undefined'){
			html += g_dateList[i];
		}
	}

	$('ul.heightLineParent').html(html);
}

g_f.showTopArticleContents = function(current){
	var crrentDay='';

	if(typeof current.id !== 'undefined'){//日付がクリックされた場合
		crrentDay = current.id;
	}
	else{//次前がクリックされた場合
		crrentDay = current;
	}
	$('ul.newslisteven').html(g_articleContents[crrentDay])
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

	g_f.showTopNewsList();
	var current = DateIF.format('YYYY-MM-DD', DateIF.parse(g_dateList[(g_counter.weekList-1) * g_pageView.top]));

	g_f.Topcrrentday(current);
	g_f.controlTopNP();
	g_f.showTopArticleContents(current);
}

//1ヵ月のニュース次前　ボタン表示
g_f.controlTopNP = function(){
	var max = Math.ceil(g_dateList.length / g_pageView.top);
	var min = 1;
	var prev = '.weeklist span.prev';
	var next = '.weeklist span.next';

	if(g_counter.weekList == min){
		$(next).empty();
		$(prev).html('<a onclick="g_f.moveNP(this); return false;" href="javascript:void(0);" id="prev">前</a>');
	}
	else if(g_counter.weekList == max){
		$(prev).empty();
		$(next).html('<a onclick="g_f.moveNP(this); return false;" href="javascript:void(0);" id="next">次</a>');
	}
	else{
		$(prev).html('<a onclick="g_f.moveNP(this); return false;" href="javascript:void(0);" id="prev">前</a>');
		$(next).html('<a onclick="g_f.moveNP(this); return false;" href="javascript:void(0);" id="next">次</a>');
	}
}

//flag 0:top news , 1:news list
g_f.imageCheck = function(json, flg){
	var html='';
	var imagePath='';
	if (json.has_news_easy_image && json.news_easy_image_uri){
		//固有画像のためディレクトリを指定
		imagePath = json.news_id + '/' + json.news_easy_image_uri;
	}else if(json.has_news_web_image && json.news_web_image_uri){
		imagePath = json.news_web_image_uri;
	}else{
		imagePath = null;
	}

	var moviePath=null;
	//固有動画
	if(json.has_news_easy_movie && json.news_easy_movie_uri){
		moviePath = json.news_easy_movie_uri;
		if(flg == 0){
			g_isEasyMovie = true;
		}
	}
	//通常動画
	else if(json.has_news_web_movie && json.news_web_movie_uri){
		moviePath = json.news_web_movie_uri;
	}

	if(flg == 0){
		if(imagePath != null){
			html+='<p id="mainimg">';
			if(moviePath != null){
				if(g_f.isVideoTag()){
					html += g_f.setVideoPlayer(256, 144, json, 1);
				}
				else{
					html+='<a href="javascript:void(0)" onclick="showVideoTop(this);" id="'+ moviePath +'" class="playBT" title="'+ json.title +'" ></a>';
					html+='<img src="'+ imagePath +'" alt="'+ json.title +'" /></p>';
				}
			}else{//動画が無い場合
				html+='<img src="'+ imagePath +'" alt="'+ json.title +'" /></p>';
			}
		}
	}
	else{
		html+='<li><div class="heightLine-tn'+ g_counter.heightLine +'"><p class="img">';
		if(imagePath != null){
			html+='<a href="'+ rtNewsLink( json.news_id ) +'"><img src="'+ imagePath +'" alt="'+ json.title +'" /></a></p>';
		}
		else{
			html+='</p>';
		}

		g_counter.heightLineCheck++;
		if(g_counter.heightLineCheck == 3){
			g_counter.heightLine++;
			g_counter.heightLineCheck=1;
		}
	}
	return html;
}

/*
	イベント処理
*/
g_f.Topcrrentday = function(date){
	var crrentDay = '';
	if(typeof date.id !== 'undefined'){//日付がクリックされた場合
		crrentDay = date.id;
	}else{//次前がクリックされた場合
		crrentDay = date;
	}
	
	$('.heightLineParent li').removeClass('here');
	$('.heightLineParent li a[id="'+ crrentDay +'"]').parent('li').addClass('here');
}

//子供WINから呼ばれます
/*var movieID ='';
function showVideoTop(_this){
	movieID = _this.id;
	var _q = "id="+movieID+"&";
		_q += "title="+encodeURIComponent(_this.title)+"&";
		_q += "EasyMovie="+ g_isEasyMovie;//独自動画判定

var newWin = window.open(
					"movieplayer.html?"+_q, //移動先
					"movie", //ターゲット名（aタグのtargetと同様）
					"width=445, height=340"
					);
};*/