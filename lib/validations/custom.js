const { queryFind } = require("../../db/query");

async function isUserNotExist(value) {
	if (await queryFind.userName(value)) {
		throw new Error("username already in use");
	}

	return true;
}

function notHaveSpacesBetween(value) {
	if (value.includes(" ")) {
		throw new Error("password must not contain whitespaces");
	}
	return true;
}

module.exports = { isUserNotExist, notHaveSpacesBetween };
