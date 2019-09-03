var port 	= 8888
var http 	= require("http")
var url  	= require("url")
var param	= require("querystring")
var file	= require("fs")


function readFileStream(file, request, response, resources) {
	file.createReadStream(resources).pipe(response)
	response.writeHeader(200, {"Content-Type" : "text/html"})
}

var server	= http.createServer(function(request, response) {

	//Recah URL
	var route		= url.parse(request.url)

	//File
	var resources	= ""

	if(route.pathname == "/") {
		//Validasi Method
		if(request.method.toUpperCase() == "POST") {
			//Recah Parameter pada URL
			var param_get	= ""

			request.on("data", function(chunck) {
				param_get += chunck
			})

			request.on("end", function() {
				//Set variable param_get menjadi objek
				param_get = param.parse(param_get)
				if(param_get.username && param_get.password) {
					resources = "./resources/parsing.html"
					console.log("Output Method POST - Username : "+param_get.username+", Password : "+param_get.password)
				} else {
					resources = "./resources/page.html"
				}

				readFileStream(file, request, response, resources)
			})

		} else {
			//Recah Parameter pada URL
			var param_get	= param.parse(route.query)
			if(param_get.username && param_get.password) {
				resources = "./resources/parsing.html"
				console.log("Output Method GET - Username : "+param_get.username+", Password : "+param_get.password)
			} else {
				resources = "./resources/page.html"
			}
			readFileStream(file, request, response, resources)
		}
	} else {
		resources = "./resources/404.html"
		readFileStream(file, request, response, resources)
	}
}) 

server.listen(port)