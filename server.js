const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const plaid = require("plaid");
const users = require("./routes/api/users");
const tokens = require("./routes/api/token");
const accounts = require("./routes/api/plaid/accounts");
const transactions = require("./routes/api/plaid/transactions");
const expenses = require("./routes/api/expenses");

const app = express();
app.use(express.static('./client/build'));

const client = new plaid.Client({
	clientID: "6003014b1d0ca6000ffa17b8",
	secret: "d5d392ab1d41d91e2dfc5aa537f058",
	env: plaid.environments.development
});

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch((err) => {
		 console.log(err);
		 
	});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/token", tokens);
app.use("/api/plaid/accounts", accounts);
app.use("/api/plaid/accounts/transactions", transactions);
app.use("/api/expenses", expenses);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build",     
	"index.html"));
 });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
