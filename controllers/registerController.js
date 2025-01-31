const bcrypt = require("bcrypt");
const variables = require("../lib/variables");

const { registrationQuery } = require("../db/query");
const {
	usernameValidation,
	validationResult,
	passwordValidation,
	firstnameValidator,
	lastnameValidator,
} = require("../lib/validations/validations");

const registerController = (function () {
	function get(req, res) {
		if (req.isAuthenticated()) {
			return res.redirect("/");
		}
		res.render("register", { title: variables.title, errors: null });
	}

	const post = (() => {
		return [
			usernameValidation,
			passwordValidation,
			firstnameValidator,
			lastnameValidator,
			async (req, res) => {
				const errors = validationResult(req);

				if (!errors.isEmpty()) {
					return res
						.status(400)
						.render("register", {
							title: variables.title,
							errors: errors.array(),
						});
				}
				await registrationQuery({
					username: req.body.username,
					password: await bcrypt.hash(req.body.password, 10),
					firstname: req.body.firstname,
					lastname: req.body.lastname,
				});
				res.redirect("/login");
			},
		];
	})();

	return { get, post };
})();

module.exports = registerController;
