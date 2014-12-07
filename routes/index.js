var engine = require('../engines/engine');

function getSeason() {
	var m = (new Date()).getMonth() + 1;
	var res = '';
	switch(m) 
	{
		case 1: 
		case 2: { res = "winter"; break; }
		case 3:
		case 4:
		case 5: { res = "spring"; break; }
		case 6:
		case 7:
		case 8: { res = "summer"; break; }
		case 9:
		case 10:
		case 11: { res = "autum"; break; }
		case 12: { res = "winter"; break; }
	}
	return res;
}

exports.index = function(req, res){
	var page = ({
		about : 'about.html',
		gallery : 'gallery.html',
		events : 'events.html',
		contact : 'contact.html'
	})[req.params.page] || 'home.html';

	res.render(page, { season : getSeason() });
};

exports.load = function(req, res) {
	res.render(req.body.file);
};

exports.resource = function (req, res) {
	engine.resource(req.body.resource, function (result) {
		res.send(result);
	});
};	
