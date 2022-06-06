const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const mongoose = require("mongoose");

//Models
const User = require("../../models/User");

// const PLAID_CLIENT_ID = "6003014b1d0ca6000ffa17b8";
// const PLAID_SECRET = "d5d392ab1d41d91e2dfc5aa537f058";
const plaidClient = new plaid.Client({
	clientID: "6003014b1d0ca6000ffa17b8",
	secret: "d5d392ab1d41d91e2dfc5aa537f058",
	env: plaid.environments.development
});

// @route POST api/token/create_link_token
// @desc Creates a Link token
// @access Private
router.post("/create_link_token", async (req, res) => {
	try {
		console.log("creating link token");

		// Get the client_user_id by searching for the current user
		const user = await User.find();
		const clientUserId = "600497873ab70330a0bea832";

		// Create the link_token with all of your configurations
		const response = await plaidClient.createLinkToken({
			user: {
				client_user_id: clientUserId
			},
			client_name: "Finance Your Money",
			products: ["transactions"],
			country_codes: ["US"],
			language: "en",
			webhook: "https://webhook.sample.com"
		});
		console.log("link token created");

		return res.status(200).send({ link_token: response.link_token });
	} catch (e) {
		// Display error on client
		return res.send({ error: e.message });
	}
});

// @route POST api/token/get_link_token
// @desc Gets link token
// @access Private
router.post("/get_link_token", async (req, res) => {
	const response = await plaidClient.getLinkToken(linkToken).catch((err) => {
		if (!linkToken) {
			return "no link token";
		}
	});
});

// @route POST api/token/get_access_token
// @desc Gets and exchange public token
// @access Private
router.post("/get_access_token", async (req, res) => {
	//destructure publicToken in response data
	const { publicToken } = req.body;
	const response = await plaidClient
		.exchangePublicToken(publicToken)
		.catch((err) => {
			if (!publicToken) {
				return "no public token";
			}
		});

		//save access token to user

	const itemId = response.item_id;
	return res.send({ access_token: response.access_token });
});

router.post("/plaid_exchange", (req, res) => {
	var public_token = req.body.public_token;

	return plaidClient
		.exchangePublicToken(public_token)
		.then((res) => res.access_token)
		.then((accessToken) => plaidClient.getAccounts(accessToken))
		.then((res) => console.log(res.accounts))
		.catch((err) => {
			// Indicates a network or runtime error.
			if (!(err instanceof plaid.PlaidError)) {
				res.sendStatus(500);
				return;
			}

			// Indicates plaid API error
			console.log("/exchange token returned an error", {
				error_type: err.error_type,
				error_code: res.statusCode,
				error_message: err.error_message,
				display_message: err.display_message,
				request_id: err.request_id,
				status_code: err.status_code
			});

			// Inspect error_type to handle the error in your application
			switch (err.error_type) {
				case "INVALID_REQUEST":
					// ...
					break;
				case "INVALID_INPUT":
					// ...
					break;
				case "RATE_LIMIT_EXCEEDED":
					// ...
					break;
				case "API_ERROR":
					// ...
					break;
				case "ITEM_ERROR":
					// ...
					break;
				default:
				// fallthrough
			}

			return res.sendStatus(500);
		});
});

module.exports = router;
