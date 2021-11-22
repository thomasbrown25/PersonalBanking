import axios from "axios";
import { GET_EXPENSES_BY_MONTH, GET_EXPENSES_FAILED } from "./types";

// Get all accounts for specific user
export const getExpensesByMonth = (reqbody) => (dispatch) => {
	axios
		.post("/api/expenses/month", reqbody)
		.then((res) =>
			dispatch({
				type: GET_EXPENSES_BY_MONTH,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_EXPENSES_FAILED,
				payload: err
			})
		);
};
