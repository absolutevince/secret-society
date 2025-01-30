const { title } = require("../lib/variables");

const indexController = (function () {
	function get(req, res) {
		res.render("index", { title: title });
	}

	return { get };
})();

module.exports = indexController;
