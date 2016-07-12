var http = require('http');
var fs = require("fs");

http.createServer(function(request, response) {
  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', function(err) {
    console.error(err);
  });
  
  var urlPath = request.url.split("?").shift();
  
  if (request.method === 'GET' && (urlPath === '/system_object_types' || urlPath === '/custom_object_types' || urlPath === '/objects')) {
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data' + urlPath + '.json')
	);
	var body = JSON.stringify(datamodel[urlPath.replace('/', '')]);
	
	response.setHeader('Content-Type', 'application/json');
	response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
	response.setHeader('Access-Control-Allow-Origin', 'http://calculatall-app.herokuapp.com');
	
	
	response.statusCode = 200;	
	
	response.write(body);
	response.end();
  }
  else {
    response.statusCode = 404;
    response.end();
  }
}).listen(process.env.PORT || 8181);
