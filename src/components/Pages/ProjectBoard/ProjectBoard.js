import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../Shared/UIElements/Button/Button";
import { fetchAllProjects } from "../../../Store/Action/projectAction";
import LoadingSpinner from "../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import { clearErrors } from "../../../Store/Action/errorAction";
import ErrorModal from "../../../Shared/UIElements/ErrorModal/ErrorModal";
import TabDisplay from "../../../Shared/UIElements/Tabs/TabDisplay";
import moodBoardImg from "../../../Images/moodBoard.png";
import contacts from "../../../Images/contacts.png";
import requests from "../../../Images/requests.png";
import emailTemplates from "../../../Images/emailTemplate.png";
import callSheet from "../../../Images/callSheet.png";
import budgetReceipts from "../../../Images/budgetReceipts.png";
import files from "../../../Images/files.png";
import pullInventory from "../../../Images/pullInventory.png";
import Archive from "../../../Images/archive.png";
import "./ProjectBoard.css";
import "../../../Shared/UIElements/Shared.css";
import { fetchProjectBoard } from "../../../Store/Action/projectBoardAction";

const ProjectBoard = (props) => {
	const projectId = useParams().projectId;
	const allProjects = useSelector((state) => state.projects.project);
	console.log(allProjects);
	let allUserProjects = allProjects.filter(
		(proj) => proj.projectId === parseInt(projectId)
	);
	let userProject = allUserProjects[0];
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const clearError = () => {
		dispatch(clearErrors());
	};

	const dispatch = useDispatch();
	let user_id = 1;

	//this useEffect helps repopulate the page when refreshed, if this use effect is absent and userProject === undefined
	//is absent, the page will crash, my goal was to figure out a way to preserve data on page refresh.
	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
		// dispatch(fetchProjectBoard) //? DO I HAVE TO ADD THIS?
	}, [dispatch, user_id]);

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading || userProject === undefined ? (
				<div className="center drop">
					<LoadingSpinner />
				</div>
			) : (
				!isLoading &&
				userProject && (
					<div className="container-fluid center">
						<div className="pageNav">
							<span style={{ textDecoration: "underline" }}>
								<Button to="/dashBoard">Home </Button>
							</span>{" "}
							/{" "}
							<span style={{ textDecoration: "underline" }}>
								<Button to="/projectHome">Projects </Button>
							</span>{" "}
							/ {userProject.projectName}
						</div>
						<div className="moodTitle">
							{userProject.projectName}/ {userProject.productionDate}
						</div>
						<div className="projectBoardLine center">
							<hr></hr>
						</div>
						<div className="row">
							<div className="col-md-4 projectBoardEntry">
								<Button to={`/ProjectBoard/${userProject.projectId}/moodBoard`}>
									{/* <Button onClick={handleClick}> */}
									<div className="row boardEntry">
										<div className="col-sm-2 icon ">
											<img src={moodBoardImg} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>MOOD BOARD</p>
										</div>
									</div>
								</Button>
								<Button to={`/ProjectBoard/${userProject.projectId}/contacts`}>
									<div className="row boardEntry">
										<div className="col-sm-2 icon">
											<img src={contacts} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>CONTACTS</p>
										</div>
									</div>
								</Button>
								<Button
									to={`/ProjectBoard/${userProject.projectId}/${user_id}/requests`}>
									<div className="row boardEntry">
										<div className="col-sm-2 icon">
											<img src={requests} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>REQUESTS</p>
										</div>
									</div>
								</Button>
								<Button
									to={`/ProjectBoard/${userProject.projectId}/${user_id}/emailTemplates`}>
									<div className="row boardEntry">
										<div className="col-sm-2 icon">
											<img src={emailTemplates} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>EMAIL TEMPLATES</p>
										</div>
									</div>
								</Button>
								<Button to={`/ProjectBoard/${userProject.projectId}/callSheet`}>
									<div className="row boardEntry">
										<div className="col-sm-2 icon">
											<img src={callSheet} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>CALL SHEET</p>
										</div>
									</div>
								</Button>
								<Button
									to={`/ProjectBoard/${userProject.projectId}/budgetReceipts`}>
									<div className="row boardEntry">
										<div className="col-sm-2 icon">
											<img src={budgetReceipts} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>BUDGET / RECEIPTS</p>
										</div>
									</div>
								</Button>
								<Button to={`/ProjectBoard/${userProject.projectId}/files`}>
									<div className="row boardEntry">
										<div className="col-sm-2 icon">
											<img src={files} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>FILES</p>
										</div>
									</div>
								</Button>
								<Button
									to={`/ProjectBoard/${userProject.projectId}/pullInventory`}>
									<div className="row boardEntry">
										<div className="col-sm-2 ">
											<img src={pullInventory} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>PULL INVENTORY</p>
										</div>
									</div>
								</Button>
								<Button to={`/ProjectBoard/${userProject.projectId}/archive`}>
									<div className="row boardEntry">
										<div className="col-sm-2 icon">
											<img src={Archive} alt="hangar"></img>
										</div>
										<div className="col-sm-10 projectBoardEntryText">
											<p>ARCHIVE</p>
										</div>
									</div>
								</Button>
							</div>
							<div className="col-md-8">
								<div className="row">
									<TabDisplay />
								</div>
								<div className="row">
									<TabDisplay />
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default ProjectBoard;
