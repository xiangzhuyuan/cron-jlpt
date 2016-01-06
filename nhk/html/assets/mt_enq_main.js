_stdobj=window["_std.js"];

$(function(){
	g_f.rec_data();
});

//rec_jsonで取得したnews_idもとにアンケート結果ファイルを取得
g_f.rec_data = function(){
	var news_id = g_newsId;
	var uri ="../../easy_enq/enq/"+news_id+".json?t="+(""+new Date().getTime()).substring(0,11);
	g_f.getJson(uri, g_f.drawGraph);
}
	
g_f.drawGraph = function(data){

	var k_data = null;
	try{
		/*以下Ajaxで受け取ったデータを表示する部分*/	
		k_data = data;
		/*****************アンケート1の表示 start**********************/		
		/*table作成*/
		 //var easy_rikai_div 	= document.getElementById("easy_rikai");
		 var easy_rikai_table 	= document.createElement('table');
		 	easy_rikai_table.id ="rikai_tb";
			easy_rikai_table.style.width ="100%";
		 	easy_rikai_table.style.marginLeft ="0";
		 	
		 var easy_rikai_tbody  = document.createElement('tbody');
		 var easy_rikai_tr 	= document.createElement('tr');
		 for (i=1;i<6;i++){
		 	var easy_rikai_td  = document.createElement('td');
		 		easy_rikai_td.style.height = "29px";
		 		easy_rikai_tr.appendChild(easy_rikai_td);
		 		easy_rikai_td.id="rikai_"+i;	
		 }	
		 easy_rikai_tbody.appendChild(easy_rikai_tr);
		 easy_rikai_table.appendChild(easy_rikai_tbody);
		 //easy_rikai_div.appendChild(easy_rikai_table);
		 $("#easy_rikai div").html(easy_rikai_table);
	 
			 /*分かりやすいデータ表示部分*/
		 var rikai_1 = document.getElementById("rikai_1");
		 var rikai_1_data =parseInt(k_data.anketo_1[0]);
		 rikai_1.style.width=rikai_1_data +"%";
		 if(rikai_1_data >= 5){
		 	rikai_1.innerHTML = rikai_1_data +"%"; //アンケート値を表示
		 }else{
		 	rikai_1.innerHTML ="";
		 }
		 
		 /*どちらかといえば分かりやすいデータ表示部分*/
		 var rikai_2 = document.getElementById("rikai_2");
		 var rikai_2_data =k_data.anketo_1[1];
		 rikai_2.style.width=rikai_2_data +"%";
		 if(rikai_2_data >= 5){
		 	rikai_2.innerHTML = rikai_2_data +"%"; //アンケート値を表示
		 }else{
		 	rikai_2.innerHTML ="";
		 }	 
		 /*ふつう表示部分*/
		 var rikai_3 = document.getElementById("rikai_3");
		 var rikai_3_data =k_data.anketo_1[2];
		 rikai_3.style.width=rikai_3_data +"%";
		 if(rikai_3_data >= 5){
		 	rikai_3.innerHTML = rikai_3_data +"%"; //アンケート値を表示
		 	
		 }else{
		 	rikai_3.innerHTML ="";
		 }
		 /*どちらかといえば分かりにくいデータ表示部分*/
		 var rikai_4 = document.getElementById("rikai_4");
		 var rikai_4_data =k_data.anketo_1[3];
		 rikai_4.style.width=rikai_4_data +"%";
		 if(rikai_4_data >= 5){
		 	rikai_4.innerHTML = rikai_4_data +"%"; //アンケート値を表示
		 }else{
		 	rikai_4.innerHTML ="";
		 }
		 
		 /*分かりにくいデータ表示部分*/
		 var rikai_5 = document.getElementById("rikai_5");
		 var rikai_5_data =k_data.anketo_1[4];
		 rikai_5.style.width=rikai_4_data +"%";
		 if(rikai_5_data >= 5){
		 	rikai_5.innerHTML = rikai_5_data +"%"; //アンケート値を表示
		 }else{
		 	rikai_5.innerHTML ="";
		 }
		/*****************アンケート1の表示 end**********************/	
	
		/*****************アンケート2の表示 start**********************/		
		/*table作成*/
		 //var easy_kyoumi_div 	= document.getElementById("easy_kyoumi");
		 var easy_kyoumi_table	= document.createElement('table');
		 		easy_kyoumi_table.id ="kyoumi_tb";
		 		easy_kyoumi_table.style.width ="100%";
		 		easy_kyoumi_table.style.marginLeft ="0";
		 var easy_kyoumi_tbody  = document.createElement('tbody');
		 var easy_kyoumi_tr 	= document.createElement('tr');
		 for (i=1;i<5;i++){
		 	var easy_kyoumi_td  = document.createElement('td');
		 		easy_kyoumi_td.style.height ="29px";
		 		easy_kyoumi_td.style.borderSpacing ="0";
		 	easy_kyoumi_tr.appendChild(easy_kyoumi_td);
		 	easy_kyoumi_td.id = "kyoumi_"+i;	
		 }	
		 easy_kyoumi_tbody.appendChild(easy_kyoumi_tr);
		 easy_kyoumi_table.appendChild(easy_kyoumi_tbody);
		 //easy_kyoumi_div.appendChild(easy_kyoumi_table);
		 $("#easy_kyoumi div").html(easy_kyoumi_table);
		 
		/*興味もったデータ表示部分*/
		 var kyoumi_1 = document.getElementById("kyoumi_1");
		 var kyoumi_1_data =k_data.anketo_2[0];
		 kyoumi_1.style.width=kyoumi_1_data +"%";
		 if(kyoumi_1_data >= 5){
		 	kyoumi_1.innerHTML = kyoumi_1_data +"%"; //アンケート値を表示
		 }else{
		 	kyoumi_1.innerHTML ="";
		 }
					 
		 /*興味持っているものもあったータ表示部分*/
		 var kyoumi_2 = document.getElementById("kyoumi_2");
		 var kyoumi_2_data =k_data.anketo_2[1];
		 kyoumi_2.style.width=kyoumi_2_data +"%";
		 if(kyoumi_2_data >= 5){
		 	kyoumi_2.innerHTML = kyoumi_2_data +"%"; //アンケート値を表示
		 }else{
		 	kyoumi_2.innerHTML ="";
		 }
		 
		 /*あまり興味を持ってなかった表示部分*/
		 var kyoumi_3 = document.getElementById("kyoumi_3");
		 var kyoumi_3_data =k_data.anketo_2[2];
		 kyoumi_3.style.width=kyoumi_3_data +"%";
		 if(kyoumi_3_data >= 5){
		 	kyoumi_3.innerHTML = kyoumi_3_data +"%"; //アンケート値を表示
		 }else{
		 	kyoumi_3.innerHTML ="";
		 }
		 //kyoumi_3.innerHTML = kyoumi_3_data +"%"; //アンケート値を表示
		 
		 /*興味を持てなかったデータ表示部分*/
		 var kyoumi_4 = document.getElementById("kyoumi_4");
		 var kyoumi_4_data =k_data.anketo_2[3];
		 kyoumi_4.style.width=kyoumi_4_data +"%";
		 if(kyoumi_4_data >= 5){
		 	kyoumi_4.innerHTML = kyoumi_4_data +"%"; //アンケート値を表示
		 }else{
		 	kyoumi_4.innerHTML ="";
		 }
	/*****************アンケート2の表示 end**********************/
	}catch(e){
	}
}

