const { title } = require("../lib/variables");

const indexController = (function () {
	function get(req, res) {
		res.render("index", { title: title, user: undefined });
	}

	return { get };
})();

module.exports = indexController;
