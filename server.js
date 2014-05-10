var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	stylus = require('stylus'),
	mongoose = require('mongoose');

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

//connecting to db
if ( env === 'development') {
	mongoose.connect('mongodb://localhost/multivision');
} else{
	mongoose.connect('mongodb://akash:akash@ds035997.mongolab.com:35997/heroku_app25056525');
}

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error..'));
db.once('open',function callback(){
	console.log('multivision db opened');
});

//pulling data from database note: collection name by defualt is plural
var messageSchema = new mongoose.Schema({message: String},{collection: 'message'});
//var messageSchema = new mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne({}).exec(function(err, messageDoc) {
	console.log('messageDoc',messageDoc);
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req,res){
	res.render('partials/'+req.params.partialPath);
});

//adding the route, * all the request, js, css, with call back fn
app.get('*', function(req,res){
	res.render('index',{
		mongoMessage: mongoMessage
	});
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log("listening to the port" + port + '...');