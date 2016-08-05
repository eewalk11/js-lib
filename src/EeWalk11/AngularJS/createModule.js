


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
	registerDirectives(app);
	
	createModule_cleanup();
	return app;
}



/**
 * Clear references to module data.
 */
function createModule_cleanup() {
	delete __angularData.filters;
	delete __angularData.directives;
}



/**
 * Initialize the module data object.
 */
function createModule_init() {
	__angularData.filters    = new __FilterData();
	__angularData.directives = new __DirectiveData();
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
 * Register all factories in a set.
 * @param {Object}  app          The module.
 * @param {Object}  factories    Data object containing factory information.
 * @param {String}  angularFunc  Name of the AngularJS function to call to the module to register
 *                               each factory in the set.
 */
function register_set(app, factories, angularFunc) {
	for(var i = 0, len = factories.names.length; i < len; i++) {
		//Create arguments
		var name = factories.names[i];
		var data = factories[name];
		var arg1 = createProviderArgument(data.dependencies, data.factory);
		
		//Register the factory with the module
		app[angularFunc](name, arg1);
	}
}



/**
 * Register directives with the module.
 * @param {Object}  app  The module.
 */
function registerDirectives(app) {
	register_set(app, __angularData.directives, "directive");
}

/**
 * Register filters with the module.
 * @param {Object}  app  The module.
 */
function registerFilters(app) {
	register_set(app, __angularData.filters, "filter");
}


