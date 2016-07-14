var express = require('express');
var app = express();

require('./routes')(app);

/*
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  next();
});
*/
app.listen(process.env.PORT || 8181);

