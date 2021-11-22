import axios from "axios";

const setAuthToken = (token) => {
	if (token) {
		// Apply authorization token to every request if logged in
		axios.defaults.headers.common["Authorization"] = token;
		// Set token to localStorage
		localStorage.setItem("jwtToken", token);
	} else {
		// Delete auth header
		delete axios.defaults.headers.common["Authorization"];
		// Remove token from local storage
		localStorage.removeItem("jwtToken");
	}
};

export default setAuthToken;
