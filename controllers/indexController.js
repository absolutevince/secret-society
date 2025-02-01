const { queryGet, queryInsert } = require("../db/query");
const formatPost = require("../lib/formatPost");
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
			accountId: req.params.accountId,
		});

		variables.errorMesssage = "";
	}

	async function clubGet(req, res) {
		const account = await queryGet.accountById(req.user.id);
		const club = await queryGet.club(req.params.clubId);
		const posts = await queryGet.posts(req.params.clubId);
		let admin;
		if (club) {
			admin = account.id === club.account_id;
		}
		const formattedPosts = await formatPost(posts);

		res.render("club", {
			title: variables.title,
			club,
			admin,
			account,
			posts: formattedPosts,
		});
	}

	async function createPostGet(req, res) {
		res.render("create-post", {
			title: variables.title,
			clubId: req.params.clubId,
			accountId: req.params.accountId,
			error: "",
		});
	}

	// POST

	async function createPostPost(req, res) {
		await queryInsert.post({
			message: req.body.message,
			clubId: req.params.clubId,
			accountId: req.params.accountId,
		});

		res.redirect(`/club/${req.params.clubId}`);
	}

	async function createClubPost(req, res) {
		await queryInsert.registerClub({
			accountId: req.params.accountId,
			name: req.body.name,
			passcode: req.body.passcode,
		});

		const club = await queryGet.club(req.params.accountId, req.params.id);
		console.log(club);
		res.redirect(`/club/${club.id}`);
	}

	return {
		indexGet,
		createClubGet,
		createClubPost,
		clubGet,
		createPostGet,
		createPostPost,
	};
})();

module.exports = indexController;
