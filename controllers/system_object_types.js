exports.findAll = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var query = req.query.query;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	var data = {};
	
	if(query != undefined)
	{
		data = JSONPath({json: datamodel, path: "$.[?(@." + query + ")]"});
	}
	else
	{
		data = JSON.stringify(datamodel.system_object_types);
	}
	
	var allowedOrigins = ['http://127.0.0.1:8080', 'http://calculatall-app.herokuapp.com', 'https://calculatall-app.herokuapp.com'];
  	var origin = req.headers.origin;
  	if(allowedOrigins.indexOf(origin) > -1){
       		res.header('Access-Control-Allow-Origin', origin);
  	}
  	
	res.send(data);
};

exports.findById = function(req, res){
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var id = req.params.id;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	var data = JSONPath({json: datamodel, path: "$.[?(@.name=='" + id + "')]"});
	var body = data[0];
	
	var allowedOrigins = ['http://127.0.0.1:8080', 'http://calculatall-app.herokuapp.com', 'https://calculatall-app.herokuapp.com'];
  	var origin = req.headers.origin;
  	if(allowedOrigins.indexOf(origin) > -1){
       		res.header('Access-Control-Allow-Origin', origin);
  	}
  	
	res.send(body);
};

exports.add = function() {

};

exports.update = function() {

};

exports.delete = function() {

};
