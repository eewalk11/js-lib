//Gulp tasks for which files must be included given a running task

module.exports = {
	lib:       ["lib", "animate", "angularjs", "dropbox"],
	animate:   ["lib", "animate"],
	angularjs: ["lib", "angularjs"],
	dropbox:   ["lib", "animate", "dropbox"]
};
