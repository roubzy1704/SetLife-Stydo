import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchAllProjects,
	updateAProject,
} from "../../../../Store/Action/projectAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import FileUploadRebuild from "../../../../Shared/components/FileUploadRebuild/FileUploadRebuild";
import FileDisplayList from "../../../../Shared/UIElements/FileDisplay/FileDisplayList";
import "../../../../Shared/UIElements/Shared.css";
import "./Files.css";

const Files = () => {
	/*
	PAGE SETUP
	*/
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
	let user_id = 4;

	const [filesBase64ToUpload, setFileBase64ToUpload] = useState([]); //will hold files in base64 that are converted from base64 and will upload
	const [fileNamesToUpload, setFileNamesToUpload] = useState([]); //will hold file name that are to be uploaded

	console.log("userProject Files  ", userProject);

	const [encodedBase64, setEncodedBase64] = useState([]); //holds fetched project files
	const [displayFileName, setDisplayFileName] = useState([]); //holds fetched project file names

	//this useEffect helps repopulate the page when refreshed, if this use effect is absent and userProject === undefined
	//is absent, the page will crash, my goal was to figure out a way to preserve data on page refresh.
	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
	}, [dispatch, user_id]);

	const history = useHistory();

	useEffect(() => {
		//if userProject exist
		if (userProject) {
			if (userProject.files.length !== 0) {
				console.log("files in FIles ", userProject.files);
				setEncodedBase64(userProject.files);
				setDisplayFileName(userProject.filesName);
			}
		}
	}, [userProject]);

	useEffect(() => {
		//if there are images to upload (filesBase64ToUpload/fileNamesToUpload), then run this useEffect block to dispatch updateAproject
		if (filesBase64ToUpload.length !== 0 && fileNamesToUpload.length !== 0) {
			dispatchStore();

			//reset filesBase64ToUpload and fileNamesToUpload
			setFileBase64ToUpload([]);
			setFileNamesToUpload([]);

			if (!isLoading) {
				history.goBack();
			}
		}
	}, [dispatch, filesBase64ToUpload, fileNamesToUpload]);

	const dispatchStore = useCallback(() => {
		dispatch(
			updateAProject(
				projectId,
				user_id,
				filesBase64ToUpload,
				fileNamesToUpload,
				"files"
			)
		);
	}, [filesBase64ToUpload, fileNamesToUpload, projectId, user_id, dispatch]);

	/*

	FILE BODY 

	*/

	const filesToUpload = (filesInB64, file_Names) => {
		console.log(filesInB64, file_Names);
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
							"Files",
							userProject.productionDate
						)}
						<FileUploadRebuild uploadFiles={filesToUpload} acceptAll />

						<div className="fileDisplay center">
							{
								<FileDisplayList
									filesBase64={encodedBase64}
									fileNames={displayFileName}
								/>
							}
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default Files;
