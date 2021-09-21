import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createNewProject } from "../../../Store/Action/projectAction";
// import FileUpload from "../../../Shared/components/FileUpload/FileUpload";
import FileUploadRebuild from "../../../Shared/components/FileUploadRebuild/FileUploadRebuild";
import FormControlHook from "../../../Shared/hooks/FormControlHook";
import TextInput from "../../../Shared/UIElements/input/TextInput";
import ErrorModal from "../../../Shared/UIElements/ErrorModal/ErrorModal";
import { clearErrors } from "../../../Store/Action/errorAction";
import LoadingSpinner from "../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";

const NewProjectForm = () => {
	const WizardStep = ({ children }) => children;

	//state variable used to display temp client and productionDate on page 3 of newProject form
	const [inputClient, setInputClient] = useState("");
	const [inputProductionDate, setinputProductionDate] = useState("");

	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	let user_id = 1;

	const dispatch = useDispatch();
	const history = useHistory();

	const clearError = () => {
		dispatch(clearErrors());
		history.push("/newProjectForm");
	};

	//TODO resolve the set up moodboard check box with pictures
	let fileLength = useRef(0);

	//will hold the files upload by user
	//I have to use the useRef hook here because I want the image files to be saved here, when i call
	//the handleSubmit function. If not the handelSubmit function will send fileSave as an empty array
	//So I am creating a refrence for fileSave to return a mutable ref object whose .current property is initilaized to the passed argument
	let fileSave = useRef([]);
	// const [boardCheck, setBoardCheck] = useState(false);
	let boardCheck = useRef(false);

	const allFiles = (files) => {
		//now because of the useRef hook, every time I drag and drop a file, a new array is pushed to files
		//so files now looks like an array of arrays, with the last array in the array holding my last file upload
		//this will be resolved in the projectAction component, I will take the last array in the element for submission
		//* I will do this here, in handleSubmit function, in order to clean up my code and have seperation of concerns
		fileSave.current.push(files);
		fileLength.current = fileSave.current.length;
		boardCheck.current = true;
		console.log("here", boardCheck);

		// console.log(fileLength);

		// saveFileLen(fileLength);
		//i have to save the files in a variable, and cant do it like below using setState
		//because in react we cant use setState on a component (NewProjectForm)
		//while rendering another component (FileUpload)
		// setProjectImages((prevFiles) => [...prevFiles, files]);
		// console.log(fileSave.current.length);
		// setFileCount(fileSave.current.length);
	};

	//arrays that will and base64 array, imageNames and projectData for submission
	// const [fileNames, setFileNames] = useState([]);
	// const [imageBase64, setImageBase64] = useState([]);
	// const [projectData, setProjectData] = useState({});

	const [imagesToUpload, setImagesToUpload] = useState([]);
	const [imagesNameToUpload, setImagesNameToUpload] = useState([]);

	// useEffect(() => {
	// 	if (fileNames.length) {
	// 		if (imageBase64.length === fileNames.length) {
	// 			dispatch(
	// 				createNewProject(projectData, imageBase64, fileNames, user_id)
	// 			);
	// 			history.push("/projectHome");
	// 		}
	// 	}
	// }, [dispatch, imageBase64, fileNames]);

	const handleSubmit = (values) => {
		// console.log(imagesToUpload, imagesNameToUpload);
		//so the object here is to first compress the images and then convert to base64 while saving the image names
		// setProjectData(values);
		//arrays that will hold file names

		//I need to grab the last array in the array save that array in imageFIles and the image names in imageNames
		//first check if a file exist
		// if (fileSave.current.length) {
		// 	//then map thru array of last element in array and save it in imageFiles array
		// 	fileSave.current[fileSave.current.length - 1].forEach((image) => {
		// 		//and save image names to fileNames array
		// 		setFileNames((prevState) => [...prevState, image.name]);
		// 		//next compress Images, and convert to base64 (ceoversion will be called from handleImageCompression function)
		// 		getBase64(image);
		// 	});
		// }
		//no image to upload, dispatch as usual
		// else {
		dispatch(
			createNewProject(values, imagesToUpload, imagesNameToUpload, user_id)
		);
		history.push("/projectHome");
		// }
	};

	const filesToUpload = (filesInB64, file_Names) => {
		console.log(filesInB64, file_Names);
		setImagesToUpload(filesInB64);
		setImagesNameToUpload(file_Names);
	};

	// function getBase64(file) {
	// 	var reader = new FileReader();
	// 	reader.readAsDataURL(file);
	// 	reader.onload = function () {
	// 		//push results to fileBase64 array
	// 		setImageBase64((prevState) => [...prevState, reader.result]);
	// 	};
	// 	reader.onerror = function (error) {
	// 		//?maybe throw an error
	// 		console.log(error);
	// 	};
	// }

	return (
		<React.Fragment>
			<ErrorModal
				show={error.show}
				message={error.message}
				statusCode={error.statusCode}
				onClear={clearError}
			/>
			{isLoading ? (
				<div className="center">
					<LoadingSpinner />
				</div>
			) : (
				<div className="container">
					<FormControlHook
						//holds initial values for form
						initialValues={{
							projectName: "Micheal Kors Runway",
							client: "Micheal Kors",
							productionDate: "Feb 2021",
							aboutProject: "Best show in town",
						}}
						//final onSubmit method for form submission
						onSubmit={(values) => {
							console.log("formik");
							handleSubmit(values);
						}}
						//formType to render in FormCOntrolHook component
						formType="project"
						// toggleContBtn={disableFileUpBtn}
					>
						{/* page 1 of new Project */}
						<WizardStep
							//onSubmit handler for page 1 of form
							onSubmit={async (values) => {
								setInputClient(values.client);
								setinputProductionDate(values.productionDate);
							}}
							//validationSchema used by Yup for input verification
							//ALso, check TextInput component for more details
							validationSchema={
								//contains errors that will be displayed for each entry
								Yup.object({
									projectName: Yup.string().required("Enter a project name"),
									client: Yup.string().required("Enter a client"),
									productionDate: Yup.string().required(
										"Enter production date"
									),
								})
							}>
							<div className="form-group pb-4">
								<small className="form-text text-danger float-right pb-1">
									*this will also be the subject to your emails
								</small>
								<TextInput
									name="projectName"
									placeholder="NAME YOUR PROJECT"
									type="text"
								/>
							</div>

							<div className="form-row pb-5">
								<div className="col-sm-7">
									<TextInput name="client" placeholder="CLIENT" type="text" />
								</div>
								<div className="col-sm-1"></div>
								<div className="col-sm-4">
									<TextInput
										name="productionDate"
										placeholder="PRODUCTION DATE"
										type="text"
									/>
								</div>
							</div>

							<TextInput
								name="aboutProject"
								as="textarea"
								placeholder="ABOUT THIS PROJECT"
								type="textarea"
								rows="5"
							/>
						</WizardStep>
						{/* page 2 of new Project */}
						<WizardStep>
							<React.Fragment>
								{/* <FileUpload allFiles={allFiles} /> */}
								<FileUploadRebuild uploadFiles={filesToUpload} skipBtn />
							</React.Fragment>
						</WizardStep>
						{/* page 3 of new Project */}

						<WizardStep>
							<div className=" col">
								<h3>
									<span>{inputClient}</span> /{" "}
									<span>{inputProductionDate}</span> will be created!{" "}
								</h3>
								<div className="row-sm-1">
									<hr className="horizontalLine" />
								</div>
								<div className="text-left pl-5 pb-5 col">
									<div className="row pb-3 pt-3">
										{imagesToUpload.length ? (
											<span
												className="iconify icon"
												data-icon="ant-design:check-outlined"
												data-inline="false"
												style={{ color: "green" }}
												data-width="36"
												data-height="36"></span>
										) : (
											<span
												className="iconify icon"
												data-icon="bi:x"
												data-inline="false"
												style={{ color: "red" }}
												data-width="36"
												data-height="36"></span>
										)}

										<p> Set up Mood Board</p>
									</div>
									<div className="row ">
										<span
											className="iconify icon"
											data-icon="bi:x"
											data-inline="false"
											style={{ color: "red" }}
											data-width="36"
											data-height="36"></span>
										<p>Set up Contacts</p>
									</div>
								</div>
							</div>
						</WizardStep>
					</FormControlHook>
				</div>
			)}
		</React.Fragment>
	);
};

export default NewProjectForm;
