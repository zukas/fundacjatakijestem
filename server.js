// process.env.NODE_ENV = "production";
// process.env.EXPRESS_ENV = "production";

var express = require('express'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	path = require('path'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	swig = require('swig'),
	MemoryStore = session.MemoryStore,
	errorHandler = require('errorhandler'),
	app = express();

require("./utils")

global.isDev = function () {
	return 'development' === app.get('env');
}
// all environments
app.engine('html', swig.renderFile);
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view cache', false);
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(methodOverride());
app.use(session({ 
				store: new MemoryStore({ reapInterval: 60000 * 10 }),
				resave: true,
                saveUninitialized: true,
                secret: '4f5faqwec8g5x3v3v4sd1' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// swig.setDefaults({ cache: 'memory' });
swig.setDefaults({ cache: false });
// development only
if (isDev()) {
  app.use(errorHandler());
}


require("./db").start(function () {
	app.listen(app.get('port'), function(){
		var routes = require('./routes');
		app.get('/:page', routes.index);
		app.post('/resource', routes.resource);
		app.get('*', function (req, res) {
			res.redirect('/home');
		});
	  	log('Express server listening on port ' + app.get('port'));
	});
});