
/**
 * Loop through a set of jQuery objects and perform an action on each one.
 * @param {String|jQuery|Element}  jq      The jQuery elements or selector.
 * @param {Function}               action  This function will be called for each individual jQuery
 *                                         element in the matched set and will recieve the element
 *                                         as input.
 * @throws {Error}  If action is not a Function.
 */
EeWalk11.jQuery.jqLoop = function(jq, action) {
	if(typeof action !== "function") {
		throw new Error("Invalid action");
	}

	var $elems = EeWalk11.jQuery.toJQuery(jq);
	if($elems) {
		for(var i = 0; i < $elems.length; i++) {
			action($elems.eq(i));
		}
	}
};
