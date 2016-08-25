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
	
	var application = getObjectByName(datamodel, 'application', req.params.application);
	var systemObjectType = getObjectByName(datamodel, 'system_object', 'system_object');
	var systemApplication = getObjectByName(datamodel, 'application', 'app_builder');
	
	var pathQuery = "((@._object_type=='" + systemObjectType._id + "' && @._application=='" + systemApplication._id + "' && @._tenant=='" + systemApplication._tenant + "')";
	
	pathQuery += " || (@._object_type=='" + systemObjectType._id + "' && @._application=='" + application._id + "' && @._tenant=='" + application._tenant + "'))";
	
	if(query != undefined && query != "")
	{
		pathQuery += " && (" + query + ")";
	}
	
	//console.log(pathQuery);
	
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});
	
	res.send(data);
};

exports.findObjectTypeById = function(req, res){
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	
	var id = req.params.id;
	
	var application = getObjectByName(datamodel, 'application', req.params.application);
	var systemObjectType = getObjectByName(datamodel, 'system_object', 'system_object');
	var systemApplication = getObjectByName(datamodel, 'application', 'app_builder');
	
	var pathQuery = "((@._object_type=='" + systemObjectType._id + "' && @._application=='" + systemApplication._id + "' && @._tenant=='" + systemApplication._tenant + "')";
	
	pathQuery += " || (@._object_type=='" + systemObjectType._id + "' && @._application=='" + application._id + "' && @._tenant=='" + application._tenant + "'))";
		
	pathQuery += " && @._id=='" + id + "'";
		
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});
	
	var body = data[0];
  	
	res.send(body);
};

exports.findAll = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	
	var object_type = getObjectByName(datamodel, 'system_object', req.params.object_type);
	var query = req.query.query;
	var view = req.query.view;
	
	
	var data;
	
	var tenant;
	
	if(req.params.tenant != '*')
	{
		tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	}
	
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var pathQuery = "(@._object_type=='" + object_type._id + "')";
	
	if(tenant == undefined)
	{
		pathQuery += " && (@._application=='" + application._id + "' || @._scope=='global')";
	}
	else
	{
		pathQuery += " && (@._application=='" + application._id + "' && ((@._scope=='tenant' && @._tenant=='" + tenant._id + "') || (@._scope=='application' && @._application=='" + application._id + "')))";
	}
	
	
	if(query != undefined && query != '')
	{
		pathQuery += " && (" + query + ")";
	}
	
	console.log(pathQuery);
	
	data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});

	console.log(view);
	var view_fields = [];
	if(view != undefined)
	{
		var fields = view.split(",");
		
		if(fields && fields.length > 0)
		{
			for(var i = 0; i < fields.length; i++)
			{
				var fieldAttributes = fields[i].split("|");
				if(fieldAttributes && fieldAttributes.length == 2)
				{
					view_fields.push({
						source_path: fieldAttributes[0].split("."),
						alias: fieldAttributes[1]
					})
				}
			}
		}
	}
	console.log('view: ' + view);
	//console.log(view_fields);

	if(view_fields.length > 0)
	{
		var view_data = [];
		
		for(var i = 0; i < data.length; i++)
		{
			var view_data_item = getViewObject(datamodel, data[i], object_type, view_fields);
			view_data.push(view_data_item);
		}
		
		res.send(view_data);
	}
	else
	{
		res.send(data);
	}
};

exports.findById = function(req, res){
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var datamodel = JSON.parse(
	  fs.readFileSync('./data/system_object_types.json')
	);
	
	var object_type = getObjectByName(datamodel, 'system_object', req.params.object_type);
	var id = req.params.id;
	var tenant;
	
	if(req.params.tenant != '*')
	{
		tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	}
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var pathQuery = "(@._object_type=='" + object_type._id + "')";

	if(tenant == undefined)
	{
		pathQuery += " && (@._application=='" + application._id + "' || @._scope=='global')";
	}
	else
	{
		pathQuery += " && (@._application=='" + application._id + "' && ((@._scope=='tenant' && @._tenant=='" + tenant._id + "') || (@._scope=='application' && @._application=='" + application._id + "')))";
	}
		
	pathQuery += " && (@._id=='" + id + "')";
		
	var data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});
	
	var body = data[0];
  	
	res.send(body);
};

