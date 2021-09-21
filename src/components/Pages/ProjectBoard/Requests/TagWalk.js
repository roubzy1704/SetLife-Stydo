import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../../Store/Action/projectAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import BrandsList from "../../../Pages/Database/brandsList";
import Button from "../../../../Shared/UIElements/Button/Button";
import FileUploadRebuild from "../../../../Shared/components/FileUploadRebuild/FileUploadRebuild";
import "../../../../Shared/UIElements/Shared.css";
import "./Requests.css";

import { DndProvider, DndContext } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Frame, { FrameContext } from "react-frame-component";

const DndFrame = ({ children }) => {
	const { dragDropManager } = useContext(DndContext);
	const { window } = useContext(FrameContext);

	useEffect(() => {
		dragDropManager.getBackend().addEventListeners(window);
	});

	return children;
};

const TagWalk = () => {
	const projectId = useParams().projectId;
	const allProjects = useSelector((state) => state.projects.project);
	let allUserProjects = allProjects.filter(
		(proj) => proj.projectId === parseInt(projectId)
	);
	let userProject = allUserProjects[0];
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const tagSelection = useParams().selection.toLowerCase();

	console.log(tagSelection);

	console.log(
		`https://www.tag-walk.com/en/look/search?designer=${tagSelection}&page=1`
	);

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
							"Select Request",
							userProject.productionDate,
							"Tag Walk"
						)}
						{/*  */}
						{selection !== "" && (
							<div style={{ marginBottom: "30px" }}>
								<p>You have selected {selection}</p>

								<br />
							</div>
						)}
						<div className="forumDisplay">
							<DndProvider backend={HTML5Backend}>
								<FileUploadRebuild />
								<Frame
									style={{
										width: "100%",
										height: 600,
										// textAlign: "center",
									}}>
									<DndFrame>
										<iframe
											// src="https://www.tag-walk.com/en/look/search?designer=louis-vuitton&page=1"
											src={`https://www.tag-walk.com/en/look/search?designer=${tagSelection}&page=1`}
											title={tagSelection}
											width="100%"
											height="600px"
										/>
									</DndFrame>
								</Frame>
							</DndProvider>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default TagWalk;
