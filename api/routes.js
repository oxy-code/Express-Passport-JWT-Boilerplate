const controller = require('./controller');

function routes(app){
	app.post('/auth/login', controller.authUser);
	app.post('/users', controller.saveUser);
	//app.get('/users', controller.saveUser);
	app.get('/', controller.index);

	app.use(function (err, req, res, next) {
		console.error(err.stack)
		res.status(500).send('Something broken!')
	})

}

module.exports = routes;