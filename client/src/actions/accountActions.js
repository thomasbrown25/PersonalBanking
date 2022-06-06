import axios from "axios";
import {
	ADD_ACCOUNT,
	DELETE_ACCOUNT,
	GET_ACCOUNTS,
	GET_ACCOUNTS_ERROR,
	ACCOUNTS_LOADING,
	GET_TRANSACTIONS,
	TRANSACTIONS_LOADING
} from "./types";

// Actions will go here
// Add account
export const addAccount = (plaidData) => (dispatch) => {
	const accounts = plaidData.accounts;
	axios
		.post("/api/plaid/accounts/add", plaidData)
		.then((res) =>
			dispatch({
				type: ADD_ACCOUNT,
				payload: res.data
			})
		)
		.then((data) =>
			accounts
				? dispatch(getTransactions(accounts.concat(data.payload)))
				: null
		)
		.catch((err) => console.log(err));
};

// Delete account
export const deleteAccount = (plaidData) => (dispatch) => {
	if (window.confirm("Are you sure you want to remove this account?")) {
		const id = plaidData.id;
		const newAccounts = plaidData.accounts.filter(
			(account) => account._id !== id
		);
		axios
			.delete(`/api/plaid/accounts/${id}`)
			.then((res) =>
				dispatch({
					type: DELETE_ACCOUNT,
					payload: id
				})
			)
			.then(newAccounts ? dispatch(getTransactions(newAccounts)) : null)
			.catch((err) => console.log(err));
	}
};

// Get all accounts for specific user
export const getAccounts = (accessToken) => (dispatch) => {
	if (!accessToken)
	return null;

	dispatch(setAccountsLoading());
	axios
		.post("/api/plaid/accounts", { data: { accessToken }})
		.then((res) =>
			dispatch({
				type: GET_ACCOUNTS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ACCOUNTS_ERROR,
				payload: err
			})
		);
};


// Accounts Loaded
export const setAccountsLoading = () => {
	return {
		type: ACCOUNTS_LOADING
	};
};

// Get Transactions
export const getTransactions = (accessToken) => (dispatch) => {
	dispatch(setTransactionsLoading());
	axios
		.post("/api/plaid/accounts/transactions", accessToken)
		.then((res) =>
			dispatch({
				type: GET_TRANSACTIONS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_TRANSACTIONS,
				payload: null
			})
		);
};

// Transactions Loaded
export const setTransactionsLoading = () => {
	return {
		type: TRANSACTIONS_LOADING
	};
};
