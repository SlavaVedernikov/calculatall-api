exports.getId = function(req, res) {
	var uuid = require('node-uuid');
	
	var data = {id: uuid.v4()};
		
	res.send(data);
};

exports.findAllObjectTypes = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
		
	var query = req.query.query;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	var application = getObjectByName(datamodel, 'application', req.params.application);
	var systemObjectType = getObjectByName(datamodel, 'system_object', 'system_object');
	var systemApplication = getObjectByName(datamodel, 'application', 'app_builder');
	
	var pathQuery = "(@.sys_object_type=='" + systemObjectType + "' && @.sys_application=='" + systemApplication.id + "' && @.sys_tenant=='" + application.owner_account + "' && @.application=='" + application.id + "')";
	
	pathQuery += " || (@.sys_object_type=='" + systemObjectType + "' && @.sys_application=='" + systemApplication.id + "' && @.sys_tenant=='" + tenant.id + "'" + ((query != undefined && query != "") ? " && (" + query + ")" : "") + ")";
	
	console.log(pathQuery);
	
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});
	
	res.send(data);
};

exports.findObjectTypeById = function(req, res){
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var id = req.params.id;
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	var application = getObjectByName(datamodel, 'application', req.params.application);
	var systemObjectType = getObjectByName(datamodel, 'system_object', 'system_object');
	var systemApplication = getObjectByName(datamodel, 'application', 'app_builder');
	
	var pathQuery = "((@.sys_object_type=='" + systemObjectType + "' && @.sys_application=='" + systemApplication.id + "' && @.sys_tenant=='" + application.owner_account + "' && @.application=='" + application.id + "')";
	
	pathQuery += " || (@.sys_object_type=='" + systemObjectType + "' && @.sys_application=='" + systemApplication.id + "' && @.sys_tenant=='" + tenant.id + "'))";
	
		
	pathQuery += " && @.id=='" + id + "'";
		
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
		
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});
	
	var body = data[0];
  	
	res.send(body);
};

exports.findAll = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var object_type = req.params.object_type;	
	var query = req.query.query;
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	
	var data;
	
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var pathQuery = "(@.sys_object_type=='" + object_type + "')";

	pathQuery += " && (@.sys_application=='" + application.id + "' && @.sys_tenant=='" + tenant.id + "')";
	
	if(query != undefined && query != '')
	{
		pathQuery += " && (" + query + ")";
	}
	
	console.log(pathQuery);
	
	data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});

	
	res.send(data);
};

exports.findById = function(req, res){
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var object_type = req.params.object_type;
	var id = req.params.id;
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var pathQuery = "(@.sys_object_type=='" + object_type + "')";

	pathQuery += " && (@.sys_application=='" + application.id + "' && @.sys_tenant=='" + tenant.id + "')";
		
	pathQuery += " && (@.id=='" + id + "')";
		
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
		
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});
	
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
	
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var newObject = req.body;
	//assign a new unique ID
	newObject.sys_id = uuid.v4();
	newObject.sys_tenant = tenant.id;
	newObject.sys_application = application.id
	//TODO: validate object type i.e. newObject.object_type == req.params.object_type
	
	if(object_type == 'system_object')
	{
		newObject.fields.push({
			name: 'sys_object_type',
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
			name: 'sys_id',
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
		
		newObject.fields.push({
			name: 'sys_application',
			display_name: 'Application that owns the Object',
			description: 'Application that owns the Object',
			data_type: {
				object_type: 'application',
				multiplicity: 'one',
				association_type: 'link'
			},
			required: true,
			hidded: true,
			read_only: true,
			default: application.id
		});
		
		newObject.fields.push({
			name: 'sys_tenant',
			display_name: 'Tenant that owns the Object',
			description: 'Tenant that owns the Object',
			data_type: {
				object_type: 'account',
				multiplicity: 'one',
				association_type: 'link'
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
	var tenant = req.params.tenant;
	var application = req.params.owner + '/' +req.params.application;
	var namespace = ''
	if(tenant != '*')
	{
		namespace = application + '/' + tenant;
	}
	else
	{
		namespace = application
	}
	
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
	var tenant = req.params.tenant;
	var application = req.params.owner + '/' +req.params.application;
	var namespace = ''
	if(tenant != '*')
	{
		namespace = application + '/' + tenant;
	}
	else
	{
		namespace = application
	}
	
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

function getObjectByName(datamodel, objectType, name)
{
	var queryResultSet = JSONPath({json: datamodel, path: "$.system_object_types[?(@.object_type=='" + objectType + "' && @.name=='" + name + "')]"});
	
	var result;
	
	if(queryResultSet.length == 1)
	{
		result = queryResultSet[0];
	}
	
	return result;
}
