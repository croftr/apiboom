const mongoose = require("mongoose");

const userDatabases = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	dataType: {
		type: String,
		required: true,
	},
	dataDesc: String,
	schema: Object
});

module.exports = userDatabases;
