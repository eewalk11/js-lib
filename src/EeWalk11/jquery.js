


/* global EeWalk11 */



/*
 * This file contains helper functions for identifying jQuery objects.
 */



/**
 * Determine if jQuery is included.
 * @return {Boolen} True if jQuery is defined, false otherwise.
 */
EeWalk11.isJQueryDefined = function()
{
	return typeof jQuery === "function" || typeof jQuery === "object";
};



/**
 * Determine if jQuery UI is included.
 * @return {Boolean} True if jQuery UI is defined, false otherwise.
 */
EeWalk11.isJQueryUIDefined = function()
{
	return jQuery.ui;
};



/**
 * Get a jQuery object from a variable.
 * @param {jQuery|HTMLElement|String} arg0 The element or an element ID. If a jQuery object is
 * provided, its length must be exactly 1.
 * @param {Boolean} mults If true, a jQuery object povided for arg0 can have a length greater than
 * 1 or a length of 0. Default is false.
 * @return {jQuery|Boolean} The jQuery object, false on failure.
 */
EeWalk11.toJQuery = function(arg0, mults)
{
	if(!EeWalk11.isJQueryDefined())
	{
		return false;
	}

	if(arg0 instanceof jQuery)
	{
		return mults || arg0.length === 1 ? arg0 : false;
	}
	if(EeWalk11.isElement(arg0))
	{
		return jQuery(arg0);
	}

	var id = String(arg0);
	if(!id.length)
	{
		return false;
	}

	if(id.substr(0, 1) !== "#")
	{
		id = "#" + id;
	}
	var jq = jQuery(id);
	return jq.length ? jq : false;
};


