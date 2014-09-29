var fs = require('fs');

exports.load = function  (file, callback) {
	async(callback, fs.createReadStream(makePath('views', file)));
}