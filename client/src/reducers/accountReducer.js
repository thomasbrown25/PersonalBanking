import {
	ADD_ACCOUNT,
	DELETE_ACCOUNT,
	GET_ACCOUNTS,
	ACCOUNTS_LOADING,
	GET_TRANSACTIONS,
	TRANSACTIONS_LOADING,
	GET_ACCOUNTS_ERROR
} from "../actions/types";

const initialState = {
	account: null,
	accounts: [],
	transactions: [],
	accountsLoaded: false,
	transactionsLoaded: false,
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ACCOUNTS_LOADING:
			return {
				...state,
				accountsLoaded: false,
			};
		case ADD_ACCOUNT:
			return {
				...state,
				accounts: [action.payload, ...state.accounts],
			};
		case DELETE_ACCOUNT:
			return {
				...state,
				accounts: state.accounts.filter(
					(account) => account._id !== action.payload
				),
			};
		case GET_ACCOUNTS:
			return {
				...state,
				accounts: action.payload,
				accountsLoaded: true,
			};
		case GET_ACCOUNTS_ERROR:
			return {
				...state,
				error: action.payload,
				accountsLoaded: true
			};
		case TRANSACTIONS_LOADING:
			return {
				...state,
				transactionsLoaded: false,
			};
		case GET_TRANSACTIONS:
			return {
				...state,
				transactions: action.payload,
				transactionsLoaded: true,
			};
		default:
			return state;
	}
}
