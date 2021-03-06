var api=require("./api");
var decompose={};
var glyphcount=0;
var files=["Ext-A","Basic","Ext-B-1","Ext-B-2","Ext-B-3","Ext-B-4","Ext-B-5","Ext-B-6"
,"Ext-C","Ext-D","Ext-E"];


var parseLine=function(line,idx) {
	var data=line.split("\t");
	if (data[1]==data[2]) return;
	var unicode=parseInt("0x"+data[0].substr(2));
	var parts=api.parseIDS(data[2]);
	glyphcount++;
	for (var i=0;i<parts.length;i++) {
		var I=parts[i];
		if (!decompose[I]) decompose[I]=[];
		decompose[I].push(unicode);
	}
}
var parseFile=function(file) {
	var fs=require("fs");
	var fn="raw/IDS-UCS-"+file+".txt";
	var arr=fs.readFileSync(fn,"utf8").split("\n");
	console.log("parsing",fn);
	arr.map(parseLine);
}
var gen=function(){
	var fs=require("fs");
var path=require("path");
	

	files.map(parseFile);
	var out=[];
	for (var i in decompose) {
		decompose[i].sort(function(a,b){return a-b});
		out.push('"'+i+'":['+decompose[i]+']');
	}
	out.sort(function(a,b){
		return (b[1].length-a[1].length);
	});
	var output="{"+out.join(",\n")+"\n}";
	console.log("glyph count",glyphcount);
	console.log("part count",out.length);
	fs.writeFileSync("decompose.json",output,"utf8");
}
if (typeof process!="undefined" &&
	  process.platform!="node-webkit" &&
	  typeof __filename!="undefined" &&
	  __filename==require("path").resolve(process.argv[1])) gen();

module.exports=gen;