const pool = require("./pool");

// INSERT
const queryInsert = (() => {
	async function registerUser({ username, password, firstname, lastname }) {
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

	async function registerClub({ accountId, name, passcode }) {
		await pool.query(
			"INSERT INTO	clubs (account_id, name, passcode, created) VALUES ($1,$2,$3,$4)",
			[
				accountId,
				name,
				passcode,
				new Intl.DateTimeFormat("en-CA").format(new Date()),
			]
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

	return { registerUser, registerClub, post };
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

	async function posts(clubId) {
		const { rows } = await pool.query(
			`SELECT * FROM posts WHERE club_id = '${clubId}'`
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
		posts,
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
	async function joinedClubs() {}

	return { joinedClubs };
})();

module.exports = { queryGet, queryFind, queryInsert, querySet };
