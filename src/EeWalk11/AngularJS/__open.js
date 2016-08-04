


;(function() {
	
	//Define AngularJS namespace
	
	/**
	 * Create the AngularJS module.
	 * @constructor
	 * @param {String}  name  The module name. Defaults to "eewalk11".
	 * @param {Array}   deps  Module dependencies. Defaults to an empty array.
	 */
	EeWalk11.AngularJS = function(name, deps) {
		name = typeof name === "undefined" ? "eewalk11" : String(name);
		deps = deps ? deps : [];
		return createModule(name, deps);
	};
	
	
	
	/**
	 * Data to create the AngularJS module will be stored here.
	 * @type {Object}
	 */
	var __angularData = {};
	
	
	