// ./src/index.js

// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const serviceSchema = require("./models/service-schema");

const mongoUtils = require('./mongoUtils');

mongoose.set("strictQuery", false);

const Service = mongoose.model("Service", serviceSchema);


// defining the Express app
const app = express();

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/mongodb");
	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected to MongoDB");
});

// defining an array to work as the database (temporary solution)
const ads = [{ title: "Hello, world (again)!" }];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// app.use(bodyParser.text());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all ads
app.get("/", (req, res) => {
	res.send(ads);
});

//Add new service and store data 
app.post("/addService", async (req, res) => {

	// console.log("add service", req.body);

	let status = 'success'

	const service = new Service(req.body);

	service.save((error) => {
		if (error) {
			status = error;
		} else {
			status = "Service added";
		}
	});

	/**
	 * for csv data create seperate mongo collection to store it in
	 * so we can query it back by specified fields 
	 */
	if (req.body.databasesIds[0].dataType === 'csv'){
		mongoUtils.generateSchema(req.body);
	}
	
	res.send({ status: 'success' });
});

/**
 * Display a summary of the service and data sources is has 
 */
app.get("/:service", async (req, res) => {

	console.log(`get Service info`);

	const serviceName = req.params.service;

	const serviceFromMongo = await (await Service.findOne({ serviceName: { $in: serviceName } }));

	const serviceSummary = {
		serviceName: serviceFromMongo.serviceName,
		databases: serviceFromMongo.databasesIds.map(i => {
			return {
				dataId: i.dataId,
				dataDesc: i.dataDesc,
				dataType: i.dataType,
				idField: i.idField
			}
		})
	}
		
	res.send(serviceSummary);
});

/**
 * Get the data from a data source specified in ?dataid=xxx
 */
app.get("/:service/data", async (req, res) => {

	const serviceName = req.params.service;

	const dataId = req.query.dataid;

	const itemId = req.query.itemid;

	console.log(`get data ${dataId} for service ${serviceName} using itemid ${itemId}`);

	const serviceFromMongo = await (await Service.findOne({ serviceName: { $in: serviceName } }));
	const dataFromDatabase = serviceFromMongo.databasesIds.find(i => i.dataId === dataId);

	if (itemId) {
		console.log('query by item id ', itemId);
		//TODO we have to store the data in a seperate collection so we can query it by the id field 		
		// res.send(`Coming soon: QUERY ${dataFromDatabase.idField} = ${itemId}`);
		const userSchema = mongoUtils.schemas["robsservice_cars"];

		console.log('userSchema ', userSchema);
		// const Model = mongoose.model("robsservice_cars", userSchema);
		// console.log('Model ', Model);
		const fieldToQuery = dataFromDatabase.idField.replace(/\s/g, '');
		console.log('fieldToQuery ', fieldToQuery);

		const itemFromDatabase = await userSchema.find({ [fieldToQuery]: itemId });

		console.log('result ', itemFromDatabase);

		res.send(itemFromDatabase);
	} else {
		res.send(dataFromDatabase);
	}
	
});


// starting the server
app.listen(3001, () => {
	console.log("listening on port 3001");
});
