import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageViewer from "react-simple-image-viewer";

import {
	fetchAllProjects,
	updateAProject,
} from "../../../../Store/Action/projectAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import FileUploadRebuild from "../../../../Shared/components/FileUploadRebuild/FileUploadRebuild";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import "../../../../Shared/UIElements/Shared.css";
import "./MoodBoard.css";

const MoodBoard = () => {
	const projectId = useParams().projectId;
	const allProjects = useSelector((state) => state.projects.project);
	let allUserProjects = allProjects.filter(
		(proj) => proj.projectId === parseInt(projectId)
	);
	let userProject = allUserProjects[0];
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	console.log(userProject);

	const [images, setImages] = useState([]);

	// console.log(userProject.moodBoardImages);
	// const moodImage = userProject.moodBoardImages;

	//react-image-viewer
	const [currentImage, setCurrentImage] = useState(0);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	let displayImages = [];
	if (userProject) {
		displayImages = userProject.moodBoardImages;
	}

	const openImageViewer = useCallback((index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	const clearError = () => {
		dispatch(clearErrors());
	};

	const dispatch = useDispatch();
	let user_id = 1;

	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
		// userProject.MoodBoardImages.forEach((image) => {
		// 	displayImages.push(image);
		// });
		// displayImages = userProject.moodBoardImages;
	}, [dispatch, user_id]);

	// //will hold the files upload by user
	// //I have to use the useRef hook here because I want the image files to be saved here, when i call
	// //the handleSubmit function. If not the handelSubmit function will send fileSave as an empty array
	// //So I am creating a refrence for fileSave to return a mutable ref object whose .current property is initilaized to the passed argument
	// let fileSave = useRef([]);

	// const allFiles = (files) => {
	// 	//now because of the useRef hook, every time I drag and drop a file, a new array is pushed to files
	// 	//so files now looks like an array of arrays, with the last array in the array holding my last file upload
	// 	//this will be resolved in the projectAction component, I will take the last array in the element for submission
	// 	fileSave.current.push(files);
	// 	// console.log(fileSave.current);
	// 	//i have to save the files in a variable, and cant do it like below using setState
	// 	//because in react we cant use setState on a component (NewProjectForm)
	// 	//while rendering another component (FileUpload)
	// 	// setProjectImages((prevFiles) => [...prevFiles, files]);
	// };

	// //we need this useEffect to save the fileupload data in image state here
	// //because if we dont do that we get an error that a component cant update while rendering a different component warning
	// //this useEffect solves that. by running it when the data changes and not on every component update
	// useEffect(() => {
	// 	setImages(fileSave.current);
	// }, []);

	// const handleUpload = () => {
	// 	if (images.length <= 0) {
	// 		console.log("Nothing to submit");
	// 	} else {
	// 		console.log("I will submit files");
	// 		console.log(images[images.length - 1]);
	// 		displayImages.push(fileSave.current);
	// 	}
	// };

	const [filesBase64, setFilesBase64] = useState([]);
	const [fileBaseError, setFileBaseError] = useState(false);

	const convertFilesToBase64 = (files) => {
		//convert files to base64 format for uplaod to server

		files.forEach((eachFile) => {
			getBase64(eachFile);
		});
	};

	// Convert file to base64 string
	function getBase64(file) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			//add results to state Array
			setFilesBase64((prevState) => [...prevState, reader.result]);
		};
		reader.onerror = function (error) {
			//if error set error state to try
			setFileBaseError(true);
		};
	}

	//handle upload request to store and then server
	const history = useHistory();
	useEffect(() => {
		// const uploadFiles = () => {
		if (fileBaseError) {
			console.log("AN ERROR OCCURED PLEASE TRY AGAIN");
			//throw error to screen
			//erase everthing and history.push to file
		}
		// setTimeout(() => {
		console.log(filesBase64);
		// }, [1000]);

		// let array = dataURLtoFile(filesBase64[0], "hello.png");

		// console.log(array);

		// convBase64ToFile(filesBase64[0]);

		let patchRequestType = "moodBoard";
		if (filesBase64.length > 0) {
			dispatch(
				updateAProject(projectId, user_id, filesBase64, patchRequestType)
			);
			//reset everything
			// setTimeout(() => {
			// if (!isLoading && !error) {
			// 	setFileBaseError(false);
			// 	setFilesBase64([]);
			// 	history.push(`/projectBoard/${projectId}`);
			// }
			// }, [1000]);
		}
	}, [fileBaseError, filesBase64, dispatch]);

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
							"MoodBoard",
							userProject.productionDate
						)}
						<FileUploadRebuild uploadFiles={convertFilesToBase64} acceptAll />

						<div className="imageDisplay">
							{displayImages.map((src, index) => (
								<img
									src={src}
									onClick={() => openImageViewer(index)}
									width="200px"
									height="200px"
									key={index}
									style={{ margin: "2px" }}
									alt=""
								/>
							))}

							{isViewerOpen && (
								<ImageViewer
									src={displayImages}
									currentIndex={currentImage}
									onClose={closeImageViewer}
									backgroundStyle={{
										backgroundColor: "rgba(0,0,0,0.9)",
									}}
								/>
							)}
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default MoodBoard;
