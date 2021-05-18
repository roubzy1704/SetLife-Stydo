import React from "react";

import Avatar from "../../../Images/avatar.png";
import reply from "../../../Images/Reply.png";
import "./ForumEntry.css";

const ForumEntry = ({
	title,
	content,
	tags,
	date,
	reply_user_id,
	reply_date,
}) => {
	let author = "Hovha";
	let location = "NY";
	let number = 2;
	let forumPostDate = "Monday 8/12/20";

	console.log(date);
	// const dateoption = {
	// 	year:
	// }

	return (
		<div
			className="forumDisplay proxima forumPost"
			onClick={() => console.log("click")}
			style={{ cursor: "pointer" }}>
			<div className="row">
				<div className="col-sm-1">
					<img src={Avatar} alt="avatar" className="forumAvatar" />
				</div>
				<div className="col-sm-9" style={{ textAlign: "left" }}>
					<span class="forumTitle">
						{author} ({location}): {title}
					</span>
					<br />
					<p>{content}</p>
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
					{tags.map((tag, index) => {
						return (
							<span className=" forumPostTag" key={index}>
								{tag}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ForumEntry;
