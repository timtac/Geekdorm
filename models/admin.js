var mongoose = require("mongoose");
var SALT = "";

var adminSchema = mongoose.Schema({
	firstname:{ type:String},
	lastname:{ type:String},
	username:{ type:String},
	password:{ type:String}
});

var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;