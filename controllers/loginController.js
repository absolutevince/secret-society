const variables = require("../lib/variables");

const loginController = (function () {
	function get(req, res) {
		res.render("login", {
			title: variables.title,
			error: variables.errorMesssage, // global variables
			account: "",
		});
		// if not cleared the error Message will appear all the time
		variables.errorMesssage = "";
	}

	function post(req, res) {
		res.redirect("/");
	}

	return { get, post };
})();

module.exports = loginController;
