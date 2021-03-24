import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createNewProject } from "../../../Store/Action/projectAction";
import FileUpload from "../../../Shared/components/FileUpload/FileUpload";
import FormControlHook from "../../../Shared/hooks/FormControlHook";
import TextInput from "../../../Shared/UIElements/input/TextInput";
import ErrorModal from "../../../Shared/UIElements/ErrorModal/ErrorModal";
import { clearErrors } from "../../../Store/Action/errorAction";
import LoadingSpinner from "../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";

const NewProjectForm = (props) => {
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

	const allFiles = (files) => {
		//now because of the useRef hook, every time I drag and drop a file, a new array is pushed to files
		//so files now looks like an array of arrays, with the last array in the array holding my last file upload
		//this will be resolved in the projectAction component, I will take the last array in the element for submission
		fileSave.current.push(files);
		fileLength.current = fileSave.current.length;
		// console.log(fileLength);

		// saveFileLen(fileLength);
		//i have to save the files in a variable, and cant do it like below using setState
		//because in react we cant use setState on a component (NewProjectForm)
		//while rendering another component (FileUpload)
		// setProjectImages((prevFiles) => [...prevFiles, files]);
		// console.log(fileSave.current.length);
		// setFileCount(fileSave.current.length);
	};

	// console.log(fileLength.current);

	const handleSubmit = (values) => {
		dispatch(createNewProject(values, fileSave.current, user_id));
		// console.log(isLoading);
		if (!isLoading && !error.show) {
			fileLength = 0;
			// console.log("loading done" + isLoading);
			setTimeout(() => {
				history.push("/projectHome");
			}, 1000);
		}
		fileSave.current = [];
	};

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
								<FileUpload allFiles={allFiles} />
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
										{fileLength.current > 0 ? (
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
