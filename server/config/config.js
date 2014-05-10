var path = require('path');
var rootPath = path.normalize(__dirname+'/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},
	production: {
		db: 'mongodb://akash:akash@ds035997.mongolab.com:35997/heroku_app25056525',
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
};