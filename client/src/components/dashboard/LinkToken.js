import React from "react";
import { connect } from "react-redux";
import { PlaidLink } from "react-plaid-link";
import PropTypes from "prop-types";
import { getAccessToken } from "../../actions/linkActions";

const LinkToken = ({ token, accessToken, getAccessToken }) => {
	const onExit = (error, metadata) => console.log("onExit", error, metadata);

	const onEvent = (eventName, metadata) =>
		console.log("onEvent", eventName, metadata);

	const onSuccess = (token, metadata) => {
		console.log("onSuccess", token, metadata);
		getAccessToken(token);
	};

	return (
		<>
			<PlaidLink
				className="btn black f-red center-btn btn-large waves-effect waves-light hoverable accent-3 main-btn"
				style={{ marginTop: "200px", padding: "0px", fontSize: "16px", cursor: "pointer" }}
				token={token}
				onExit={onExit}
				onSuccess={onSuccess}
				onEvent={onEvent}>
				Link Account
			</PlaidLink>
		</>
	);
};

LinkToken.propTypes = {
	token: PropTypes.string.isRequired,
	getAccessToken: PropTypes.func.isRequired,
};

export default connect(null, {
	getAccessToken,
})(LinkToken);
