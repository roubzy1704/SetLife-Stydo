import axios from "axios";

import { setErrors } from "./errorAction";

export const CREATE_NEW_EMAIL_TEMPLATE = "CREATE_NEW_EMAIL_TEMPLATE";
export const DELETE_USER_EMAIL_TEMPLATE = "DELETE_USER_EMAIL_TEMPLATES";
export const FETCH_USER_EMAIL_TEMPLATES = "FETCH_USER_EMAIL_TEMPLATES";
export const CHANGE_DEFAULT_EMAIL_TEMPLATE = "CHANGE_DEFAULT_EMAIL_TEMPLATE";
export const LOADING_USER_DATA = "LOADING_USER_DATA";
export const END_LOADING = "END_LOADING";

export const createNewEmailTemplate = (user_id, templateData) => (dispatch) => {
	dispatch(setLoading());
	axios({
		url: "http://localhost:5000/templates",
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			template_data: templateData,
			user_id: user_id,
		}),
	})
		.then((res) => {
			// console.log(res.data.data);
			dispatch({
				type: CREATE_NEW_EMAIL_TEMPLATE,
				payload: {
					templateData: res.data.data,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch(
				setErrors(err.response.data.message[0], err.response.data.error, true)
			);
			dispatch(endLoading());
		});
};

export const fetchUserEmailTemplates = (user_id) => (dispatch) => {
	dispatch(setLoading());

	axios({
		url: "http://localhost:5000/templates",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		params: { user_id: user_id },
	})
		.then((res) => {
			const response = res.data.data;
			console.log(response);
			const userTemplates = response.map((res, index) => {
				// if(index.length){
				// 	if(index === 0){
				// 		return { id: res.id, templateTitle: res.name, message: res.body };
				// 	}
				// }
				return { id: res.id, templateTitle: res.name, message: res.body };
			});

			dispatch({
				type: FETCH_USER_EMAIL_TEMPLATES,
				payload: userTemplates,
			});
		})
		.catch((err) => {
			dispatch(
				setErrors(err.response.data.message[0], err.response.data.error, true)
			);
			dispatch(endLoading());
		});
};

export const deleteUserEmailTemplates = (user_id) => (dispatch) => {
	// dispatch(setLoading());
	// axios({
	// 	url: "http://localhost:5000/templates",
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	params: { user_id: user_id },
	// })
	// 	.then((res) => {
	// 		const response = res.data.data;
	// 		console.log(response);
	// 		const userTemplates = response.map((res) => {
	// 			return { id: res.id, templateTitle: res.name, message: res.body };
	// 		});
	// 		dispatch({
	// 			type: FETCH_USER_EMAIL_TEMPLATES,
	// 			payload: userTemplates,
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		dispatch(
	// 			setErrors(err.response.data.message[0], err.response.data.error, true)
	// 		);
	// 		dispatch(endLoading());
	// 	});
};

export const changeDefaultTemplate = (
	user_id,
	project_id,
	default_template
) => (dispatch) => {
	axios({
		url: "http://localhost:5000/templates",
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			user_id: user_id,
			project_id: project_id, //TODO tell tommy to remove proecjt ID from changing template default because this is not needed
			default_template: default_template,
		}),
	})
		.then((res) => {
			const response = res.data.data;
			console.log(response.default_template);
			const newDefualtTemplate = response.default_template;
			dispatch({
				type: CHANGE_DEFAULT_EMAIL_TEMPLATE,
				payload: newDefualtTemplate,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export const setLoading = () => {
	return {
		type: LOADING_USER_DATA,
	};
};

export const endLoading = () => {
	return {
		type: END_LOADING,
	};
};
