"use strict";

var ip = 'http://127.0.0.1:';
var port = '8081/';
var prefix = ip + port;

class Page{
	constructor(options){
		this._el = options.element
	}

	_onPageReload(){
		this._getNext();
	}

	_onFolderClick(event){
		var folderName = event.currentTarget.innerHTML;
		this._getNext(folderName);
	}

	_getNext(folderName){
		var page = this;
		var container = this._el;
		
		var data; 
		if (folderName){
			data = {
				path: folderName
			};
		}		

		$.ajax({
	        type: 'GET',
	        url: prefix + "next",
	        dataType: 'json',
	        data: data,
	        async: true,
	        success: page._updateFiles.bind(page),
	        error: function(jqXHR, textStatus, errorThrown) {
	            alert(jqXHR.status + ' ' + jqXHR.responseText);
	        }
    	});
	}

	_getPrev(){
		var page = this;
		var container = this._el;		

		$.ajax({
	        type: 'GET',
	        url: prefix + "prev",
	        dataType: 'json',
	        async: true,
	        success: page._updateFiles.bind(page),
	        error: function(jqXHR, textStatus, errorThrown) {
	            alert(jqXHR.status + ' ' + jqXHR.responseText);
	        }
    	});
	}

	_updateFiles(files){
		var page = this;
		var container = this._el;

		while (container.firstChild){
		    container.removeChild(container.firstChild);
		}

		files.forEach(function(file){
        	var div = document.createElement("div");
        	div.innerHTML = file.path;
        	div.className = file.isDirectory ? "directory" : "file";
        	if (file.isDirectory){
        		div.onclick = page._onFolderClick.bind(page);
        	}	            	
        	page._el.appendChild(div);            	
        });
	}


}