const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const mongoose = require("mongoose");

// Load Account and User models
const Account = require("../../../models/Account");
const User = require("../../../models/User");

const PLAID_CLIENT_ID = "6003014b1d0ca6000ffa17b8";
const PLAID_SECRET = "d5d392ab1d41d91e2dfc5aa537f058";

const plaidClient = new plaid.Client({
	clientID: PLAID_CLIENT_ID,
	secret: PLAID_SECRET,
	env: plaid.environments.development
});

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

/***** ROUTES *****/

// @route POST api/plaid/accounts/add
// @desc Trades public token for access token and stores credentials in database
// @access Private
router.post(
	"/accounts/add",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		PUBLIC_TOKEN = req.body.public_token;
		const userId = req.user.id;
		const institution = req.body.metadata.institution;
		const { name, institution_id } = institution;
		if (PUBLIC_TOKEN) {
			plaidClient
				.exchangePublicToken(PUBLIC_TOKEN)
				.then((exchangeResponse) => {
					ACCESS_TOKEN = exchangeResponse.access_token;
					ITEM_ID = exchangeResponse.item_id;

					// Check if account already exists for specific user
					Account.findOne({
						userId: req.user.id,
						institutionId: institution_id
					})
						.then((account) => {
							if (account) {
								console.log("Account already exists");
							} else {
								const newAccount = new Account({
									userId: userId,
									accessToken: ACCESS_TOKEN,
									itemId: ITEM_ID,
									institutionId: institution_id,
									institutionName: name
								});
								newAccount
									.save()
									.then((account) => res.json(account));
							}
						})
						.catch((err) => console.log(err)); // Mongo Error
				})
				.catch((err) => console.log(err)); // Plaid Error
		}
	}
);

// @route DELETE api/plaid/accounts/:id
// @desc Delete account with given id
// @access Private
router.delete(
	"/accounts/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Account.findById(req.params.id).then((account) => {
			// Delete account
			account.remove().then(() => res.json({ success: true }));
		});
	}
);

// @route GET api/plaid/accounts
// @desc Get all accounts linked with plaid for a specific user
// @access Private
router.get(
	"/accounts",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const { accessToken } = req.body;

		const response = await plaidClient
			.getAccounts(accessToken)
			.catch((err) => {
				console.log("error occurred trying to get accounts: " + err);
				return "error occurred trying to get accounts: " + err;
			});

		return res.json(response);
	}
);

// @route GET api/plaid/accounts/balance
// @desc Get accounts balance
// @access Private
router.get(
	"/balance",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const { accessToken } = req.body;

		const response = await plaidClient
			.getBalance(accessToken)
			.catch((err) => {
				console.log(
					"error occurred trying to get account balance: " + err
				);
				return "error occurred trying to get account balance: " + err;
			});

		return res.json(response);
	}
);

module.exports = router;
