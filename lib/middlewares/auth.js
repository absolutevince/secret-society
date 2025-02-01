function authenticateUser(req, res, next) {
	if (!req.isAuthenticated()) {
		res.redirect("/login");
	} else {
		next();
	}
}

function deaunthenticateUser(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect("/");
	} else {
		next();
	}
}

module.exports = { authenticateUser, deaunthenticateUser };
