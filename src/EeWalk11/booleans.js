


/*
 * This file contains functions to identify and manipulate booleans.
 */



/**
 * Parse a bolean from an argument. If the argument is falsey value, false will be returned. False
 * will also be returned for any of the (case-insensitive) strings: "false", "null", "undefined",
 * and "nan". Any other value will return true.
 * @param {unknown}  arg0  The argument to parse.
 * @return {Boolean}  A boolean.
 */
EeWalk11.parseBoolean = function(arg0) {
	if(!Boolean(arg0) || Number(arg0) === 0) {
		//Match simple falsey values
		return false;
	}
	if(typeof arg0 === "string") {
		//Match falsey words
		var lower = arg0.toLowerCase();
		return !(lower === "false" || lower === "null" || lower === "undefined" || lower === "nan");
	}
	return true;
};


