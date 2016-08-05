



/**
 * Each property in this object can be used to register a directive with the AngularJS module.
 * @constructor
 */
function __DirectiveData() {
	__ProviderData.call(this);
	this.push("clock", ["$timeout"], __directiveFactories.clock);
};



__DirectiveData.prototype = Object.create(__ProviderData.prototype);



/**
 * Add a directive factory to the list.
 * @override
 * @param {String}         n  The directive name.
 * @param {Array|Boolean}  d  An array of dependencies for injection, false for none.
 * @param {Function}       f  The directive definition object factory.
 */
__DirectiveData.prototype.push = function(n, d, f) {
	__ProviderData.prototype.push.call(this, {
		name: n,
		dependencies: d,
		factory: f
	});
}


