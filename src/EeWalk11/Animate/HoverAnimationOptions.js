


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
	 * A complete options object for a call to the hoverAnimation function.
	 * @param {Object} options The options object provided to the function. If undefined or a type
	 * other than Object, this will be treated as an empty object.
	 * @return {Object} A new options object.
	 */
	EeWalk11.Animate.HoverAnimationOptions = function(options)
	{
		var data = EeWalk11.PrivateData.call(this, properties, options);
		convertTypes.call(this, data);
		return data;
	};



	EeWalk11.Animate.HoverAnimationOptions.prototype =
		Object.create(EeWalk11.PrivateData.prototype);



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
	EeWalk11.Animate.HoverAnimationOptions.prototype.getDefaultValue = function(property)
	{
		switch(property)
		{
			case "css": return {backgroundColor: EeWalk11.Animate.hoverAnimation.COLOR};
			case "duration": return EeWalk11.Animate.hoverAnimation.DUR;
			case "interrupt": return false;
			case "leave": return "animate";
			default: throw new Error("Invalid Container constructor option: " + property);
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
		"css",       //Css Object for the animation
		"duration",  //The duration of the animation in milliseconds
		"interrupt", //Should the animation finish when interrupted
        "leave"      //What should be done when the mouse is no longer hovering
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
		data.css = typeof data.css === "object" ? data.css : this.getDefaultValue("css");
		data.duration = parseInt(data.duration);
		data.interrupt = Boolean(data.interrupt);
		data.leave = typeof data.leave === "string"
				&& data.leave.match(
					/^(revert|animate(\[[0-9]+\])?|hold|toggle(\[([0-9]+|revert)\])?)$/
				) ?
			data.leave : this.getDefaultValue("leave");
	}



})();


