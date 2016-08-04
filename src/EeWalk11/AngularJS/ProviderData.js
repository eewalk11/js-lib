


/**
 * Framework for an object that stores data that can be passed to an AngularJS provider for the
 * module.
 * @constructor
 */
function __ProviderData() {};



/**
 * A list of all property names.
 * @type {Array}
 */
__ProviderData.prototype.names = [];



/**
 * Add a filter to the end of the list. The data will be added as a property of this object and the
 * factory name will be added to the list of names.
 * @param {Object}  data  Provider data. The expected properties depend on the object extending this
 *                        prototype, but a property called "name" is always required.
 */
__ProviderData.prototype.push = function(data) {
	this.names.push(data.name);
	this[data.name] = data;
}


