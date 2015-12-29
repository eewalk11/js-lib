


/* global EeWalk11 */



;(function()
{



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	CONSTRUCTOR
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Construct a new private data Object for hold another Object's data.
	 * @param {Array} properties An array of property names for this data object. If undefined or a
	 * type other that Array, this will be treated as an empty array.
	 * @param {Object} options The values of any properties defined in this Object that appear in
	 * the properites Array will be used for the data Object.
	 * @return {Object} A new private data object.
	 */
	EeWalk11.PrivateData = function(properties, options)
	{
		if(!Array.isArray(properties))
		{
			properties = [];
		}
		if(typeof options !== "object")
		{
			options = {};
		}

		var data = {};
		for(var i = 0, len = properties.length; i < len; i++)
		{
			var property = properties[i];
			data[property] = getPropertyValue.call(this, property, options);
		}
		return data;
	};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	METHODS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Get the default value for a constructor option.
	 * <p>By default, false will always be returned. An extending prototype should override this
	 * method.</p>
	 * @param {String} property The data object's property name to get a default value for.
	 * @returns {Boolean} False.
	 */
	EeWalk11.PrivateData.prototype.getDefaultValue = function(property)
	{
		return false;
	};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Get a value for a constructor option.
	 * <p>If a value is set in the options object, it will be used. Otherwise, the default value
	 * will be used.</p>
	 * @param {String} property The data object's property name to get a value for.
	 * @param {Object} options Constructor options.
	 * @returns {mixed} The value.
	 */
	function getPropertyValue(property, options)
	{
		return options.hasOwnProperty(property) ?
		options[property] : this.getDefaultValue(property);
	}



})();


