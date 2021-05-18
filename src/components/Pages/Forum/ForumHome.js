import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../Shared/UIElements/Button/Button";
import ForumList from "./ForumList";
import LoadingSpinner from "../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../Shared/UIElements/ErrorModal/ErrorModal";
import { fetchForumPost } from "../../../Store/Action/userAction";
import { clearErrors } from "../../../Store/Action/errorAction";
import "./ForumHome.css";
const ForumHome = () => {
	const dispatch = useDispatch();
	let user_id = 1;
	const userForumPost = useSelector((state) => state.user.forumPost);

	// console.log(userForumPost);

	useEffect(() => {
		dispatch(fetchForumPost(user_id));
	}, [dispatch, user_id]);

	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const clearError = () => {
		dispatch(clearErrors());
	};

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading || userForumPost === undefined ? (
				<div className="center drop">
					<LoadingSpinner />
				</div>
			) : (
				<div className="center">
					<div className="row">
						<div className="col-md-2 pageNav">
							<span style={{ textDecoration: "underline" }}>
								<Button to="/dashBoard">Home</Button>
							</span>
							/ Forum
						</div>
						<div className="col col-md-9">
							<h1 className="pageTitle">FORUM</h1>
						</div>
						<div className="col-md-1"></div>
					</div>

					<div className="row">
						<div className="col-md-3 forumDisplay">
							<div className="container center forumSideBarNav">
								<div className="col">
									<input
										type="text"
										placeholder="SEARCH"
										className="forumSearch"
									/>
								</div>
								<div className="col" style={{ marginBottom: "40px" }}>
									<Button
										style={{ fontSize: "10px" }}
										to="/forum/newForumPost"
										className="blue-button">
										CREATE NEW{" "}
									</Button>
								</div>
								<div className="col left proxima">
									<div
										className="hover forumTag "
										onClick={() => {
											console.log("All");
										}}>
										ALL
									</div>
									<div
										className="hover forumTag"
										onClick={() => {
											console.log("Accessories");
										}}>
										ACCESSORIES
									</div>
									<div
										className="hover forumTag"
										onClick={() => {
											console.log("Tops");
										}}>
										TOPS
									</div>
									<div
										className="hover forumTag"
										onClick={() => {
											console.log("Bottoms");
										}}>
										BOTTOMS
									</div>
									<div
										className="hover forumTag"
										onClick={() => {
											console.log("In search of");
										}}>
										IN SEARCH OF
									</div>
									<div
										className="hover forumTag"
										onClick={() => {
											console.log("Assistant");
										}}>
										ASSISTANT
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-9">
							<ForumList userForumPost={userForumPost} />
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default ForumHome;
