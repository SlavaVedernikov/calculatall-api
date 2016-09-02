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
	
	console.log(pathQuery);
	
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
	
	var object_type = data[0];
  	
	var view = req.query.view;
	var view_fields = getViewFields(view);
	
	console.log('view: ' + view);
	console.log(view_fields);
	
	if(view_fields && view_fields.length > 0)
	{
		var view_object_type = getViewObjectType(datamodel, object_type, view_fields);
		
		res.send(view_object_type);
	}
	else
	{
		res.send(object_type);
	}
	
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
	
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var pathQuery = "@._object_type=='" + object_type._id + "'  && (@._scope=='global' || (@._application=='" + application._id + "' && (@._scope=='application' || (@._scope=='tenant' && @._tenant=='" + tenant._id + "'))))";
	
	if(query != undefined && query != '')
	{
		pathQuery += " && (" + query + ")";
	}
	
	console.log(pathQuery);
	
	data = JSONPath({json: datamodel, path: "$.system_object_types[?(" + pathQuery + ")]"});

	//console.log(view);
	var view_fields = getViewFields(view);
	
	//console.log('view: ' + view);
	//console.log(view_fields);

	if(view_fields && view_fields.length > 0)
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
	var tenant = getObjectByName(datamodel, 'account', req.params.tenant);
	
	var application = getObjectByName(datamodel, 'application', req.params.application);
	
	var pathQuery = "@._object_type=='" + object_type._id + "'  && (@._scope=='global'|| (@._application=='" + application._id + "' && (@._scope=='application' || (@._scope=='tenant' && @._tenant=='" + tenant._id + "'))))";
		
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
	newObject._object_type = object_type._id;
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
			source : [{
							display_name : 'Global',
							value : 'global',
							icon : '',
							color : ''
						},
						{
							display_name : 'Application',
							value : 'application',
							icon : '',
							color : ''
						},
						{
							display_name : 'Tenant',
							value : 'tenant',
							icon : '',
							color : ''
						}],
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
			//datamodel.system_object_types[i]._application == application._id &&
			datamodel.system_object_types[i]._tenant == tenant._id &&
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

function getViewFields(view)
{
	
	var result;
	if(view != undefined)
	{
		result = [];
		var fields = view.split(",");
		
		if(fields && fields.length > 0)
		{
			for(var i = 0; i < fields.length; i++)
			{
				var fieldAttributes = fields[i].split("|");
				if(fieldAttributes && fieldAttributes.length == 2)
				{
					result.push({
						source_path: fieldAttributes[0].split("."),
						alias: fieldAttributes[1]
					})
				}
			}
		}
	}
	
	return result;
}

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

function getByKey(data, key){		
	for (var i = 0; i < data.length; i++) {
		if(data[i].key == key) return data[i];
	}
}

function getByValue(data, value){		
	for (var i = 0; i < data.length; i++) {
		if(data[i].value == value) return data[i];
	}
}

function getViewObjectType(datamodel, object_type, view_fields)
{
	var result = {fields : []};
	
	for(var i = 0; i < view_fields.length; i++)
	{
		var value_type = object_type;
		var field = null;

		//console.log(view_fields[i].source_path);
		for(var j = 0; j < view_fields[i].source_path.length; j++)
		{
			field = getByName(value_type.fields, view_fields[i].source_path[j]);
			
			//console.log(field.name);
			if(field)
			{		
				field.name = view_fields[i].alias;
				value_type = getObjectById(datamodel, field.data_type.object_type);	
			}
		}
		
		result.fields.push(field);
	}
	
	return result;
}

function getViewObject(datamodel, object, object_type, view_fields)
{
	var result = {};
	
	result['_id'] = object._id;
	
	for(var i = 0; i < view_fields.length; i++)
	{
		var value = object;
		var value_type = object_type;
		
		//console.log(view_fields[i].source_path);
		for(var j = 0; j < view_fields[i].source_path.length; j++)
		{
			var field = getByName(value_type.fields, view_fields[i].source_path[j]);
			//console.log(field.name);
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
				else if(field.data_type.association_type == 'lookup')
				{
					value = getByKey(field.source, value[view_fields[i].source_path[j]]).value;	
				}
				
				value_type = getObjectById(datamodel, field.data_type.object_type);	
			}
		}
		
		result[view_fields[i].alias] = value;
	}
	
	return result;
}

exports.patchLookups = function(req, res) {
	var fs = require("fs");
	var JSONPath = require('JSONPath');
	
	var fileName = './data/system_object_types.json';
	var datamodel = JSON.parse(
	  fs.readFileSync(fileName)
	);
	
	var system_object = getObjectByName(datamodel, 'system_object', 'system_object');
	var object_type_string = getObjectByName(datamodel, 'system_object', 'string');
	var object_type_integer = getObjectByName(datamodel, 'system_object', 'integer');
	
	for(var i = 0; i < datamodel.system_object_types.length; i++)
	{
		if(datamodel.system_object_types[i]._object_type == system_object._id &&
			datamodel.system_object_types[i].fields != undefined &&
			datamodel.system_object_types[i].fields.length > 0)
		{
			for(var j = 0; j < datamodel.system_object_types[i].fields.length; j++)
			{
				var data_type = getObjectById(datamodel, datamodel.system_object_types[i].fields[j].data_type.object_type);
				
				if(data_type != undefined)
				{
					if(datamodel.system_object_types[i].fields[j].source != undefined && datamodel.system_object_types[i].fields[j].source.length > 0)
					{
						//console.log('Field (' + datamodel.system_object_types[i].fields[j].name + ') association type (' + datamodel.system_object_types[i].fields[j].data_type.association_type + ') is reset to (lookup)');
						datamodel.system_object_types[i].fields[j].data_type.association_type = 'lookup';
						
						for(var k = 0; k < datamodel.system_object_types[i].fields[j].source.length; k++)
						{
							if(data_type._id == object_type_integer._id)
							{
								//console.log(datamodel.system_object_types[i].fields[j].source[k].display_name + ' (key = ' + datamodel.system_object_types[i].fields[j].source[k].display_name.toLowerCase().replace(/ /g,"_") + ')');
								datamodel.system_object_types[i].fields[j].source[k]['key'] = datamodel.system_object_types[i].fields[j].source[k].display_name.toLowerCase().replace(/ /g,"_");
							}
							else if(data_type._id == object_type_string._id)
							{
								//console.log(datamodel.system_object_types[i].fields[j].source[k].display_name + ' (key = ' + datamodel.system_object_types[i].fields[j].source[k].value + ')');
								datamodel.system_object_types[i].fields[j].source[k]['key'] = datamodel.system_object_types[i].fields[j].source[k].value;
							}
							
						}
						
						if(data_type._id == object_type_integer._id)
						{
							for(var l = 0; l < datamodel.system_object_types.length; l++)
							{
								if(datamodel.system_object_types[l]._object_type == datamodel.system_object_types[i]._id)
								{			
									var source = getByValue(datamodel.system_object_types[i].fields[j].source, datamodel.system_object_types[l][datamodel.system_object_types[i].fields[j].name])
									//console.log('Object of type (' + datamodel.system_object_types[i].name + '), ' + datamodel.system_object_types[i].fields[j].name + ' = ' + source.key);
									datamodel.system_object_types[l][datamodel.system_object_types[i].fields[j].name] = source.key;
								}
							}
						}
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
  	
	res.send({ message: 'Lookups patched!' });
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