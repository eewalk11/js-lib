


/*
 * Make an array of source files for Gulp to combine/minify.
 */



/**
 * Arrays of source files.
 * @param {Object}
 */
var src = require("./data/src");

/**
 * Arrays of task dependencies.
 * @param {Object}
 */
var dependencies = require("./data/dependencies");



/**
 * Validate that the given Gulp task is object properties.
 * @param {String}  task  The task.
 * @param {Object}  obj   Variable number of objects to check.
 * @throws {Error}  If the Gulp task is invalid.
 */
function validate(task) {
	var objs = Array.from(arguments);
	for(var i = 1, len = objs.length; i < len; i++) {
		var obj = objs[i];
		if(!obj.hasOwnProperty(task)) {
			throw new Error("Invalid Gulp task: " + task);
		}
	}
}



/**
 * Get an array of source files for a Gulp task.
 * @param {String}  task  The Gulp task.
 * @return {Array}  Source files for given task(s) in the order that they are in the task array.
 * @throws {Error}  If the Gulp task is invalid.
 */
module.exports = function(task) {
	validate(task, src, dependencies);	
	var tasks = dependencies[task];
	var files = [];
	for(var i = 0, len = tasks.length; i < len; i++) {
		files = files.concat(src[tasks[i]]);
	}
	return files;
};


