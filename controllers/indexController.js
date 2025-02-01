const bcrypt = require("bcrypt");
const { queryGet, queryInsert } = require("../db/query");
const variables = require("../lib/variables");

const indexController = (function () {
	//GET

	async function indexGet(req, res) {
		const account = await queryGet.accountById(req.user.id);

		res.render("index", {
			title: variables.title,
			account: account,
		});
	}

	async function createClubGet(req, res) {
		res.render("create-club", {
			title: variables.title,
			error: variables.errorMesssage,
		});

		variables.errorMesssage = "";
	}

	async function clubGet(req, res) {
		const account = await queryGet.accountById(req.user.id);
		const club = await queryGet.club(req.params.id);
		const admin = account.id === club.account_id;
		res.render("club", { title: variables.title, club, admin, account });
	}

	// POST

	async function createClubPost(req, res) {
		const account = await queryGet.accountById(req.user.id);
		await queryInsert.registerClub({
			accountId: account.id,
			name: req.body.name,
			passcode: req.body.passcode,
		});

		const club = await queryGet.club(account.id, req.params.id);
		console.log(club);
		res.redirect(`/club/${thisClub.id}`, { title: variables.title });
	}

	return { indexGet, createClubGet, createClubPost, clubGet };
})();

module.exports = indexController;
