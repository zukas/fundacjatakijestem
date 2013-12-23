var http = require('http'),
	fs = require('fs');


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

	var _cache = {},
		__writeHandler = function (err, data) {
		
			if (err) {
				console.log("Error reading file");
				console.log(err);
				response.writeHead(404);
			} else {
				if(!_cache[request.url]){
					_cache[request.url] = data;
				}
				
				var _type = request.url.substring(request.url.lastIndexOf(".")+1),
					_mime = {
						"html" : "text/html",
						"css" : "text/css",
						"js" : "application/javascript",
						"png" : "image/png",
						"jpg" : " image/jpeg",
						"jpeg" : " image/jpeg"
					}

				response.writeHead(200, {"Content-Type": _mime[_type]});
				response.write(data);
			}
			
	  		response.end();
		}

	if(request.url === "/") {
		fs.readFile(__dirname + "/public/html/index.html", __writeHandler);
	} else {
		request.url = __dirname + request.url;
		if(_cache[request.url]){
			__writeHandler(null, _cache[request.url]);
		} else {
			if(fs.existsSync(request.url)) {
				fs.readFile(request.url, __writeHandler);
			}else{
				response.writeHead(302, { "Location": "/"});
				response.end();
			}
		}
	}

});

server.listen(8000);