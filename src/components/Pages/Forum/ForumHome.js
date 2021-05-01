import React from "react";

import Button from "../../../Shared/UIElements/Button/Button";
import ForumEntry from "./ForumEntry";
import "./ForumHome.css";
const ForumHome = () => {
	return (
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
							<input type="text" placeholder="SEARCH" className="forumSearch" />
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
				{/* <div className="col-md-1 d-none"></div> */}
				<div className="col-md-9">
					<ForumEntry />
				</div>
			</div>
		</div>
	);
};

export default ForumHome;
