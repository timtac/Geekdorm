var Products = require("../models/products");
var route = require("express").Router();
var Cart = require("../models/cart");

//get featured books
route.get("", function(req, res, next){
	var featuredBook = "featuredBook";
	Products.find({tags: featuredBook}).exec(function(err, book){
		
	});
});

route.get("/:books", function(req, res, next){
	var tag = req.params.books
	Products.find({tags: tag}).exec(function(err, book){
		if(err){
			return next(err);
		}
		if(books != null){
			return res.render("", {books:book});
		}
	});
});

route.get("/item/:id", function(req, res, next){
	var id = req.params.id;
	Products.findOne({_id: id})
						.populate("comments")
							.exec(function(err, item){
								res.render("", {item:item})
							});

});

route.post("/add-item", function(req, res, next) {
	var title = req.body.title
	var category = req.body.category
	var foreword = req.body.foreword
	var description = req.body.description
	var price = req.body.price
	var tags = req.body.tags
	var filePath = req.body.filePath
	
	var product = new Products({
		title : title,
		category : category,
		foreword : foreword,
		description : description,
		price : price,
		tags : tags,
		filePath : filePath
	});
	
	product.save(function(err, product){
		if(err){
			return next(err);
		}
		else{
			return next();
		}
	});
});

router.get('/add-to-cart/:id', function( req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			return done(err);
		}

		cart.add(product, product.id);
		req.session.cart = cart;
		res.redirect("/")
	});
});

router.get('/remove/:id', function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.remove(productId);
	req.session.cart = cart;
	res.redirect('/cart');
});

router.get('/cart', function(req, res) {
	if(!req.session.cart) {
		return res.render('/cart', {products: null});
	}
	var cart = new Cart(req.session.cart);
	res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});


module.exports = router;
