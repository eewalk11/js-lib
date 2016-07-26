


;(function() {



	/**
	 * The window and document that will scroll will be stored here.
	 * @type {jQuery}
	 */
	var $page;



	/**
	 * Scroll the window to an element.
	 * @param {jQuery|Element|String}  elem  The element or element ID of the element to scroll to.
	 * @param {Object}                 opts  <i>Optional</i> An options object. If undefined,
	 *                                 default values will be used. See README.md for details.
	 * @throws {Error}  If jQuery is undefined or the object is invalid.
	 */
	EeWalk11.Animate.scrollTo = function(elem, opts) {
		//Check for jQuery UI
		if(!EeWalk11.isJQueryDefined()) {
			throw new Error("jQuery is required for scroll animation");
		}

		//Get the element
		var $element = EeWalk11.toJQuery(elem);
		if(!$element.length) {
			throw new Error("Invlid scroll target: " + elem);
		}

		//Load the DOM window object and the get a complete options object
		loadWindow();
		opts = new EeWalk11.Animate.ScrollOptions(opts);

		//Run the animation
		$page.animate({
			scrollTop: $element.offset().top
		}, opts.duration, opts.finished);
	};
	
	
	
	/**
	 * The default scroll animation duration.
	 * @type {Number}
	 */
	EeWalk11.Animate.scrollTo.DUR = 750;



	/**
	 * Load the window object. If already loaded, nothing will happen.
	 */
	function loadWindow() {
		if(!$page) {
			$page = $("html, body");
		}
	}



})();


