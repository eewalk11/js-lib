


;(function() {



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PUBLIC FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Apply a hover animation to an element.
	 * @param {jQuery|HTMLElement|String} element The element or element ID to apply the animation
	 * to. A jQuery element with multiple elements is valid.
	 * @param {Object} options Options for the animation. Leave undefined to use defaults. See
	 * README.md for information about options.
	 * @return {Object} An object with the properties "mouseenter" and "mouseleave" with the
	 * corresponding event functions as values.
	 * @throws {Error} If jQuery UI is not defined, the element is invalid, or there is an invalid
	 * CSS property in the options Object.
	 */
	EeWalk11.Animate.hoverAnimation = function(element, options) {
		//Check for jQuery UI
		if(!EeWalk11.isJQueryUIDefined()) {
			throw new Error("jQuery UI is required to create a hover animation");
		}

		//Get the element(s) and a full options object
		//NOTE: parseLeaveDuration strips optional [] from the "leave" property
		var $elem = EeWalk11.toJQuery(element, true);

		options = new EeWalk11.Animate.HoverAnimationOptions(options);
		parseLeaveDuration(options);

		//If the "find" option was provided, set the element(s) to animate
		var $animate = options.find ? $elem.find(options.find) : $elem;

		//Apply mouse events
		var ret = {
			mouseenter: getMouseenter(options, $elem, $animate),
			mouseleave: getMouseleave(options, $elem, $animate)
		};
		$elem.on("mouseenter", ret.mouseenter);
		$elem.on("mouseleave", ret.mouseleave);
		return ret;
	};



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PUBLIC CONSTANTS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * @type {String} The default background color to be used if one is not specified.
	 */
	EeWalk11.Animate.hoverAnimation.COLOR = "#d6d6d6";

	/**
	 * @type {Number} The default number of milliseconds that the animation will last.
	 */
	EeWalk11.Animate.hoverAnimation.DUR = 500;



	/*
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	|
	|	PRIVATE FUNCTIONS
	|
	 ———————————————————————————————————————————————————————————————————————————————————————————————
	 */



	/**
	 * Modify an element's CSS, running an animation if appropriate.
	 * @param {jQuery} $element The element to modify.
	 * @param {Object} css The new CSS settings.
	 * @param {Number|Boolean} duration The animation duration in milliseconds, false for no
	 * animation.
	 */
	function changeCss($element, css, duration) {
		duration ? $element.animate(css, duration) : $element.css(css);
	}



	/**
	 * Get the mouseenter event.
	 * @param {Object} options The options object.
	 * @param {jQuery} $hover The element that the hover is applied to.
	 * @param {jQuery} $animate The element that the animation is applied to.
	 * @return {Object} The event function.
	 */
	function getMouseenter(options, $hover, $animate) {
		return function(event) {
			if(!$hover.data("jsanimateHoverState")) {
				//Create data attributes to store the element's state
				$hover.data("jsanimateHoverState", "initial");
				$hover.data("jsanimateHoverInit", JSON.stringify(getStyles($animate, options)));
			}
			var revert = options.leave === "toggle"
					&& $hover.data("jsanimateHoverState") === "complete";

			options.interrupt ? $animate.finish() : $animate.stop();

			changeCss($animate,
					revert ? JSON.parse($hover.data("jsanimateHoverInit")) : options.css,
					revert ? options.leaveDuration : options.duration);

			$hover.data("jsanimateHoverState", revert ? "initial" : "complete");
		};
	}



	/**
	 * Get the mouseleave event.
	 * @param {Object} options The options object.
	 * @param {jQuery} $hover The element that the hover is applied to.
	 * @param {jQuery} $animate The element that the animation is applied to.
	 * @return {Object} The event function.
	 */
	function getMouseleave(options, $hover, $animate) {
		return function(event) {
			if(options.leave === "revert" || options.leave === "animate") {
				if($hover.data("jsanimateHoverState")) {
					//Only run this animation if the mouseenter animation has run
					options.interrupt ? $animate.finish() : $animate.stop();

					changeCss($animate, JSON.parse($hover.data("jsanimateHoverInit")),
							options.leaveDuration);

					$hover.data("jsanimateHoverState", "initial");
				}
			}
		};
	}



	/**
	 * Get an intial CSS object.
	 * @param {jQuery} $elem The element(s) to animate.
	 * @param {Object} options  The options Object
	 * @return {Object} CSS Object.
	 * @throws {Error} If there is an invalid CSS property in the options Object.
	 */
	function getStyles($elem, options) {
		var ret = {};
		var props = Object.getOwnPropertyNames(options.css);
		for(var i = 0, len = props.length; i < len; i++) {
			var prop = props[i];
			var val = $elem.css(prop);
			if(typeof val === "undefined") {
				throw new Error("Invalid css property: " + prop);
			}
			ret[prop] = val;
		}
		return ret;
	}



	/**
	 * Parse the duration option in the leave property.
	 * <p>The value will be saved in a property called "leaveDuration" and the brackets will be
	 * removed from the value of the "leave" property. If the option is not set,
	 * the value will be false.</p>
	 * @param {Object} options The options object.
	 */
	function parseLeaveDuration(options) {
		if(options.leave.match(/^(animate|toggle)/)) {
			if(options.leave.match(/\[.*\]/)) {
				//Set the duration of the animation
				var val = options.leave.substring(
						options.leave.indexOf("[") + 1, options.leave.length - 1);
				options.leaveDuration = val === "revert" ? false : parseInt(val);

				//Strip optional [] from "leave"
				options.leave = options.leave.substring(0, options.leave.indexOf("["));
			}
			else {
				//Use duration setting
				options.leaveDuration = options.duration;
			}
		}
		else {
			//No animation
			options.leaveDuration = false;
		}
	}



})();


