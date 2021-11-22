import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import accountReducer from "./accountReducer";
import linkReducer from "./linkReducer";
import expenseReducer from "./expenseReducer";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	plaid: accountReducer,
	link: linkReducer,
	expenses: expenseReducer
});
