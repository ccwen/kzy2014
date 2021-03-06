var SC=require("./kTotalStrokes_str.js"); //generated from kzy-unihan/genstrokemap.js
var unpackrle=function(s) {
	var prev='';
	var output="";
	for (var i=0;i<s.length;i++) {
		var ch=s.charCodeAt(i);
		if (ch>0x63) {
			repeat=ch-0x63;
			for (var j=0;j<repeat;j++) output+=prev;
		} else {
			prev=s[i];
			output+=prev;			
		}
	}
	return output;
}
var bmpstroke=unpackrle(SC.bmpRLE); SC.bmpRLE=null;
var surstroke=unpackrle(SC.surRLE); SC.surRLE=null;

/*
TODO SINICA Parts stroke count
*/
var sinicaeudc ={};
var  getutf32 = function (ch) {
	var ic = ch.charCodeAt(0);
	var c = 1; // default BMP one widechar
	if (ic >= 0xd800 && ic <= 0xdcff) {
	  var ic2 = ch.charCodeAt(1);
	  ic = 0x10000 + ((ic & 0x3ff) * 1024) + (ic2 & 0x3ff);
	  c++; // surrogate pair
	}
	return ic;
  };

var chwithstrokecount=function(n) {
	var output=[];
	var extensionb=false;
	if (n<0) extensionb=true;

	if (extensionb) {
		n=-n;
		for (var i=0;i< surstroke.length;i++ ) {
			if (surstroke.charCodeAt(i)-0x23 == n) 
				output.push( i+0x20000);
		}
	} else {
		for (var i=0;i<bmpstroke.length;i++) {
			if (bmpstroke.charCodeAt(i)-0x23 == n) 
				output.push( i+0x3400);
		}		
	}

	return output;
}
var strokecount=function(ch) {
	code=parseInt(ch);
	if ( isNaN(code)) {
		var code=getutf32(ch);
	}
	
	if (code>=0x20000 && code<=0x2B81F) { //up to extension D
		return surstroke.charCodeAt(code-0x20000)-0x23 || 0;
	} else if (code<0x20000) {
		return bmpstroke.charCodeAt(code-0x3400)-0x23 || 0;
	} else {
		//return eudc(ch) || 0 ;
		return 0;
	}
};
strokecount.withstroke=chwithstrokecount;
module.exports=strokecount;