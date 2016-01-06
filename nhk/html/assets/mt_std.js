/////
///// '_std.js' library, first created by Jiongtao Huang on Mar 2007.
/////  Last modified by Naoki Hashizume on Mar 2010.
///// (c) Jiongtao Huang 2008
/////

function createLFC(closure) {
var count = createLFC.count++;
createLFC[count] = closure;
closure = null;
return function() { return createLFC[count].apply(this, arguments); };
}

createLFC.count = 0;


window["_std.js"] = new function(){
var _this=this;
var _doc = document;

_this._ua=window.navigator.userAgent.toLowerCase();
_this._ie=((_this._ua.indexOf('msie')!=-1)&&(_this._ua.indexOf('opera')==-1));
_this._i55=((_this._ua.indexOf('msie 5.5')!=-1)&&(_this._ua.indexOf('opera')==-1));
_this._i6=((_this._ua.indexOf('msie 6')!=-1)&&(_this._ua.indexOf('opera')==-1));
_this._i7=((_this._ua.indexOf('msie 7')!=-1)&&(_this._ua.indexOf('opera')==-1));
_this._i8=((_this._ua.indexOf('msie 8')!=-1)&&(_this._ua.indexOf('opera')==-1));
_this._fx=(_this._ua.indexOf('firefox')!=-1);
_this._ns=(_this._ua.indexOf('netscape')!=-1);
_this._mz=((_this._ua.indexOf('gecko')!=-1)&&(_this._ua.indexOf('safari')==-1)
       &&(_this._ua.indexOf('firefox')==-1)&&(_this._ua.indexOf('netscape')==-1));
_this._sf=((_this._ua.indexOf('safari')!=-1)&&(_this._ua.indexOf('webkit')!=-1));
_this._op=(_this._ua.indexOf('opera')!=-1);
_this._ko=(_this._ua.indexOf('konqueror')!=-1);

_this.$$$=createLFC(function() {
  if (_doc.getElementsByTagName===undefined) {
/*
    alert("_std.js:\nfunction $$$():\n"
         +"'_doc.getElementsByTagName' undefined.");
*/
    return false;
  } else {
   return _doc.getElementsByTagName('*');
  }
});

_this.$$n=createLFC(function(n) {
/*
  if (n===''||n===undefined) {

    alert("_std.js:\nfunction $$n():\n"
         +"target elements' name undefined.\n<usage>:\n$$n(name);");

    return true;
  }
*/
  var a=new Array();
  if (typeof(_doc.all)=='object') {
    for (var i=j=0;i<_doc.all.length;i++) {
      if (this._op) {
        if ((typeof(_doc.all[i].getAttribute)=='function')
          &&(_doc.all[i].getAttribute('name',n)==n))
        { a[j]=_doc.all[i],j++; }
      } else if (_this._ie) {
        if(_doc.all[i].getAttribute('name',n)==n)
        { a[j]=_doc.all[i],j++; }
      }
    }
    return a;
  }
  if (typeof(_doc.getElementsByName)=='function') {
    a=_doc.getElementsByName(n);
    return a;
  }
});

_this.$$c=createLFC(function(n) {
/*
  if (n===''||n===undefined) {

    alert("_std.js:\nfunction $$c():\n"
         +"target elements' class name undefined.\n<usage>:\n$$c(class_name);");

    return true;
  }
*/
  var a=new Array();
  if (typeof(_doc.all)=='object') {
    for (var i=j=0;i<_doc.all.length;i++) {
      if (_doc.all[i].className==n)
      { a[j]=_doc.all[i],j++; }
    }
  } else {
    var e=_this.$$$();
    for (var i=j=0;i<e.length;i++) {
      if (e[i].className==n)
      { a[j]=e[i],j++; }
    }
  }
  if (typeof(_doc.getElementsByClassName)=='function')
  { a=_doc.getElementsByClassName(n); }
  return a;
});

_this._=createLFC(function() {
  if (typeof(_doc.body)=='object')
  { return _doc.body; }
  else if (typeof(_doc.getElementsByTagName)=='function')
  { return _doc.getElementsByTagName('body').item(0); }
  else if (typeof(_doc.getElementsByTagName)=='object')
  { return _doc.getElementsByTagName('body').item(0); }
  else {
/*
    alert("_std.js:\nfunction _():\ndom interface unsupported.");
*/
    return false;
  }
});

_this.$$b=createLFC(function() { return _this._().childNodes; });

_this.$=createLFC(function(id) {
/*
  if (_doc.getElementById===undefined) {

    alert("_std.js:\nfunction $():\n"
         +"'_doc.getElementById' undefined.");

    return false;
  }

  if (id===''||id===undefined) {
    alert("_std.js:\nfunction $():\n"
         +"target element id undefined.\n<usage>:\n$(id);");
    return true;
  }
*/
  var o=_doc.getElementById(id);
/*
  if (o==null) { return o; }
  if (o.innerHTML!==undefined) { o.h=o.innerHTML; }
  if (o.value!==undefined) { o.v=o.value; }
  if (o.innerText!==undefined) { o.t=o.innerText; }
  if (o.textContent!==undefined) { o.c=o.textContent; }
  if (o.style!==undefined) {
    o.s=o.style;
    if (o.s.display!==undefined) { o.s.d=o.s.display; }
    if (o.s.position!==undefined) { o.s.p=o.s.position; }
    if (o.s.visibility!==undefined) { o.s.v=o.s.visibility; }
    if (o.s.left!==undefined) { o.s.x=o.s.left; }
    if (o.s.top!==undefined) { o.s.y=o.s.top; }
    if (o.s.width!==undefined) { o.s.w=o.s.width; }
    if (o.s.height!==undefined) { o.s.h=o.s.height; }
    if (o.s.color!==undefined) { o.s.fgc=o.s.color; }
    if (o.s.backgroundColor!==undefined) { o.s.bgc=o.s.backgroundColor; }
    if (o.s.border!==undefined) { o.s.b=o.s.border; }
    if (o.s.textAlign!==undefined) { o.s.a=o.s.textAlign; }
    if (o.s.zIndex!==undefined) { o.s.z=o.s.zIndex; }
    if (o.s.cursor!==undefined) { o.s.c=o.s.cursor; }
  }
*/
  return o;
});

_this.$_=function(tn) {

  if (_doc.createElement===undefined) {
/*
    alert("_std.js:\nfunction $_():\n"
         +"'_doc.createElement' undefined.");
*/
    return false;
  }

  if (tn===''||tn===undefined) {
/*
    alert("_std.js:\nfunction $_():\n"
         +"tagname of target element undefined.\n<usage>:\n$_(tn);");
*/
    return true;
  }
  var o=_doc.createElement(tn);
  return o;
};

_this._scW=screen.availWidth;
_this._scH=screen.availHeight;
_this._scC=screen.colorDepth;

_this._scX=createLFC(function() {
  var x=_doc.documentElement.scrollLeft;
  if (x!=0) { return x; }
  else { x=_doc.body.scrollLeft; }
  return x;
});

_this._scY=createLFC(function() {
  var y=_doc.documentElement.scrollTop;
  if (y!=0) { return y; }
  else { y=_doc.body.scrollTop; }
  return y;
});

_this._winW=createLFC(function() {
  var w=_doc.documentElement.clientWidth;
  if (w!=0) { return w; }
  else {
    w=_doc.body.clientWidth;
    if (w!=0) { return w; }
    else {
      w=window.innerWidth;
      if (w!=0) { return w; }
    }
  }
});

_this._winH=createLFC(function() {
  var h=_doc.documentElement.clientHeight;
  if (h!=0) { return h; }
  else {
    h=_doc.body.clientHeight;
    if (h!=0) { return h; }
    else {
      h=window.innerHeight;
      if (h!=0) { return h; }
    }
  }
});

_this._evt=function() {
  if (window.event!==undefined)
  { return window.event; }
  var caller=arguments.callee.caller;
  if (caller!==undefined) {
    while ( caller ) {
      var evt=caller.arguments[0];
      if ( evt && evt.constructor == MouseEvent )
      { return evt; }
      caller=caller.caller;
    }
  } else {
    var evts=['mousedown','mouseup','mouseover','mouseout',
              'mousemove','mousedrag','click','dblclick'];
    for (var i=0;i<evts.length;i++)
    { window.addEventListener(evts[i],function(e){window.event=e;},true); }
    return window.event;
  }
};

_this.get_evt=createLFC(function(e) {
  if (e) { return e; }
  else if (window.event!==undefined) { return window.event; }
  else { return null; }
});

_this._evtX,_this._evtY;

_this.get_evtX=createLFC(function(e) {
  var _scx=_this._scX(),_evo=_this._evt();
  if (_doc.all){
    if(_this._i8){
      _this._evtX=_evo.x;
    }else{
     (_scx!=0)?(_this._evtX=eval(_evo.x+_scx)):(_this._evtX=_evo.x);
    }
  } else { _this._evtX=e.pageX; }
});

_this.get_evtY=createLFC(function(e) {
  var _scy=_this._scY(),_evo=_this._evt();
  if (_doc.all){
    if(_this._i8){
      _this._evtY=_evo.y;
    }else{
      (_scy!=0)?(_this._evtY=eval(_evo.y+_scy)):(_this._evtY=_evo.y);
    }
  } else { _this._evtY=e.pageY; }
});

_this.get_evtXY=createLFC(function(e) { _this.get_evtX(e),_this.get_evtY(e); });

_this.evtX=createLFC(function(e) {
  var _scx=_this._scX(),_evo=_this._evt();
  if (_doc.all) {
    var x;
    if(_this._i8){
      x=_evo.x;
    }else{
      (_scx!=0)?(x=eval(_evo.x+_scx)):(x=_evo.x);
    }
    return x;
  } else { return e.pageX; }
});

_this.evtY=createLFC(function(e) {
  var _scy=_this._scY(),_evo=_this._evt();
  if (_doc.all) {
    var y;
    if(_this._i8){
      y=_evo.y;
    }else{
      (_scy!=0)?(y=eval(_evo.y+_scy)):(y=_evo.y);
    }
    return y;
  } else { return e.pageY; }
});

_this.topEvtObj=createLFC(function(e) {
  var o=null;
  if (window.event!==undefined) {
    if (window.event.target!==undefined)
    { o=window.event.target; }
    else { o=window.event.srcElement; }
  } else { o=e.target; }
  return o;
});

_this.botEvtObj=createLFC(function(e) {
  var o=_this.topEvtObj(e);
  if (o.parentNode && o.parentNode.tagName!=null )
  while (o.parentNode && o.parentNode.tagName.toLowerCase()!='body')
  { o=o.parentNode; }
  return o;
});

_this.ziMax=10000;
_this.popObj=createLFC(function(o) {
/*
  if (o===undefined) {
    alert("_std.js:\nfunction popObj():\n"
         +"target object undefined.\n<usage>:\npopObj(obj);");
    return false;
  }
*/
/*
if (_this.ziMax==null){
  var all_o=_this.$$$();
  var all_z=new Array();
  var max=0;
  for (var i=0;i<all_o.length;i++) {
    if (parseInt(all_o[i].style.zIndex)>max)
    { max=parseInt(all_o[i].style.zIndex); }
  }
  _this.ziMax=max+1;
}else{
*/
  o.style.zIndex=_this.ziMax++;
//}


});

_this.swapObj=createLFC(function(e) {
  var o=_this.botEvtObj(e);
  if (o==null) { return false; }
  _this.popObj(o);
  return true;
});

_this.setOpa=createLFC(function(o,op) {
/*
  if ((typeof(o)!='object')||(typeof(op)!='number')) {
    alert("_std.js:\nfunction setOpa():\n"
         +"target object or opacity undefined.\n<usage>:\nsetOpa(obj,opa);");
    return false;
  }
*/
  if (typeof(o.style.opacity)=='string')
  { o.style.opacity=op; }
  else if (typeof(o.style.MozOpacity)=='string')
  { o.style.MozOpacity=op; }
  else if (typeof(o.style.filter)=='string')
  { op*=100,o.style.filter='Alpha(opacity='+op+')'; }
  else { return false; }
});

_this.chkPro=createLFC(function(o) {
/*
  if (o===undefined) {
    alert("_std.js:\nfunction chkPro():\n"
         +"target object undefined.\n<usage>:\nchkPro(obj);");
    return false;
  }
*/
  var str='';
  if ((_this._fx&&((o===document)||(o===history)))
    ||(_this._ns&&(o===history))) {
    for (var i in o) { str+=i+"<br />\n"; }
    return str;
  }
  for (var i in o) { str+=i+"==|"+o[i]+"|<br />\n"; }
  if (str!='') { return str; }
  else { return 'none'; }
});

var dob=new Object();
var dfg=new Boolean();
dob.dfg=dfg=false;
dob.ox=dob.oy=0;
dob.ex=dob.ey=0;
dob.ob=null;

_this.dragInit=createLFC(function(direc,func1,func2) {
  if (rfg) { return false; }
	if(func1){
  _doc.onmousemove=createLFC(function(){func1(dob);_this._$dp(_this._evt(),direc);});
}else{
  _doc.onmousemove=createLFC(function(){_this._$dp(_this._evt(),direc);});
}
if(func2){
  _doc.onmouseup=createLFC(function(){func2(dob);_this._$de();});
}else{
	_doc.onmouseup=_this._$de;
}
  return true;
});

_this.dragStart=createLFC(function(tgt) {
  _this.get_evtXY(_this._evt());
var o=null;

if(tgt && tgt.style){
  o=tgt;
}else{
  o=_this.botEvtObj(_this._evt());
}
  if (o==null) { return false; }
  dob.ob=o;
  dob.dfg=dfg=true;
  dob.ox=dob.ex-parseInt(o.style.left);
  dob.oy=dob.ey-parseInt(o.style.top);
  //dob.ob.style.cursor='move';
  return false;
});

_this._$dp=createLFC(function(e,direc) {
  _this.get_evtXY(e);
  dob.ex=_this._evtX;
  dob.ey=_this._evtY;
  if (!dob.dfg) { return false; }
  var o_x=_this._evtX-dob.ox;
  var o_y=_this._evtY-dob.oy;
  var o_w=parseInt(dob.ob.style.width);
  var o_h=parseInt(dob.ob.style.height);
//  var d_x=o_x+o_w;
//  var d_y=o_y+o_h;
//  if (d_x<4*bwh) {o_x=4*bwh-o_w;}
//  if (d_y<2*bwh) {o_y=2*bwh-o_h;}
if(direc=="h"){
  dob.ob.style.left=o_x+'px';
}else if(direc=="v"){
  dob.ob.style.top=o_y+'px';
}else{
  dob.ob.style.left=o_x+'px';
  dob.ob.style.top=o_y+'px';
}
  return false;
});

_this._$de=createLFC(function() {
  dob.dfg=dfg=false;
  if (dob.ob==null) { return false; }
  //dob.ob.style.cursor='default';
  return true;
});

var bwh=15;
var obw=0;
var rob=new Object();
var rfg=new Boolean();
var rcs='';
rob.rfg=rfg=false;
rob.ox=rob.oy=0;
rob.ob=null;

_this.rsizInit=createLFC(function() {
  if (dfg) { return false; }
  _doc.onmousemove=_this._$rp;
  _doc.onmouseup=_this._$re;
  return true;
});

_this.rsizStart=createLFC(function(e) {
  var o=_this.botEvtObj(e);
  if (!_this._i6) {
    if (o.style.borderWidth)
    { obw=parseInt(o.style.borderWidth),obw*=2; }
    else { obw=0; }
  }
  rob.rfg=rfg=true;
  rob.ob=o;
  _this.get_evtXY(e);
  var o_x=parseInt(rob.ob.style.left);
  var o_y=parseInt(rob.ob.style.top);
  var o_w=parseInt(rob.ob.style.width)+obw;
  var o_h=parseInt(rob.ob.style.height)+obw;
  var rig_x=_this._evtX-o_x;
  var rig_y=_this._evtY-o_y;
  if ((rig_x<=bwh)&&(rig_y<=bwh)) {
    rcs='ul';
    rob.ox=o_x+o_w;
    rob.oy=o_y+o_h;
    rob.ob.style.cursor='nw-resize';
  } else if ((rig_x>bwh)&&(rig_x<o_w-bwh)&&(rig_y<=bwh)) {
    rcs='up';
    rob.ox=o_x+o_w;
    rob.oy=o_y+o_h;
    rob.ob.style.cursor='n-resize';
  } else if ((rig_x>=o_w-bwh)&&(rig_x<=o_w)&&(rig_y<=bwh)) {
    rcs='ur';
    rob.ox=o_x;
    rob.oy=o_y+o_h;
    rob.ob.style.cursor='ne-resize';
  } else if ((rig_x<=bwh)&&(rig_y>bwh)&&(rig_y<o_h-bwh)) {
    rcs='le';
    rob.ox=o_x+o_w;
    rob.oy=o_y+o_h;
    rob.ob.style.cursor='w-resize';
  } else if ((rig_x>=o_w-bwh)&&(rig_x<=o_w)&&(rig_y>bwh)&&(rig_y<o_h-bwh)) {
    rcs='ri';
    rob.ox=o_x;
    rob.oy=o_y;
    rob.ob.style.cursor='e-resize';
  } else if ((rig_x<=bwh)&&(rig_y>=o_h-bwh)&&(rig_y<=o_h)) {
    rcs='bl';
    rob.ox=o_x+o_w;
    rob.oy=o_y;
    rob.ob.style.cursor='sw-resize';
  } else if ((rig_x>bwh)&&(rig_x<o_w-bwh)&&(rig_y>=o_h-bwh)&&(rig_y<=o_h)) {
    rcs='bt';
    rob.ox=o_x;
    rob.oy=o_y;
    rob.ob.style.cursor='s-resize';
  } else if ((rig_x>=o_w-bwh)&&(rig_x<=o_w)&&(rig_y>=o_h-bwh)&&(rig_y<=o_h)) {
    rcs='br';
    rob.ox=o_x;
    rob.oy=o_y;
    rob.ob.style.cursor='se-resize';
  } else {
    _this._$re();
    return true;
  }
  return false;
});

_this._$rp=createLFC(function(e) {
  _this.get_evtXY(e);
  if (!rob.rfg) { return false; }
  var orx, ory, orw, orh;
  var o_x=parseInt(rob.ob.style.left);
  var o_y=parseInt(rob.ob.style.top);
  var o_w=parseInt(rob.ob.style.width);
  var o_h=parseInt(rob.ob.style.height);
  var lim=bwh*3;
  if (rcs=='ul') {
    orx=_this._evtX-10;
    ory=_this._evtY-10;
    orw=rob.ox-_this._evtX-obw+10;
    orh=rob.oy-_this._evtY-obw+10;
    if (orx>=rob.ox-obw-lim) { orx=rob.ox-obw-lim; }
    if (ory>=rob.oy-obw-lim) { ory=rob.oy-obw-lim; }
  } else if (rcs=='up') {
    orx=o_x;
    (_this._ie)?(ory=_this._evtY-12):(ory=_this._evtY-10);
    orw=o_w;
    (_this._ie)?(orh=rob.oy-_this._evtY-obw+12):(orh=rob.oy-_this._evtY-obw+10);
    if (ory>=rob.oy-obw-lim) { ory=rob.oy-obw-lim; }
  } else if (rcs=='ur') {
    orx=rob.ox;
    ory=_this._evtY-10;
    (_this._ie)?(orw=_this._evtX-obw-rob.ox+7):(orw=_this._evtX-obw-rob.ox+11);
    orh=rob.oy-_this._evtY-obw+10;
    if (ory>=rob.oy-obw-lim) { ory=rob.oy-obw-lim; }
  } else if (rcs=='le') {
    (_this._ie)?(orx=_this._evtX-12):(orx=_this._evtX-10);
    ory=o_y;
    (_this._ie)?(orw=rob.ox-_this._evtX-obw+12):(orw=rob.ox-_this._evtX-obw+10);
    orh=o_h;
    if (orx>=rob.ox-obw-lim) { orx=rob.ox-obw-lim; }
  } else if (rcs=='ri') {
    orx=o_x;
    ory=o_y;
    (_this._ie)?(orw=_this._evtX-rob.ox-obw+10):(orw=_this._evtX-rob.ox-obw+11);
    orh=o_h;
  } else if (rcs=='bl') {
    orx=_this._evtX-10;
    ory=rob.oy;
    orw=rob.ox-_this._evtX-obw+10;
    (_this._ie)?(orh=_this._evtY-obw-rob.oy+7):(orh=_this._evtY-obw-rob.oy+11);
    if (orx>=rob.ox-obw-lim) { orx=rob.ox-obw-lim; }
  } else if (rcs=='bt') {
    orx=o_x;
    ory=o_y;
    orw=o_w;
    (_this._ie)?(orh=_this._evtY-rob.oy-obw+10):(orh=_this._evtY-rob.oy-obw+11);
  } else if (rcs=='br') {
    orx=o_x;
    ory=o_y;
    (_this._ie)?(orw=_this._evtX-rob.ox-obw+7):(orw=_this._evtX-rob.ox-obw+11);
    (_this._ie)?(orh=_this._evtY-rob.oy-obw+7):(orh=_this._evtY-rob.oy-obw+11);
  }
  if (orx<=lim) { orx=lim; }
  if (ory<=lim) { ory=lim; }
  if (orw<=lim) { orw=lim; }
  if (orh<=lim) { orh=lim; }
  rob.ob.style.left=orx+'px';
  rob.ob.style.top=ory+'px';
  rob.ob.style.width=orw+'px';
  rob.ob.style.height=orh+'px';
  return false;
});

_this._$re=createLFC(function() {
  rob.rfg=rfg=false;
  if (rob.ob==null) { return false; }
  rob.ob.style.cursor='default';
  rcs='';
  return true;
});

_this.dragRsiz=createLFC(function(e) {
  _this.get_evtXY(e);
  var o=_this.botEvtObj(e);
  if (!_this._i6) {
    if (o.style.borderWidth)
    { obw=parseInt(o.style.borderWidth),obw*=2; }
    else { obw=0; }
  }
  if (o==null) { return false; }
  var o_x=parseInt(o.style.left);
  var o_y=parseInt(o.style.top);
  var o_w=parseInt(o.style.width)+obw;
  var o_h=parseInt(o.style.height)+obw;
  var o_b_w=o_w-bwh;
  var o_b_h=o_h-bwh;
  var r_x=_this._evtX-o_x;
  var r_y=_this._evtY-o_y;
  if ((r_x>bwh)&&(r_y>bwh)&&(r_x<o_b_w)&&(r_y<o_b_h)) {
    o.style.cursor='move';
    _this.dragInit();
    o.onmousedown=_this.dragStart;
  } else {
    if ((r_x<=bwh)&&(r_y<=bwh))
    { o.style.cursor='nw-resize'; } // [ul]
    if ((r_x>bwh)&&(r_x<o_w-bwh)&&(r_y<=bwh))
    { o.style.cursor='n-resize'; }  // [up]
    if ((r_x>=o_w-bwh)&&(r_x<=o_w)&&(r_y<=bwh))
    { o.style.cursor='ne-resize'; } // [ur]
    if ((r_x<=bwh)&&(r_y>bwh)&&(r_y<o_b_h))
    { o.style.cursor='w-resize'; }  // [le]
    if ((r_x>=o_w-bwh)&&(r_x<=o_w)&&(r_y>bwh)&&(r_y<o_h-bwh))
    { o.style.cursor='e-resize'; }  // [ri]
    if ((r_x<=bwh)&&(r_y>=o_h-bwh)&&(r_y<=o_h))
    { o.style.cursor='sw-resize'; } // [bl]
    if ((r_x>bwh)&&(r_x<o_w-bwh)&&(r_y>=o_h-bwh)&&(r_y<=o_h))
    { o.style.cursor='s-resize'; }  // [bt]
    if ((r_x>=o_w-bwh)&&(r_x<=o_w)&&(r_y>=o_h-bwh)&&(r_y<=o_h))
    { o.style.cursor='se-resize'; } // [br]
    _this.rsizInit();
    o.onmousedown=_this.rsizStart;
  }
  return true;
});

_this.act=createLFC(function(o) {
  if ((typeof(o)!='object')
    ||(typeof(o.style)!='object')
    ||(o.style.top.toLowerCase()=='')
    ||(o.style.left.toLowerCase()=='')
    ||(o.style.position.toLowerCase()!='absolute')) {
/*
    alert("_std.js:\nfunction act():\n"
         +"target activate object or 'style' undefined.\n"
         +"create object and set 'style' at first.\n"
         +"<usage>:\nact(obj);\n");
*/
    return false ;
  }
  if (o.onclick==null) { o.onclick=_this.swapObj; }
  if (o.onmousemove==null) { o.onmousemove=_this.dragRsiz; }
  if (o.ondblclick==null) { o.ondblclick=_this.delBotObj; }
});

_this.deact=createLFC(function(o) {
  if ((typeof(o)!='object')
    ||(typeof(o.style)!='object')
    ||(o.style.top.toLowerCase()=='')
    ||(o.style.left.toLowerCase()=='')
    ||(o.style.position.toLowerCase()!='absolute')) {
/*
    alert("_std.js:\nfunction deact():\n"
         +"target deactivate object undefined.\n"
         +"<usage>:\nact(obj);\n");
*/
    return false ;
  }
  if (o.onmouseover!=null) { o.onmouseover=null; }
  if (o.onmousedown!=null) { o.onmousedown=null; }
  if (o.onmouseup!=null) { o.onmouseup=null; }
  if (o.onclick!=null) { o.onclick=null; }
  if (o.onmousemove!=null) { o.onmousemove=null; }
  if (o.ondblclick!=null) { o.ondblclick=null; }
});

_this.delObj=createLFC(function(o) {
  if (o===null || o===undefined) {
/*
    alert("_std.js:\nfunction delObj():\n"
         +"target delete object undefined.\n<usage>:\ndelObj(obj);");
*/
    return false;
  } else if (o.parentNode===undefined) {
/*
    alert("_std.js:\nfunction delObj():\n"
         +"'parentNode' of target object undefined.\n"
         +"<usage>:\ndelObj(obj);");
*/
    return false;
  } else {
/*
  if(o.getElementsByTagName){
	  var alle=o.getElementsByTagName('*');
	  for(var i=0;i<alle.length;i++){
		  _this.delObj(alle[i]);
	  }
  }
  if(o.childNodes && o.childNodes.length){
	  for(var i=0;i<o.childNodes.length;i++){
		  _this.delObj(o.childNodes[i]);
	  }
  }
*/
	//_this.rmchild(o);
	if(o.innerHTML){
		try{
			o.innerHTML="";
		}catch(e){
			;
		}
    }
    o.parentNode.removeChild(o);
  }
});

_this.delTopObj=createLFC(function(e) { _this.delObj(_this.topEvtObj(e)); });

_this.delBotObj=createLFC(function(e) { _this.delObj(_this.botEvtObj(e)); });

_this.setObjSty=createLFC(function() {
  if ((arguments.length==0)||(typeof(arguments[0])!='object')) {
/*
    alert("_std.js:\nfunction setObjSty():\n"
         +"function arguments undefined.\n"
         +"<usage>:\nsetObjSty(\n"
         +"  o  [target object.<ex:myobj>],\n"
         +" 'd=[display style.<ex:'d=block'>]',\n"
         +" 'p=[position style.<ex:'p=absolute'>]',\n"
         +" 'v=[visibility style.<ex:'v=visible'>]',\n"
         +" 'x=[left position.<ex:'x=200'>]',\n"
         +" 'y=[top position.<ex:'y=300'>]',\n"
         +" 'w=[width.<ex:'w=150'>]',\n"
         +" 'h=[height.<ex:'h=120'>]',\n"
         +" 'fgc=[forground color.<ex:'fgc=black'>]',\n"
         +" 'bgc=[background color.<ex:'bgc=white'>]',\n"
         +" 'b=[border style.<ex:'b=solid 1px blue'>]',\n"
         +" 'a=[text align.<ex:'a=center'>]',\n"
         +" 'z=[zindex.<ex:'z=1'>]',\n"
         +" 'c=[cursor style.<ex:'c=pointer'>]',\n"
         +");");
*/
    return false;
  }
  var o=null;
  for (var i=0;i<arguments.length;i++) {
    if (typeof(arguments[i])=='object') { o=arguments[i]; }
    if (typeof(arguments[i])=='string') {
      var a=arguments[i].split('=');
      if (a[0]=='d') { o.style.display=a[1]; }
      if (a[0]=='p') { o.style.position=a[1]; }
      if (a[0]=='v') { o.style.visibility=a[1]; }
      if (a[0]=='x') { o.style.left=parseInt(a[1])+'px'; }
      if (a[0]=='y') { o.style.top=parseInt(a[1])+'px'; }
      if (a[0]=='w') {
        if (a[1].match(/\%$/gi)=='%')
        { o.style.width=parseInt(a[1])+'%'; }
        else { o.style.width=parseInt(a[1])+'px'; }
      }
      if (a[0]=='h') {
        if (a[1].match(/\%$/gi)=='%')
        { o.style.height=parseInt(a[1])+'%'; }
        else { o.style.height=parseInt(a[1])+'px'; }
      }
      if (a[0]=='b') { o.style.border=a[1]; }
      if (a[0]=='a') { o.style.textAlign=a[1]; }
      if (a[0]=='z') { o.style.zIndex=a[1]; }
      if (a[0]=='c') { o.style.cursor=a[1]; }
      if (a[0]=='fgc') { o.style.color=a[1]; }
      if (a[0]=='bgc') { o.style.backgroundColor=a[1]; }
    }
  }
});

_this.loadimg2func=createLFC(function() {
  var f=new Function();
  var p=new String();
  var o=new Image();
  for (var i=0;i<arguments.length;i++) {
    if (typeof(arguments[i])=='function')
    { f=arguments[i]; }
    if (typeof(arguments[i])=='string') {
      var c=arguments[i].split('=');
      if (c[0]=='path') { p=c[1]; }
    }
  }
  o.src=p;
  if (o.complete) { f(o); }
  else { o.onload=function() { f(o); } }
});

var _img_w=0;
var _img_h=0;

_this.loadimg2obj=createLFC(function() {
  var f=new Object();
  var p=new String();
  var o=new Image();
  for (var i=0;i<arguments.length;i++) {
    if (typeof(arguments[i])=='object')
    { f=arguments[i]; }
    if (typeof(arguments[i])=='string') {
      var c=arguments[i].split('=');
      if (c[0]=='path') { p=c[1]; }
    }
  }
  o.src=p+"?"+_this.$id();
  o.id=p;
  if (o.complete) {
    f.setAttribute('img_w',o.width);
    f.setAttribute('img_h',o.height);
    _img_w=o.width,_img_h=o.height;
    _this.setObjSty(o,'p=absolute','w=100%','h=100%','x=0','y=0');
    f.appendChild(o);
  } else {
    o.onload=function() {
      f.setAttribute('img_w',o.width);
      f.setAttribute('img_h',o.height);
      _img_w=o.width,_img_h=o.height;
      _this.setObjSty(o,'p=absolute','w=100%','h=100%','x=0','y=0');
      f.appendChild(o);
    }
  }
});

_this.isimg=createLFC(function(u) {
  if (typeof(u)!='string') { return false; }
  if (u.match(/\.gif$/gi)||u.match(/\.ief$/gi)
    ||u.match(/\.jpg$/gi)||u.match(/\.jpe$/gi)||u.match(/\.jpeg$/gi)
    ||u.match(/\.tif$/gi)||u.match(/\.tiff$/gi)
    ||u.match(/\.ras$/gi)||u.match(/\.rgb$/gi)
    ||u.match(/\.pnm$/gi)||u.match(/\.pbm$/gi)
    ||u.match(/\.pgm$/gi)||u.match(/\.ppm$/gi)
    ||u.match(/\.xbm$/gi)||u.match(/\.xpm$/gi)||u.match(/\.xwd$/gi)
    ||u.match(/\.png$/gi)||u.match(/\.bmp$/gi)) {
    if (u.match(/^ftp\:\/\//gi)) { return false; }
    return true;
  } else { return false; }
});

_this.$id=createLFC(function() {
  var dd=new Date();
  var id=dd.getTime();
  return id;
});

_this.rmchild=createLFC(function(o) {
  if (o===undefined) {
/*
    alert("_std.js:\nfunction rmchild():\n"
         +"target object undefined.\n<usage>:\nrmchild(obj);");
*/
    return false;
  } else if (o.childNodes.length==0) { return false; }
  var i=o.childNodes.length-1;
  while(o.childNodes.length>0)
  {  var otmp=o.childNodes[i];
     _this.rmchild(otmp);
/*
otmp.detachEvent("onclick",otmp.expandoClick);
otmp.expandoClick = null;

otmp.detachEvent("onmouseover",otmp.expandoMouseOver);
otmp.expandoMouseOver = null;

otmp.detachEvent("onmouseout",otmp.expandoMouseOut);
otmp.expandoMouseOut = null;

otmp.detachEvent("onmousedown",otmp.expandoMouseDown);
otmp.expandoMouseDown = null;

otmp.detachEvent("ondblclick",otmp.expandoMouseDblClick);
otmp.expandoDblClick = null;
*/

if(otmp.tagName){
otmp.onclick = null;
otmp.ondblclick = null;
otmp.onmouseover = null;
otmp.onmouseout = null;
otmp.onmousedown = null;
}

//     o.childNodes[i]=null;
     o.removeChild(o.childNodes[i]);
     otmp=null;
     i--; }
});

_this.addchild=createLFC(function() {
/*
  if (arguments.length==0) {
    alert("_std.js:\nfunction addchild():\n"
         +"target parent object and children array undefined.\n"
         +"<usage>:\nrmchild(obj,child_array);");
    return false;
  }
*/
  var a=new Array();
  var o=new Object();
  for (var i=0;i<arguments.length;i++) {
    if (arguments[i].length!==undefined) { a=arguments[i]; }
    else { o=arguments[i]; }
  }
  for (var i=0;i<a.length;i++) {
    o.appendChild(a[i]);
  }
});

_this.pole_r=createLFC(function(x,y) { return parseInt(Math.sqrt(x*x+y*y)); });

_this.pole_a=createLFC(function(x,y) {
  var pi=Math.PI;
  var a;
  if (x<0) { a=parseInt(180*Math.atan(y/x)/pi+180); }
  else {
    if (y<0) { a=parseInt(180*Math.atan(y/x)/pi+360); }
    else { a=parseInt(180*Math.atan(y/x)/pi); }
  }
  if ((x==0)&&(y==0)) { return 0; }
  return a;
});

};	//end function _std.js
