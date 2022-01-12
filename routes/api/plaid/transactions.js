const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const mongoose = require("mongoose");

// Load Account and User models
const Account = require("../../../models/Account");
const User = require("../../../models/User");

// const PLAID_CLIENT_ID = "6003014b1d0ca6000ffa17b8";
// const PLAID_SECRET = "d5d392ab1d41d91e2dfc5aa537f058";
const PLAID_CLIENT_ID = "6003014b1d0ca6000ffa17b8";
const PLAID_SECRET = "d5d392ab1d41d91e2dfc5aa537f058";

const client = new plaid.Client({
	clientID: PLAID_CLIENT_ID,
	secret: PLAID_SECRET,
	env: plaid.environments.development
});

var PUBLIC_TOKEN = null;
var ACCESS_TOKEN = null;
var ITEM_ID = null;

/***** ROUTES *****/

// @route GET api/plaid/accounts/transactions
// @desc Get all transactions associated with an account linked with plaid for a specific user
// @access Private
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const now = moment();
		const today = now.format("YYYY-MM-DD");
		const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD"); // Change this if you want more transactions
		const { accessToken } = req.body;

		const response = await client
			.getTransactions(accessToken, thirtyDaysAgo, today, {
				count: 250,
				offset: 0
			})
			.catch((err) => {
				if (!accessToken) {
					console.log("no access token");
					return "no access token";
				}
			});

		const transactions = response.transactions;
		console.log(`received ${transactions.length} transactions`);
		return res.send({ transactions: transactions });
	}
);

// @route POST api/plaid/accounts/transactions
// @desc Fetch transactions from past 30 days from all linked accounts
// @access Private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const now = moment();
		const today = now.format("YYYY-MM-DD");
		const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD"); // Change this if you want more transactions
		let transactions = [];
		const accounts = req.body;

		if (accounts) {
			accounts.forEach(function (account) {
				ACCESS_TOKEN = account.accessToken;
				const institutionName = account.institutionName;
				client
					.getTransactions(ACCESS_TOKEN, thirtyDaysAgo, today)
					.then((response) => {
						transactions.push({
							accountName: institutionName,
							transactions: response.transactions
						});
						// Don't send back response till all transactions have been added
						if (transactions.length === accounts.length) {
							res.json(transactions);
						}
					})
					.catch((err) => console.log(err));
			});
		}
	}
);

module.exports = router;
