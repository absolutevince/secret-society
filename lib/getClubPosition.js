const { queryGet } = require("../db/query");

async function getClubPosition(accountId, clubId) {
	const members = await queryGet.members(clubId);
	let position;
	if (members.length > 0) {
		members.forEach((member) => {
			if (member.account_id === accountId) {
				position = member.position;
			} else {
				position = "non-member";
			}
		});
	} else {
		position = "non-member";
	}

	return position;
}

module.exports = getClubPosition;
