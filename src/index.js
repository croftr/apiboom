// ./src/index.js

// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const serviceSchema = require("./models/service-schema");

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
app.post("/addService", (req, res) => {
	const service = new Service(req.body);
	console.log("add service", req.body);
	service.save((error) => {
		if (error) {
			res.send(error);
		} else {
			res.send("Service added");
		}
	});
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

	console.log(`get data ${dataId} for service ${serviceName}`);

	const serviceFromMongo = await (await Service.findOne({ serviceName: { $in: serviceName } }));
		
	const dataFromDatabase = serviceFromMongo.databasesIds.find(i => i.dataId === dataId);

	res.send(dataFromDatabase);
});


// starting the server
app.listen(3001, () => {
	console.log("listening on port 3001");
});
