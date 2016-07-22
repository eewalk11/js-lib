


;(function() {



	/**
	 * A complete options object for a call to the hoverAnimation function.
	 * @constructor
	 * @augments EeWalk11.PrivateData
	 * @param {Object}  opts  The options object provided to the function. If undefined or a type
	 *                        other than Object, this will be treated as an empty object.
	 * @return {Object}  A new options object.
	 */
	EeWalk11.Animate.HoverAnimationOptions = function(opts) {
		var data = EeWalk11.PrivateData.call(this, getProperties(), opts);
		convertTypes.call(this, data);
		return data;
	};



	EeWalk11.Animate.HoverAnimationOptions.prototype =
			Object.create(EeWalk11.PrivateData.prototype);



	/**
	 * @override
	 * @return {mixed}  The value.
	 * @throws {Error}  If the property is invalid.
	 */
	EeWalk11.Animate.HoverAnimationOptions.prototype.getDefaultValue = function(property) {
		switch(property) {
			case "css":       return {backgroundColor: EeWalk11.Animate.hoverAnimation.COLOR};
			case "find":      return null;
			case "duration":  return EeWalk11.Animate.hoverAnimation.DUR;
			case "interrupt": return false;
			case "leave":     return "animate";
			default:          throw new Error("Invalid hover animation option: " + property);
		}
	};



	/**
	 * Convert options to expected types.
	 * @param {Object}  data  The data object.
	 */
	function convertTypes(data) {
		data.css       = typeof data.css === "object" ? data.css : this.getDefaultValue("css");
		data.find      = typeof data.find === "string" ? data.find : this.getDefaultValue("find");
		data.duration  = parseInt(data.duration);
		data.interrupt = Boolean(data.interrupt);

		var regex      = /^(revert|animate(\[[0-9]+\])?|hold|toggle(\[([0-9]+|revert)\])?)$/;
		data.leave     = typeof data.leave === "string" && data.leave.match(regex) ?
				data.leave : this.getDefaultValue("leave");
	}



	/**
	 * Get an array of all valid data object properties.
	 * @return {Array}  Properties array.
	 */
	function getProperties() {
		return [
			"css",       //Css Object for the animation
			"find",      //A jQuery selector for a child element to apply the animation to
			"duration",  //The duration of the animation in milliseconds
			"interrupt", //Should the animation finish when interrupted
	        "leave"      //What should be done when the mouse is no longer hovering
		];
	}



})();


