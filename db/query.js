const pool = require("./pool");

async function registrationQuery({ username, password }) {
	// adds user's creds into the 'users' table
	await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
		username,
		password,
	]);
	// create a separate table for this user
	await pool.query(
		` 
    CREATE TABLE ${username.toLowerCase()} (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title VARCHAR(255),
      description VARCHAR(255)
    )`
	);
}

module.exports = { registrationQuery };
