/*
TODO , normalize all traditional and variants to simplified Chinese
*/

var warning=function() {
	console.log.apply(console,arguments);
}

var finalized=function(session) {
	console.log("VPOS",session.vpos);
	console.log("FINISHED")
}
var finalizeField=function(fields) {

}
var config={
	name:"glyphwiki"
	,meta:{
		config:"simple1"	
	},
	extra: {
		glyphwiki: JSON.parse(require('fs').readFileSync('./glyphwiki.json','utf8')),
		//related: JSON.parse(require('fs').readFileSync('./related.json'),'utf8'),
	}
	,estimatesize:50430400
	,glob:"glyphwiki.xml"
	,pageSeparator:"pb.n"
	,reset:true
	,outdir:"../../"
	,finalized:finalized
	,finalizeField:finalizeField
	,warning:warning
}
setTimeout(function(){ //this might load by gulpfile-app.js
	if (!config.gulp) require("ksana-document").build();
},100)
module.exports=config;