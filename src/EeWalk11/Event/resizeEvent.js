


;(function() {



	/**
	 * The window object wrapped in a jQuery object.
	 * @type {jQuery}
	 */
	var $win;

	/**
	 * The next resize event ID.
	 * @type {Number}
	 */
	var eventID;

	/**
	 * An array of currently scheduled resize event timeout IDs indexed by event IDs.
	 * @type {Array}
	 */
	var scheduled;



	/**
	 * Register an event on window resize. The event will be delayed so that it is not constantly
	 * firing.
	 * @param {Function}  event  The event to run. This function will be provided the jQuery event
	 *                           object as the first argument.
	 * @param {Number}    delay  The delay in milliseconds until the event is fired after a window
	 *                           resize. If omitted or invalid, defaults to 100.
	 * @throws {Error}  If jQuery is not defined or the event is invalid.
	 */
	EeWalk11.Event.resizeEvent = function(event, delay) {
		if(!EeWalk11.jQuery.isJQueryDefined()) {
			throw new Error("jQuery is required to register a resize event");
		}
		if(typeof event !== "function") {
			throw new Error("Resize event must be a function");
		}

		init();

		var id        = eventID++;
		delay         = getDelay(delay);
		scheduled[id] = null;

		$win.on("resize", getResizeEvent(id, event, delay));
	};



	/**
	 * Get the resize event function.
	 * @param {Number}    id     The resize event ID.
	 * @param {Function}  event  The event to run.
	 * @param {Number}    delay  The delay before the event is fired.
	 * @return {Function}  The event function.
	 */
	function getResizeEvent(id, event, delay) {
		return function() {
			//Cancel a scheduled event
			if(scheduled[id]) {
				clearTimeout(scheduled[id]);
			}

			//Schedule a new resize event
			scheduled[id] = setTimeout(function() {
				//Unschedule the resize event
				scheduled[id] = null;

				//Run the event
				event();
			}, delay);
		};
	}



	/**
	 * Get the correct value from the delay argument.
	 * @param {Number}  delay  The delay argument.
	 * @return {Number}  The delay.
	 */
	function getDelay(delay) {
		delay = parseInt(delay);
		if(isNaN(delay) || delay < 0) {
			return 100;
		}
		return delay;
	}



	/**
	 * Initialize private variables.
	 */
	function init() {
		if(typeof $win === "undefined") {
			$win      = $(window);
			eventID   = 1;
			scheduled = [];
		}
	}



})();


