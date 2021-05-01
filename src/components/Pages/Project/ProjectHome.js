import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../Store/Action/projectAction";
import { deleteAProject } from "../../../Store/Action/projectAction";
import { clearErrors } from "../../../Store/Action/errorAction";
import LoadingSpinner from "../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../Shared/UIElements/ErrorModal/ErrorModal";
import ProjectList from "./ProjectList";
import Button from "../../../Shared/UIElements/Button/Button";
import "./ProjectHome.css";
import "../../../Shared/UIElements/Shared.css";

const ProjectHome = (props) => {
	const projectList = useSelector((state) => state.projects.project);
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const dispatch = useDispatch();

	const clearError = () => {
		dispatch(clearErrors());
	};

	let user_id = 4;

	useEffect(() => {
		// if (projectList.length) {
		//this forces a dispatch, when i create a new project and history.push back to projectHome, fetch will trigger
		dispatch(fetchAllProjects(user_id));
		// }
	}, [dispatch, user_id]);

	const deleteProject = (projectId) => {
		dispatch(deleteAProject(projectId, user_id));
	};

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading ? (
				<div className="center drop">
					<LoadingSpinner />
				</div>
			) : (
				!isLoading &&
				projectList && (
					<div className="center">
						<div className="row">
							<div className="col-md-2 pageNav">
								<span style={{ textDecoration: "underline" }}>
									<Button to="/dashBoard">Home</Button>
								</span>
								/ Projects
							</div>
							<div className="col col-md-9">
								<h1 className="pageTitle">
									PROJECTS{" "}
									<span
										className="iconify pencil"
										data-icon="clarity:pencil-line"
										data-inline="false"></span>
								</h1>
								<ProjectList
									projectList={projectList}
									deleteProject={deleteProject}
								/>
							</div>
							<div className="col-md-1"></div>
						</div>
						<div className="row">
							<div className="col-2"></div>
							<div className="newProjectBtn col-9">
								<Link to="/newprojectForm">
									<Button type="submit">New Project</Button>
								</Link>
							</div>
							<div className="col-1"></div>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default ProjectHome;
