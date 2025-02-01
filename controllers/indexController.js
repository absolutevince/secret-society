const { queryGet } = require("../db/query");
const variables = require("../lib/variables");

const indexController = (function () {
	async function indexGet(req, res) {
		const userAcc = await queryGet.accountById(req.user.id);

		res.render("index", {
			title: variables.title,
			user: userAcc,
		});
	}

	async function createClubGet(req, res) {}

	return { indexGet, createClubGet };
})();

module.exports = indexController;
