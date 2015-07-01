var mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt'),
    Schema    = mongoose.Schema;

var userSchema = Schema({
  username: { type: String, required: true},
  password: {type: String, required: true}
});


//additional info to bcrypt passcodes
// var userSchema.methods.generateHash = function(password){
//   return bcrypt.hashSynch(password.bcrypt.genSaltSync(9));
// }
//
// var userSchema.methods.validPassword = function(password){
//   return bcrypt.compareSync(password, this.local.password);
// }


var User = mongoose.model("User", userSchema);

module.exports = User;
