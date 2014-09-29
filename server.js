var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	util = require('util'),
	swig = require('swig'),
	errorHandler = require('errorhandler'),
	app = express();

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

global.makePath = function () {
	var _args = [process.cwd()],
		i;
	for(i in arguments) _args.push(arguments[i]);

	return path.join.apply(this, _args);
};

global.log = function (text) {
	util.log(util.inspect(text, { showHidden: false, depth: null, colors : true }));
};

global.isDev = function () {
	return 'development' === app.get('env');
}


var routes = require('./routes');

// all environments
app.engine('html', swig.renderFile);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: '4f5faqwec8g5x3v3v4sd1' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (isDev()) {
  app.use(errorHandler());
}

app.get('/:page', routes.index);
// app.get('*', function (req, res) {
// 	log(req.path);
// 	res.redirect('/home');
// });



require("./db").start(function () {
	app.listen(app.get('port'), function(){
	  log('Express server listening on port ' + app.get('port'));
	});
});