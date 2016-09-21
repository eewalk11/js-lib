


;(function() {



	/**
	 * Schedule a recurring AJAX request to keep a PHP session alive.
	 * @param {String}         url       The AJAX request url.
	 * @param {Number|Object}  interval  <i>Optional</i> The frequency of the AJAX requests in
	 *                                   milliseconds. By default a GET request will be sent to the
	 *                                   URL and will expect an empty response. Alternatively, a
	 *                                   jQuery AJAX options object may be passed for this argument
	 *                                   which will be used for the AJAX request. In this case, the
	 *                                   object can have a property called "interval" which will be
	 *                                   the frequency of the AJAX reqeuests. Defaults to 5 minutes.
	 */
	EeWalk11.refreshSession = function(url, interval) {
		if(!EeWalk11.jQuery.isJQueryDefined()) {
			throw new Error("jQuery is required for a session refresh request");
		}
		if(!url) {
			throw new Error("A url is required for a session refresh ajax request");
		}

		var ajax = typeof interval === "object" ? interval : {};
		ajax.url = url;

		interval = getRefreshTime(interval);

		prepareRefreshAjax(ajax, interval);
		scheduleSessionRefresh(ajax, interval);
	};



	/**
	 * Get the session refresh request interval from the function argument.
	 * @param {mixed}  arg0  The function argument.
	 * @return {Number}  The refresh request interval in milliseconds.
	 */
	function getRefreshTime(arg0) {
		var time = parseInt(arg0);
		if(!isNaN(time)) {
			return time;
		}

		if(typeof arg0 === "object" && arg0.hasOwnProperty("interval")) {
			time = parseInt(arg0.interval);
			if(!isNaN(time)) {
				return time;
			}
		}

		return 1000 * 60 * 5;
	}



	/**
	 * Set any unset & expected properties to default values in the ajax object.
	 * @param {Object}  ajax      The ajax object to modify.
	 * @param {Number}  interval  The session refresh request interval.
	 */
	function prepareRefreshAjax(ajax, interval) {
		//Set properties
		if(!ajax.hasOwnProperty("data")) {
			ajax.data = {};
		}
		if(!ajax.hasOwnProperty("type")) {
			ajax.type = "get";
		}
		if(!ajax.hasOwnProperty("dataType")) {
			ajax.dataType = "text";
		}

		//Store a success function if set
		var success = ajax.hasOwnProperty("success") && typeof ajax.success === "function" ?
				ajax.success : false;

		//On success, call a set success function then set a timeout to send another AJAX request
		ajax.success = function() {
			if(success) {
				success;
			}
			scheduleSessionRefresh(ajax, interval);
		};
	}



	/**
	 * Set a timeout to send an ajax request to refresh the session.
	 * @param {Object}  ajax      The ajax object.
	 * @param {Number}  interval  The session refresh interval.
	 */
	function scheduleSessionRefresh(ajax, interval) {
		setTimeout(function() {
			$.ajax(ajax);
		}, interval);
	}



})();


