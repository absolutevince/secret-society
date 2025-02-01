require("dotenv").config();
const fs = require("fs");
const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
	user: process.env.DB_USER,
	port: process.env.DB_PORT,
	host: process.env.DB_HOST,
	password: process.env.DB_PW,
	database: process.env.DB_DB,
	ssl: {
		rejectUnauthorized: true,
		ca: fs.readFileSync("./ca.pem").toString(),
	},
});
