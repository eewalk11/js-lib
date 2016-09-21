


/*
 * This file contains helper functions for identifying DOM elements and JavaScript objects for them.
 */



/**
 * Check if a variable is an Element object.
 * @param {mixed}  arg0  The variable to check.
 * @return {Boolean}  True if the object is a DOM Element, false otherwise.
 */
EeWalk11.isElement = function(arg0) {
	//Include a check for browsers not supporting W3 DOM2 with duck typing
	return EeWalk11.isElementDefined() ? arg0 instanceof HTMLElement :
			arg0 && typeof arg0 === "object" && arg0 !== null && arg0.nodeType === 1
					&& typeof arg0.nodeName === "string";
};



/**
 * Determine if the browser supports the HTMLElement object.
 * @return {Boolean}  True if the type is supported, false otherwise.
 */
EeWalk11.isElementDefined = function() {
	return typeof HTMLElement === "function" || typeof HTMLElement === "object";
};



/**
 * Get a DOM element ID from a variable.
 * @param {String}  arg0  The element ID, an Element object, or a jQuery object. A jQuery ID
 *                        selector string is a valid input, but the preceding "#" will be removed in
 *                        the returned string.
 * @return {String|Boolean}  The element ID, false on failure.
 */
EeWalk11.toElementId = function(arg0) {
	if(typeof arg0 === "string") {
		return arg0.length ? (arg0.substr(0, 1) === "#" ? arg0.substr(1) : arg0) : false;
	}
	if(EeWalk11.isElement(arg0)) {
		return arg0.id;
	}
	if(EeWalk11.jQuery.isJQueryDefined() && arg0 instanceof jQuery) {
		return arg0.length === 1 ? arg0.attr("id") : false;
	}
	return false;
};


