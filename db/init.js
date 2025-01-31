require("dotenv").config();
const { Client } = require("pg");

const users = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(255),
        password VARCHAR(255)
    );
`;

const accounts = `
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        created DATE
    );
`;

const posts = `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER,
        title VARCHAR(255),
        description VARCHAR(255),
        created DATE
    );
`;

(async function () {
	console.log("Database init: In-progress");
	const client = new Client({
		connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.DB_PW}@localhost:5432/${process.env.DB}`,
	});

	await client.connect();
	await client.query(users);
	await client.query(accounts);
	await client.query(posts);
	await client.end();
	console.log("Database init: DONE");
})();
