exports.findAll = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var object_type = req.params.object_type;
	var query = req.query.query;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	var data = {};
	
	if(query != undefined && query != '')
	{
		data = JSONPath({json: datamodel, path: "$.system_object_types[?(@.object_type=='" + object_type + "' && (" + query + "))]"});
	}
	else
	{
		data = JSONPath({json: datamodel, path: "$.system_object_types[?(@.object_type=='" + object_type + "')]"});
	}
  	
	res.send(data);
};

exports.findById = function(req, res){
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var object_type = req.params.object_type;
	var id = req.params.id;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(@.object_type=='" + object_type + "' && (@.name=='" + id + "'))]"});
	var body = data[0];
  	
	res.send(body);
};

exports.add = function(req, res) {
var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var object_type = req.params.object_type;
	
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);

	var newObject = req.body;
	
	datamodel.system_object_types.push(newObject);
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Object created!' });
};

exports.update = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var object_type = req.params.object_type;
	var id = req.params.id;
	
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);

	var newObject = req.body;
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if (datamodel.system_object_types[i].object_type == object_type && datamodel.system_object_types[i].name == id)
		{
			datamodel.system_object_types[i] = newObject;
			break;
		}
	}
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Object updated!' });
};

exports.delete = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var object_type = req.params.object_type;
	var id = req.params.id;
	
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if (datamodel.system_object_types[i].object_type == object_type && datamodel.system_object_types[i].name == id)
		{
			datamodel.system_object_types[i].splice(i, 1);
			break;
		}
	}
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Object updated!' });
};
