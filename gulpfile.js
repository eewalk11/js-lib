/*
 * Combine and minify JS files.
 *
 * options
 *
 *	--nougly
 *	The combined file will not be uglified.
 */



var yargs = require("yargs");
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var argv = yargs.argv;



/*
 ———————————————————————————————————————————————————————————————————————————————————————————————————
|
|	FUNCTIONS
|
 ———————————————————————————————————————————————————————————————————————————————————————————————————
 */



//Get source files for an array of tasks
function getSourceFiles(task)
{
	if(Array.isArray(task))
	{
		//Concatenate arrays of sources
		var src = [];
		for(var i = 0, len = task.length; i < len; i++)
		{
			src = src.concat(getSourceFiles(task[i]));
		}
		return src;
	}
	else
	{
		//Get an array of sources for a given task
		switch(task)
		{
			//This will be included in all tasks
			case "min-lib": return [
				"src/EeWalk11/EeWalk11.js",
				"src/EeWalk11/elements.js",
				"src/EeWalk11/numbers.js",
				"src/EeWalk11/jquery.js",
				"src/EeWalk11/PrivateData.js"
			];
			case "min-animate": return [
				"src/EeWalk11/Animate/Animate.js",
				"src/EeWalk11/Animate/HoverAnimationOptions.js",
				"src/EeWalk11/Animate/hoverAnimation.js"
			];
			case "min-dropbox": return [
				"src/EeWalk11/Dropbox/Dropbox.js",
				"src/EeWalk11/Dropbox/Container.js",
				"src/EeWalk11/Dropbox/ContainerData.js",
				"src/EeWalk11/Dropbox/Draggable.js",
				"src/EeWalk11/Dropbox/DraggableData.js",
				"src/EeWalk11/Dropbox/Events.js"
			];
			default: throw new Error("Invalid task name: " + task);
		}
	}
}



//Get the ouptut filename for a task
function getFilename(task)
{
	switch(task)
	{
		case "min-lib": return "js-lib.min.js";
		case "min-animate": return "js-animate.min.js";
		case "min-dropbox": return "js-dropbox.min.js";
		default: throw new Error("Invalid task name: " + task);
	}
}



//Run the minify task given the Gulp src
function run_minify(task, src)
{
	console.log("combining");
	var g = src.pipe(concat(getFilename(task)));
	if(!argv.hasOwnProperty("nougly"))
	{
		console.log("minifying");
		g = g.pipe(uglify());
	}
	g = g.pipe(gulp.dest("min"));
}



/*
 ———————————————————————————————————————————————————————————————————————————————————————————————————
|
|	TASKS
|
 ———————————————————————————————————————————————————————————————————————————————————————————————————
 */



//Run all minifications
gulp.task("default", ["min-lib", "min-animate", "min-dropbox"], function() {});



//Minify the entire package
gulp.task("min-lib", function()
{
	return run_minify("min-lib", gulp.src(
		getSourceFiles(["min-lib", "min-animate", "min-dropbox"]))
	);
});



//Minify the Animate libraray
gulp.task("min-animate", function()
{
	return run_minify("min-animate", gulp.src(
		getSourceFiles(["min-lib", "min-animate"]))
	);
});



//Minify the Dropbox library
gulp.task("min-dropbox", function()
{
	return run_minify("min-dropbox", gulp.src(
		getSourceFiles(["min-lib", "min-animate", "min-dropbox"])
	));
});


