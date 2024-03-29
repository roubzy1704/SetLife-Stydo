import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../../Store/Action/projectAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import BrandsList from "../../../Pages/Database/brandsList";
import Button from "../../../../Shared/UIElements/Button/Button";
import "../../../../Shared/UIElements/Shared.css";
import "./Requests.css";

const SelectRequest = () => {
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

	const [selection, setSelection] = useState("");

	const handleSelection = (name) => {
		setSelection(name);
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
					<div className="container-fluid center">
						{ProjectBoardPageNav(
							projectId,
							userProject.projectName,
							"Requests",
							userProject.productionDate,
							"Select Request"
						)}
						{/*  */}
						{selection !== "" && (
							<div style={{ marginBottom: "30px" }}>
								<p>You have selected {selection}</p>
								<Button
									className="blue-button"
									to={`/ProjectBoard/${projectId}/requests/selectRequest/TagWalk/${selection}`}>
									View Collection on Tag Walk
								</Button>
								<br />
							</div>
						)}
						<div className="forumDisplay">
							<BrandsList getSelection={handleSelection} />
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default SelectRequest;
