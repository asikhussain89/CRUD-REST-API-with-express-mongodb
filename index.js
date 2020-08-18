/**
 * This is the main js file
 * which has been start the server when we run the "npm start" comment
 * This file will handle the every client request
 */
var express = require ( "express" );
var app = express();


/**
 * Included the "body-parser" middleware functions
 */
var bodyParser = require ( "body-parser" );


/**
 * Included the "UserModel" custom module
 */
var userModel = require ( "./src/Model/UserModel" );


/**
 * Included the "ClientResponseSend" custom module
 */
var clientResponseSend = require ( "./src/ClientResponseSend" );


/**
 * Apply the "body-parser" middleware
 */
app.use ( bodyParser.json() );
app.use ( bodyParser.urlencoded ( { extended: true } ) );


/**
 * Apply the "userModel" custom module
 * This handles every request should contain the "/user" path
 */
app.use ( "/user", userModel );


/**
 * The below method handles all unwanted request
 * If the request will match with any method we declared, the method will handle it
 */
app.use ( "*", function ( req, res ) {

    let response = {
        "result": "Failed",
        "message": "Invalid URL...!"
    };

    clientResponseSend ( res, 404, response );
});


/**
 * The server will listen the client request in the below mentioned port
 */
app.listen ( 8001 );