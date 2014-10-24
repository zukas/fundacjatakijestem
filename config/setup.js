var fs = require('fs'),
	db = require('../db');

require("../utils")

db.start(function () {
	
	if(!process.argv[2]) throw "Need to provide a configuration file";
	var config = JSON.parse(fs.readFileSync(process.argv[2]));
	Object.keys(config).forEach(function (key) {
		var entries = config[key];
		if(entries) 
		{
			Object.keys(entries).forEach(function (_id) {
				db.db[key].update({ _id :  _id }, { $set : entries[_id] } , { upsert : true }, function (err) { if(err) console.log("Failed to create " + _id + " in " + key + " collection width the following error: " + JSON.stringify(err)); });
			});
		}
	});

	process.exit(0);

});