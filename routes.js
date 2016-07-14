module.exports = function(app){
    var system_object_types = require('./controllers/system_object_types');
    app.get('/system_object_types', system_object_types.findAll);
    app.get('/system_object_types/:id', system_object_types.findById);
    app.post('/system_object_types', system_object_types.add);
    app.put('/system_object_types/:id', system_object_types.update);
    app.delete('/system_object_types/:id', system_object_types.delete);
	
	var objects = require('./controllers/objects');
    app.get('/objects', objects.findAll);
    app.get('/objects/:id', objects.findById);
    app.post('/objects', objects.add);
    app.put('/objects/:id', objects.update);
    app.delete('/objects/:id', objects.delete);
}