const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	accountId: {
		type: Schema.Types.ObjectId,
		ref: "account"
	},
	category: [
		{
			type: String,
			required: true
		}
	],
	amount: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	accountName: {
		type: String
	},
	accountType: {
		type: String
	},
	date: {
		type: Date,
		required: true
	}
});
module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
