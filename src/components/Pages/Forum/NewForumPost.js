import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { newForumPost } from "../../../Store/Action/userAction";
import Button from "../../../Shared/UIElements/Button/Button";

const NewForumPost = () => {
	const [postTitle, setPostTitle] = useState("My First Post");
	const [postText, setPostText] = useState("Post Content");
	const [options, setOptions] = useState({
		all: false,
		accessories: false,
		tops: false,
		bottoms: false,
		inSearchOf: false,
		assistant: false,
	});

	const textChange = (e) => {
		console.log(e.target.name);
		e.target.name === "postTitle"
			? setPostTitle(e.target.value)
			: setPostText(e.target.value);
	};

	const radioChange = (e) => {
		e.persist();
		setOptions((prevState) => ({
			...prevState,
			[e.target.name]: !options[e.target.name],
		}));
	};

	const history = useHistory();
	const dispatch = useDispatch();

	let user_id = 1;

	const handleSubmit = (e) => {
		e.preventDefault();

		let selectedTags = [];

		for (const [key, value] of Object.entries(options)) {
			if (value === true) selectedTags.push(key);
		}

		dispatch(
			newForumPost(
				user_id,
				e.target.postTitle.value,
				e.target.postText.value,
				selectedTags
			)
		);

		setPostText("");
		setPostTitle("");

		history.goBack();
	};
	return (
		<React.Fragment>
			<div className="center">
				<div className="row">
					<div className="col-md-3 pageNav">
						<span style={{ textDecoration: "underline" }}>
							<Button to="/dashBoard">Home</Button>
						</span>
						/{" "}
						<span style={{ textDecoration: "underline" }}>
							<Button to="/forum">Forum</Button>
						</span>{" "}
						/ New Post
					</div>
					<div className="col col-md-8 left">
						<h1 className="pageTitle">CREATE NEW POST</h1>
					</div>
					<div className="col-md-1"></div>
				</div>

				<div className="row">
					<div className="col-sm-2"></div>
					<div className="col-sm-8 forumDisplay">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text">Title:</span>
									</div>
									<input
										type="text"
										className="form-control"
										placeholder="Enter Post Title here"
										name="postTitle"
										value={postTitle}
										onChange={textChange}
										required
									/>
								</div>

								<textarea
									className="form-control"
									rows="10"
									placeholder="Enter Post here"
									name="postText"
									value={postText}
									onChange={textChange}
									required></textarea>

								<h5 style={{ paddingTop: "20px" }}>Select Tags</h5>

								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="checkbox"
										name="all"
										onChange={radioChange}
									/>
									<label className="form-check-label" htmlFor="inlineCheckbox1">
										ALL
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="checkbox"
										name="accessories"
										onChange={radioChange}
									/>
									<label className="form-check-label" htmlFor="inlineCheckbox2">
										ACCESSORIES
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="checkbox"
										name="tops"
										onChange={radioChange}
									/>
									<label className="form-check-label" htmlFor="inlineCheckbox3">
										TOPS
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="checkbox"
										name="bottoms"
										onChange={radioChange}
									/>
									<label className="form-check-label" htmlFor="inlineCheckbox3">
										BOTTOMS
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="checkbox"
										name="inSearchOf"
										onChange={radioChange}
									/>
									<label className="form-check-label" htmlFor="inlineCheckbox3">
										IN SEARCH OF
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="checkbox"
										name="assistant"
										onChange={radioChange}
									/>
									<label className="form-check-label" htmlFor="inlineCheckbox3">
										ASSISTANT
									</label>
								</div>
							</div>
							<Button type="submit" className="saveBtn">
								Submit
							</Button>
						</form>
					</div>
					<div className="col-sm-2"></div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default NewForumPost;
