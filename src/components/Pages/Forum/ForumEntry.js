import React from "react";

import Avatar from "../../../Images/avatar.png";
import reply from "../../../Images/Reply.png";
import "./ForumEntry.css";

const ForumEntry = () => {
	let author = "Hovha";
	let location = "NY";
	let postTitle = "Looking for a brown leather belt for 8/25/19 Vogue Shoot";
	let number = 2;
	let forumPostDate = "Monday 8/12/20";
	return (
		<div className="forumDisplay proxima forumPost">
			<div className="row">
				<div className="col-sm-1">
					<img src={Avatar} alt="avatar" className="forumAvatar" />
				</div>
				<div className="col-sm-9 forumTitle" style={{ textAlign: "left" }}>
					{" "}
					{author} ({location}): {postTitle}
				</div>
				<div className="col-sm-2 reply">
					<img src={reply} alt="reply" />
					<div className="replyNum">{number}</div>
				</div>
			</div>
			<div className="row forumPostDate">
				<div className="col-sm-1">&nbsp;</div>
				<div className="col-sm-3 left ">{forumPostDate}</div>
				<div className="col-sm-8">&nbsp;</div>
			</div>
			<div className="row forumLine">
				<div className="col-sm-1">&nbsp;</div>
				<div className="col-sm-10">
					<hr className="forumHorizontalLine" />
				</div>
				<div className="col-sm-1">&nbsp;</div>
			</div>
			<div className="row forumPostFooter">
				<div className="col-sm-1">&nbsp;</div>
				<div className="col-sm-4 left">Lar C. replied 30 min ago</div>
				<div className="col-sm-1">&nbsp;</div>
				<div className="col-sm-6 left">
					<span className=" forumPostTag">Accessories</span>
					<span className=" forumPostTag">In search of</span>
					<span className=" forumPostTag">Skirt</span>
				</div>
			</div>
		</div>
	);
};

export default ForumEntry;
