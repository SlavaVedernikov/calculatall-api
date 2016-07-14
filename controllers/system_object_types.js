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
		//data = JSONPath({json: datamodel, path: "$.[?(@.object_type=='system_object')]"});
	}
	else
	{
		data = JSON.stringify(datamodel.system_object_types);
	}
	
	res.header("Access-Control-Allow-Origin", "https://calculatall-app.herokuapp.com");
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
	res.header("Access-Control-Allow-Origin", "https://calculatall-app.herokuapp.com");
	res.send(body);
};

exports.add = function() {

};

exports.update = function() {

};

exports.delete = function() {

};
