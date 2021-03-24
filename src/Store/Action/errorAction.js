export const SET_ERRORS = "SET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const setErrors = (message, statusCode, error) => {
	return {
		type: SET_ERRORS,
		payload: {
			message,
			statusCode,
			error,
		},
	};
};

// CLEAR ERRORS
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
