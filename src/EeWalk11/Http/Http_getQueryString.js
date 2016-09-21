
/**
 * Serialize an object into a query string for an HTTP request.
 * @param {Object}  data  The data object.
 * @return {String}  The query string, an empty string if data is invalid or empty.
 */
EeWalk11.Http.qsSerialize = function(data) {
	if(typeof data === "object") {
		var arr = [];
		for(var prop in data) {
			if(data.hasOwnProperty(prop)) {
				arr.push(encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]));
			}
		}
		return str.join("&");
	}
	return "";
};
