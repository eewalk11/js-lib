


;(function() {



	/**
	 * The default background color to be used if one is not specified.
	 * @type {String}
	 */
	EeWalk11.Animate.hoverAnimation.COLOR = "#d6d6d6";

	/**
	 * The default number of milliseconds that the animation will last.
	 * @type {Number}
	 */
	EeWalk11.Animate.hoverAnimation.DUR = 500;



	/**
	 * Apply a hover animation to an element.
	 * @param {jQuery|HTMLElement|String}  elem  The element or element ID to apply the animation
	 *                                           to. A jQuery element with multiple elements is
	 *                                           valid.
	 * @param {Object}                     opts  Options for the animation. Leave undefined to use
	 *                                           defaults. See README.md for information about
	 *                                           options.
	 * @return {Object}  An object with the properties "mouseenter" and "mouseleave" with the
	 *                   corresponding event functions as values.
	 * @throws {Error}  If jQuery UI is not defined, the element is invalid, or there is an invalid
	 *                  CSS property in the options Object.
	 */
	EeWalk11.Animate.hoverAnimation = function(elem, opts) {
		//Check for jQuery UI
		if(!EeWalk11.isJQueryUIDefined()) {
			throw new Error("jQuery UI is required to create a hover animation");
		}

		//Get the element(s) and a full options object
		//NOTE: parseLeaveDuration strips optional [] from the "leave" property
		var $elem = EeWalk11.toJQuery(elem, true);

		opts = new EeWalk11.Animate.HoverAnimationOptions(opts);
		parseLeaveDuration(opts);

		//If the "find" option was provided, set the element(s) to animate
		var $animate = opts.find ? $elem.find(opts.find) : $elem;

		//Apply mouse events
		var ret = {
			mouseenter: getMouseenter(opts, $elem, $animate),
			mouseleave: getMouseleave(opts, $elem, $animate)
		};
		$elem.on("mouseenter", ret.mouseenter);
		$elem.on("mouseleave", ret.mouseleave);
		return ret;
	};



	/**
	 * Modify an element's CSS, running an animation if appropriate.
	 * @param {jQuery}          $elem  The element to modify.
	 * @param {Object}          css    The new CSS settings.
	 * @param {Number|Boolean}  dur    The animation duration in milliseconds, false for no
	 *                                 animation.
	 */
	function changeCss($elem, css, dur) {
		dur ? $elem.animate(css, dur) : $elem.css(css);
	}



	/**
	 * Get the mouseenter event.
	 * @param {Object}  opts      The options object.
	 * @param {jQuery}  $hover    The element that the hover is applied to.
	 * @param {jQuery}  $animate  The element that the animation is applied to.
	 * @return {Object}  The event function.
	 */
	function getMouseenter(opts, $hover, $animate) {
		return function(event) {
			if(!$hover.data("jsanimateHoverState")) {
				//Create data attributes to store the element's state
				$hover.data("jsanimateHoverState", "initial");
				$hover.data("jsanimateHoverInit", JSON.stringify(getStyles($animate, opts)));
			}
			var revert = opts.leave === "toggle"
					&& $hover.data("jsanimateHoverState") === "complete";

			opts.interrupt ? $animate.finish() : $animate.stop();

			changeCss($animate,
					revert ? JSON.parse($hover.data("jsanimateHoverInit")) : opts.css,
					revert ? opts.leaveDuration : opts.duration);

			$hover.data("jsanimateHoverState", revert ? "initial" : "complete");
		};
	}



	/**
	 * Get the mouseleave event.
	 * @param {Object}  opts      The options object.
	 * @param {jQuery}  $hover    The element that the hover is applied to.
	 * @param {jQuery}  $animate  The element that the animation is applied to.
	 * @return {Object}  The event function.
	 */
	function getMouseleave(opts, $hover, $animate) {
		return function(event) {
			if(opts.leave === "revert" || opts.leave === "animate") {
				if($hover.data("jsanimateHoverState")) {
					//Only run this animation if the mouseenter animation has run
					opts.interrupt ? $animate.finish() : $animate.stop();

					changeCss($animate, JSON.parse($hover.data("jsanimateHoverInit")),
							opts.leaveDuration);

					$hover.data("jsanimateHoverState", "initial");
				}
			}
		};
	}



	/**
	 * Get an intial CSS object.
	 * @param {jQuery}  $elem  The element(s) to animate.
	 * @param {Object}  opts   The options Object
	 * @return {Object}  CSS Object.
	 * @throws {Error}  If there is an invalid CSS property in the options Object.
	 */
	function getStyles($elem, opts) {
		var ret = {};
		var props = Object.getOwnPropertyNames(opts.css);
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
	 * Parse the duration option in the leave property. The value will be saved in a property called
	 * "leaveDuration" and the brackets will be removed from the value of the "leave" property. If
	 * the option is not set, the value will be false.
	 * @param {Object}  options The options object.
	 */
	function parseLeaveDuration(opts) {
		if(opts.leave.match(/^(animate|toggle)/)) {
			if(opts.leave.match(/\[.*\]/)) {
				//Set the duration of the animation
				var val = opts.leave.substring(
						opts.leave.indexOf("[") + 1, opts.leave.length - 1);
				opts.leaveDuration = val === "revert" ? false : parseInt(val);

				//Strip optional [] from "leave"
				opts.leave = opts.leave.substring(0, opts.leave.indexOf("["));
			}
			else {
				//Use duration setting
				opts.leaveDuration = opts.duration;
			}
		}
		else {
			//No animation
			opts.leaveDuration = false;
		}
	}



})();


