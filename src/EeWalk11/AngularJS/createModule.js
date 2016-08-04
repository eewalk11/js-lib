


/**
 * Create the AngularJS module.
 * @param {String}  name  The module name. Defaults to "eewalk11".
 * @param {Array}   deps  Module dependencies. Defaults to an empty array.
 * @return {Object}  The module.
 */
function createModule(name, deps) {
	createModule_init();
	
	var app = angular.module(name, deps);
	registerFilters(app);
	
	createModule_cleanup();
	return app;
}



/**
 * Clear references to module data.
 */
function createModule_cleanup() {
	delete __angularData.filters;
}



/**
 * Initialize the module data object.
 */
function createModule_init() {
	__angularData.filters = new __FilterData();
}



/**
 * Create the argument to pass to an AngularJS provider.
 * @param {Array|Boolean}  dependencies  An array of dependencies, false if none.
 * @param {Function}       factory       The factory or initializer function.
 * @returns {Array|Function}  The argument to pass to the provider.
 */
function createProviderArgument(dependencies, factory) {
	if(dependencies) {
		var args = dependencies.slice(0);
		args.push(factory);
		return args;
	}
	return factory;
}



/**
 * Register filters with the module.
 * @param {Object}  app  The module.
 */
function registerFilters(app) {
	var filters = __angularData.filters;
	
	for(var i = 0, len = filters.names.length; i < len; i++) {
		var name = filters.names[i];
		var data = filters[name];
		var arg1 = createProviderArgument(data.dependencies, data.factory);
		
		app.filter(name, arg1);
	}
}


