var fs 		= require("fs"),
	path 	= require('path');

var args 	= process.argv.slice(2),
	dir 	= args[0],
	eve 	= path.basename(dir);

fs.readdir(dir, function (readdir_err, files) {
	if(readdir_err) {
		console.log(readdir_err);
		return;
	}

	var regex 		= /[\w\d]+_s\.jpg/i,
		idx 		= 1,
		category 	= { images : [] };
	for(var i in  files) {
		if(regex.test(files[i])) {
			category.images.push({
				id: "img" + (idx++),
				src : "/images/events/" + eve + "/" + files[i]
			});
		}
	}

	fs.readFile(__dirname + "/db.json", function (err, db_config_str) {
		if(err) {
			console.log(err);
		} else {
			var db_config = JSON.parse(db_config_str);
			db_config.resources["category" + (Object.keys(db_config.resources).length + 1)] = category;

			var data = JSON.stringify(db_config, null, 4);

			fs.writeFile(__dirname + "/db_backup.json", db_config_str, function (err2) {
				if(err2) {
					console.log(err2);
				} else {
					fs.writeFile(__dirname + "/db.json", data, function (err3) {
						if(err3) {
							console.log(err3);
						} else {
							console.log("Complete");
						}
					});
				}
			});
		}
	});
});
