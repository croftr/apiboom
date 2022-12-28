const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
	serviceName: {
		type: String,
		required: true,
	},
	databasesIds: [
		{
			dataId: String,
			dataType: {
				type: String,
				required: true,
			},
			data: {
				type: String,
				required: true,
			},
			dataDesc: String,			
			idField: String,
		}	
	]	
});

module.exports = serviceSchema;
