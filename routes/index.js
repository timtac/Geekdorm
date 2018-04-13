var express = require("express");
var router = express.Router();
var Products = require("../models/products");
var routeConfig = [
	{"page": "index", "path": "/", "method": "get", "title": "" },
	{"page": "login", "path": "/login", "method": "get", "title": "" },
	{"page": "register", "path": "/register", "method": "get", "title": "" },
	{"page": "contact", "path": "/contact", "method": "get", "title": "" },
	{"page": "details", "path": "/details", "method": "get", "title": "" },
	{"page": "checkout", "path": "/checkout", "method": "get", "title": "" }

];

/* GET home page. */
routeConfig.forEach(function(route) {
	if(route.method === "get") {
		router.get(route.path, function(req, res) {
			if(route.path === "/signup"){
				res.render(route.page, {csrfToken:req.csrfToken()});
			}
			else{
				res.render(route.page);
			}
		});
	}
});

router.get("/featuredBooks", function(req, res, next){
	var featuredBooks = "featuredBooks";
	Products.find({featuredBooks : featuredBooks}, function(err, books){
		if (err) {
			return next(err);
		}
		res.json({books : books});
	});
});

router.get("/:tags", function(req, res, next) {
	var tags = req.params.tags;
	Products.find({tags : tags}, function(err, products){
		if (err) {
			return next(err);
		}
		res.render("", {products: products});
	});
});


module.exports = router;