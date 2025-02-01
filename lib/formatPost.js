const { queryGet } = require("../db/query");

async function formatPost(posts) {
	const arr = [];
	for (let i = 0; i < posts.length; i++) {
		arr.push({
			message: posts[i].message,
			author: await queryGet.accountNameById(posts[i].account_id),
			created: posts[i].created,
		});
	}
	return arr;
}

module.exports = formatPost;
