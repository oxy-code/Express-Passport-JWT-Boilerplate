const db = require('../config/database');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Display home page
exports.index = function(req, res){
	res.send('<h1 style="padding:50px;text-align:center;">Hello, There!!!</h1>');
}

// Save User Record
exports.saveUser = function(req, res){
	const data = req.body;
	const postedInputLabels = Object.keys(data);

	if (postedInputLabels.indexOf('name') === -1){
		return res.status(500).json({
			ErrorMessage: 'Name field is required'
		});
	}

	if (postedInputLabels.indexOf('email') === -1){
		return res.status(500).json({
			ErrorMessage: 'Email field is required'
		});
	}
	else{
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(data.email) === false){
			return res.status(500).json({
				ErrorMessage: 'Invalid email address'
			});
		}
	}

	if (postedInputLabels.indexOf('password') === -1){
		return res.status(500).json({
			ErrorMessage: 'Password field is required'
		});
	}

	var hashPassword = crypto.createHmac('sha256', process.env.privateKey).update(data.password).digest("hex");
	var createdAt = new Date().toISOString();

	db.query("INSERT INTO users (name, email, password, created_at) VALUES ("
		+ db.escape(data.name) 
		+","
		+ db.escape(data.email) 
		+","
		+ db.escape(hashPassword) 
		+","
		+ db.escape(createdAt) 
		+")", function(err, results, fields){

			if (err){
				console.log(`DB ERROR [${err.code}]: ${err.sqlMessage}!\nSQL Query: ${err.sql}`)
				return res.status(500).send(err);
			}

			res.json({Message: "Successfully added the user information"});
		});
}


exports.authUser = function(req, res){
	const data = req.body;
	const postedInputLabels = Object.keys(data);

	if (postedInputLabels.indexOf('email') === -1){
		return res.status(500).json({
			ErrorMessage: 'Email field is required'
		});
	}
	else{
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(data.email) === false){
			return res.status(500).json({
				ErrorMessage: 'Invalid email address'
			});
		}
	}

	if (postedInputLabels.indexOf('password') === -1){
		return res.status(500).json({
			ErrorMessage: 'Password field is required'
		});
	}

	var hashPassword = crypto.createHmac('sha256', process.env.privateKey).update(data.password).digest("hex");

	db.query("SELECT * FROM users WHERE email = ? AND password = ?", [data.email, hashPassword], function(err, results, fields){
		if (err){
			console.log(`DB ERROR [${err.code}]: ${err.sqlMessage}!\nSQL Query: ${err.sql}`)
			return res.status(500).send(err);
		}

		if(results.length){
			var user = results[0], token;
			delete user['password'];
			token = jwt.sign(user, process.env.privateKey, { expiresIn: '10m' });
			res.json({ token });
		}
		else{
			res.status(500).json({
				ErrorMessage: 'Invalid email and password!!'
			});
		}
	});
}


exports.getUsers = function(req, res){
	db.query("SELECT * FROM users WHERE is_active = 1", function(err, results, fields){
		if (err){
			console.log(`DB ERROR [${err.code}]: ${err.sqlMessage}!\nSQL Query: ${err.sql}`)
			return res.status(500).send(err);
		}

		if(results.length){
			res.json({ results });
		}
		else{
			res.json({
				Message: 'No results found'
			});
		}
	});
}