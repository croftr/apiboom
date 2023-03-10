const mongoose = require("mongoose");


const userDatabasesSchema = require("./models/user-databases-schema");
const UserDatabases = mongoose.model("UserDatabases", userDatabasesSchema);

module.exports = {

    //when new user data schema is created store here.  We probably need to store these in the db as well 
    schemas: {},

    getUserSchema: function (schemaName) {
        const serviceFromMongo = UserDatabases.findOne({ schemaName: schemaName });
    },

    addUserSchemaToDatabase: function ({ schemaName, schema }) {

        const data = {
            schemaName,
            dataType: 'csv',
            dataDesc: 'some csv data',
            schema,
        }

        const userDatabase = new UserDatabases(data);

        userDatabase.save((error) => {
            if (error) {
                status = error;
            } else {
                status = "Service added";
            }
        });

    },

    csvToJson: function (csv) {
        // Split the CSV string into an array of lines
        const lines = csv.split('\n');

        // Extract the headers (first line) and the rest of the data
        const headers = lines[0].split(',');
        const data = lines.slice(1);

        // Create an array of objects with the correct structure
        const json = data.map(line => {
            const obj = {};
            const values = line.split(',');
            headers.forEach((header, index) => {
                obj[header.replace(/\s/g, '')] = values[index];
            });
            return obj;
        });

        return json;
    },

    generateSchema: function async (databaseDetails) {

        const serviceDatabaseName = `${databaseDetails.serviceName}_${databaseDetails.databasesIds[0].dataId}`
        console.log('create mongo collection with name ', serviceDatabaseName);

        //TODO we need to ensure column names are provided 
        const dataArray = databaseDetails.databasesIds[0].data.split('\n');

        const fieldNames = dataArray[0];
        
        //convert CSV data to JSON and add to new schema
        const json = this.csvToJson(databaseDetails.databasesIds[0].data)
        console.log('DATA: ', json);

        const newSchema = {}

        //TODO support different delimiters 
        const DELIMTER = ',';
        fieldNames.split(DELIMTER).forEach(fieldName => {
            newSchema[fieldName.replace(/\s/g, '')] = {
                type: String
            }
        })

        console.log('SCHEMA: ', newSchema);        
                
        const ServiceDatabase = mongoose.model(serviceDatabaseName, newSchema);        
        this.schemas[serviceDatabaseName] = ServiceDatabase;

        //store schema in DB so we can look it up to query or add to later on 
        this.addUserSchemaToDatabase({ schemaName: serviceDatabaseName, schema: ServiceDatabase });

        ServiceDatabase.insertMany(json);
        
    }
}