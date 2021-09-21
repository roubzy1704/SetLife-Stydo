import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../../Store/Action/projectAction";
import { fetchUserEmailTemplates } from "../../../../Store/Action/userAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import TemplateList from "./TemplateList";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import Button from "../../../../Shared/UIElements/Button/Button";
import "../../../../Shared/UIElements/Shared.css";
import "./EmailTemplates.css";

const EmailTemplates = () => {
	//PROJECTID RETRIEVAL,AND SETUP USAGE FOR PAGENAV
	const projectId = useParams().projectId; //retrieve projectId from url route
	const allProjects = useSelector((state) => state.projects.project); //retireve allProjects from store
	//find project in store that matches projectId
	let allUserProjects = allProjects.filter(
		(proj) => proj.projectId === parseInt(projectId)
	);
	//assign it to project ot userProject
	let userProject = allUserProjects[0];

	//for error and loading handling
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	//clear errors
	const clearError = () => {
		dispatch(clearErrors());
	};

	const dispatch = useDispatch();

	//USERID RETRIEVAL
	// let user_id = 1;
	const user_id = useParams().user_id; //retireve user_id from route url
	const userEmailTemplates = useSelector((state) => state.user.emailTemplates); //retrieve email templates from store

	//TODO later finalize delete functionality
	const deleteTemplate = (id) => {
		console.log("ID to delete " + id);
	};

	useEffect(() => {
		dispatch(fetchUserEmailTemplates(user_id)); //fetch user templates from server
		dispatch(fetchAllProjects(user_id)); //fetch user projects from server
	}, [dispatch, user_id]);

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading ||
			userProject === undefined ||
			userEmailTemplates === undefined ? (
				<div className="center drop">
					<LoadingSpinner />
				</div>
			) : (
				!isLoading &&
				userProject &&
				userEmailTemplates && (
					<div className="container-fluid center">
						{ProjectBoardPageNav(
							projectId,
							userProject.projectName,
							"Email Templates",
							userProject.productionDate
						)}
						<div className="newTemplateBtn">
							<Button
								to={`/ProjectBoard/${userProject.projectId}/${user_id}/emailTemplates/newTemplate`}>
								<span
									className="iconify"
									data-icon="ant-design:plus-outlined"
									data-inline="false"
									style={{ color: "grey" }}
									data-width="70"
									data-height="70"></span>
							</Button>
						</div>
						<div className="templates proxima">
							<TemplateList
								templateList={userEmailTemplates}
								deleteTemplate={deleteTemplate}
							/>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default EmailTemplates;
