var engine = require('../engines/engine');

exports.index = function(req, res){

	log(req.params);

	var page = ({
		about : 'about.html',
		gallery : 'gallery.html',
		events : 'events.html',
		contact : 'contact.html'
	})[req.params.page] || 'home.html';

	res.render(page);
};

exports.load = function(req, res) {
	res.render(req.body.file);
};
