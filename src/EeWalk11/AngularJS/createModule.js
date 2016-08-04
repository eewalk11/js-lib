


/**
 * Create the AngularJS module.
 * @return {Object}  The module.
 */
function createModule() {
	var app = angular.module("eewalk11", []);
	registerFilters(app);
	return app;
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
	for(var i = 0, len = __filters.names.length; i < len; i++) {
		var name = __filters.names[i];
		var data = __filters[name];
		var arg1 = createProviderArgument(data.dependencies, data.factory);
		app.filter(name, arg1);
	}
}


