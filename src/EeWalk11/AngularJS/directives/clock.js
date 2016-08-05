


;(function() {
	
	
	
	/*
	 * clock
	 * Directive
	 * 
	 * Displays a continually updating clock.
	 * 
	 * 
	 * 
	 * Scope:
	 * 
	 *   clock   The controller object.
	 *   format  The clock format.
	 * 
	 * 
	 * 
	 * Attributes:
	 * 
	 *   format     The clock's format (uses the AngularJS date filter). Defaults to
	 *              "yyyy-MM-dd HH:mm:ss".
	 *   frequency  The frequency of the update in milliseconds. Defaults to 250.
	 *   update     Set to a value that can be parsed as false to disable the clock updating itself.
	 *              Defaults to true.
	 */
	
	
	
	/**
	 * Default clock format.
	 * @type {String}
	 */
	var CLOCK_FORMAT = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * Default clock update frequency - in milliseconds.
	 * @type {Number}
	 */
	var UPDATE_FREQUENCY = 250;
	
	
	
	/**
	 * Schedule an update to the clock. This method will recursively call itself.
	 * @param {clockCtl}  clock     The clock to update.
	 * @param {Function}  $timeout  The AngularJS timeout service.
	 */
	function scheduleUpdate(clock, $timeout) {
		var delay = clock.frequency ? clock.frequency : UPDATE_FREQUENCY;
		$timeout(function() {
			clock.time = new Date();
			scheduleUpdate(clock, $timeout);
		}, delay);
	}
	
	
	
	/**
	 * Set the frequency of the clock update.
	 * @param {clockCtl}  clock      The clock to update.
	 * @param {Number}    frequency  The update frequency. If not an integer, the default frequency
	 *                               will be used.
	 */
	function setFrequency(clock, frequency) {
		frequency = parseInt(frequency);
		if(isNaN(frequency)) {
			delete clock.frequency;
		}
		else {
			clock.frequency = frequency;
		}
	}
	

	
	/**
	 * The clock DDO factory.
	 * @type {Function}
	 */
	__directiveFactories.clock = function($timeout) {
		return {
			restrict:     "E",
			controllerAs: "clock",
			template:     "<div>{{ clock.time | date: format }}</div>",
			
			scope: {
				"format": "@"
			},
			
			controller: function clockCtl() {
				this.time = new Date();
			},
			
			link: function(scope, elem, attrs) {
				if(!scope.format) {
					scope.format = CLOCK_FORMAT;
				}
				
				setFrequency(scope.clock, attrs.frequency);
				
				var disabled = attrs.update && !EeWalk11.parseBoolean(attrs.update);
				if(!disabled) {
					scheduleUpdate(scope.clock, $timeout);
				}
			}
		};
	};
	
	
	
})();


