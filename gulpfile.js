


/*
 * Combine and minify JS files.
 *
 * Tasks
 *
 *   lib      The entire library package
 *   animate  Animation (jQuery) library
 *   dropbox  The drag and drop box library
 *
 * Options
 *
 *   --nougly  The combined file will not be uglified
 */



var gulp = require("gulp");
var argv = require("yargs").argv;

var registerTasks = require("./gulp/register-tasks");
registerTasks(gulp, !argv.hasOwnProperty("nougly"));


