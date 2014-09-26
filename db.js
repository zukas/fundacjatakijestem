var mongo = require("mongodb").MongoClient;

exports.db = null;

exports.start = function (callback) {
	mongo.connect("mongodb://localhost:27017/ftj", function (err, db) {
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
			exports.db = db;
			async(callback);
			callback = null;
		});
	});
};
