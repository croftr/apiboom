const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
	serviceName: {
		type: String,
		required: true,
	},
	dataType: {
		type: String,
		required: true,
	},
	data: {
		type: String,
		required: true,
	},
	dataDesc: String,
	dataId: String,
	idField: String,
});

module.exports = serviceSchema;
