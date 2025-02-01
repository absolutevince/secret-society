const { queryGet, queryInsert } = require("../db/query");
const formatPost = require("../lib/formatPost");
const getClubPosition = require("../lib/getClubPosition");
const variables = require("../lib/variables");

const indexController = (function () {
	//GET

	async function indexGet(req, res) {
		const account = await queryGet.accountById(req.user.id);
		const allClubs = await queryGet.allClubs();

		res.render("index", {
			title: variables.title,
			account,
			allClubs,
		});
	}

	async function createClubGet(req, res) {
		const account = await queryGet.accountById(req.user.id);
		res.render("create-club", {
			title: variables.title,
			error: variables.errorMesssage,
			accountId: req.params.accountId,
			account,
		});

		variables.errorMesssage = "";
	}

	async function clubGet(req, res) {
		const account = await queryGet.accountById(req.user.id);
		const allClubs = await queryGet.allClubs();
		const club = await queryGet.club(req.params.clubId);
		const posts = await queryGet.posts(req.params.clubId);
		const position = await getClubPosition(account.id, req.params.clubId);

		const formattedPosts = await formatPost(posts);

		res.render("club", {
			title: variables.title,
			club,
			position,
			allClubs,
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
		await queryInsert.club({
			accountId: req.params.accountId,
			name: req.body.name,
		});

		const club = await queryGet.newestClub();
		await queryInsert.member({
			accountId: req.params.accountId,
			clubId: club.id,
			position: "admin",
		});
		res.redirect(`/club/${club.id}`);
	}

	async function joinClubPost(req, res) {
		await queryInsert.member({
			clubId: req.params.clubId,
			accountId: req.params.accountId,
			position: "member",
		});
		res.redirect(`/club/${req.params.clubId}`);
	}

	return {
		indexGet,
		createClubGet,
		createClubPost,
		clubGet,
		createPostGet,
		createPostPost,
		joinClubPost,
	};
})();

module.exports = indexController;
