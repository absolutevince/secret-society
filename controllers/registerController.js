const bcrypt = require("bcrypt");

const { title } = require("../lib/variables");

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
		res.render("register", { title: title, errors: null });
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
					console.log(errors);
					return res
						.status(400)
						.render("register", { title: title, errors: errors });
				}
				await registrationQuery({
					username: req.body.username,
					password: await bcrypt.hash(req.body.password, 10),
					firstname: req.body.firstname,
					lastname: req.body.lastname,
				});
				res.redirect("/");
			},
		];
	})();

	return { get, post };
})();

module.exports = registerController;
