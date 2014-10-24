var fs = require('fs'),
	db = require('../db').db;

exports.load = function  (file, callback) {
	async(callback, fs.createReadStream(makePath('views', file)));
}

exports.resource = function (name, callback) {
	db.resources.findOne({ _id : name }, function (err, res) {
		async(callback, { error : err, result : res });
	});
}