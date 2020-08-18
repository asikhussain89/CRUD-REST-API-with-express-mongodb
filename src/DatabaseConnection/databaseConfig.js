/**
 * Included the "mongodb" package
 * Created the "mongoClient" object by calling "MongoClient" property of "mongodb" package
 */
var mongoClient = require ( "mongodb" ).MongoClient;


/**
 * Created the "ObjectId" object by calling "ObjectID" property of "mongodb" package
 */
var ObjectId = require ( "mongodb" ).ObjectID;


/**
 * Configured the mongodb url
 */
var mongoDBUrl = "mongodb://localhost:27017/";


/**
 * Configured the database name
 */
var databaseName = "my_first_db";


/**
 * Exports the necessary objects below
 * To use in some other files
 */
exports.mongoClient = mongoClient;
exports.mongoDBUrl = mongoDBUrl;
exports.databaseName = databaseName;
exports.ObjectId = ObjectId;