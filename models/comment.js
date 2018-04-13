var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	name: {type: String},
	productId: {type: String},
	date: {type: Date},
	likes: {type: String},
	
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;