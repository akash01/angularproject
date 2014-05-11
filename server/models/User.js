var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  //server side validation with the required object, {PATH} get the object name
  firstName: {type:String,required:'{PATH} is required'},
  lastName: {type:String,required:'{PATH} is required'},
  userName: {
    type: String,
    required:'{PATH} is required',
    unique: true
  },
  salt: {type:String,required:'{PATH} is required'},
  hashed_pwd: {type:String,required:'{PATH} is required'},
  roles: [String]
});
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      var salt,hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt,'root');
      User.create({firstName:'Root',lastName:'Folk',userName:'root', salt: salt, hashed_pwd: hash, roles: ['admin']});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'dawn');
      User.create({firstName:'Dawn',lastName:'Fox',userName:'dawn', salt: salt, hashed_pwd: hash, roles: []});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'bill');
      User.create({firstName:'Bill',lastName:'Gates',userName:'bill', salt: salt, hashed_pwd: hash});
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;