var port = 8888
var http = require('http')

var server = http.createServer(function(request, response) {

	response.writeHead(200, {"Content-Type" : "text/plain"})

	switch(request.url) {
		case "/" :
			response.write("Hello wolrd, URL : " + request.url)
		break;
	}

	response.end()
})

server.listen(port)


console.log("Server is running on 127.0.0.1:888")