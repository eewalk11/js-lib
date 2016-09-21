
//Create namespace
EeWalk11.jQuery = {

	/**
	 * Determine if jQuery is included.
	 * @return {Boolen}  True if jQuery is defined, false otherwise.
	 */
	isJQueryDefined: function() {
		return typeof jQuery === "function" || typeof jQuery === "object";
	},

	/**
	 * Determine if jQuery UI is included.
	 * @return {Boolean}  True if jQuery UI is defined, false otherwise.
	 */
	isJQueryUIDefined: function() {
		return jQuery.ui;
	}

};
