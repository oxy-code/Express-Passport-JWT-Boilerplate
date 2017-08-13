const mysql = require('mysql');

// initialize the DB connection

var host = 'localhost';
var user = 'root';
var password = '';
var database 	= 'jwt-test-db';

// mysql connection creator
var conn = mysql.createConnection({host, user, password, database});

// Constructor
function DB(){
}
// Inherit MySQL prototypes
DB.prototype = conn;

DB.prototype.errHandler = errHandler;

// DB connection error handler
function errHandler(err){
	if (err){
		console.log(`DB ERROR [${err.code}]: ${err.sqlMessage}`)
		process.exit();
	}
	else{
		console.log('DB connected successfully\n');
	}
}

// Singleton design pattern
// to keep same instance for multiple calls
module.exports = exports = new DB();

