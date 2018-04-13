var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
	imagePath:{ type:String},
	title: { type:String},
	category: { type:String},
	foreward:{ type:String},
	description: { type:String},
	price: { type:Number},
	tags: {type:String},
	likes:{type: Number},
	filepath: { type:String},
	comment:[{ type: mongoose.Schema.Types.ObjectId, ref:"Comment" }]
});

var Product = mongoose.model("Product", productSchema);
module.exports = Product;