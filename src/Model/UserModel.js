var express = require ( "express" );


/**
 * Create router object for create router method for client HTTP client 
 */
var router = express.Router();


/**
 * Include the "databaseConfig" custom module
 */
var { mongoClient, mongoDBUrl, databaseName, ObjectId } = require ( "../DatabaseConnection/databaseConfig" );


/**
 * Include the "ClientResponseSend" custom module
 */
var clientResponseSend = require ( "../ClientResponseSend" );


/**
 * Set the database table name for use in MySQL query
 */
var userTableName = "details";


/**
 * Create router "GET" method
 * This method handle the HTTP client request with the "/user" path
 * The below method will send all users list as json
 */
router.get ( "/", function ( req, res ) {
    
    var data = { "result": "Success", "users": [] };
    
    mongoClient.connect ( mongoDBUrl, function ( err, database ) {

        if ( err )
            clientResponseSend ( res, 400 );

        let databaseObject = database.db ( databaseName );
        databaseObject.collection ( userTableName ).find ( {} ).toArray ( function ( err, result ) {

            if ( err ) {
            
                data.result = "Failed";
                clientResponseSend ( res, 400, data );
            }
            
            for ( let i = 0; i < result.length; i++ ) {
                
                data.users.push ( { "id": result[i]._id, "name": result[i].name, "age": result[i].age } );
            }
            
            database.close();
            clientResponseSend ( res, 200, data );
        });
    });
});


/**
 * Create router "GET" method
 * This method handle the HTTP client request with the "/user/{id}" path
 * This method will receive user id and send information about that user
 */
router.get ( "/:id", function ( req, res ) {

    var data = { "result": "Success", "users": [] };
    
    mongoClient.connect ( mongoDBUrl, function ( err, database ) {

        if ( err )
            clientResponseSend ( res, 400 );

        let databaseObject = database.db ( databaseName );
        databaseObject.collection ( userTableName ).findOne ( { "_id": ObjectId ( `${req.params.id}` ) }, function ( err, result ) {

            if ( err ) {
            
                data.result = "Failed";
                clientResponseSend ( res, 400, data );
            }
            
            data.users.push ( result );
            
            database.close();
            clientResponseSend ( res, 200, data );
        });
    });
});


/**
 * Create router "POST" method
 * This method handle the HTTP client request with the "/user" path
 * The below method will receive user information and created one new record in the table in MySQL database
 */
router.post ( "/", function ( req, res ) {

    mongoClient.connect ( mongoDBUrl, function ( err, database ) {

        if ( err )
            clientResponseSend ( res, 400 );

        let databaseObject = database.db ( databaseName );
        databaseObject.collection ( userTableName ).insertOne ( req.body, function ( err, result ) {

            if ( err )
                clientResponseSend ( res, 400 );
            
            response = {
                "result": "Success",
                "message": "User has been created successfully...!"
            };
            
            database.close();
            clientResponseSend ( res, 201, response );
        });
    });
});


/**
 * Create router "PUT" method
 * This method handle the HTTP client request with the "/user/{id}" path
 * The below method will receive information about existing user id and updated with this information
 */
router.put ( "/:id", function ( req, res ) {

    mongoClient.connect ( mongoDBUrl, function ( err, database ) {

        if ( err )
            clientResponseSend ( res, 400 );

        let condition = { _id: ObjectId ( `${req.params.id}` ) };
        let setValue = { $set: {} };
        for ( key in req.body ) {
            setValue.$set[key] = req.body[key];
        }

        let databaseObject = database.db ( databaseName );
        databaseObject.collection ( userTableName ).updateOne ( condition, setValue, function ( err, result ) {

            if ( err )
                clientResponseSend ( res, 400 );
            
            response = {
                "result": "Success",
                "message": "User has been updated successfully...!"
            };
            
            database.close();
            clientResponseSend ( res, 200, response );
        });
    });
});


/**
 * Create router "DELETE" method
 * This method handle the HTTP client request with the "/user/{id}" path
 * The below method will receive user id and delete that record from the table in MySQL database
 */
router.delete ( "/:id", function ( req, res ) {

    mongoClient.connect ( mongoDBUrl, function ( err, database ) {

        if ( err )
            clientResponseSend ( res, 400 );
        
        let condition = { _id: ObjectId ( `${req.params.id}` ) };
        let databaseObject = database.db ( databaseName );
        databaseObject.collection ( userTableName ).deleteOne ( condition, function ( err, result ) {

            if ( err )
                clientResponseSend ( res, 400 );
            
            response = {
                "result": "Success",
                "message": "User has been deleted successfully...!"
            };
            
            database.close();
            clientResponseSend ( res, 200, response );
        });
    });
});


/**
 * Create router all methods except the above method
 * This method handle the HTTP client request with the "/user" path
 */
router.all ( "/", function ( req, res ) {

    let response = {
        "result": "Failed",
        "message": "Invalid URL or Method...!"
    };

    clientResponseSend ( res, 405, response );
});


/**
 * Export the router object for use in other files
 */
module.exports = router;