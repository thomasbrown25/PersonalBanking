import isEmpty from "is-empty";
import { CREATE_TOKEN, GET_TOKEN, CLEAR_TOKEN } from "../actions/types";

const initialState = {
	linkToken: "",
	accessToken: localStorage.getItem("accessToken"),
	accessTokenLoaded: !isEmpty(localStorage.getItem("accessToken"))
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CREATE_TOKEN:
			return {
				...state,
				linkToken: payload
			};
		case GET_TOKEN:
			localStorage.setItem("accessToken", payload);
			return {
				...state,
				accessToken: payload,
				accessTokenLoaded: true
			};

		case CLEAR_TOKEN:
			localStorage.removeItem("accessToken");
			return {
				...state,
				linkToken: null,
				accessToken: null,
				accessTokenLoaded: false
			};
		default:
			return state;
	}
}
