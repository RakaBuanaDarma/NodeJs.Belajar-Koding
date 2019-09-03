var port	= 8888
var http	= require("http")
var url		= require("url")
var param	= require("querystring")
var router	= require("routes")()
var view	= require("swig")

router.addRoute("/", function(request, response) {

	if(request.method.toUpperCase() == "POST") {
		var param_get = ""

		request.on("data", function(c) {
			param_get += c
		})

		request.on("end", function() {

			param_get = param.parse(param_get)

			if(param_get.username && param_get.password) {
				var resources = view.compileFile("./resources/page.html")({
					"username" : param_get.username,
					"password" : param_get.password
				})
				response.writeHead(200, {"Content-Type" : "text/html"})
				response.end(resources)
				console.log("Method POST - Username : "+param_get.username+", Password : "+param_get.password)
			} else {
				response.writeHead(404, {"Content-Type" : "text/plain"})
				response.end("Page Not Found !")
			}
		})

	} else {
		var resources = view.compileFile("./resources/page.html")()
		response.writeHead(200, {"Content-Type" : "text/html"})
		response.end(resources)

	}
})

var server = http.createServer(function(request, response) {
	var route = url.parse(request.url).pathname
	var match = router.match(route)

	if(match) {
		match.fn(request, response)
	} else {
		response.writeHead(404, {"Content-Type" : "text/plain"})
		response.end("Page Not Found !")
	}
})

server.listen(port)