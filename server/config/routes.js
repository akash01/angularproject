var auth = require('./auth');

module.exports = function(app){

	app.get('/partials/*', function(req, res) {
		console.log('msg',req.params[0]);
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate );

	//adding the route, * all the request, js, css, with call back fn
	app.get('*', function(req,res){
		res.render('index');
	});
};