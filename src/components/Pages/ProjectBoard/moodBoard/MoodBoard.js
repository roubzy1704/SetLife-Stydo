import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../../Store/Action/projectAction";
import { fetchProjectBoard } from "../../../../Store/Action/projectBoardAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import FileUploadRebuild from "../../../../Shared/components/FileUploadRebuild/FileUploadRebuild";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import MoodBoardTabDisplay from "../../../../Shared/UIElements/Tabs/MoodBoardTabDisplay";
import "../../../../Shared/UIElements/Shared.css";
import "./MoodBoard.css";

const MoodBoard = () => {
	const projectId = parseInt(useParams().projectId);
	const allProjects = useSelector((state) => state.projects.project);
	let allUserProjects = allProjects.filter(
		(proj) => proj.projectId === projectId
	);
	let userProject = allUserProjects[0];

	const moodboardData = useSelector((state) => state.projectBoard.moodboard);
	console.log(moodboardData);

	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);
	const isLoadingBoard = useSelector((state) => state.projects.loading);

	const clearError = () => {
		dispatch(clearErrors());
	};

	const dispatch = useDispatch();
	let user_id = 1;

	const [filesBase64ToUpload, setFileBase64ToUpload] = useState([]); //will hold files in base64 that are converted from base64 and will upload
	const [fileNamesToUpload, setFileNamesToUpload] = useState([]); //will hold file name that are to be uploaded

	//const [encodedBase64, setEncodedBase64] = useState([]); //holds fetched project files
	//const [displayFileName, setDisplayFileName] = useState([]); //holds fetched project file names

	// console.log("userProject MoodBoard  ", userProject);

	//react-image-viewer
	// const [currentImage, setCurrentImage] = useState(0);
	// const [isViewerOpen, setIsViewerOpen] = useState(false);
	// const [images, setImages] = useState([]);

	//this useEffect helps repopulate the page when refreshed, if this use effect is absent and userProject === undefined
	//is absent, the page will crash, my goal was to figure out a way to preserve data on page refresh.
	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
		dispatch(fetchProjectBoard(user_id, projectId, "moodboards"));
	}, [dispatch, user_id, projectId]);

	// useEffect(() => {
	// 	//if userProject exist
	// 	if (userProject) {
	// 		if (userProject.moodBoardImages !== 0) {
	// 			setImages(userProject.moodBoardImages);
	// 			// setDisplayFileName(userProject.filesName);
	// 		}
	// 	}
	// }, [userProject]);

	const history = useHistory();

	// useEffect(() => {
	// 	//if there are images to upload (filesBase64ToUpload/fileNamesToUpload), then run this useEffect block to dispatch updateAproject
	// 	if (filesBase64ToUpload.length !== 0 && fileNamesToUpload.length !== 0) {
	// 		dispatchStore();

	// 		//reset filesBase64ToUpload and fileNamesToUpload
	// 		setFileBase64ToUpload([]);
	// 		setFileNamesToUpload([]);

	// 		if (!isLoading) {
	// 			history.goBack();
	// 		}
	// 	}
	// }, [dispatch, filesBase64ToUpload, fileNamesToUpload]);

	// const dispatchStore = useCallback(() => {
	// 	dispatch(
	// 		updateAProject(
	// 			projectId,
	// 			user_id,
	// 			filesBase64ToUpload,
	// 			fileNamesToUpload,
	// 			"moodboard"
	// 		)
	// 	);
	// }, [filesBase64ToUpload, fileNamesToUpload, projectId, user_id, dispatch]);

	const filesToUpload = (filesInB64, file_Names) => {
		setFileBase64ToUpload(filesInB64);
		setFileNamesToUpload(file_Names);
	};

	// const openImageViewer = useCallback((index) => {
	// 	setCurrentImage(index);
	// 	setIsViewerOpen(true);
	// }, []);

	// const closeImageViewer = () => {
	// 	setCurrentImage(0);
	// 	setIsViewerOpen(false);
	// };

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
				userProject &&
				moodboardData && (
					<div className="container-fluid center">
						{ProjectBoardPageNav(
							projectId,
							userProject.projectName,
							"MoodBoard",
							userProject.productionDate
						)}
						<FileUploadRebuild uploadFiles={filesToUpload} />

						{/* <div className="fileDisplay bondary"> */}
						<MoodBoardTabDisplay moodboardData={moodboardData} />
						{/* {images.length
								? images.map((src, index) => (
										<img
											src={src}
											onClick={() => openImageViewer(index)}
											width="200px"
											height="200px"
											key={index}
											style={{ margin: "2px" }}
											alt=""
										/>
								  ))
								: "No Image to display. Upload one above"}

							{isViewerOpen && (
								<ImageViewer
									src={images}
									currentIndex={currentImage}
									onClose={closeImageViewer}
									backgroundStyle={{
										backgroundColor: "rgba(0,0,0,0.9)",
									}}
								/>
							)} */}
						{/* </div> */}
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default MoodBoard;
