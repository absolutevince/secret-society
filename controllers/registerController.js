const { title } = require("../lib/variables");

const { registrationQuery } = require("../db/query");

const registerController = (function () {
	function get(req, res) {
		res.render("register", { title: title });
	}

	async function post(req, res) {
		console.log(req.body);
		await registrationQuery({
			username: req.body.username,
			password: req.body.password,
		});
		res.redirect("/");
	}

	return { get, post };
})();

module.exports = registerController;
