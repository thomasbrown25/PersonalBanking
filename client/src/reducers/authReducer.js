import { SET_CURRENT_USER, USER_LOADING, LOGOUT } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	user: null,
	loading: false,
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(payload),
				user: payload,
			};

		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loaded: true,
				user: null,
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