g_f.miframe = function(){
	g_f.enq_close(false);
	
	var to_mail_div = $('#to_mail');　//ニュース記事の中のDIVを取得
	var _url = '';
	if($.cookie('news_id_'+g_newsId)) { 
		//既に回答された場合、サンキュー画面表示
		_url = "https://www.nhk.or.jp/news/easy/easy_enq/bin/form/thanks_enq.html";
	    //to_mail_div.append('<div id="to_mail_subdiv"></div><iframe style="border: none;" scrolling="no" src=' + _url + ' id="to_mail_iframe"></iframe>');
	}else{
		//_url = "http://www.enq.com:8888/preview/easy/easy_enq/bin/form/enq.html?id="+g_newsId+"&title="+g_newsData.title;
		_url = "https://www.nhk.or.jp/news/easy/easy_enq/bin/form/enq.html?id="+g_newsId+"&title="+g_newsData.title;
	}
	to_mail_div.append('<div id="to_mail_subdiv"></div><iframe style="border: none;" scrolling="no" src=' + _url +' id="to_mail_iframe"></iframe>');
	var _isOpen = 0;
	$('iframe').load(function(ee){
		_isOpen++; 
		
						/*
		var _href = this.contentDocument || this.contentWindow.document;
		var _url = _href.URL;
		//サンキュー画面からの閉じる
		if(!!_href && _url.indexOf("thanks_enq.html") > 0 && !$.cookie('news_id_'+g_newsId)){
			$.cookie("news_id_"+g_newsId, g_newsId, {expires: 30, path: '/'});
		}
		     */  
		
		//画面が切り替える
		if(_isOpen > 1 && !$.cookie('news_id_'+g_newsId)){
			$.cookie("news_id_"+g_newsId, g_newsId, {expires: 30, path: '/'});
		}else{
			$('#to_mail_subdiv').append('<div id="close_button" onclick="g_f.enq_close();"></div>');
		}

	});

	// 縦スクロール幅取得
	var tateScroll = document.body.scrollTop || document.documentElement.scrollTop;
	// 横スクロール幅取得
	var yokoScroll = document.body.scrollLeft || document.documentElement.scrollLeft;
      
	var ifTop = "" + (tateScroll + (document.documentElement.clientHeight- 300) / 2) + "px"; //アンケート表示位置のx座標
	var ifLeft = "" + (yokoScroll + (document.documentElement.clientWidth - 800) / 2) + "px"; //アンケート表示位置のｙ座標
  	
  	to_mail_div.css({"display":"block", "top": ifTop, "left": ifLeft, 'height': '288px'});
  	
  	to_mail_div.bind("mouseover", _stdobj.dragInit);
   	to_mail_div.bind("mousedown", _stdobj.dragStart);
}

g_f.enq_close = function(){
	/*
	var _href = $("#to_mail_iframe", parent.document.body).attr('src');
	//サンキュー画面からの閉じる
	if(!!_href && _href.indexOf("thanks_enq.html") > 0 && !$.cookie('news_id_'+g_newsId)){
		$.cookie("news_id_"+g_newsId, g_newsId, {expires: 30, path: '/'});
	}
	*/
	
	var to_mail_div = $('#to_mail');
	to_mail_div.children().remove();
	to_mail_div.empty();
	to_mail_div.css('height', '0px');
}
