


/* global EeWalk11 */



;(function()
{



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	CONSTRUCTOR
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * An private data object for a new Draggable element.
	 * @param {jQuery} $elem The element.
	 * @param {String} text The text to be displayed in this draggable element.
	 * @param {Object} options Constructor options. If undefined or a type other than Object, this
	 * will be treated as an empty object.
	 * @return {Object} A new private data object.
	 * @throws {Error} If jQuery is not defined, or $elem is not a jQuery object.
	 */
	EeWalk11.Dropbox.DraggableData = function($elem, text, options)
	{
		if(!EeWalk11.isJQueryDefined())
		{
			throw new Error("jQuery is required to construct a Draggable element data object");
		}
		if(!($elem instanceof jQuery))
		{
			throw new Error("Invalid Draggable element: " + $elem);
		}

		var data = EeWalk11.PrivateData.call(this, properties, options);
		data.$elem = $elem;       //The DOM element for the Draggable
		data.text = String(text); //The text to be displayed in this Draggable element
		convertTypes(data);
		return data;
	};



	EeWalk11.Dropbox.DraggableData.prototype = Object.create(EeWalk11.PrivateData.prototype);



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	OVERRIDDEN METHODS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Get the default value for a constructor option.
	 * @param {String} property The data object's property name to get a default value for.
	 * @returns {mixed} The value.
	 */
	EeWalk11.Dropbox.DraggableData.prototype.getDefaultValue = function(property)
	{
		switch(property)
		{
			case "hoverOptions": return false;
			default: throw new Error("Invalid Draggable constructor option: " + property);
		}
	};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE VARIABLES
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Data object properties.
	 */
	var properties = [
		"hoverOptions" //Settings for a jQuery UI hover animation
	];



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Convert options to expected types.
	 * @param {Object} data The data object.
	 */
	function convertTypes(data)
	{
		data.hoverOptions = typeof data.hoverOptions === "object" ? data.hoverOptions : false;
	}



})();


