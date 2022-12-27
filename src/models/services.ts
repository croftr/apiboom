import { Schema, model } from "mongoose";

const serviceSchema = new Schema({
    services: {
        
		dataStores: [
			{
				type: { type: String },
				id: { type: String },
				data: { type: Array },
			},
		],
	},
});

export const Service = model("Service", serviceSchema);
