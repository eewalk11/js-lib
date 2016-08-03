//Gulp tasks for which files must be included given a running task

module.exports = {
	lib:     ["lib", "animate", "dropbox"],
	animate: ["lib", "animate"],
	dropbox: ["lib", "animate", "dropbox"]
};
