const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport'),
	JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('./config/database');
const routes = require('./api/routes');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
process.env.privateKey = 'H@shC0desTR!ng';

// Passport JWT Strategy Definition
const authStrategy = new JwtStrategy({
	jwtFromRequest	: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
	secretOrKey			: process.env.privateKey,
	authScheme			: 'Bearer'
}, strategyCallback);

function strategyCallback(jwtPayload, next){
	db.query("SELECT * FROM users WHERE id = ?", jwtPayload.id, function(err, results, fields){
		if (err){
			console.log(`DB ERROR [${err.code}]: ${err.sqlMessage}!\nSQL Query: ${err.sql}`)
			next(err, false);
		}
		if (results.length){
			var user = results[0];
			delete user['password'];
			next(null, user);
		}
		else{
			next(null, false);
		}
	});
}
passport.use(authStrategy);

// App
const app = express();

// setup database
db.connect(db.errHandler);

// Parse only application/json
app.use(bodyParser.json());

// setup routes
routes(app);

// Don't crash the application even
// if the error occurred coz
// error handling will be in log file
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Application still running...");
});

// Close the DB connection when pressing Ctrl+C
process.on('SIGINT', () => {
  db.end();
  process.exit(1);
});

// App listening
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
