


;(function() {
	
	
	
	/**
	 * Get a number from the num argument.
	 * @param {unknown}  num  The num argument.
	 * @return {Number|Number.NaN}  The result.
	 */
	function getNum(num) {
		//0 is the only valid falsey value
		return !num && num !== 0 ? Number.NaN : Number(num);
	}
	
	
	
	/**
	 * Get a radix from the radix argument.
	 * @param {unknown}  radix  The radix argument.
	 * @return {Number|Number.NaN}  The result.
	 */
	function getRadix(radix) {
		if(!radix && radix !== 0) {
			return 10;
		}
		return EeWalk11.isIntish(radix) ? parseInt(radix) : Number.isNaN;
	}
	
	
	
	/**
	 * Get the string value of a number using the JavaScript Number.toString method.
	 * @param {Number}  num    The number to stringify.
	 * @param {Number}  radix  The radix for the string - must be a value between 2 and 36.
	 *                         Defaults to 10.
	 * @return {String|undefined}  The result, undefined if input is invalid. 
	 */
	function numToStr(num, radix) {
		num   = getNum(num);
		radix = getRadix(radix);
		
		if(!isNaN(num) && !isNaN(radix)) {
			try {
				return num.toString(radix);
			}
			catch(e) {
				//Range error
			}
		}
	}
	
	
	
	/**
	 * The numToStr filter factory.
	 * @type {Function}
	 */
	__filterFactories.numToStr = function() {
		return numToStr;
	};
	
	
	
})();


