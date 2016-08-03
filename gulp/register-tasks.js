


/*
 * Register Gulp tasks.
 */



var gulp; //This module will be provided by the gulpfile

var concat  = require("gulp-concat");
var uglify  = require("gulp-uglify");

var tasks   = require("./data/tasks"); //All valid Gulp tasks
var sources = require("./sources");    //Module to get source file arrays

var finished = false; //Set to true once run
var minify = true;    //If true, output files will be uglified



/**
 * Run a gulp task.
 * @param {String}  task  The task name.
 * @returns {Object}  The Gulp pipe object.
 */
function runTask(task) {
	var outfile = "js-" + task + (minify ? ".min" : "") + ".js";
	
	console.log("Combining files into %s...", outfile);
	var pipe = gulp.src(sources(task))
			.pipe(concat(outfile));
	
	if(minify) {
		console.log("Uglifying %s...", outfile);
		pipe = pipe.pipe(uglify());
	}
	return pipe.pipe(gulp.dest("min"));
}



/**
 * Register a Gulp task.
 * @param {String}  task  The task name.
 */
function registerTask(task) {
	gulp.task(task, function() {
		return runTask(task);
	});
};



/**
 * Register Gulp tasks. This will only run once.
 * @param {Object}   g     The Gulp module.
 * @param {Boolean}  ugly  Pass true to uglify output files.
 * @throws {Error}  If the Gulp module is invalid.
 */
module.exports = function(g, ugly) {
	if(!finished) {
		gulp   = g;
		minify = Boolean(ugly);
		
		gulp.task("default", tasks);
		for(var i = 0, len = tasks.length; i < len; i++) {
			registerTask(tasks[i]);
		}
		
		finished = true;
	}
};


