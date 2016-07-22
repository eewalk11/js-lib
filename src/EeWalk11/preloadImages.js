


;(function() {




	/**
	 * A queue of images to preload.
	 * @type {Array}
	 */
	var list;



	/**
	 * Load an array of images so that they can be cached in the browser.<br>
	 * <b>NOTE:</b> JQuery is required to use this function.
	 * @param {Array}   arr   An array of image sources to preload.
	 * @param {String}  base  <i>Optional</i> A base URI to be applied to all image files.
	 */
	EeWalk11.preloadImages = function(arr, base) {
		init();

		//Exit if array is invalid
		if(!Array.isArray(arr) || !arr.length) {
			return;
		}

		//Make sure a valid base is set
		if(typeof base === "string" && base) {
			if(base.substring(base.length - 1) !== "/") {
				base += "/";
			}
		}
		else {
			base = undefined;
		}

		//Add all images in the array to the queue
		for(var i = 0, len = arr.length; i < len; i++) {
			var src = getImagePath(arr[i], base);
			if(src) {
				addImage(src);
			}
		}
	};



	/**
	 * Add an image to the queue.
	 * @param {String}  path  The full image path.
	 */
	function addImage(path) {
		var img    = new Image();
		img.onload = onLoad;
		list.push(img);
		img.src    = path;
	}



	/**
	 * Get a full image path depending on if a base was provided or not.
	 * @param {String}  path  The image path from the array.
	 * @param {String}  base  The base image path.
	 * @return {String|Boolean}  The full image path, false if the image path is invalid.
	 */
	function getImagePath(path, base) {
		if(typeof path !== "string" || !path) {
			return false;
		}
		return base ? base + path : path;
	}



	/**
	 * Initialize the queue.
	 */
	function init() {
		if(typeof list === "undefined") {
			list = [];
		}
	}



	/**
	 * A function to call when an image is loaded.
	 */
	function onLoad() {
		//Remove the image from the queue once it has been loaded
		//This will clear memory that is no longer needed
		var index = list.indexOf(this);
		if(index >= 0) {
			list.splice(index, 1);
		}
	}



})();


