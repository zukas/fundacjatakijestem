var http = require('http'),
	fs = require('fs');


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

	console.log(request.url);
	var __writeHandler = function (err, data) {

		
		if (err) {
			console.log("Error reading file");
			console.log(err);
			response.writeHead(404);
			response.write(err);
		} else {
			var _type = request.url.substring(request.url.lastIndexOf(".")+1),
				_mime = {
					"html" : "text/html",
					"css" : "text/css",
					"js" : "application/javascript",
					"png" : "image/png"
				}



			console.log(_type);
			response.writeHead(200, {"Content-Type": _mime[_type]});
			response.write(data);
		}
		
  		response.end();
	}

	if(request.url === "/") {
		fs.readFile("./public/html/index.html", __writeHandler);
	} else {
		request.url = "." + request.url;
		if(fs.existsSync(request.url)) {
			fs.readFile(request.url, __writeHandler);
		}else{
			console.log("Resource not found, redirecting");
			response.writeHead(302, { "Location": "/"});
			response.end();
		}
	}

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");