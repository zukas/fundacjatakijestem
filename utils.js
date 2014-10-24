var util = require('util'),
	path = require('path');

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

global.makePath = function () {
	var _args = [process.cwd()],
		i;
	for(i in arguments) _args.push(arguments[i]);

	return path.join.apply(this, _args);
};

global.log = function (text) {
	util.log(util.inspect(text, { showHidden: false, depth: null, colors : true }));
};