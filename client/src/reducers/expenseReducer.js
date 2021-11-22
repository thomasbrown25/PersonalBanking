import { GET_EXPENSES_BY_MONTH, GET_EXPENSES_FAILED } from "../actions/types";

const initialState = {
	expense: [],
	error: null,
	loaded: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_EXPENSES_BY_MONTH:
			return {
				...state,
				expense: payload,
				loaded: true
			};

		case GET_EXPENSES_FAILED:
			return {
				...state,
				error: payload,
				loaded: true
			};

		default:
			return state;
	}
}
