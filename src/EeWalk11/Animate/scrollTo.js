


/* global EeWalk11 */



;(function()
{



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PUBLIC FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Scroll the window to an element.
	 * @param {jQuery|Element|String} element The element or element ID of the element to scroll to.
	 * @param {Object} options An optional options object. If undefined, default values will be
	 * used. See README.md for details.
	 * @throws {Error} If jQuery is undefined or the object is invalid.
	 */
	EeWalk11.Animate.scrollTo = function(element, options)
	{
		//Check for jQuery UI
		if(!EeWalk11.isJQueryDefined())
		{
			throw new Error("jQuery is required for scroll animation");
		}

		//Get the element
		var $element = EeWalk11.toJQuery(element);
		if(!$element.length)
		{
			throw new Error("Invlid scroll target: " + element);
		}

		//Load the DOM window object and the get a complete options object
		loadWindow();
		options = new EeWalk11.Animate.ScrollOptions(options);

		//Run the animation
		$page.animate({
			scrollTop: $element.offset().top
		}, options.duration, options.finished);
	};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PUBLIC VARIABLES
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * @type {Number} The default duration.
	 */
	EeWalk11.Animate.scrollTo.DUR = 750;



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE VARIABLES
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * @type {jQuery} The window and document that will scroll will be stored here.
	 */
	var $page;



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Load the window object. If already loaded, nothing will happen.
	 */
	function loadWindow()
	{
		if(!$page)
		{
			$page = $("html, body");
		}
	}



})();


