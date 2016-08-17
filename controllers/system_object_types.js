exports.findAll = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	var uuid = require('node-uuid');
	
	var object_type = req.params.object_type;
	var namespace = req.params.owner + '/' + req.params.application + '/' + req.params.tenant;
	var query = req.query.query;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	var data;
	
	if(object_type == 'uuid')
	{
		var id = uuid.v4();
		data = {id: id};
	}
	else
	{
		if(query != undefined && query != '')
		{
			data = JSONPath({json: datamodel, path: "$.system_object_types[?(@.object_type=='" + object_type + "' && @.namespace=='" + namespace + "' && (" + query + "))]"});
		}
		else
		{
			data = JSONPath({json: datamodel, path: "$.system_object_types[?(@.object_type=='" + object_type + "' && @.namespace=='" + namespace + "')]"});
		}
	}
	
	res.send(data);
};

exports.findById = function(req, res){
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var object_type = req.params.object_type;
	var namespace = req.params.owner + '/' + req.params.application + '/' + req.params.tenant;
	var id = req.params.id;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(@.object_type=='" + object_type + "' && @.namespace=='" + namespace + "' && (@.id=='" + id + "'))]"});
	
	var body = data[0];
  	
	res.send(body);
};

exports.add = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	var uuid = require('node-uuid');
	
	var fileName = './data/system_object_types.json';
	var object_type = req.params.object_type;
	
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);

	var newObject = req.body;
	//assign a new unique ID
	newObject.id = uuid.v4();
	
	//assign a namespace
	var namespace = req.params.owner + '/' + req.params.application + '/' + req.params.tenant;
	newObject.namespace = namespace
	
	//TODO: validate object type i.e. newObject.object_type == object_type
	
	if(object_type == 'system_object')
	{
		newObject.fields.push({
			name: 'object_type',
			display_name: 'Object type',
			description: 'Object type',
			data_type: {
				object_type: 'string',
				multiplicity: 'one',
				association_type: 'embed'
			},
			required: true,
			hidded: true,
			read_only: true,
			default: newObject.name
		});
		
		newObject.fields.push({
			name: 'namespace',
			display_name: 'Object namespace',
			description: 'Object namespace',
			data_type: {
				object_type: 'string',
				multiplicity: 'one',
				association_type: 'embed'
			},
			required: true,
			hidded: true,
			read_only: true,
			default: namespace
		});

		newObject.fields.push({
			name: 'id',
			display_name: 'Object ID',
			description: 'Object ID',
			data_type: {
				object_type: 'string',
				multiplicity: 'one',
				association_type: 'embed'
			},
			required: true,
			hidded: true,
			read_only: true
		});
	}
	
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
	var namespace = req.params.owner + '/' + req.params.application + '/' + req.params.tenant;
	var id = req.params.id;
	
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);

	var newObject = req.body;
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if (datamodel.system_object_types[i].object_type == object_type && datamodel.system_object_types[i].namespace == namespace && datamodel.system_object_types[i].id == id)
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
	var namespace = req.params.owner + '/' + req.params.application + '/' + req.params.tenant;
	var id = req.params.id;
	
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if (datamodel.system_object_types[i].object_type == object_type && datamodel.system_object_types[i].namespace == namespace && datamodel.system_object_types[i].id == id)
		{
			datamodel.system_object_types.splice(i, 1);
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
