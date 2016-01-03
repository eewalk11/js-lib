


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
	 * Get the value of a cookie.
	 * <p>The page's cookies will be loaded the first time this function is called. The value of all
	 * cookies at that time will be cached and used for subsequent calls unless the reload flag is
	 * set.</p>
	 * @param {String} name The name of the cookie to get a value for.
	 * @param {Boolean} reload Pass true to reload the cookie cache.
	 * @return {mixed} The cookie value or undefined.
	 */
	EeWalk11.getCookie = function(name, reload)
	{
        if(!cookies || reload)
		{
			//Load cookies into the array.
			var str = document.cookie.split("; ");
			cookies = {};
			for(var i = str.length - 1; i >= 0; i--)
			{
				var curr = str[i].split("=");
				cookies[curr[0]] = curr[1];
			}
		}

		return cookies[name];
	};



	/**
	 * @type {Object} Cookie data will be loaded into this object.
	 */
	var cookies;



})();


