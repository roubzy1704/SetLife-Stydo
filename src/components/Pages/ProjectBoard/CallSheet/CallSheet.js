import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../../Store/Action/projectAction";
import {
	fetchProjectBoard,
	updateProjectBoard,
} from "../../../../Store/Action/projectBoardAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import FileUploadRebuild from "../../../../Shared/components/FileUploadRebuild/FileUploadRebuild";
import FileDisplayList from "../../../../Shared/UIElements/FileDisplay/FileDisplayList";
import "../../../../Shared/UIElements/Shared.css";
import "./CallSheet.css";

const CallSheet = () => {
	//TODO SET IMAGE DISPLAY ON FILES, AFTER I RESOLVE UPLOAD OST REQUEST ISSUE
	const projectId = useParams().projectId;
	const allProjects = useSelector((state) => state.projects.project);
	let allUserProjects = allProjects.filter(
		(proj) => proj.projectId === parseInt(projectId)
	);
	let userProject = allUserProjects[0];

	const callSheetData = useSelector((state) => state.projectBoard.callsheet);

	console.log(callSheetData);
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const clearError = () => {
		dispatch(clearErrors());
	};

	const dispatch = useDispatch();
	let user_id = 1;

	const [filesBase64ToUpload, setFileBase64ToUpload] = useState([]); //will hold files in base64 that are converted from base64 and will upload
	const [fileNamesToUpload, setFileNamesToUpload] = useState([]); //will hold file name that are to be uploaded

	//this useEffect helps repopulate the page when refreshed, if this use effect is absent and userProject === undefined
	//is absent, the page will crash, my goal was to figure out a way to preserve data on page refresh.
	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
		dispatch(fetchProjectBoard(user_id, projectId, "callsheet"));
	}, [dispatch, user_id, projectId]);

	useEffect(() => {
		//if there are images to upload (filesBase64ToUpload/fileNamesToUpload), then run this useEffect block to dispatch updateAproject
		if (filesBase64ToUpload.length !== 0 && fileNamesToUpload.length !== 0) {
			dispatchStore();

			//reset filesBase64ToUpload and fileNamesToUpload
			setFileBase64ToUpload([]);
			setFileNamesToUpload([]);
		}
	}, [dispatch, filesBase64ToUpload, fileNamesToUpload]);

	const dispatchStore = useCallback(() => {
		dispatch(
			//TODO THERE IS AN ERROR UPLAODING CALLSHEET, HAVE TO CHECK WITH TOMMY, CHECK PROJECTBOARD ACTION FOR DETAILS
			updateProjectBoard(
				user_id,
				projectId,
				"callsheets",
				filesBase64ToUpload,
				fileNamesToUpload
			)
		);
	}, [filesBase64ToUpload, fileNamesToUpload, projectId, user_id, dispatch]);

	const filesToUpload = (filesInB64, file_Names) => {
		setFileBase64ToUpload(filesInB64);
		setFileNamesToUpload(file_Names);
	};

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading || userProject === undefined || callSheetData === undefined ? (
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
							"Call Sheet",
							userProject.productionDate
						)}
						<FileUploadRebuild uploadFiles={filesToUpload} acceptAll />

						<div className="fileDisplay center">
							{<FileDisplayList fileData={callSheetData} callsheet />}
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default CallSheet;
