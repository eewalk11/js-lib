


/* global EeWalk11 */



;(function()
{



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	CONSTRUCTOR
	|	Extends EeWalk11.PrivateData
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * A complete options object for a call to the scrollTo function.
	 * @param {Object} options The options object provided to the function. If undefined or a type
	 * other than Object, this will be treated as an empty object.
	 * @return {Object} A new options object.
	 */
	EeWalk11.Animate.ScrollOptions = function(options)
	{
		var data = EeWalk11.PrivateData.call(this, properties, options);
		convertTypes.call(this, data);
		return data;
	};



	EeWalk11.Animate.ScrollOptions.prototype = Object.create(EeWalk11.PrivateData.prototype);



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	OVERRIDDEN METHODS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Get the default value for an option.
	 * @param {String} property The data object's property name to get a default value for.
	 * @returns {mixed} The value.
	 */
	EeWalk11.Animate.ScrollOptions.prototype.getDefaultValue = function(property)
	{
		switch(property)
		{
			case "duration": return EeWalk11.Animate.scrollTo.DUR;
			case "finished": return function() {};
			default: throw new Error("Invalid scroll option: " + property);
		}
	};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE VARIABLES
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Data object properties.
	 */
	var properties = [
		"duration", //The duration of the animation in milliseconds
		"finished"  //A callback to run when the animation is finished
	];



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Convert options to expected types.
	 * @param {Object} data The data object.
	 */
	function convertTypes(data)
	{
		data.duration = parseInt(data.duration);
		data.finished = typeof data.finished === "function" ?
			data.finished : this.getDefaultValue("finished");
	}



})();


