// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// app.use(bodyParser.text());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

//use this to send text such as csv format rather than uploading a file
app.post('/upload/text', bodyParser.text(), (req, res) =>{    
  console.log('body is ', req.body);  
  res.status(200).send('body is ' + req.body)  
});

app.get('/:apiname/:id', (req, res) => {
  res.send(ads);
});


// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});