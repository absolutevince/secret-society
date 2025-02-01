const pool = require("./pool");

async function registrationQuery({ username, password, firstname, lastname }) {
	// adds user's creds into the 'users' table
	await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
		username,
		password,
	]);

	await pool.query(
		"INSERT INTO accounts (userid, firstname, lastname,created) VALUES ($1, $2, $3, $4)",
		[
			await queryGet.userId(username),
			firstname,
			lastname,
			new Intl.DateTimeFormat("en-CA").format(new Date()), // formats the new data into "YYYY-MM-DD"
		]
	);
}

const queryGet = (() => {
	async function user(username) {
		const { rows } = await pool.query(`
			SELECT * FROM users WHERE username = '${username}'
		`);

		return rows[0];
	}

	async function accountById(id) {
		const { rows } = await pool.query(`
			SELECT * FROM accounts WHERE userid = '${id}'
		`);

		return rows[0];
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
	return { userId, userName, user, userById, accountById };
})();

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

module.exports = { registrationQuery, queryGet, queryFind };
