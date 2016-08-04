


/*
 * This file contains functions to identify and manipulate numbers.
 */



/**
 * Check if a variable is an integer.
 * @param {mixed}  arg0  The variable to check.
 * @return {Boolean}  True if the argument is an integer, false otherwise.
 */
EeWalk11.isInteger = function(arg0) {
	return typeof arg0 === "number" && (arg0 % 1) === 0;
};



EeWalk11.isIntish = function(arg0) {
	var i = parseInt(arg0);
	return !Number.isNaN(i) && i == EeWalk11.stripZeros(String(arg0));
};



/**
 * Strip leading zeros from a numeric string. This function will not validate that the string is
 * actually numeric.
 * @param {String}  str  The string.
 * @return {String}  The result. The argument will simply be returned if it is not a string.
 */
EeWalk11.stripLeadingZeros = function(str) {
	if(typeof str === "string") {
		str = str.replace(/^[0]+/, "");
		if(str === "" || str.charAt(0) === ".") {
			str = "0" + str;
		}
	}
	return str;
}



/**
 * Strip trailing zeros after a decimal from a numeric string. This function will not validate that
 * the string is actually numeric.
 * @param {String}  str  The string.
 * @return {String}  The result. The argument will simply be returned if it is not a string.
 */
EeWalk11.stringTrailingZeros = function(str) {
	if(typeof str === "string" && str.indexOf(".") >= 0) {
		str = str.replace(/[0]+$/, "");
		if(str.charAt(str.length - 1) === ".") {
			//Remove a trailing decimal point
			str = str.substring(0, str.length - 1);
		}
		if(str === "") {
			str = "0";
		}
	}
	return str;
}



/**
 * Strip leading and trailing zeros from a numeric string. This function will not validate that the
 * string is actually numeric.
 * @param {String}  str  The string.
 * @return {String}  The result. The argument will simply be returned if it is not a string.
 */
EeWalk11.stripZeros = function(str) {
	return stripTrailingZeros(stripLeadingZeros(str));
}



/**
 * Number.MAX_SAFE_INTEGER. This avoids compatibility issues.
 * @type {Number}
 */
EeWalk11.MAX_SAFE_INTEGER = 9007199254740991;


