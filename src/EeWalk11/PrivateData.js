


;(function() {



	/**
	 * Construct a new private data Object for hold another Object's data.
	 * @param {Array}   props  An array of property names for this data object. If undefined or a
	 *                         type other that Array, this will be treated as an empty array.
	 * @param {Object}  opts   The values of any properties defined in this Object that appear in
	 *                         the properites Array will be used for the data Object.
	 * @return {Object}  A new private data object.
	 */
	EeWalk11.PrivateData = function(props, opts) {
		if(!Array.isArray(props)) {
			props = [];
		}
		if(typeof options !== "object") {
			opts = {};
		}

		var data = {};
		for(var i = 0, len = props.length; i < len; i++) {
			var property   = props[i];
			data[property] = getPropertyValue.call(this, property, opts);
		}
		return data;
	};




	/**
	 * Get the default value for a constructor option. By default, false will always be returned. An
	 * extending prototype should override this method.
	 * @param {String}  property  The data object's property name to get a default value for.
	 * @returns {Boolean}  False.
	 */
	EeWalk11.PrivateData.prototype.getDefaultValue = function(property) {
		return false;
	};



	/**
	 * Get a value for a constructor option. If a value is set in the options object, it will be
	 * used. Otherwise, the default value will be used.
	 * @this EeWalk11.PrivateData
	 * @param {String}  prop  The data object's property name to get a value for.
	 * @param {Object}  opts  Constructor options.
	 * @returns {mixed}  The value.
	 */
	function getPropertyValue(prop, opts) {
		return opts.hasOwnProperty(prop) ? opts[prop] : this.getDefaultValue(prop);
	}



})();


