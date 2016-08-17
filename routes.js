module.exports = function(app){
    var system_object_types = require('./controllers/system_object_types');
	app.all('*', function(req, res, next) {
		var allowedOrigins = ['http://127.0.0.1:8080', 'http://calculatall-app.herokuapp.com', 'https://calculatall-app.herokuapp.com'];
		var origin = req.headers.origin;
		if(allowedOrigins.indexOf(origin) > -1){
			res.header('Access-Control-Allow-Origin', origin);
		}
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
	   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
       next();
	});
	
	app.disable('etag');
	
    app.get('/:owner/:application/:tenant/:object_type', system_object_types.findAll);
    app.get('/:owner/:application/:tenant/:object_type/:id', system_object_types.findById);
    app.post('/:owner/:application/:tenant/:object_type', system_object_types.add);
    app.put('/:owner/:application/:tenant/:object_type/:id', system_object_types.update);
    app.delete('/:owner/:application/:tenant/:object_type/:id', system_object_types.delete);
}