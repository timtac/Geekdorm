var router = require("express").Router();
var passport = require("passport");

router.use( function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.errors = req.flash("error");
	res.locals.infos = req.flash("info");
	next();
});

router.post("/signUp", function(req, res, next) {
	var firstname = req.body.firstname;
	var email = req.body.email;
	var role = req.body.role;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var password = req.body.password;

	User.adduser(firstname, lastname, username, password, email, role, function(err, user) {
		if (err){
			req.flash("error", "Error processing information");
		}else if (user) {
			req.flash("error", "userName/Email already exist");
		}
	});
}, passport.authenticate("login", {
	successRedirect: "/",
	failureRedirect: "/users/login",
	failureFlash: true
}));


router.post("/login", passport.authenticate("login", {
	successRedirect: "/",
	failureRedirect: "/users/login",
	failureFlash: true
}));

router.post("/signUp", passport.authenticate("signUp", {
	successRedirect: "/user",
	failureRedirect: "/user/signUp",
	failureFlash: true
}));

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

router.get("/:userName",ensureAuthenticated, function(req,res) {
	var username = req.params.username;
	User.findOne({username : username})
		.populate("vehicle")
			.populate("wallet")
				.exec(function(err, user) {
					res.render("profile", {user: user});
	});
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	}
	else {
		req.flash("info", "You must be logged in to see this page");
		res.redirect("/users/login");
	}
}

module.exports = router;
