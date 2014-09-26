var express = require('express');
var routes = require('./routes');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var swig = require('swig');

var app = express();

global.async = function () {
	if(arguments.length === 0 && typeof arguments[0] !== "function") throw "Bad argument to async";
	var _args = [],
		i;
	for(i in arguments) _args.push(arguments[i]);
	process.nextTick(function () {
		var func = _args.splice(0, 1)[0];
		func.apply(this, _args);
	});
};


app.engine('html', swig.renderFile);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.pages);

require("./db").start(function () {
	app.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});