"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/views'));


app.get('/',function(req,res){       
     res.sendFile('index.html');
});

var directoryTree = [];

app.get('/next', function (req, res) {

	var path = directoryTree.join('/');

	//console.log("1");

	if (path === ''){
		//console.log("2");
		path = './';
		directoryTree.push(path);
	}

	//console.log("3");
	if (req.query.path){
		//console.log("4");
		var newPath = req.query.path;
		path = path.concat(newPath, '/');
		directoryTree.push(newPath);
	}

	//console.log("5");
  	fs.readdir(path, function(err, items) {
  		if (!items){
  			res.send([]);
  			//console.log("6");
  		}else{
  			//console.log("7");
  			var elems = items.map(function(item){
	  			return {
	  				path: item,
	  				isDirectory: fs.lstatSync(path.concat(item)).isDirectory()
	  			};
  			});
  			
    		res.send(elems);
  		}
  		//console.log("8");
  		
  	});
});

app.get('/prev', function (req, res) {

});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);

});