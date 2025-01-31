require("dotenv").config();
const express = require("express");
const path = require("path");
const indexRouter = require("./router/indexRouter");
const loginRouter = require("./router/loginRouter");
const registerRouter = require("./router/registerRouter");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./lib/passportConfig");
const pool = require("./db/pool");
const PgSession = require("connect-pg-simple")(session);

const app = express();

// set ejs as view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		store: new PgSession({
			pool,
			tableName: "session",
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false, httpOnly: true },
	})
);
app.use(passport.session());
passportConfig.init(passport);

/**
 * ROUTES
 */
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.get("/logout", (req, res) => {
	if (req.isAuthenticated()) {
		req.logOut(req.session.cookie.user, () => {
			res.redirect("/login");
		});
		return;
	}
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Express at Port: " + port));
