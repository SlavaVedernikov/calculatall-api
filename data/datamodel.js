{
	"system_object_types": [{
		"name": "attribute",
		"display_name": "Attribute",
		"description": "Attribute object type",
		"fields": [{
			"name": "name",
			"display_name": "Name",
			"description": "Attribute name",
			"data_type": "string"
			},
			{
			"name": "display_name",
			"display_name": "Display name",
			"description": "Attribute display name",
			"data_type": "string"
			},
			{
			"name": "description",
			"display_name": "Description",
			"description": "Attribute description",
			"data_type": "string"
			},
			{
			"name": "data_type",
			"display_name": "Data type",
			"description": "Attribute data type",
			"data_type": "query_lookup"
			"value_source": {
				"query_expression": "object_type = 'data_type'"
				},
			"validation_rules": [{
				"name": "value_is_in_query",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "list_query",
					"value_type": "Field value",
					"value": "value_source"
					}]
				}]
			},
			{
			"name": "validation_rules",
			"display_name": "Validation rules",
			"description": "Attribute validation rules",
			"data_type": "query_lookup"
			"value_source": {
				"query_expression": "object_type = 'validation_rule' && supported_data_types.Contains({0})",
				"parameters": [{
					"name": "data_type",
					"value_type": "Field value",
					"value": "data_type"
					}]
				},
			"validation_rules": [{
				"name": "value_is_in_query",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "list_query",
					"value_type": "Field value",
					"value": "value_source"
					}]
				}]
			}]
		},
		{
		"name": "parameter",
		"display_name": "Parameter",
		"description": "Parameter object type",
		"fields": [{
			"name": "name",
			"display_name": "Name",
			"description": "Parameter name",
			"data_type": "string"
			},
			{
			"name": "display_name",
			"display_name": "Display name",
			"description": "Paremeter display name",
			"data_type": "string"
			},
			{
			"name": "description",
			"display_name": "Description",
			"description": "Paremeter description",
			"data_type": "string"
			},
			{
			"name": "data_type",
			"display_name": "Data type",
			"description": "Paremeter data type",
			"data_type": "query_lookup"
			"value_source": {
				"query_expression": "object_type = 'data_type'"
				},
			"validation_rules": [{
				"name": "value_is_in_query",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "list_query",
					"value_type": "Field value",
					"value": "value_source"
					}]
				}]
			},
			{
			"name": "is_internal",
			"display_name": "Is internal",
			"description": "Is parameter an internal",
			"data_type": "boolean"
			},
			{
			"name": "value_type",
			"display_name": "Is internal",
			"description": "Is parameter an internal",
			"data_type": "value_lookup",
			"value_source": [{
				"name": "Field value"
				},
				{
				"name": "Value"
				},
				{
				"name": "Expression"
				}]
			},
			{
			"name": "value",
			"display_name": "Value",
			"description": "Parameter value",
			"data_type": "string"
			}]
		},
		{
		"name": "lookup_query",
		"display_name": "Validation rule",
		"description": "Validation rule object type",
		"fields": [{
			"name": "query_expression",
			"display_name": "Query expression",
			"description": "Query expression",
			"data_type": "string"
			},
			{
			"name": "parameters",
			"display_name": "Paremeters",
			"description": "Query expression parameters",
			"data_type": {
				"multiplicity": "many",
				"object_type": "parameter"
				}
			}]
		},
		{
		"name": "validation_rule",
		"display_name": "Validation rule",
		"description": "Validation rule object type",
		"fields": [{
			"name": "name",
			"display_name": "Name",
			"description": "Validation rule name",
			"data_type": "string"
			},
			{
			"name": "display_name",
			"display_name": "Display name",
			"description": "Validation rule display name",
			"data_type": "string"
			},
			{
			"name": "description",
			"display_name": "Description",
			"description": "Validation rule description",
			"data_type": "string"
			},
			{
			"name": "message",
			"display_name": "Message",
			"description": "Validation rule message",
			"data_type": "string"
			},
			{
			"name": "expression",
			"display_name": "Expression",
			"description": "Validation rule expression",
			"data_type": "string"
			},
			{
			"name": "supported_data_types",
			"display_name": "Supported data types",
			"description": "Data types supported by validation rule",
			"data_type": "query_lookup"
			"value_source": {
				"query_expression": "object_type = 'data_type'"
				},
			"validation_rules": [{
				"name": "value_is_in_query",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "list_query",
					"value_type": "Field value",
					"value": "value_source"
					},
					{
					"name": "is_multi_value",
					"value_type": "value",
					"value": "true"
					}]
				}]
			},
			{
			"name": "parameters",
			"display_name": "Paremeters",
			"description": "Validation rule parameters",
			"data_type": {
				"multiplicity": "many",
				"object_type": "parameter"
				}
			}]
		},
		{
		"name": "relationship_definition",
		"display_name": "Relationship definition",
		"description": "Relationship definition object type",
		"fields": [{
			"name": "source_object_type",
			"display_name": "Object type",
			"description": "Main object type",
			"data_type": "string"
			},
			{
			"name": "destination_object_type",
			"display_name": "Related object type",
			"description": "Related object type",
			"data_type": "string"
			},
			{
			"name": "relationship_type",
			"display_name": "Relationship type",
			"description": "Relationship type",
			"data_type": "query_lookup",
			"value_source": {
				"query_expression": "object_type = 'relationship_type'"
				},
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "list_query",
					"value_type": "Field value",
					"value": "value_source"
					}]
				}]
			},
			{
			"name": "relationship_multiplicity",
			"display_name": "Relationship multiplicity",
			"description": "Relationship multiplicity",
			"data_type": "query_lookup",
			"value_source": {
				"query_expression": "object_type = 'relationship_multiplicity'"
				},
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "list_query",
					"value_type": "Field value",
					"value": "value_source"
					}]
				}]
			}]
		},
		{
		"name": "relationship",
		"display_name": "Relationship",
		"description": "Relationship object type",
		"fields": [{
			"name": "relationship_definition",
			"display_name": "Relationship definition",
			"description": "Relationship definition",
			"data_type": "query_lookup"
			},
			{
			"name": "source_object_id",
			"display_name": "Object ID",
			"description": "Main object ID",
			"data_type": "string"
			},
			{
			"name": "destination_object_id",
			"display_name": "Related object ID",
			"description": "Related object ID",
			"data_type": "string"
			}
		},
		{
		"name": "data_type",
		"display_name": "Data type",
		"description": "Data type object type",
		"fields": [{
			"name": "name",
			"display_name": "Name",
			"description": "Name of Data type",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 250
					}]
				}]
			},
			{
			"name": "display_name",
			"display_name": "Display Name",
			"description": "Display Name of Data type",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 250
					}]
				}]
			},
			{
			"name": "description",
			"display_name": "Description",
			"description": "Description of Data type",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 2000
					}]
				}]
			},
			{
			"name": "validation_rules",
			"display_name": "Validation rules",
			"description": "Validation rules of Data type",
			"data_type": {
				"multiplicity": "many",
				"object_type": "validation_rule"
				}
			}]
		},
		{
		"name": "lookup_value",
		"display_name": "Lookup value",
		"description": "Lookup value object type",
		"fields": [{
			"name": "name",
			"display_name": "Name",
			"description": "Name of lookup value",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 250
					}]
				}]
			},
			{
			"name": "value",
			"display_name": "Value",
			"description": "Value of lookup value",
			"data_type": "integer"
			},
			{
			"name": "icon",
			"display_name": "Icon",
			"description": "Icon of lookup value",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 250
					}]
				}]
			},
			{
			"name": "color",
			"display_name": "Color",
			"description": "Color of lookup value",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 7
					}]
				}]
			}]
		},
		{
		"name": "custom_object_type",
		"display_name": "Custom object type",
		"description": "Custom object type",
		"fields": [{
			"name": "name",
			"display_name": "Name",
			"description": "Custom object type name",
			"data_type": "string"
			},
			{
			"name": "display_name",
			"display_name": "Display name",
			"description": "Custom object type display name",
			"data_type": "string"
			},
			{
			"name": "description",
			"display_name": "Description",
			"description": "Custom object type description",
			"data_type": "string"
		}],
		"instance_default_attributes": [{
			"name": "name",
			"display_name": "Name",
			"description": "Object name",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 250
				}]
			}]
		},
		{
			"name": "description",
			"display_name": "Description",
			"description": "Object description",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 1000
				}]
			}]
		}],
		"attributes": {
			"multiplicity": "many",
			"object_type": "attribute"
			}
		}],
		
	"custom_object_types": [{
		"system_object_type": "custom_object_type",
		"name": "application_component",
		"display_name": "Application Component",
		"description": "Application Component object type",
		"attributes": [{
			"name": "availability_characteristics",
			"display_name": "Availability characteristics",
			"description": "Degree to which something is available for use",
			"data_type": "string",
			"validation_rules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{Objects
					"name": "length",
					"value": 2000
				}]
			}]
		},
		{
			"name": "functional_quality",
			"display_name": "Functional quality",
			"description": "What is the functional quality of the application?",
			"data_type": "value_lookup",
			"value_source": [{
				"name": "High",
				"value": 100,
				"color": "#ffffff",
				"icon": "icon_1"
			},
			{
				"name": "Medium",
				"value": 50,
				"color": "#ffffff",
				"icon": "icon_1"
			},
			{
				"name": "Low",
				"value": 0,
				"color": "#ffffff",
				"icon": "icon_1"
			}]
		}]
	}],
	
	
	"objects": [{
		"object_type": "data_type",
		"name": "string",
		"display_name": "Text",
		"description": "Text data"
	},
	{
		"object_type": "data_type",
		"name": "integer",
		"display_name": "Whole number",
		"description": "A number without fractions (i.e. integer)"
		"validation_rules": [{
			"order": 1,
			"name": "is_numeric",
			"severity": "error"
		},
		{
			"order": 2,
			"name": "is_integer",
			"severity": "error"
		}]
	},
	{
		"object_type": "data_type",
		"name": "decimal",
		"display_name": "Mixed number",
		"description": "A number that has a fractional part separated from the integer part with a decimal separator (e.g. 11.25)",
		"validation_rules": [{
			"order": 1,
			"name": "is_numeric",
			"severity": "error"
		},
		{
			"order": 2,
			"name": "is_decimal",
			"severity": "error"
		}]
	}
	{
		"object_type": "data_type",
		"name": "value_lookup",
		"display_name": "Value lookup",
		"description": "Data value lookup",
		"value_source": {
			"multiplicity": "many",
			"object_type": "lookup_value"
		},
		"validation_rules": [{
			"name": "value_is_in_list",
			"order": 1,
			"severity": "error",
			"parameters": [{
				"name": "list",
				"value_type": "Field value",
				"value": "value_source"
			}]
		}]
	},
	{
		"object_type": "data_type",
		"name": "query_lookup",
		"display_name": "Query lookup",
		"description": "Data query lookup",
		"value_source": {
			"multiplicity": "one",
			"object_type": "lookup_query"
		}
		"validation_rules": [{
			"name": "value_is_in_query",
			"order": 1,
			"severity": "error"
			"parameters": [{
				"name": "list_query",
				"value_type": "Field value",
				"value": "value_source"
			}]
		}]
	},
	{
		"object_type": "validation_rule",
		"name": "is_not_empty",
		"display_name": "Value is required",
		"severity": "error",
		"description": "Checks whether a value was provided for a field",
		"message": "Field should not be empty",
		"expression": "IsNotEmpty($)",
		"supported_data_types": ["string",
		"integer",
		"decimal"]
	},
	{
		"object_type": "validation_rule",
		"name": "minimum_length",
		"display_name": "Minimum length",
		"description": "Validates minimum required length of the text value",
		"message": "Text length cannot be smaller than {0}. The actual length is {1}",
		"expression": "length($) >= {0}",
		"supported_data_types": ["string"],
		"parameters": [{
			"name": "length",
			"display_name": "Length greater than or equal to",
			"description": "Minimum required length of the text value",
			"data_type": "integer",
			"is_internal": false,
			"value_type": "Value"
		},
		{
			"name": "size",
			"display_name": "Size",
			"description": "Actual size of the text value",
			"data_type": "integer",
			"is_internal": true,
			"value_type": "Expression",
			"value": "length($)"
		}]
	},
	{
		"object_type": "validation_rule",
		"name": "maximum_length",
		"display_name": "Maximum length",
		"description": "Validates maximum allowed length of the text value",
		"message": "Text length cannot be greater than {0}. The actual length is {1}",
		"expression": "length($) <= {0}",
		"supported_data_types": ["string"],
		"parameters": [{
			"name": "length",
			"display_name": "Length less than or equal to",
			"description": "Maximum allowed length of the text value",
			"data_type": "integer",
			"is_internal": false,
			"value_type": "Value"
		},
		{
			"name": "size",
			"display_name": "Size",
			"description": "Actual size of the text value",
			"data_type": "integer",
			"is_internal": true,
			"value_type": "Expression",
			"value": "length($)"
		}]
	},
	{
		"object_type": "validation_rule",
		"name": "value_is_in_list",
		"display_name": "Value is in list",
		"description": "Checks that the value of the field is identical to one of the values in the list",
		"scope": "field",
		"message": "The value should be one of this {list}",
		"expression": "IsIn($, {list}, {caseSensitive})",
		"supported_data_types": ["string"],
		"parameters": [{
			"name": "list",
			"display_name": "List",
			"description": "List of possible values",
			"data_type": "stringArray",
			"is_internal": false,
			"value_type": "Value"
		},
		{
			"name": "is_multi_value",
			"display_name": "Multi-Value",
			"description": "Multiple values can be selected",
			"data_type": "boolean",
			"is_internal": false,
			"value_type": "Value"
			"is_optional": true,
			"default_value": false
		},
		{
			"name": "is_case_sensitive",
			"display_name": "Case Sensitive",
			"description": "Values are case sensitive",
			"data_type": "boolean",
			"is_internal": false,
			"value_type": "Value"
			"is_optional": true,
			"default_value": false
		}]
	},
	{
		"object_type": "validation_rule",
		"name": "value_is_in_query",
		"display_name": "Value is in query list",
		"description": "Checks that the value of the field is identical to one of the values in the list retured by a query",
		"scope": "field",
		"message": "The value should be one of this {list}",
		"expression": "IsInQuery($, {list}, {caseSensitive})",
		"supported_data_types": ["string"],
		"parameters": [{
			"name": "list_query",
			"display_name": "List query",
			"description": "List query for possible values",
			"data_type": "lookup_query",
			"is_internal": false,
			"value_type": "Value"
		},
		{
			"name": "is_multi_value",
			"display_name": "Multi-Value",
			"description": "Multiple values can be selected",
			"data_type": "boolean",
			"is_internal": false,
			"value_type": "Value"
			"is_optional": true,
			"default_value": false
		},
		{
			"name": "is_case_sensitive",
			"display_name": "Case Sensitive",
			"description": "Values are case sensitive",
			"data_type": "boolean",
			"is_internal": false,
			"value_type": "Value"
			"is_optional": true,
			"default_value": false
		}]
	}
	{
		"object_type": "relationship_definition",
		"name": "string",
		"display_name": "Text",
		"description": "Text data",
		"source_object_type": "",
		"destination_object_type": "",
		"relationship_type": "",
		"relationship_type": ""
	},
	{
		"object_type": "application_component",
		"name": "Application Component 1",
		"description": "Application Component 1 description go here...",
		"availability_characteristics": "Availability characteristics go here...",
		"functional_quality": "High"
	},
	{
		"object_type": "application_component",
		"name": "Application Component 2",
		"description": "Application Component 2 description go here...",
		"availability_characteristics": "Availability characteristics go here...",
		"functional_quality": "Medium"
	}]
}