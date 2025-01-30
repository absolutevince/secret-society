const { title } = require("../lib/variables");

const registerController = (function () {
	function get(req, res) {
		res.render("register", { title: title });
	}

	return { get };
})();

module.exports = registerController;
