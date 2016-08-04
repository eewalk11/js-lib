//Gulp tasks for which files must be included given a running task

module.exports = {
	lib:       ["lib", "animate", "angularjs", "dropbox"],
	animate:   ["lib", "animate"],
	angularjs: ["angularjs"],
	dropbox:   ["lib", "animate", "dropbox"]
};
