/**
 * The below variable contains the default header json
 * We no need to configure in every response send
 */
const defaultHeader = {
    "Content-Type": "application/json; charset=utf-8"
}


/**
 * The below variable contains the default error response
 * We no need to configure in every failure response send
 */
const defaultResponse = {
    "result": "Failed",
    "message": "Oops..! Something went wrong"
}


/**
 * 
 * @param { Object } responseObject 
 * @param { Number } status 
 * @param { Object } response 
 * @param { Object } header 
 * 
 * The below function will send the client response
 * Use the below custom function in every HTTP method in this application
 * Need to send necessary parameter to send the client response
 */
const sendClientResponse = ( responseObject, status, response = defaultResponse, header = defaultHeader ) => {

    responseObject.header ( header ).status ( status ).send ( response );
}


/**
 * Exports the "sendClientResponse" function for use in other files
 */
module.exports = sendClientResponse;