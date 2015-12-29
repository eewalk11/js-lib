


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
	 * An private data object for a new Container.
	 * @param {jQuery} $elem The element.
	 * @param {Object} options Constructor options. If undefined or a type other than Object, this
	 * will be treated as an empty object.
	 * @return {Object} A new private data object.
	 * @throws {Error} If jQuery is not defined or $elem is not jQuery object.
	 */
	EeWalk11.Dropbox.ContainerData = function($elem, options)
	{
		if(!EeWalk11.isJQueryDefined())
		{
			throw new Error("jQuery is required to construct a Container data object");
		}
		if(!($elem instanceof jQuery))
		{
			throw new Error("Invalid Container element: " + $elem);
		}

		var data = EeWalk11.PrivateData.call(this, properties, options);
		data.$elem = $elem;   //The DOM element for the Container
		data.draggables = []; //The Draggable elements currently in the Container
		convertTypes(data);
		return data;
	};



	EeWalk11.Dropbox.ContainerData.prototype = Object.create(EeWalk11.PrivateData.prototype);



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
	EeWalk11.Dropbox.ContainerData.prototype.getDefaultValue = function(property)
	{
		switch(property)
		{
			case "capacity": return false;
			case "sortable": return true;
			default: throw new Error("Invalid Container constructor option: " + property);
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
		"capacity", //The max number of Draggable elements that can be added to the Container
		"sortable"  //If the user can resort the Draggable elements or not
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
		data.capacity = data.capacity === false ?
			EeWalk11.MAX_SAFE_INTEGER : parseInt(data.capacity);
		data.sortable = Boolean(data.sortable);
	}



})();


