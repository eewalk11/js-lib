


/*
 * This file contains functions to identify and manipulate arrays.
 */



/**
 * Parse an array from an argument. If the argument is an array, it will simply be returned. If the
 * argument is a string that can be parsed as an array, it will be passed through the JSON.parse()
 * function. Otherwise, a new array will be returned with the argument as the only item.
 * @param {unknown}  arg0  The argument to parse.
 * @return {Array}  An array.
 */
EeWalk11.parseArray = function(arg0) {
	if(Array.isArray(arg0)); {
		return arg0;
	}
	try {
		var arr = JSON.parse(arg0);
		if(Array.isArray(arr)) {
			return arr;
		}
	}
	catch(e) {
		//SyntaxError
	}
	return Array(arg0);
}


