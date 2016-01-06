/////
///// '_ajx.js' library, first created by Jiongtao Huang on Aug 2008.
/////  Last modified by Naoki Hashizume on Jul 2010.
///// (c) Jiongtao Huang 2008
/////

window["_ajx.js"] = new function(){

	var _this=this;
	var _l_std=window["_std.js"];

_this.__getHttpObj=createLFC(function() {
  try {
    if ( window.XMLHttpRequest ) {
      return new XMLHttpRequest() ;
    }else if ( window.ActiveXObject ){
      try {
        return new ActiveXObject( "Msxml2.XMLHTTP" ) ;
      } catch( e1 ) {
        try {
          return new ActiveXObject( "Microsoft.XMLHTTP" ) ;
        } catch ( e2 ) {
          return null ;
        }
      }
    } else {
      return null ;
    }
  } catch ( e3 ) {
    return null ;
  }
});

_this.sendAjaxReq=createLFC(function( uri, method, data, async, callback, sload ) {
  var reqobj = _this.__getHttpObj() ;
  if ( reqobj == null ) { return false ; }
//  var sload = ( !! _this.sendAjaxReq.arguments[5] ) ? sload : false ;
  if ( sload ) { uri += "?t=" + _l_std.$id() ; }
  try {
    if ( _l_std._ie ) {
      reqobj.onreadystatechange = createLFC(function() {
        if ( reqobj.readyState == 4 ) { callback( reqobj ) ; }
      });
    } else {
      reqobj.onload = createLFC(function() { callback( reqobj ) ; });
    }
    if ( method.toLowerCase() == 'get' ) {
      uri += window.encodeURI( data ) ;
    }
    reqobj.open( method.toUpperCase(), uri, async ) ;
    if ( method.toLowerCase() == 'post' ) {
      reqobj.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' ) ;
    }
    reqobj.send( data ) ;
    return true;
  }catch ( e ) {
    return false ;
  }
});

};
