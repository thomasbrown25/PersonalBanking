const express = require("express");
const plaid = require("plaid");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const mongoose = require("mongoose");
const isEmpty = require("is-empty");
const { check, validationResult } = require("express-validator");

const PLAID_CLIENT_ID = "6003014b1d0ca6000ffa17b8";
const PLAID_SECRET = "d5d392ab1d41d91e2dfc5aa537f058";

const client = new plaid.Client({
	clientID: PLAID_CLIENT_ID,
	secret: PLAID_SECRET,
	env: plaid.environments.development
});

/***** ROUTES *****/

// @route POST api/expenses/month
// @desc Get all expenses by the month and year
// @access Private
router.post(
	"/month",
	check("accessToken", "accessToken is required").not().isEmpty(),
	check("month", "month is required").not().isEmpty(),
	check("year", "year is required").not().isEmpty(),
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			// Finds the validation errors in this request and wraps them in an object with handy functions
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { accessToken, month, year } = req.body;

			console.log(`month and year: ${month}/${year}`);

			const startDate = `${year}-${month}-01`;
			const endDate = moment(startDate)
				.endOf("month")
				.format("YYYY-MM-DD");

			console.log(`start date ${startDate} and end date ${endDate}`);

			const response = await client
				.getTransactions(accessToken, startDate, endDate, {
					offset: 0
				})
				.catch((err) => {
					console.error(err.message);
					return res.status(500).send("Server error on plaid client");
				});

			const transactions = response.transactions;

			if (!transactions)
				return res.status(200).send("no transactions for the month");

			//Get total for month
			let total = 0;
			transactions.forEach((trans) => {
				total += trans.amount;
				console.log(`trans amount ${trans.amount}`);
			});

			response.total = total;

			console.log(`received ${transactions.length} transactions`);
			console.log(`total amount for month: ${response.total}`);
			return res.send({ response: response });
		} catch (err) {
			console.error(err.message);
			return res.status(500).send("Server error");
		}
	}
);

module.exports = router;
