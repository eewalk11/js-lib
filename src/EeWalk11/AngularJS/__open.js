
;(function() {
	
	//Define base namespace - the base library is not required for this one
	if(typeof EeWalk11 === "undefined") {
		EeWalk11 = {};
	}
	
	//Define AngularJS namespace
	if(typeof EeWalk11.AngularJS === "undefined") {
		
		/**
		 * Create the AngularJS module.
		 * @constructor
		 */
		EeWalk11.AngularJS = function() {
			return createModule();
		};
		
	}
