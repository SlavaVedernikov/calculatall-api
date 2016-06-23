var http = require('http');
var fs = require("fs");

const datamodel = JSON.parse(
  fs.readFileSync('./data/datamodel.js')
);

http.createServer(function(request, response) {
  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', function(err) {
    console.error(err);
  });
  
  
  if (request.method === 'GET' && (request.url === '/data_types' || request.url === '/validation_rules' || request.url === '/object_types' || request.url === '/objects')) {
	var body = JSON.stringify(datamodel[request.url.replace('/', '')]);
	
	response.setHeader('Content-Type', 'application/json');
	response.statusCode = 200;	
	
	response.write(body);
	response.end();
  }
  else {
    response.statusCode = 404;
    response.end();
  }
}).listen(process.env.PORT || 8080);
