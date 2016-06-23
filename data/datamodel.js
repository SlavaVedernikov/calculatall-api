{
	"data_types": [{
		"name": "string",
		"displayName": "Text",
		"description": "Text data",
		"validationRules": []
	},
	{
		"name": "stringArray",
		"displayName": "Array(Text)",
		"description": "Array of text values",
		"validationRules": [{
			"name": "value_is_in_list",
			"order": 1,
			"severity": "error",
			"parameters": [{
				"name": "list",
				"value": []
			}]
		}]
	},
	{
		"name": "integer",
		"displayName": "Whole number",
		"description": "A number without fractions (i.e. integer)",
		"validationRules": [{
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
		"name": "decimal",
		"displayName": "Mixed number",
		"description": "A number that has a fractional part separated from the integer part with a decimal separator (e.g. 11.25)",
		"validationRules": [{
			"order": 1,
			"name": "is_numeric",
			"severity": "error"
		},
		{
			"order": 2,
			"name": "is_decimal",
			"severity": "error"
		}]
	}],
	"validation_rules": [{
		"name": "is_not_empty",
		"displayName": "Value is required",
		"severity": "error",
		"description": "Checks whether a value was provided for a field",
		"scope": "field",
		"message": "Field should not be empty",
		"expression": "IsNotEmpty($)",
		"supportedDataTypes": ["string",
		"integer",
		"decimal"]
	},
	{
		"name": "minimum_length",
		"displayName": "Minimum length",
		"description": "Validates minimum required length of the text value",
		"scope": "field",
		"message": "Text length cannot be smaller than {0}. The actual length is {1}",
		"expression": "length($) >= {0}",
		"supportedDataTypes": ["string"],
		"parameters": [{
			"name": "length",
			"displayName": "Length greater than or equal to",
			"description": "Minimum required length of the text value",
			"type": "integer",
			"isExpression": false,
			"isInternal": false
		},
		{
			"name": "size",
			"displayName": "Size",
			"description": "Actual size of the text value",
			"type": "integer",
			"isExpression": true,
			"isInternal": true,
			"value": "length($)"
		}]
	},
	{
		"name": "maximum_length",
		"displayName": "Maximum length",
		"description": "Validates maximum allowed length of the text value",
		"scope": "field",
		"message": "Text length cannot be greater than {0}. The actual length is {1}",
		"expression": "length($) <= {0}",
		"supportedDataTypes": ["string"],
		"parameters": [{
			"name": "length",
			"displayName": "Length less than or equal to",
			"description": "Maximum allowed length of the text value",
			"type": "integer",
			"isExpression": false,
			"isInternal": false
		},
		{
			"name": "size",
			"displayName": "Size",
			"description": "Actual size of the text value",
			"type": "integer",
			"isExpression": true,
			"isInternal": true,
			"value": "length($)"
		}]
	},
	{
		"name": "value_is_in_list",
		"displayName": "Value is in list",
		"description": "Checks that the value of the field is identical to one of the values in the list",
		"scope": "field",
		"message": "The value should be one of this {list}",
		"expression": "IsIn($, {list}, {caseSensitive})",
		"supportedDataTypes": ["string"],
		"parameters": [{
			"name": "list",
			"displayName": "List",
			"description": "List of possible values",
			"type": "stringArray",
			"isExpression": false,
			"isInternal": false
		},
		{
			"name": "is_multi_value",
			"displayName": "Multi-Value",
			"description": "Multiple values can be selected",
			"type": "boolean",
			"isExpression": false,
			"isInternal": false,
			"isOptional": true,
			"defaultValue": false
		},
		{
			"name": "is_case_sensitive",
			"displayName": "Case Sensitive",
			"description": "Values are case sensitive",
			"type": "boolean",
			"isExpression": false,
			"isInternal": false,
			"isOptional": true,
			"defaultValue": false
		}]
	}],
	"object_types": [{
		"name": "application_component",
		"displayName": "Application Component",
		"description": "Application Component object type",
		"fields": [{
			"name": "name",
			"displayName": "Name",
			"description": "Name of Application Component",
			"dataType": "string",
			"validationRules": [{
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
			"displayName": "Description",
			"description": "Description of Application Component",
			"dataType": "string",
			"validationRules": [{
				"name": "maximum_length",
				"order": 1,
				"severity": "error",
				"condition": "true",
				"parameters": [{
					"name": "length",
					"value": 1000
				}]
			}]
		},
		{
			"name": "availability_characteristics",
			"displayName": "Availability characteristics",
			"description": "Degree to which something is available for use",
			"dataType": "string",
			"validationRules": [{
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
			"name": "functional_quality",
			"displayName": "Functional quality",
			"description": "What is the functional quality of the application?",
			"dataType": "stringArray",
			"possibleValues": [{
				"key": "High",
				"value": 100,
				"color": "#ffffff",
				"icon": "icon_1"
			},
			{
				"key": "Medium",
				"value": 50,
				"color": "#ffffff",
				"icon": "icon_1"
			},
			{
				"key": "Low",
				"value": 0,
				"color": "#ffffff",
				"icon": "icon_1"
			}]
		}]
	}],
	"objects": [{
		"objectType": "application_component",
		"name": "Application Component 1",
		"description": "Application Component 1 description go here...",
		"availability_characteristics": "Availability characteristics go here...",
		"functional_quality": "High"
	},
	{
		"objectType": "application_component",
		"name": "Application Component 2",
		"description": "Application Component 2 description go here...",
		"availability_characteristics": "Availability characteristics go here...",
		"functional_quality": "Medium"
	}]
}