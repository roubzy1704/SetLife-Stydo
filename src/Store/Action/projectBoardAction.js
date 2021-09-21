import axios from "axios";

import { setErrors } from "./errorAction";

export const FETCH_PROJECTBOARD = "FETCH_PROJECTBOARD";
export const UPDATE_APROJECTBOARD = "UPDATE_APROJECTBOARD";
export const LOADING_PROJECT_BOARD = "LOADING_PROJECT_BOARD";
export const END_LOADING = "END_LOADING";

export const fetchProjectBoard =
	(user_id, projectId, requestType) => (dispatch) => {
		dispatch(setLoadingProjectBoard());

		axios({
			url: `http://localhost:5000/projects/${requestType}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json;",
			},
			params: {
				user_id: user_id,
				project_id: projectId,
			},
		})
			.then((res) => {
				let result = "";

				console.log(res.data.res.all_callsheets);

				if (requestType === "moodboards") {
					result = res.data.res.all_project_moodboards;
				} else if (requestType === "requests") {
					result = res.data.res;
				} else if (requestType === "callsheet") {
					result = res.data.res.all_callsheets;
				} else if (requestType === "receipts") {
					result = res.data.res.all_receipts;
				} else if (requestType === "files") {
					result = res.data.res.all_files;
				} else if (requestType === "pullBoards") {
					result = res.data.res.all_pullboards;
				}

				console.log(result);
				dispatch({
					type: FETCH_PROJECTBOARD,
					payload: {
						result,
						requestType,
					},
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch(setErrors(err, "404", true));
				dispatch(endLoading());
			});
	};

export const updateProjectBoard =
	(
		user_id,
		projectId,
		requestType,
		filesBase64ToUpload,
		fileNamesToUpload,
		uploadData
	) =>
	(dispatch) => {
		dispatch(setLoadingProjectBoard());
		console.log(
			"update, ",
			requestType,
			filesBase64ToUpload,
			fileNamesToUpload
		);
		let requestBody = {};
		let uploadValues = [];

		//TODO HAVE TO INCLUDE DEFAULT TEMPLATE REQUEST IN HERE

		if (requestType === "moodboard") {
			//TODO HAVE TO RESOLVE MOOD BOARD AND IMAGES POST
			requestBody = {
				user_id: user_id,
				project_id: projectId,
				moodboard_id: uploadData.moodboard_id,
				request_data: {
					board_group_name: uploadData.boardGroupName,
				},
			};
		} else if (requestType === "files") {
			uploadValues = filesBase64ToUpload.map((files, index) => {
				return {
					file: files,
					file_name: fileNamesToUpload[index],
				};
			});
			requestBody = {
				user_id: user_id,
				project_id: projectId,
				request_data: uploadValues,
			};
			console.log(requestBody);
		} else if (requestType === "receipts") {
			uploadValues = filesBase64ToUpload.map((files, index) => {
				return {
					receipt: files,
					receipt_name: fileNamesToUpload[index],
				};
			});
			requestBody = {
				user_id: user_id,
				project_id: projectId,
				request_data: uploadValues,
			};
		} else if (requestType === "callsheets") {
			uploadValues = filesBase64ToUpload.map((files, index) => {
				return {
					call_sheet: files,
					call_sheet_name: fileNamesToUpload[index],
					user_id: user_id,
					project_id: projectId,
				};
			});

			console.log(uploadValues);
			requestBody = {
				user_id: user_id,
				project_id: projectId,
				request_data: uploadValues,
			};
			//! FOR SOME REASON THE CALLSHEET POST REQUEST IS FAILING ON THE SERVER
			console.log(requestBody);
		} else if (requestType === "requests") {
			requestBody = {
				user_id: user_id,
				project_id: projectId,
				request_data: [],
			};
		} else if (requestType === "pullboards") {
			if (uploadData.files) {
				requestBody = {
					board_id: uploadData.boardId,
					request_data: [],
				};
			} else if (uploadData.images) {
				requestBody = {
					board_id: uploadData.boardId,
					request_data: [],
				};
			} else {
				requestBody = {
					user_id: user_id,
					project_id: projectId,
					board_id: uploadData.boardId,
					request_data: {
						linked_contact: uploadData.linkedContact,
					},
				};
			}
		}

		axios({
			url: `http://localhost:5000/projects/${requestType}`,
			method: "post",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			data: JSON.stringify(requestBody),
		})
			.then((res) => {
				console.log(res.data.res);

				let response = res.data.res;
				let fileData = [];

				if (requestType === "moodboard") {
					// fileData = res.data.data[0].mood_images;
					// fileName = res.data.data[0].mood_image_names;
				} else if (requestType === "files") {
					fileData = response.all_files;
					// fileName = res.data.data.fileNames;
				} else if (requestType === "receipts") {
					fileData = response.all_receipts;
					// fileName = res.data.data[0].fileNames;
				} else if (requestType === "callsheet") {
					fileData = response.all_callsheets;
					// fileName = res.data.data[0].fileNames;
				}
				dispatch({
					type: UPDATE_APROJECTBOARD,
					payload: {
						fileData,
						projectId: projectId,
						requestType,
					},
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch(setErrors(err, "404", true));
				dispatch(endLoading());
			});
	};

export const setLoadingProjectBoard = () => {
	return {
		type: LOADING_PROJECT_BOARD,
	};
};

export const endLoading = () => {
	return {
		type: END_LOADING,
	};
};
