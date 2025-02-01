const pool = require("./pool");

// INSERT
const queryInsert = (() => {
	async function user({ username, password, firstname, lastname }) {
		// adds user's creds into the 'users' table
		await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
			username,
			password,
		]);

		await pool.query(
			"INSERT INTO accounts (user_id, firstname, lastname,created) VALUES ($1, $2, $3, $4)",
			[
				await queryGet.userId(username),
				firstname,
				lastname,
				new Intl.DateTimeFormat("en-CA").format(new Date()), // formats the new data into "YYYY-MM-DD"
			]
		);
	}

	async function club({ accountId, name }) {
		await pool.query(
			"INSERT INTO	clubs (account_id, name, created) VALUES ($1,$2,$3)",
			[accountId, name, new Intl.DateTimeFormat("en-CA").format(new Date())]
		);
	}

	async function post({ accountId, clubId, message }) {
		await pool.query(
			"INSERT INTO	posts (club_id, account_id, message, created) VALUES ($1,$2,$3,$4)",
			[
				clubId,
				accountId,
				message,
				new Intl.DateTimeFormat("en-CA").format(new Date()),
			]
		);
	}

	async function member({ accountId, clubId, position }) {
		await pool.query(
			"INSERT INTO members (account_id, club_id, position, joined_date) VALUES ($1,$2,$3,$4)",
			[
				accountId,
				clubId,
				position,
				new Intl.DateTimeFormat("en-CA").format(new Date()),
			]
		);
	}

	return { user, club, post, member };
})();

// GET
const queryGet = (() => {
	async function user(username) {
		const { rows } = await pool.query(`
			SELECT * FROM users WHERE username = '${username}'
		`);

		return rows[0];
	}

	async function accountById(id) {
		const { rows } = await pool.query(`
			SELECT * FROM accounts WHERE user_id = '${id}'
		`);

		return rows[0];
	}

	async function accountNameById(id) {
		const { rows } = await pool.query(`
			SELECT firstname, lastname FROM accounts WHERE user_id = ${id}
		`);

		return { firstname: rows[0].firstname, lastname: rows[0].lastname };
	}

	async function userById(id) {
		const { rows } = await pool.query(`
			SELECT * FROM users WHERE id = '${id}'
		`);

		return rows[0];
	}

	async function userId(username) {
		const { rows } = await pool.query(
			`SELECT id FROM users WHERE username = '${username}'`
		);
		return rows[0].id;
	}

	async function userName(id) {
		const { rows } = await pool.query(
			`SELECT username FROM users WHERE id = '${id}'`
		);
		return rows[0].username;
	}

	async function club(clubId) {
		const { rows } = await pool.query(
			`SELECT * FROM clubs WHERE id = '${clubId}'`
		);
		return rows[0];
	}

	async function newestClub() {
		const { rows } = await pool.query(`SELECT * FROM clubs`);
		return rows[rows.length - 1];
	}

	async function allClubs() {
		const { rows } = await pool.query(`SELECT * FROM clubs`);
		return rows;
	}

	async function posts(clubId) {
		const { rows } = await pool.query(
			`SELECT * FROM posts WHERE club_id = '${clubId}'`
		);
		return rows;
	}

	async function members(clubId) {
		const { rows } = await pool.query(
			`SELECT * FROM members WHERE club_id = ${clubId}`
		);
		return rows;
	}

	return {
		userId,
		userName,
		user,
		userById,
		accountById,
		accountNameById,
		club,
		allClubs,
		posts,
		members,
		newestClub,
	};
})();

// FIND
const queryFind = (() => {
	async function userId(id) {
		const { rows } = await pool.query(
			`SELECT id FROM users WHERE username = '${id}'`
		);
		if (rows[0].id) return true;
		return false;
	}

	async function userName(username) {
		const { rows } = await pool.query(
			`SELECT username FROM users WHERE username = '${username}'`
		);

		if (rows.length !== 0) return true;
		return false;
	}
	return { userId, userName };
})();

// SET
const querySet = (() => {
	async function clubMembers() {
		// REMOVE this?
	}

	return { clubMembers };
})();

module.exports = { queryGet, queryFind, queryInsert, querySet };
