var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	stylus = require('stylus');

//access development env , if not set , set it to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//configuring stylus
function compile(str,path){
	return stylus(str).set('filename',path);
}

app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
	{ src: __dirname + '/public',
		compile: compile
	}
));

app.set('views',__dirname+'/server/views');
app.set('view engine','jade');

//configuring the express app
// if ('development' == env ) {
// app.set('views',__dirname+'/server/views');
// app.set('view engine','jade');
// }

app.get('/partials/:partialPath', function(req,res){
	res.render('partials/'+req.params.partialPath);
});

//adding the route, * all the request, js, css, with call back fn
app.get('*', function(req,res){
	res.render('index');
});

var port = 3030;
app.listen(port);
console.log("listening to the port" + port + '...');