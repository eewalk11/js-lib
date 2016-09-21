//Arrays of source files for each gulp task

module.exports = {

	lib: [
		"src/EeWalk11/EeWalk11.js",
		"src/EeWalk11/jQuery/jQuery.js",
		"src/EeWalk11/Event/Event.js",
		"src/EeWalk11/PrivateData.js",

		"src/EeWalk11/*.js",
		"src/EeWalk11/jQuery/*.js",
		"src/EeWalk11/Event/*.js"
	],



	animate: [
		"src/EeWalk11/Animate/Animate.js",
		"src/EeWalk11/Animate/*.js"
	],



	angularjs: [
		"src/EeWalk11/AngularJS/__open.js",
		"src/EeWalk11/AngularJS/__ProviderData.js",

		"src/EeWalk11/AngularJS/filters/__FilterData.js",
		"src/EeWalk11/AngularJS/filters/__filterFactories.js",
		"src/EeWalk11/AngularJS/filters/*.js",

		"src/EeWalk11/AngularJS/directives/__DirectiveData.js",
		"src/EeWalk11/AngularJS/directives/__directiveFactories.js",
		"src/EeWalk11/AngularJS/directives/*.js",

		"src/EeWalk11/AngularJS/createModule.js",
		"src/EeWalk11/AngularJS/__close.js",
	],



	dropbox: [
	   	"src/EeWalk11/Dropbox/Dropbox.js",
		"src/EeWalk11/Dropbox/*.js"
	]

};
