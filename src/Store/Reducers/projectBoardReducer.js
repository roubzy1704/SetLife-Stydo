import {
	FETCH_PROJECTBOARD,
	UPDATE_APROJECTBOARD,
	LOADING_PROJECTS,
	END_LOADING,
} from "../Action/projectBoardAction";

const initialProjectBoardState = {
	// moodboard: {
	// 	boardGroupName: "",
	// 	boardId: "",
	// 	imageData: [],
	// },
	moodboard: [],
	files: [],
	request: [],
	callSheet: [],
	receipts: [],
	pullBoards: [],
	loading: false,
};

const projectBoardReducer = (state = initialProjectBoardState, action) => {
	switch (action.type) {
		case FETCH_PROJECTBOARD:
			console.log(action.payload);
			return {
				...state,
				[action.payload.requestType]: action.payload.result,
				loading: false,
			};

		case UPDATE_APROJECTBOARD:
			console.log(action.payload.fileData);
			return {
				...state,
				[action.payload.requestType]: action.payload.fileData,
			};

		default:
			return state;
	}
};

export default projectBoardReducer;
