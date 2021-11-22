import axios from "axios";
import { CREATE_TOKEN, GET_TOKEN } from "./types";

// actions will go here
export const createToken = () => async (dispatch) => {
	axios
		.post("/api/token/create_link_token")
		.then((res) => {
			console.table(res.data);

			dispatch({
				type: CREATE_TOKEN,
				payload: res.data.link_token,
			});
		})
		.catch((err) => console.log(err));
};

export const getAccessToken = (publicToken) => async (dispatch) => {
	axios
		.post("/api/token/get_access_token", { publicToken: publicToken })
		.then((res) => {
			console.table(res.data);

			dispatch({
				type: GET_TOKEN,
				payload: res.data.access_token,
			});
		})
		.catch((err) => console.log(err));
};
