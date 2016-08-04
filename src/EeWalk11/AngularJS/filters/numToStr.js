


;(function() {
	
	
	
	/**
	 * Get the string value of a number using the JavaScript Number.toString method.
	 * @param {Number}  num    The number to stringify.
	 * @param {Number}  radix  The radix for the string - must be a value between 2 and 36.
	 *                         Defaults to 10.
	 * @return {String|undefined}  The result, undefined if input is invalid. 
	 */
	function numToStr(num, radix) {
		num = Number(num);
		r   = radix ? parseInt(radix) : 10;
		
		//Validate that num is a number and radix is an integer
		if(!isNaN(num) && !isNaN(r) && (!radix || radix == String(r))) {
			try {
				return num.toString(r);
			}
			catch(e) {
				//Range error
			}
		}
	}
	
	
	
	__filters.addFilter({
		name:         "numToStr",
		dependencies: false,
		factory:      function() {return numToStr;}
	});
	
	
	
})();


