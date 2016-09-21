
/**
 * Get a jQuery object from a variable.
 * @param {jQuery|HTMLElement|String}  arg0   The element or an element ID. If a jQuery object is
 *                                            provided, its length must be exactly 1.
 * @param {Boolean}                    mults  (Optional) If true, a jQuery object povided for arg0
 *                                            can have a length greater than 1 or a length of 0.
 *                                            Default is false.
 * @return {jQuery|Boolean}  The jQuery object, false on failure.
 */
EeWalk11.jQuery.toJQuery = function(arg0, mults) {
	if(!EeWalk11.jQuery.isJQueryDefined()) {
		return false;
	}

	if(arg0 instanceof jQuery) {
		return mults || arg0.length === 1 ? arg0 : false;
	}
	if(EeWalk11.isElement(arg0)) {
		return jQuery(arg0);
	}

	var id = String(arg0);
	if(!id.length) {
		return false;
	}

	if(id.substr(0, 1) !== "#") {
		id = "#" + id;
	}
	var jq = jQuery(id);
	return jq.length ? jq : false;
};
