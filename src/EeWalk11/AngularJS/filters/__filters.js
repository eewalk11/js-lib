
/**
 * Each property in this object can be used to register a filter with the AngularJS module.
 * @type {Object}
 */
var __filters = {

	/**
	 * An array of all property names.
	 * @type {Array}
	 */
	names: [],
	
	/**
	 * Add a filter to the list. The data will be added as a property of this object and the filter
	 * name will be added to the array of names.
	 * @param {Object}  data  Filter data. Should contain the properties "name", "dependencies", and
	 *                        "factory".
	 */
	addFilter: function(data) {
		this.names.push(data.name);
		this[data.name] = data;
	}

};
