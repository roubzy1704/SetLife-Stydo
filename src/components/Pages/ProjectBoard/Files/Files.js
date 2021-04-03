import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchAllProjects,
	updateAProject,
	setLoadingProject,
	endLoading,
} from "../../../../Store/Action/projectAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import FileUploadRebuild from "../../../../Shared/components/FileUploadRebuild/FileUploadRebuild";
import FileDisplayList from "./FileDIsplayList";
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
	let user_id = 1;

	useEffect(() => {
		console.log("i run");
		dispatch(fetchAllProjects(user_id));
	}, [dispatch, user_id]);

	console.log("userProject ", userProject);

	/*

	FILE BODY 

	*/
	const [fileBase64, setFileBase64] = useState([]); //will hold file that are converted from base64
	const [fileNames, setFileNames] = useState([]);

	useEffect(() => {
		console.log("he runs");
		// if (userProject) {
		// 	if (userProject.files) {
		// 		setDataFiles(userProject.files);
		// 	}
		// }

		if (fileBase64.length !== 0 && fileNames.length !== 0) {
			dispatch(
				updateAProject(projectId, user_id, fileBase64, fileNames, "files")
			);
			dispatch(endLoading());
		}
	}, [fileBase64, fileNames]);

	const history = useHistory();
	const filesToUpload = (filesBase, fileName) => {
		setFileBase64([filesBase]);
		setFileNames([fileName]);
		// dispatch(
		// 	updateAProject(projectId, user_id, filesBase64, fileName, "files")
		// );

		dispatch(setLoadingProject());
		console.log(isLoading);

		// if (!isLoading && !error.show) {
		// 	// console.log("loading done" + isLoading);
		// 	setTimeout(() => {
		// 		history.push("/projectHome");
		// 	}, 1000);
		// }
	};

	//convert base64 back to File
	// function dataURLtoFile(dataurl, filename) {
	// 	var arr = dataurl.split(","),
	// 		mime = arr[0].match(/:(.*?);/)[1],
	// 		bstr = atob(arr[1]),
	// 		n = bstr.length,
	// 		u8arr = new Uint8Array(n);

	// 	while (n--) {
	// 		u8arr[n] = bstr.charCodeAt(n);
	// 	}
	// 	return new File([u8arr], filename, { type: mime });
	// }

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

						<div className="display">
							{fileNames.length !== 0 && (
								<FileDisplayList displayFiles={fileBase64} />
							)}
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default Files;
