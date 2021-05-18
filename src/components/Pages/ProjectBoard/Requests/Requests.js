import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../../Store/Action/projectAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import "../../../../Shared/UIElements/Shared.css";
import "./Requests.css";
import Button from "../../../../Shared/UIElements/Button/Button";

const Requests = () => {
	const projectId = useParams().projectId;
	const allProjects = useSelector((state) => state.projects.project);
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

	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
	}, [dispatch, user_id]);

	//!have to resolve the issues with the page crashing on refresh. I did something about this in projectBoard. look at that
	//could pass the project as a prop to modBoard?

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
						{ProjectBoardPageNav(
							projectId,
							userProject.projectName,
							"Request And Confirm Looks",
							userProject.productionDate
						)}
						<Button
							className="blue-button"
							to={`/ProjectBoard/${projectId}/requests/selectRequest`}>
							Request Looks
						</Button>
						<div className="row" style={{ marginTop: "30px" }}>
							<div className="col-md-5">
								REQUESTED
								<div>
									Requsted Images Requsted Images Requsted Images Requsted
									Images
								</div>
								Requsted Images Requsted Images Requsted Images Requsted Images
								Requsted Images Requsted Images Requsted Images Requsted Images
								Requsted Images Requsted Images
							</div>
							<div className="col-md-2">
								<hr className="straightLine" />
								<hr className="straightLineTwo" />
							</div>
							<div className="col-md-5">
								CONFIRMED<div>Confimred Images</div>
							</div>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default Requests;
