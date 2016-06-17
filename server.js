var fs = require("fs");
var http = require('http');

const test = JSON.parse(
  fs.readFileSync('./data/test.json')
).test;

http.createServer(function(request, response) {
	if (request.method === 'GET' && request.url === '/test') {
		var headers = request.headers;
		var method = request.method;
		var url = request.url;
		var body = JSON.stringify(test);
		
		request.on('error', function(err) {
			console.error(err);
		}).on('end', function() {
			body = Buffer.concat(body).toString();
			// BEGINNING OF NEW STUFF

			response.on('error', function(err) {
			  console.error(err);
			});

			response.statusCode = 200;
			response.setHeader('Content-Type', 'application/json');
			// Note: the 2 lines above could be replaced with this next one:
			// response.writeHead(200, {'Content-Type': 'application/json'})

			var responseBody = {
			  headers: headers,
			  method: method,
			  url: url,
			  body: body
			};

			response.write(JSON.stringify(responseBody));
			response.end();
			// Note: the 2 lines above could be replaced with this next one:
			// response.end(JSON.stringify(responseBody))

			// END OF NEW STUFF
		});
	}
}).listen(process.env.PORT || 8080);


