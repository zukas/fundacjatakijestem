var mongo = require("mongodb"),
	grid = require('gridfs-stream'),
	events = {};

exports.db = null;
exports.gfs = null;

exports.start = function (callback) {

	exports.db = new mongo.Db('ftj', new mongo.Server("localhost", 27017), { safe : true });
	exports.db.open(function (err, db) {
		if(err) throw err;
		var create = function (index, list, done) {
			if (index < list.length) {
				db.createCollection(list[index], {}, function (err2, collection) {
					if(err2) throw err2;
					async(create, index + 1, list, done);
				});	
			} else {
				async(done);
			}	
		};
		async(create, 0, ["home", "about", "gallery", "events", "contact"], function () {
			exports.gfs = grid(db, mongo);
			async(callback);
			callback = null;
			for(var i in events['started'] || [])
			{
				async(events.started[i]);
			}
		});
	});
};

exports.on = function (event, callback) {
	if(typeof event === 'string' && typeof callback === 'function')
	{
		events[event] = events[event] || [];
		events[event].push(callback);
	} else {
		throw 'Event and/or callback missmatch - event type: ' + (typeof event) + ', value: ' + event + ', callback type: ' + (typeof callback);
	}
};
