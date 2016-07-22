


;(function() {



	/**
	 * A complete options object for a call to the scrollTo function.
	 * @augments EeWalk11.PrivateData
	 * @param {Object}  opts  The options object provided to the function. If undefined or a type
	 *                        other than Object, this will be treated as an empty object.
	 * @return {Object}  A new options object.
	 */
	EeWalk11.Animate.ScrollOptions = function(opts) {
		var data = EeWalk11.PrivateData.call(this, getProperties(), opts);
		convertTypes.call(this, data);
		return data;
	};



	EeWalk11.Animate.ScrollOptions.prototype = Object.create(EeWalk11.PrivateData.prototype);



	/**
	 * @override
	 * @return {mixed}  The value.
	 * @throws {Error}  If the property is invalid.
	 */
	EeWalk11.Animate.ScrollOptions.prototype.getDefaultValue = function(property) {
		switch(property) {
			case "duration": return EeWalk11.Animate.scrollTo.DUR;
			case "finished": return function() {};
			default:         throw new Error("Invalid scroll option: " + property);
		}
	};



	/**
	 * Convert options to expected types.
	 * @param {Object}  data  The data object.
	 */
	function convertTypes(data) {
		data.duration = parseInt(data.duration);
		data.finished = typeof data.finished === "function" ?
				data.finished : this.getDefaultValue("finished");
	}



	/**
	 * Get an array of all valid data object properties.
	 * @return {Array}  Properties array.
	 */
	function getProperties() {
		return [
			"duration", //The duration of the animation in milliseconds
			"finished"  //A callback to run when the animation is finished
		];
	}



})();


