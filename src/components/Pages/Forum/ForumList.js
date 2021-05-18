import React from "react";

import ForumEntry from "./ForumEntry";

const ForumList = ({ userForumPost, dashboard }) => {
	if (!userForumPost.length) {
		return (
			<div class="proxima" style={{ fontSize: "30px" }}>
				<p>No Post, Create One</p>
				<p>Or Browse the Forums</p>
			</div>
		);
	}
	if (dashboard) {
		return (
			<div>
				<ForumEntry
					title={userForumPost[userForumPost.length - 1].title}
					content={userForumPost[userForumPost.length - 1].body}
					tags={userForumPost[userForumPost.length - 1].tags}
					date={userForumPost[userForumPost.length - 1].date_created}
					reply_user_id={userForumPost[userForumPost.length - 1].reply_user_id}
					reply_date={userForumPost[userForumPost.length - 1].reply_date}
				/>
			</div>
		);
	}

	return userForumPost.map((post, index) => {
		return (
			<div>
				<ForumEntry
					key={index}
					title={post.title}
					content={post.body}
					tags={post.tags}
					date={post.date_created}
					reply_user_id={post.reply_user_id}
					reply_date={post.reply_date}
				/>
			</div>
		);
	});
};

export default ForumList;
