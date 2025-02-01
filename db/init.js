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
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        joined_clubs_id INTEGER,
        created DATE
    );
`;

const clubs = `
    CREATE TABLE IF NOT EXISTS clubs (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        account_id INTEGER,
        name VARCHAR(255),
        passcode VARCHAR(255),
        created DATE
    )
`;

const posts = `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        club_id INTEGER,
        account_id INTEGER,
        message VARCHAR(255),
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
	await client.query(clubs);
	await client.end();
	console.log("Database init: DONE");
})();
