"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3000;

//app.use(express.static(__dirname));
app.use(express.static(__dirname));

var directoryTree = [];

app.get('/', function(req,res){  
    res.sendFile(__dirname + '/main.html' );
});

app.get('/next', function (req, res) {

	var path = directoryTree.join('/');

	if (path === ''){
		path = '.';
		directoryTree.push(path);
	}

    path = path.concat('/');

	if (req.query.path){
		var newPath = req.query.path;
		path = path.concat(newPath, '/');
		directoryTree.push(newPath);
	}

    console.log(path);
  	fs.readdir(path, function(err, items) {
  		if (!items){
  			res.send([]);
  		}else{
  			var elems = items.map(function(item){
	  			return {
	  				path: item,
	  				isDirectory: fs.lstatSync(path.concat(item)).isDirectory()
	  			};
  			});
  			
    		res.send(elems);
  		}
  		
  	});
});

app.get('/prev', function (req, res) {

    if (directoryTree.length > 0){	
	   directoryTree.pop();
    }

	var path = directoryTree.join('/');

    if (path === ''){
        path = '.';
        directoryTree.push(path);
    }

    path = path.concat('/');

    console.log(path);
	fs.readdir(path, function(err, items) {
  		if (!items){
  			res.send([]);
  		}else{
  			var elems = items.map(function(item){
	  			return {
	  				path: item,
	  				isDirectory: fs.lstatSync(path.concat(item)).isDirectory()
	  			};
  			});
  			
    		res.send(elems);
  		}
  		
  	});
});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);

});