


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



/**
 * Number.MAX_SAFE_INTEGER. This avoids compatibility issues.
 * @type {Number}
 */
EeWalk11.MAX_SAFE_INTEGER = 9007199254740991;


