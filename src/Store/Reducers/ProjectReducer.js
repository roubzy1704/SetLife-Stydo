// import update from "immutability-helper";

import {
	FETCH_ALL_PROJECTS,
	CREATE_NEW_PROJECT,
	UPDATE_A_PROJECT,
	DELETE_A_PROJECT,
	LOADING_PROJECTS,
	END_LOADING,
} from "../Action/projectAction";

//!for testing purpose, clear later
var options = {
	weekday: "long",
	month: "long",
	day: "numeric",
};

const initialProjectState = {
	project: [],
	loading: false,
};

const projectReducer = (state = initialProjectState, action) => {
	switch (action.type) {
		case FETCH_ALL_PROJECTS:
			// console.log(action.payload);
			return {
				...state,
				project: action.payload,
				loading: false,
			};

		case CREATE_NEW_PROJECT:
			// We need to return a new state object
			return {
				// that has all the existing state data
				...state,
				// but has a new array for the `project` field
				project: [
					// with all of the old projects
					...state.project,
					{
						// and the new project object
						projectId: action.payload.projectId,
						projectName: action.payload.projectName,
						client: action.payload.client,
						productionDate: action.payload.productionDate,
						aboutProject: action.payload.aboutProject,
						projectCreateDate: new Date().toLocaleDateString("en-US", options),
						moodBoardImages: action.payload.moodBoardImages,
						moodBoardImageName: action.payload.moodBoardImageName,
						files: [],
						fileName: [],
						notes: [],
						callSheet: [],
						contacts: [],
						budgetReceipts: [],
						pullInventory: [],
					},
				],
				loading: false,
			};

		case UPDATE_A_PROJECT:
			console.log(action.payload);
			//get index of project to update
			const index = state.project.findIndex(
				(proj) => proj.projectId !== action.payload.projectId
			);

			console.log(index);
			//making a copy of the state array
			const tempArray = [...state.project];

			//! this is the part to figure
			tempArray[index].files = action.payload.file_data;
			tempArray[index].fileName = action.payload.fileNames;
			return {
				...state, //copying the orignal state
				project: tempArray, //reassigning project to tempArray
				loading: false,
			};

		case DELETE_A_PROJECT:
			const projToDelete = action.payload;
			const deleteAProject = state.project.filter(
				(project) => project.projectId !== projToDelete
			);
			return {
				...state,
				project: deleteAProject,
				loading: false,
			};

		case LOADING_PROJECTS:
			return {
				...state,
				loading: true,
			};
		case END_LOADING:
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default projectReducer;
