


/* global EeWalk11 */



;(function()
{



	/*
	 * PRIVATE VARIABLES
	 */



	/**
	 * @type {Array} A queue of images to preload.
	 */
	var list = [];



	/*
	 * PUBLIC FUNCTIONS
	 */



	/**
	 * Load an array of images so that they can be cached in the browser.
	 * <p><b>NOTE:</b> JQuery is required to use this function.</p>
	 * @param {Array} array An array of image sources to preload.
	 * @param {String} base A base directory path to be prepended to all image files. This may be
	 * left undefined.
	 */
	EeWalk11.preloadImages = function(array, base)
	{
		//Exit if array is invalid
		if(!Array.isArray(array) || !array.length)
		{
			return;
		}

		//Make sure a valid base is set
		if(typeof base === "string" && base)
		{
			if(base.substring(base.length - 1) !== "/")
			{
				base += "/";
			}
		}
		else
		{
			base = undefined;
		}

		//Add all images in the array to the queue
		for(var i = 0, len = array.length; i < len; i++)
		{
			var src = getImagePath(array[i], base);
			if(src)
			{
				addImage(src);
			}
		}
	};



	/*
	 * PRIVATE FUNCTIONS
	 */



	/**
	 * Add an image to the queue.
	 * @param {String} path The full image path.
	 */
	function addImage(path)
	{
		var img = new Image();
		img.onload = onLoad;
		list.push(img);
		img.src = path;
	}



	/**
	 * Get a full image path depending on if a base was provided or not.
	 * @param {String} path The image path from the array.
	 * @param {String} base The base image path.
	 * @returns {String|Boolean} The full image path, false if the image path is invalid.
	 */
	function getImagePath(path, base)
	{
		if(typeof path !== "string" || !path)
		{
			return false;
		}
		return base ? base + path : path;
	}



	/**
	 * A function to call when an image is loaded.
	 */
	function onLoad()
	{
		//Remove the image from the queue once it has been loaded
		//This will clear memory that is no longer needed

		var index = list.indexOf(this);
		if(index >= 0)
		{
			list.splice(index, 1);
		}
	}



})();