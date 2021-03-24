// import update from "immutability-helper";

import {
	FETCH_USER_EMAIL_TEMPLATES,
	CREATE_NEW_EMAIL_TEMPLATE,
	DELETE_USER_EMAIL_TEMPLATE,
	CHANGE_DEFAULT_EMAIL_TEMPLATE,
	LOADING_USER_DATA,
	END_LOADING,
} from "../Action/userAction";

const initialUserState = {
	user_id: "",
	emailTemplates: [],
	defaultTemplate: 8,
	//auth: ""
	//isLoggedIn : false
	loading: false,
};

const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case FETCH_USER_EMAIL_TEMPLATES:
			// console.log("ap ", action.payload);
			return {
				...state,
				emailTemplates: action.payload,
				loading: false,
			};

		case CREATE_NEW_EMAIL_TEMPLATE:
			let updatedTemplates = action.payload.templateData;
			return {
				...state,
				emailTemplates: updatedTemplates,
				loading: false,
			};

		case DELETE_USER_EMAIL_TEMPLATE:
			return { ...state };

		case CHANGE_DEFAULT_EMAIL_TEMPLATE:
			// console.log(action.payload.newDefaultTemplate, action.payload);
			return {
				...state,
				defaultTemplate: action.payload,
				loading: false,
			};

		case LOADING_USER_DATA:
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

export default userReducer;
