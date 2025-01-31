const { queryGet } = require("../db/query");
const variables = require("../lib/variables");

const indexController = (function () {
	async function get(req, res) {
		if (!req.isAuthenticated()) {
			return res.redirect("/login");
		}
		const userAcc = await queryGet.accountById(req.user.id);
		res.render("index", {
			title: variables.title,
			user: userAcc,
		});
		console.log(req.session);
	}

	return { get };
})();

module.exports = indexController;
