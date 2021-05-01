import axios from "axios";

import { setErrors } from "./errorAction";

export const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT";
export const DELETE_A_PROJECT = "DELETE_A_PROJECT";
export const FETCH_ALL_PROJECTS = "FETCH_ALL_PROJECTS";
export const UPDATE_A_PROJECT = "UPDATE_A_PROJECT";
export const LOADING_PROJECTS = "LOADING_PROJECTS";
export const END_LOADING = "END_LOADING";

//TODO for testing purpose, clear later
// var options = {
// 	weekday: "long",
// 	month: "long",
// 	day: "numeric",
// };

export const fetchAllProjects = (user_id) => (dispatch) => {
	dispatch(setLoadingProject());

	axios({
		url: "http://localhost:5000/projects",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		params: { user_id: user_id },
	})
		.then((res) => {
			const response = res.data.data;
			console.log("fetch ", response);
			let userProjects = [];
			userProjects = response.map((project, index) => {
				return {
					projectName: project.name,
					client: project.client,
					productionDate: project.production_date,
					aboutProject: project.description,
					projectId: project.id,
					moodBoardImages: project.mood_images,
					moodBoardImageName: project.mood_image_names,
					// projectCreateDate: new Date().toLocaleDateString("en-US", options), //TODO is not sent to me in response, will have to ask what the date in the project is about
					projectCreateDate: index, //TODO remove when done
					files: project.files,
					notes: project.notes,
					callSheet: project.call_sheet,
					contacts: project.contacts,
					budgetReceipts: project.receipts,
					//pullInventory: [], //? no route for this
					//confirmedImages: project.confirmed_images //TODO integrate this
					//requestImages: project.request_images //TODO integrate this
					//looks : project.looks //TODO integrate this
				};
			});

			dispatch({
				type: FETCH_ALL_PROJECTS,
				payload: userProjects,
			});
		})
		.catch((err) => {
			//this check for statusText is to prevent an issue that occurs when there are no projects but the
			//page displays an error received from the server, since there is not need to show an error saying
			///user project doesnot exist, I just check to see if that server error happens and ignore it
			err.response.statusText !== "NOT FOUND" &&
				dispatch(
					setErrors(err.response.data.message, err.response.status, true)
				);
			dispatch(endLoading());
		});
};

export const createNewProject = (values, filesBase64, fileNames, user_id) => (
	dispatch
) => {
	dispatch(setLoadingProject());
	console.log(filesBase64, fileNames);

	axios({
		url: "http://localhost:5000/projects",
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		data: {
			name: values.projectName,
			client: values.client,
			production_date: values.productionDate,
			description: values.aboutProject || "",
			mood_images: filesBase64,
			mood_image_names: fileNames,
			contacts: [], //!contacts will be removed later, as it is not collected when creating a project
			user_id: user_id,
		},
	})
		.then((res) => {
			console.log(res.data.data);
			dispatch({
				type: CREATE_NEW_PROJECT,
				payload: {
					projectName: res.data.data.created_data.name,
					client: res.data.data.created_data.client,
					productionDate: res.data.data.created_data.production_date,
					aboutProject: res.data.data.created_data.description,
					moodBoardImages: res.data.data.created_data.mood_images,
					moodBoardImageName: res.data.data.created_data.mood_image_names,
					// projectCreateDate: res.data.data.created_data.production_date, //TODO this shoould be changed to include created Date
					projectId: res.data.data.created_data.id,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch(setErrors(err.response.data.message, err.response.status, true));
			dispatch(endLoading());
		});
};

export const updateAProject = (
	projectId,
	user_id,
	filesBase64,
	fileNames,
	patchRequestType
) => (dispatch) => {
	dispatch(setLoadingProject());
	console.log("update, ", filesBase64, fileNames);
	let requestBody = {};

	if (patchRequestType === "moodboard") {
		requestBody = {
			user_id: user_id,
			project_id: projectId,
			mood_images: filesBase64,
			mood_image_name: fileNames,
		};
	} else if (patchRequestType === "files") {
		requestBody = {
			user_id: user_id,
			project_id: projectId,
			files_data: filesBase64,
			files_data_name: fileNames,
		};
	} else if (patchRequestType === "receipts") {
		requestBody = {
			user_id: user_id,
			project_id: projectId,
			mood_images: filesBase64,
			mood_image_name: fileNames,
		};
	} else if (patchRequestType === "callsheet") {
		requestBody = {
			user_id: user_id,
			project_id: projectId,
			mood_images: filesBase64,
			mood_image_name: fileNames,
		};
	}

	axios({
		url: `http://localhost:5000/projects/${patchRequestType}`,
		method: "patch",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		data: JSON.stringify(requestBody),
	})
		.then((res) => {
			console.log(res.data.data);
			let fileData = "",
				fileName = "";

			if (patchRequestType === "moodboard") {
				fileData = res.data.data[0].mood_images;
				fileName = res.data.data[0].mood_image_names;
			} else if (patchRequestType === "files") {
				fileData = res.data.data.files_data;
				// fileName = res.data.data.fileNames;
			} else if (patchRequestType === "receipts") {
				fileData = res.data.data[0].filesBase64;
				fileName = res.data.data[0].fileNames;
			} else if (patchRequestType === "callsheet") {
				fileData = res.data.data[0].filesBase64;
				fileName = res.data.data[0].fileNames;
			}
			dispatch({
				type: UPDATE_A_PROJECT,
				payload: {
					file_data: fileData,
					file_names: fileName,
					projectId: projectId,
					patchRequestType,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch(setErrors(err, "404", true));
			dispatch(endLoading());
		});
};

export const deleteAProject = (projectId, user_id) => (dispatch) => {
	dispatch(setLoadingProject());
	axios({
		url: "http://localhost:5000/projects",
		method: "DELETE",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			project_id: projectId,
			user_id: user_id,
		}),
	})
		.then((res) => {
			dispatch({ type: DELETE_A_PROJECT, payload: projectId });
		})
		.catch((err) => {
			console.log(err.response.status);
			dispatch(setErrors(err.response.data.message, err.response.status, true));
			dispatch(endLoading());
		});
};

export const setLoadingProject = () => {
	return {
		type: LOADING_PROJECTS,
	};
};

export const endLoading = () => {
	return {
		type: END_LOADING,
	};
};
