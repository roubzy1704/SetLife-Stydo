import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../../../Store/Action/projectAction";
import { ProjectBoardPageNav } from "../../../../Shared/util/PageNavTitle";
import { clearErrors } from "../../../../Store/Action/errorAction";
import ErrorModal from "../../../../Shared/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../../Shared/UIElements/LoadingSpinner/LoadingSpinner";
import FileUpload from "../../../../Shared/components/FileUpload/FileUpload";
import Button from "../../../../Shared/UIElements/Button/Button";
import "../../../../Shared/UIElements/Shared.css";
import "./BudgetReceipts.css";

const BudgetReceipts = () => {
	const projectId = useParams().projectId;
	const allProjects = useSelector((state) => state.projects.project);
	let allUserProjects = allProjects.filter(
		(proj) => proj.projectId === parseInt(projectId)
	);
	let userProject = allUserProjects[0];
	const error = useSelector((state) => state.error.error);
	const isLoading = useSelector((state) => state.projects.loading);

	const [budgetReceiptFiles, setBudgetReceiptFiles] = useState([]);

	const clearError = () => {
		dispatch(clearErrors());
	};

	const dispatch = useDispatch();
	let user_id = 4;

	useEffect(() => {
		dispatch(fetchAllProjects(user_id));
	}, [dispatch, user_id]);

	//TODO show preview below

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
		// console.log(fileSave.current);
		//i have to save the files in a variable, and cant do it like below using setState
		//because in react we cant use setState on a component (NewProjectForm)
		//while rendering another component (FileUpload)
		// setProjectImages((prevFiles) => [...prevFiles, files]);
	};

	//we need this useEffect to save the fileupload data in image state here
	//because if we dont do that we get an error that a component cant update while rendering a different component warning
	//this useEffect solves that. by running it when the data changes and not on every component update
	useEffect(() => {
		setBudgetReceiptFiles(fileSave.current);
	}, []);

	const handleUpload = () => {
		if (budgetReceiptFiles.length <= 0) {
			console.log("Nothing to submit");
		} else {
			console.log("I will submit files");
			console.log(budgetReceiptFiles[budgetReceiptFiles.length - 1]);
		}
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
							"Budget Receipts",
							userProject.productionDate
						)}

						<FileUpload allFiles={allFiles} acceptAll />
						<Button type="submit" onClick={handleUpload}>
							Upload
						</Button>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default BudgetReceipts;
