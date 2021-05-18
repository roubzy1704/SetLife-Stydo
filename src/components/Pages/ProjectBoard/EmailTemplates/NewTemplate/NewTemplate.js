import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createNewEmailTemplate } from "../../../../../Store/Action/userAction";
import { ProjectBoardPageNav } from "../../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../../Store/Action/errorAction";
import ErrorModal from "../../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import Email from "../../../../../Shared/components/Email/Email";
import "./NewTemplate.css";

const NewTemplate = (props) => {
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

	// let user_id = 1;
	//USERID RETRIEVAL
	// let user_id = 1;
	const user_id = useParams().user_id; //retireve user_id from route url
	// const userEmailTemplates = useSelector((state) => state.user.emailTemplates); //retrieve email templates from store

	//?DO I REALLY NEED THIS, WELL I DISABLED IT FOR NOW WE WILL SEE
	// useEffect(() => {
	// 	// dispatch(fetchUserEmailTemplates(user_id)); //fetch user templates from server
	// 	dispatch(fetchAllProjects(user_id)); //fetch user projects from server
	// }, [dispatch, user_id]);

	//NEW TEMPLATE

	let subject = "";
	if (userProject)
		subject = userProject.projectName + " / " + userProject.productionDate; //created subject line as described in figma

	const history = useHistory();

	const handleContent = (data) => {
		dispatch(createNewEmailTemplate(user_id, data)); //dispatch newly created template
		setTimeout(() => {
			history.goBack(); //go back to emailTemplate
		}, 1000);
	};

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
					<React.Fragment>
						<div className="container-fluid center">
							{ProjectBoardPageNav(
								projectId,
								userProject.projectName,
								"Email Templates",
								userProject.productionDate,
								"Add Email Template",
								user_id
							)}
						</div>
						<Email subject={subject} content={handleContent} newTemp />
					</React.Fragment>
				)
			)}
		</React.Fragment>
	);
};

export default NewTemplate;
