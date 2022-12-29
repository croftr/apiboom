const mongoose = require("mongoose");

module.exports = {

    generateSchema: function async (databaseDetails) {

        const serviceDatabaseName = `${databaseDetails.serviceName}_${databaseDetails.databasesIds[0].dataId}`
        console.log('create mongo collection with name ', serviceDatabaseName);
    
        //TODO we need to ensure column names are provided 
        const dataArray = databaseDetails.databasesIds[0].data.split('\n');

        const fieldNames = dataArray[0];

        console.log('fieldNames ', fieldNames);

        const newSchema = {};

        //TODO support different delimiters 
        const DELIMTER = ',';
        fieldNames.split(DELIMTER).forEach(fieldName => {
            newSchema[fieldName] = {
                type: String
            }
        })
        
        console.log('newSchema ', newSchema);
        const schema = new mongoose.Schema(newSchema);
                    
        //convert CSV data to JSON and add to new schema
        
        // const data = databaseDetails.databaseDetails.databasesIds.data;

        // const ServiceDatabase = mongoose.model(serviceDatabaseName, schema);
        // const serviceDatabase = new ServiceDatabase(data);

        // serviceDatabase.save((error) => {
        //     if (error) {
        //         res.send(error);
        //     } else {
        //         res.send("Service added");
        //     }
        // });

    
    }   
}