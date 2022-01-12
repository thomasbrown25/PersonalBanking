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

// @route POST api/accounts/balance/get
// @desc 
// @access Private


