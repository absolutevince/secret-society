const { title } = require("../lib/variables");

const loginController = (function () {
	function get(req, res) {
		res.render("login", { title: title });
	}

	return { get };
})();

module.exports = loginController;
