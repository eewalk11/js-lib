



/**
 * Each property in this object can be used to register a filter with the AngularJS module.
 * @constructor
 */
function __FilterData() {
	this.push("numToStr", false, __filterFactories.numToStr);
};



__FilterData.prototype = Object.create(__ProviderData.prototype);



/**
 * Add a filter to the list.
 * @override
 * @param {String}         n  The filter name.
 * @param {Array|Boolean}  d  An array of dependencies for injection, false for none.
 * @param {Function}       f  The factory function.
 */
__FilterData.prototype.push = function(n, d, f) {
	__ProviderData.prototype.push.call(this, {
		name: n,
		dependencies: d,
		factory: f
	});
}


