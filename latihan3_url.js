var port = 8888
var http = require("http")
var fs = require("fs")

var server = http.createServer(function(request, response) {
	var resources = ""
	var http_code = 0

	switch(request.url) {
		case "/" :
			resources = "./resources/page.html"
			http_code = 200
		break
		default :
			resources = "./resources/404.html"
			http_code = 404
		break
	}


	response.writeHead(http_code, {"Content-Type" : "text/html"})
	fs.createReadStream(resources).pipe(response)
})

server.listen(port)