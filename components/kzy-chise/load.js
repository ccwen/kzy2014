var api=require("./api");
var Kde=Require("ksana-document").kde;

var load=function(partlist,cb,context) {
	Kde.open("chise",function(engine) {
		var parts=api.parseIDS(partlist);
		var keys=parts.map(function(k){
			return ["extra","chiseids",k];
		})
		engine.get(keys,function(res){
			var out={};
			parts.map(function(p,idx){out[p]=res[idx]});
			cb.apply(context,[out]);
		})
	});
}

module.exports=load;