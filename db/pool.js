const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.DB_PW}@localhost:5432/${process.env.DB}`,
});
