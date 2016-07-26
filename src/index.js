'use strict';
var util 		= require('util');
var gutil 		= require('gulp-util');
var through		= require('through2');
var path		= require('path');
var colors		= require('colors');
var spcheckout 	= require('spcheckout');

module.exports = gulpspcheckout;


var PLUGIN_NAME = "gulp-spcheckout";

function gulpspcheckout(options) {
	function checkoutFile(file, enc, cb) {
		options.fileName = path.basename(file.path);
		return spcheckout(options).then(function() {
				var msg = util.format("Successfully checked out file %s", options.fileName);
				console.log(colors.green(msg));
				cb(null, file);
				return null;
			})
			.catch(function(err) {
				var msg = util.format("Could not check out %s. Error: %s", 
					options.fileName, 
					err.error.error.message.value);
				console.log(colors.red(msg));
				cb(null, file);
				return;
			});
	}

	function end(cb) {
		cb();
	}

	return through.obj(checkoutFile);
}

