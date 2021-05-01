import { SET_ERRORS, CLEAR_ERRORS } from "../Action/errorAction";

const initialState = {
	error: {
		message: "",
		statusCode: null,
		show: false,
	},
};

export const errorsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERRORS:
			// console.log(action.payload);
			return {
				error: {
					message: action.payload.message,
					statusCode: action.payload.statusCode,
					show: true,
				},
			};
		case CLEAR_ERRORS:
			return {
				error: {
					message: "",
					statusCode: null,
					show: false,
				},
			};
		default:
			return state;
	}
};
