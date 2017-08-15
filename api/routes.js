const controller = require('./controller');
const passport = require('passport');

function routes(app){

	// Public Routes
	app.post('/auth/login', controller.authUser);
	app.post('/users', controller.saveUser);
	app.get('/', controller.index);

	// Authenticated Routes
	app.get('/users', passport.authenticate('jwt', {session: false}), controller.getUsers);

	// Handling Errors
	app.use(function (err, req, res, next) {
		console.error(err.stack)
		res.status(500).send('Something broken!')
	})

}

module.exports = routes;