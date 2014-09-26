
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { caption: 'Home' });
};

function home (req, res) {
	res.render('home', { caption: 'Home' });
}

function about (req, res) {
	res.render('about', { caption: 'about' });
}

function gallery (req, res) {
	res.render('gallery', { caption: 'Gallery' });
}

function events (req, res) {
	res.render('events', { caption: 'Events' });
}

function contact (req, res) {
	res.render('contact', { caption: 'Contact' });
}

exports.pages = function (req, res) {
	console.log(res.body);
	(({
		home: home,
		about: about,
		gallery : gallery,
		events: events,
		contact: contact
	})[req.body.page] || home)(req, res);
};