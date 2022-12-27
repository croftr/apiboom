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

//use this to send text such as csv format rather than uploading a file
app.post("/upload/text", bodyParser.text(), (req, res) => {
	console.log("body is ", req.body);
	res.status(200).send("body is " + req.body);
});

app.get("/:apiname/:id", (req, res) => {
	res.send(ads);
});

// app.post("/register", (req, res) => {
// 	const service = req.body;
// 	// Do something with the service data, such as saving it to a database
// 	console.log("request body", req.body);

// 	res.send({
// 		status: "success",
// 		_self: `https://apiboom/${service.name}`,
// 	});
// });

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

app.get("/apiboom/:service/:id", (req, res) => {
	const service = req.params.service;
	const id = req.params.id;
	// Do something with the service and id parameters, such as querying a database or performing some other action
	res.send(`Received request for apiboom${service} with id ${id}`);
});

// starting the server
app.listen(3001, () => {
	console.log("listening on port 3001");
});
