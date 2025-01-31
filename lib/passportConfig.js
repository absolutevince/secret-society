const bcrypt = require("bcrypt");
const { queryGet } = require("../db/query");
const LocalStrategy = require("passport-local").Strategy;
const variables = require("../lib/variables");

module.exports = (function passportConfig() {
	function init(passport) {
		passport.use(
			new LocalStrategy(
				{ passReqToCallback: true },
				async (req, username, password, done) => {
					try {
						const user = await queryGet.user(username);
						if (!user) {
							variables.errorMesssage = "Incorrect Username";
							return done(null, false);
						}

						if (await bcrypt.compare(password, user.password)) {
							console.log("login success");
							return done(null, user);
						}
						variables.errorMesssage = "Incorrect Password";
						return done(null, false);
					} catch (err) {
						return done(err);
					}
				}
			)
		);
		passport.serializeUser((user, done) => done(null, user.id));
		passport.deserializeUser(async (id, done) => {
			return done(null, await queryGet.userById(id));
		});
	}

	return { init };
})();
