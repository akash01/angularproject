var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  stylus = require('stylus'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport');

module.exports = function(app,config) {

  //configuring stylus
  function compile(str,path){
    return stylus(str).set('filename',path);
  }


  app.set('views',config.rootPath+'/server/views');
  app.set('view engine','jade');

  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(session({ secret: 'keyboard cat'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(stylus.middleware(
    { src: config.rootPath + '/public/',
      compile: compile
    }
  ));
  app.use(express.static(config.rootPath+'/public'));

};