exports.add = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	var uuid = require('node-uuid');
	
	var fileName = './data/system_object_types.json';
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	var object_type = getObjectByName(datamodel, 'system_object', req.params.object_type);
	var object_type_string = getObjectByName(datamodel, 'system_object', 'string');
	var object_type_application = getObjectByName(datamodel, 'system_object', 'application');
	var object_type_account = getObjectByName(datamodel, 'system_object', 'account');
	
	
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var newObject = req.body;
	//assign a new unique ID
	newObject._id = uuid.v4();
	//TODO: validate that tenant != undefined
	if(tenant)
	{
		newObject._tenant = tenant._id;
		newObject._scope = 'tenant';
	}
	else
	{
		newObject._tenant = application._tenant;
		newObject._scope = 'application';
	}
	
	newObject._application = application._id
	//TODO: validate object type i.e. newObject._object_type == object_type._id
	
	if(object_type.name == 'system_object' && newObject.fields)
	{
		newObject.fields.push({
			name: '_object_type',
			display_name: 'Object type',
			description: 'Object type',
			data_type: {
				object_type: object_type._id,
				multiplicity: 'one',
				association_type: 'link'
			},
			required: true,
			hidded: true,
			read_only: true,
			default: newObject._id
		});
		
		newObject.fields.push({
			name: '_id',
			display_name: 'Object ID',
			description: 'Object ID',
			data_type: {
				object_type: object_type_string._id,
				multiplicity: 'one',
				association_type: 'embed'
			},
			required: true,
			hidded: true,
			read_only: true
		});
		
		newObject.fields.push({
			name: '_application',
			display_name: 'Application',
			description: 'Application that owns the Object',
			data_type: {
				object_type: object_type_application._id,
				multiplicity: 'one',
				association_type: 'link'
			},
			required: true,
			hidded: true,
			read_only: true,
			default: application._id
		});
		
		newObject.fields.push({
			name: '_tenant',
			display_name: 'Tenant',
			description: 'Tenant that owns the Object',
			data_type: {
				object_type: object_type_account._id,
				multiplicity: 'one',
				association_type: 'link'
			},
			required: true,
			hidded: true,
			read_only: true
		});
		
		newObject.fields.push({
			name: '_scope',
			display_name: 'Scope',
			description: 'Scope of the Object',
			data_type : {
				object_type : object_type_string._id,
				multiplicity : 'one',
				association_type : 'embed'
			},
			source : ['global', 'owner', 'application', 'tenant'],
			default : 'tenant',
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
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	var object_type = getObjectByName(datamodel, 'system_object', req.params.object_type);
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	//TODO: validate that tenant != undefined as all update request must set tenant
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var id = req.params.id;

	var newObject = req.body;
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if (datamodel.system_object_types[i]._object_type == object_type._id &&
			datamodel.system_object_types[i]._application == application._id &&
			datamodel.system_object_types[i]._tenant == (tenant ? tenant._id : application._tenant) &&
			datamodel.system_object_types[i]._id == id)
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
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	var object_type = getObjectByName(datamodel, 'system_object', req.params.object_type);
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var id = req.params.id;
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if (datamodel.system_object_types[i]._object_type == object_type._id &&
			datamodel.system_object_types[i]._application == application._id &&
			datamodel.system_object_types[i]._tenant == tenant._id &&
			datamodel.system_object_types[i]._id == id)
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
	//console.log('getObjectByName -> objectType: ' + objectType + ', name: ' + name);
	var JSONPath = require('JSONPath');
	
	var pathQuery = "(@.name=='system_object')";
	
	var system_object_type;
	var systemObjectTypeQueryResultSet = JSONPath({json: datamodel, path: "$.system_object_types[?" + pathQuery + "]"});
	
	if(systemObjectTypeQueryResultSet.length == 1)
	{
		system_object_type = systemObjectTypeQueryResultSet[0];
	}
	
	pathQuery = "(@._object_type=='" + system_object_type._id + "' && @.name=='" + objectType + "')";
	//console.log(pathQuery);
	
	var object_type;
	var objectTypeQueryResultSet = JSONPath({json: datamodel, path: "$.system_object_types[?" + pathQuery + "]"});
	
	if(objectTypeQueryResultSet.length == 1)
	{
		object_type = objectTypeQueryResultSet[0];
	}
	
	
	pathQuery = "(@._object_type=='" + object_type._id + "' && @.name=='" + name + "')";
	//console.log('getObjectByName -> pathQuery: ' + pathQuery);
	
	var result;
	var queryResultSet = JSONPath({json: datamodel, path: "$.system_object_types[?" + pathQuery + "]"});
	
	if(queryResultSet.length == 1)
	{
		result = queryResultSet[0];
	}
	
	return result;
}

function getObjectById(datamodel, id)
{
	var result;
	//console.log('getObjectByName -> objectType: ' + objectType + ', name: ' + name);
	var JSONPath = require('JSONPath');
	
	var pathQuery = "(@._id=='" + id + "')";
	
	var queryResultSet = JSONPath({json: datamodel, path: "$.system_object_types[?" + pathQuery + "]"});
	
	if(queryResultSet.length == 1)
	{
		result = queryResultSet[0];
	}
	
	return result;
}

function getByName(data, name){		
	for (var i = 0; i < data.length; i++) {
		if(data[i].name == name) return data[i];
	}
}

function getViewObject(datamodel, object, object_type, view_fields)
{
	var result = {};
	
	result['_id'] = object._id;
	
	for(var i = 0; i < view_fields.length; i++)
	{
		var value = object;
		var value_type = object_type;
		
		console.log(view_fields[i].source_path);
		for(var j = 0; j < view_fields[i].source_path.length; j++)
		{
			var field = getByName(value_type.fields, view_fields[i].source_path[j]);
			console.log(field.name);
			if(field)
			{
				if(field.data_type.association_type == 'embed')
				{
					value = value[view_fields[i].source_path[j]];
				}
				else if(field.data_type.association_type == 'link')
				{
					value = getObjectById(datamodel, value[view_fields[i].source_path[j]]);	
				}
				
				value_type = getObjectById(datamodel, field.data_type.object_type);	
			}
		}
		
		result[view_fields[i].alias] = value;
	}
	
	return result;
}
/*
exports.patchApplicationId = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	

	var applicationProjects = getObjectByName(datamodel, 'application', 'projects');
	var systemApplication = getObjectByName(datamodel, 'application', 'app_builder');
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if (datamodel.system_object_types[i]._object_type == 'project' || datamodel.system_object_types[i]._object_type == 'task')
		{
			datamodel.system_object_types[i]._application = applicationProjects._id;
		}
		else
		{
			datamodel.system_object_types[i]._application = systemApplication._id;
		}
	}
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Application Id patched!' });
};

exports.patchTenantId = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	

	var tenant = getObjectByName(datamodel, 'account', 'system');
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		datamodel.system_object_types[i]._tenant = tenant._id;
	}
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Tenant Id patched!' });
};

exports.patchDataType = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if(datamodel.system_object_types[i]._object_type == 'system_object' &&
			datamodel.system_object_types[i].fields != undefined &&
			datamodel.system_object_types[i].fields.length > 0)
		{
			for(var j = 0; j < datamodel.system_object_types[i].fields.length; j++)
			{
				var data_type = getObjectByName(datamodel, 'system_object', datamodel.system_object_types[i].fields[j].data_type.object_type);
				if(data_type != undefined)
				{
					datamodel.system_object_types[i].fields[j].data_type.object_type = data_type._id;
					if(datamodel.system_object_types[i].fields[j].data_type.association_type == undefined)
					{
						datamodel.system_object_types[i].fields[j].data_type.association_type = 'embed';
					}
				} 
			}
		}
	}
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Data types patched!' });
};

exports.patchObjectType = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var datamodelBefore = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	var datamodelAfter = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	for(var i = 0; i < datamodelAfter.system_object_types.length; i++)
	{
		var data_type = getObjectByName(datamodelBefore, 'system_object', datamodelAfter.system_object_types[i]._object_type);
				
		if(data_type != undefined)
		{
			datamodelAfter.system_object_types[i]._object_type = data_type._id;
		} 
	}
	
	var datamodelJSON = JSON.stringify(datamodelAfter);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Object types patched!' });
};

exports.patchObjectTypeScope = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	var systen_object = getObjectByName(datamodel, 'system_object', 'system_object');
	var object_type_string = getObjectByName(datamodel, 'system_object', 'string');
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if(datamodel.system_object_types[i]._object_type == systen_object._id && datamodel.system_object_types[i].fields)
		{
			datamodel.system_object_types[i].fields.push({
				name: '_scope',
				display_name: 'Scope',
				description: 'Scope of the Object',
				data_type : {
					object_type : object_type_string._id,
					multiplicity : 'one',
					association_type : 'embed'
				},
				source : ['owner', 'application', 'tenant'],
				default : 'tenant',
				required: true,
				hidded: true,
				read_only: true
			});
		}
	}
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Object type scope patched!' });
};

exports.patchScope = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		datamodel.system_object_types[i]._scope = 'tenant';
	}
	
	var datamodelJSON = JSON.stringify(datamodel);
	
	fs.writeFile(fileName, datamodelJSON, function (err) {
		if (err) 
		{
			return console.log(err);
		}
	});
  	
	res.send({ message: 'Scope patched!' });
};

*/