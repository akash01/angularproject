var express = require('express');

//access development env , if not set , set it to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//configuring the express app
if ('development' == env ) {
	app.set('views',__dirname+'/server/views');
	app.set('view engine','jade');
}

//adding the route, * all the request, js, css, with call back fn
app.get('*', function(req,res){
	res.render('index');
});

var port = 3030;
app.listen(port);
console.log("listening to the port" + port + '...');