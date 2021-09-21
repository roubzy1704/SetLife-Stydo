import axios from "axios";

import { setErrors } from "./errorAction";

export const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT";
export const DELETE_A_PROJECT = "DELETE_A_PROJECT";
export const FETCH_ALL_PROJECTS = "FETCH_ALL_PROJECTS";
export const UPDATE_A_PROJECT = "UPDATE_A_PROJECT";
export const LOADING_PROJECTS = "LOADING_PROJECTS";
export const END_LOADING = "END_LOADING";

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
			const response = res.data.res.all_user_projects;
			console.log(response);
			let userProjects = [];
			userProjects = response.map((project, index) => {
				return {
					projectName: project.name,
					client: project.client,
					productionDate: project.production_date,
					aboutProject: project.description,
					projectId: project.id,
					projectCreateDate: project.created_timestamp,
					notes: project.notes,
					// files: project.files,
					// callSheet: project.call_sheet,
					// contacts: project.contacts,
					// budgetReceipts: project.receipts,
					// pullInventory: [], //? no route for this
					// confirmedImages: project.confirmed_images, //TODO integrate this
					// requestImages: project.request_images, //TODO integrate this
					// looks : project.looks //TODO integrate this
					//!new info
					pressContacts: project.connected_press_contacts,
					userContacts: project.connected_user_contacts,
					defaultTemplate: project.default_template,
					updated_timestamp: project.updated_timestamp,
					user_id: project.user_id,
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
			console.log(err);
			err.response.statusText !== "NOT FOUND" &&
				dispatch(
					setErrors(err.response.data.message, err.response.status, true)
				);
			dispatch(endLoading());
		});
};

export const createNewProject =
	(values, filesBase64, fileNames, user_id) => (dispatch) => {
		dispatch(setLoadingProject());
		console.log(values, filesBase64, fileNames, user_id);

		//prepping moodboard image request for post
		let imageUploadData = [];
		filesBase64.forEach((image, index) => {
			imageUploadData.push({
				mood_image: image,
				mood_image_name: fileNames[index],
				position: {
					x: "", //!will be added later
					y: "", //!will be added later
				},
				shape: "", //!will be added later
				size: {
					length: "", //!will be added later
					width: "", //!will be added later
				},
			});
		});

		console.log(imageUploadData);

		let data = JSON.stringify({
			request_data: {
				name: values.projectName,
				client: values.client,
				production_date: values.productionDate,
				description: values.aboutProject || "",
				connected_user_contacts: [], //!will be added later
				connected_press_contacts: [], //!will be added later
			},
			user_id: 1,
		});

		axios({
			url: "http://localhost:5000/projects",
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
			data: data,
		})
			.then((res) => {
				let new_project = res.data.res.all_current_user_projects[0];

				console.log(new_project);

				return axios({
					url: "http://127.0.0.1:5000/projects/moodboards",
					method: "POST",
					headers: {
						accept: "application/json",
						"Content-Type": "application/json",
					},
					data: {
						user_id: user_id,
						project_id: new_project.id,
						request_data: {
							board_group_name: "Default name 1",
						},
					},
				})
					.then(function (response) {
						console.log(response.data.res.all_project_moodboards[0]);
						let moodboard = response.data.res.all_project_moodboards[0];
						return axios({
							url: "http://127.0.0.1:5000/projects/moodboard/images",
							method: "POST",
							headers: {
								accept: "application/json",
								"Content-Type": "application/json",
							},
							data: {
								moodboard_id: moodboard.id,
								request_data: imageUploadData,
							},
						})
							.then(function (response) {
								// console.log(new_project);
								console.log(response.data.res);
								let projectMoodboardImages =
									response.data.res.all_moodboard_images;
								//!here I want to do all my dispatch to store
								dispatch({
									type: CREATE_NEW_PROJECT,
									payload: {
										projectName: new_project.name,
										client: new_project.client,
										productionDate: new_project.production_date,
										aboutProject: new_project.description,
										connected_press_contacts:
											new_project.connected_press_contacts,
										connected_user_contacts:
											new_project.connected_user_contacts,
										projectId: new_project.id,
										projectCreateDate: new_project.created_timestamp,
										moodBoardName: moodboard.board_group_name,
										moodboardID: moodboard.id,
										moodBoardImages: projectMoodboardImages,
									},
								});
								return projectMoodboardImages;
							})
							.catch(function (error) {
								console.log(error);
							});
					})

					.catch(function (err) {
						console.log(err);
						dispatch(
							setErrors(err.response.data.message, err.response.status, true)
						);
						dispatch(endLoading());
					});
			})

			.catch((err) => {
				console.log(err);
				dispatch(
					setErrors(err.response.data.message, err.response.status, true)
				);
				dispatch(endLoading());
			});
	};

export const updateAProject =
	(projectId, user_id, filesBase64, fileNames, patchRequestType) =>
	(dispatch) => {};

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
