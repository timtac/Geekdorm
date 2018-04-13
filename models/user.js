var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	firstname: {type: String},
	lastname: {type: String},
	username: {type: String},
	password: {type: String},
	phone: {type: String},
	cc: {type: String},
	email: {type: String},
	preference: {type:String},
	location: {type: String}
});

var User = mongoose.model("User", userSchema);
module.exports = User;