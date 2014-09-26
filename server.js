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


var express = require('express'),
	routes = require('./routes'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	errorHandler = require('errorhandler'),
	swig = require('swig'),
	home = require('./routes/home'),
	about = require('./routes/about'),
	gallery = require('./routes/gallery'),
	events = require('./routes/events'),
	contact = require('./routes/contact'),
	app = express();


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
                  secret: '4f5faqwec8g5x3v3v4sd1' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.get('*', function (req, res) {
	res.redirect('/');
});

console.log(home.load);
console.log(about.load);
console.log(gallery.load);
console.log(events.load);
console.log(contact.load);
app.post('/', routes.pages);
app.post('/home', home.load);
app.post('/about', about.load);
app.post('/gallery', gallery.load);
app.post('/events', events.load);
app.post('/contact', contact.load);

require("./db").start(function () {
	app.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});