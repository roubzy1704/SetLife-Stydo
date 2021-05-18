// import update from "immutability-helper";

import {
	FETCH_USER_EMAIL_TEMPLATES,
	CREATE_NEW_EMAIL_TEMPLATE,
	DELETE_USER_EMAIL_TEMPLATE,
	CHANGE_DEFAULT_EMAIL_TEMPLATE,
	CREATE_NEW_FORUM_POST,
	FETCH_FORUM_POST,
	LOADING_USER_DATA,
	END_LOADING,
} from "../Action/userAction";

const initialUserState = {
	user_id: "",
	emailTemplates: [],
	defaultTemplate: 8,
	forumPost: [],
	//auth: ""
	//isLoggedIn : false
	loading: false,
};

const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		//*EMAIL TEMPLATES

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

		//*FORUM

		case CREATE_NEW_FORUM_POST:
			let forumPost = action.payload;

			let tempArray = initialUserState.forumPost;

			tempArray.concat(forumPost);

			return {
				...state,
				forumPost: tempArray,
				loading: false,
			};

		case FETCH_FORUM_POST:
			let userForumPost = action.payload;
			return {
				...state,
				forumPost: userForumPost,
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
